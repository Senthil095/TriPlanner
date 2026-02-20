"""
Emergency SOS API Routes

Endpoints:
- POST /api/emergency/trigger-sos : Send an SOS alert email to the guardian
"""

from fastapi import APIRouter, HTTPException
from pydantic import BaseModel, Field
from typing import Optional
import smtplib
import ssl
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart
from datetime import datetime

from app.services.firebase_service import FirebaseService
from app.config import get_settings

settings = get_settings()
router = APIRouter(prefix="/api/emergency", tags=["emergency"])


class SOSTriggerRequest(BaseModel):
    user_id: str = Field(..., description="Firebase UID of the traveler")
    user_name: Optional[str] = Field(None, description="Traveler's display name")
    destination: Optional[str] = Field(None, description="Current destination / city")
    latitude: Optional[float] = Field(None, description="Traveler's current latitude")
    longitude: Optional[float] = Field(None, description="Traveler's current longitude")
    custom_message: Optional[str] = Field(None, description="Optional extra message from the traveler")


def _build_sos_email_html(
    traveler_name: str,
    destination: str,
    lat: Optional[float],
    lng: Optional[float],
    custom_message: Optional[str],
    timestamp: str,
) -> str:
    maps_link = ""
    if lat is not None and lng is not None:
        maps_link = f"https://maps.google.com/?q={lat},{lng}"

    location_block = (
        f"""
        <tr>
          <td style="padding:8px 0;"><strong>📍 Location:</strong></td>
          <td style="padding:8px 0;">
            {destination or "Unknown"}
            {"&nbsp;—&nbsp;<a href='" + maps_link + "' style='color:#e53e3e;'>Open in Google Maps</a>" if maps_link else ""}
          </td>
        </tr>"""
        if destination or maps_link
        else ""
    )

    custom_block = (
        f"""
        <tr>
          <td colspan="2" style="padding:8px 0;">
            <strong>💬 Message from traveler:</strong><br/>
            <em style="color:#555;">{custom_message}</em>
          </td>
        </tr>"""
        if custom_message
        else ""
    )

    return f"""
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8"/>
</head>
<body style="margin:0;padding:0;background:#f7f7f7;font-family:Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#f7f7f7;padding:40px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0"
               style="background:#ffffff;border-radius:12px;overflow:hidden;box-shadow:0 2px 12px rgba(0,0,0,0.08);">

          <!-- Red header -->
          <tr>
            <td style="background:#e53e3e;padding:32px 40px;text-align:center;">
              <h1 style="margin:0;color:#ffffff;font-size:28px;letter-spacing:1px;">🚨 EMERGENCY SOS ALERT</h1>
              <p style="margin:8px 0 0;color:#fed7d7;font-size:15px;">
                This is an automated emergency alert from <strong>TriPlanner</strong>.
              </p>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="padding:36px 40px;">
              <p style="font-size:16px;color:#2d3748;margin:0 0 24px;">
                <strong>{traveler_name}</strong> has triggered an emergency SOS. Please check on them immediately.
              </p>

              <table width="100%" cellpadding="0" cellspacing="0"
                     style="font-size:15px;color:#4a5568;border-collapse:collapse;">
                <tr>
                  <td style="padding:8px 0;width:160px;"><strong>🧑 Traveler:</strong></td>
                  <td style="padding:8px 0;">{traveler_name}</td>
                </tr>
                {location_block}
                <tr>
                  <td style="padding:8px 0;"><strong>🕐 Time (UTC):</strong></td>
                  <td style="padding:8px 0;">{timestamp}</td>
                </tr>
                {custom_block}
              </table>

              <hr style="border:none;border-top:1px solid #e2e8f0;margin:28px 0;"/>

              <p style="font-size:14px;color:#718096;margin:0;">
                If you are unable to reach the traveler, please contact local emergency services
                in <strong>{destination or "their destination"}</strong> immediately.
              </p>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#f7f7f7;padding:20px 40px;text-align:center;">
              <p style="margin:0;font-size:12px;color:#a0aec0;">
                Sent automatically by TriPlanner &bull; Do not reply to this email
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>
"""


def _send_smtp_email(to_address: str, subject: str, html_body: str) -> None:
    """Send an email using SMTP credentials from app settings."""
    smtp_host = getattr(settings, "smtp_host", None)
    smtp_port = int(getattr(settings, "smtp_port", 587))
    smtp_user = getattr(settings, "smtp_user", None)
    smtp_password = getattr(settings, "smtp_password", None)
    smtp_from = getattr(settings, "smtp_from", smtp_user)

    if not smtp_host or not smtp_user or not smtp_password:
        raise RuntimeError(
            "SMTP credentials are not configured. "
            "Set SMTP_HOST, SMTP_USER, SMTP_PASSWORD in your .env file."
        )

    msg = MIMEMultipart("alternative")
    msg["Subject"] = subject
    msg["From"] = f"TriPlanner SOS <{smtp_from}>"
    msg["To"] = to_address

    msg.attach(MIMEText(html_body, "html", "utf-8"))

    context = ssl.create_default_context()
    with smtplib.SMTP(smtp_host, smtp_port) as server:
        server.ehlo()
        server.starttls(context=context)
        server.login(smtp_user, smtp_password)
        server.sendmail(smtp_from, to_address, msg.as_string())


@router.post("/trigger-sos", response_model=dict)
async def trigger_sos(request: SOSTriggerRequest):
    """
    Trigger an emergency SOS alert.

    1. Looks up the user's guardian email from Firestore.
    2. Composes a rich HTML alert email.
    3. Sends it via SMTP (configured through env vars).

    Returns success/failure status without exposing internal error details
    to the client (for security).
    """
    timestamp = datetime.utcnow().strftime("%Y-%m-%d %H:%M:%S UTC")
    traveler_name = request.user_name or "Unknown Traveler"
    destination = request.destination or "Unknown Location"

    # ── 1. Fetch guardian details ──────────────────────────────────────────
    try:
        profile = await FirebaseService.get_user_profile(request.user_id)
    except Exception:
        profile = {}

    guardian_email = (profile or {}).get("guardianEmail") if profile else None
    guardian_name = (profile or {}).get("guardianName") or "Guardian"

    # Fallback: use the traveler's own custom message from profile if none sent
    custom_message = request.custom_message or (profile or {}).get("emergencyMessage")

    if not guardian_email:
        raise HTTPException(
            status_code=422,
            detail=(
                "No guardian email found for this user. "
                "Please add an emergency contact in Dashboard > Guardian & Emergency Settings."
            ),
        )

    # ── 2. Build the email ─────────────────────────────────────────────────
    subject = f"🚨 SOS Alert — {traveler_name} needs help in {destination}"
    html_body = _build_sos_email_html(
        traveler_name=traveler_name,
        destination=destination,
        lat=request.latitude,
        lng=request.longitude,
        custom_message=custom_message,
        timestamp=timestamp,
    )

    # ── 3. Send the email ──────────────────────────────────────────────────
    try:
        _send_smtp_email(
            to_address=guardian_email,
            subject=subject,
            html_body=html_body,
        )
    except RuntimeError as cfg_err:
        # Configuration problem — surface this clearly
        raise HTTPException(status_code=503, detail=str(cfg_err))
    except smtplib.SMTPAuthenticationError:
        raise HTTPException(
            status_code=503,
            detail="SMTP authentication failed. Check SMTP_USER and SMTP_PASSWORD.",
        )
    except Exception as e:
        raise HTTPException(
            status_code=503,
            detail=f"Failed to send SOS email: {str(e)}",
        )

    return {
        "success": True,
        "message": f"SOS alert sent to {guardian_name} ({guardian_email})",
        "guardian_email": guardian_email,
        "timestamp": timestamp,
    }
