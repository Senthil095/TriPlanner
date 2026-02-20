
import json
import urllib.request
import sys
import time

BASE_URL = "http://localhost:8000"

def test_endpoint(url, description):
    print(f"Testing {description} ({url})...", end=" ")
    try:
        with urllib.request.urlopen(url) as response:
            if response.status == 200:
                data = json.loads(response.read().decode())
                if data:
                    print(f"PASS (Received {len(data) if isinstance(data, list) else 'data'})")
                    return True
                else:
                    print("FAIL (Empty response)")
                    return False
            else:
                print(f"FAIL (Status {response.status})")
                return False
    except Exception as e:
        print(f"FAIL (Error: {e})")
        # print details
        # print(e)
        return False

def main():
    print("Verifying Dynamic Data Endpoints...")
    
    # 1. Safety Info
    test_endpoint(f"{BASE_URL}/api/safety-info/paris", "City Safety Info")
    
    # 2. Hidden Gems
    test_endpoint(f"{BASE_URL}/api/hidden-gems/featured", "Featured Hidden Gems")
    
    # 3. Guide Cities
    test_endpoint(f"{BASE_URL}/api/guides/cities", "Guide Cities")
    
    # 4. Meta - Stats
    test_endpoint(f"{BASE_URL}/api/meta/stats", "Meta: Stats")
    
    # 5. Meta - Testimonials
    test_endpoint(f"{BASE_URL}/api/meta/testimonials", "Meta: Testimonials")
    
    # 6. Meta - Safety Tips
    test_endpoint(f"{BASE_URL}/api/meta/safety_tips", "Meta: Safety Tips")

if __name__ == "__main__":
    main()
