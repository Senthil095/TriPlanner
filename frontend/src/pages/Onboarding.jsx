// Onboarding Wizard - 5-step multi-step form
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import {
    User, Users, Compass, Heart, Shield, ChevronRight, ChevronLeft,
    Check, Camera, Phone, Mail, Droplets, AlertTriangle, Loader2,
    MapPin, DollarSign, Utensils, Globe, Moon, Mountain, Building2,
    Backpack, Sparkles, TreePine, Sun
} from 'lucide-react';
import { useTrip } from '../context/TripContext';
import { saveUserProfile, uploadProfileImage } from '../services/firebase';

const steps = [
    { id: 1, title: 'Personal Details', icon: User, color: 'from-blue-500 to-cyan-500' },
    { id: 2, title: 'Emergency Contact', icon: Users, color: 'from-emerald-500 to-teal-500' },
    { id: 3, title: 'Travel Preferences', icon: Compass, color: 'from-amber-500 to-orange-500' },
    { id: 4, title: 'Mood & Behavior', icon: Heart, color: 'from-pink-500 to-rose-500' },
    { id: 5, title: 'Safety Settings', icon: Shield, color: 'from-violet-500 to-purple-500' },
];

const slideVariants = {
    enter: (direction) => ({
        x: direction > 0 ? 300 : -300,
        opacity: 0,
    }),
    center: {
        x: 0,
        opacity: 1,
    },
    exit: (direction) => ({
        x: direction < 0 ? 300 : -300,
        opacity: 0,
    }),
};

function StepPersonal({ data, onChange }) {
    const handleImageUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            onChange('profileImageFile', file);
            const reader = new FileReader();
            reader.onloadend = () => onChange('profileImagePreview', reader.result);
            reader.readAsDataURL(file);
        }
    };

    return (
        <div className="space-y-5">
            {/* Profile Image */}
            <div className="flex justify-center">
                <label className="relative cursor-pointer group">
                    <div className="w-24 h-24 rounded-full bg-gradient-to-br from-primary-400 to-accent-400 flex items-center justify-center overflow-hidden ring-4 ring-white dark:ring-surface-800 shadow-lg">
                        {data.profileImagePreview ? (
                            <img src={data.profileImagePreview} alt="Profile" className="w-full h-full object-cover" />
                        ) : (
                            <Camera size={32} className="text-white" />
                        )}
                    </div>
                    <div className="absolute bottom-0 right-0 w-8 h-8 bg-primary-500 rounded-full flex items-center justify-center shadow-md group-hover:bg-primary-600 transition-colors">
                        <Camera size={14} className="text-white" />
                    </div>
                    <input type="file" accept="image/*" className="hidden" onChange={handleImageUpload} />
                </label>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Full Name *</label>
                    <input type="text" value={data.fullName || ''} onChange={e => onChange('fullName', e.target.value)} required className="input-field" placeholder="John Doe" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Age *</label>
                    <input type="number" value={data.age || ''} onChange={e => onChange('age', e.target.value)} min="13" max="120" required className="input-field" placeholder="25" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Gender</label>
                    <select value={data.gender || ''} onChange={e => onChange('gender', e.target.value)} className="input-field">
                        <option value="">Select...</option>
                        <option value="male">Male</option>
                        <option value="female">Female</option>
                        <option value="non-binary">Non-Binary</option>
                        <option value="prefer-not">Prefer not to say</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Phone Number</label>
                    <div className="relative">
                        <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                        <input type="tel" value={data.phone || ''} onChange={e => onChange('phone', e.target.value)} className="input-field pl-10" placeholder="+1 234 567 8900" />
                    </div>
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Blood Group</label>
                    <select value={data.bloodGroup || ''} onChange={e => onChange('bloodGroup', e.target.value)} className="input-field">
                        <option value="">Select...</option>
                        {['A+', 'A-', 'B+', 'B-', 'AB+', 'AB-', 'O+', 'O-'].map(bg => (
                            <option key={bg} value={bg}>{bg}</option>
                        ))}
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">
                    <AlertTriangle size={14} className="inline mr-1 text-amber-500" />
                    Emergency Medical Conditions
                </label>
                <textarea
                    value={data.medicalConditions || ''}
                    onChange={e => onChange('medicalConditions', e.target.value)}
                    className="input-field min-h-[80px] resize-none"
                    placeholder="Allergies, medications, conditions..."
                    rows={3}
                />
            </div>
        </div>
    );
}

function StepGuardian({ data, onChange }) {
    return (
        <div className="space-y-5">
            <div className="p-4 bg-emerald-50 dark:bg-emerald-500/10 rounded-xl border border-emerald-200 dark:border-emerald-500/20">
                <p className="text-sm text-emerald-700 dark:text-emerald-300">
                    <Shield size={14} className="inline mr-1" />
                    Your guardian will receive alerts in case of emergencies during your trips.
                </p>
            </div>

            <div className="space-y-4">
                <h3 className="font-semibold text-surface-900 dark:text-surface-100">Primary Guardian</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Guardian Name *</label>
                        <input type="text" value={data.guardianName || ''} onChange={e => onChange('guardianName', e.target.value)} required className="input-field" placeholder="Jane Doe" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Relationship *</label>
                        <select value={data.guardianRelation || ''} onChange={e => onChange('guardianRelation', e.target.value)} className="input-field">
                            <option value="">Select...</option>
                            {['Parent', 'Sibling', 'Spouse', 'Partner', 'Friend', 'Other'].map(r => (
                                <option key={r} value={r.toLowerCase()}>{r}</option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Phone Number *</label>
                        <div className="relative">
                            <Phone size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                            <input type="tel" value={data.guardianPhone || ''} onChange={e => onChange('guardianPhone', e.target.value)} className="input-field pl-10" placeholder="+1 234 567 8900" />
                        </div>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Email</label>
                        <div className="relative">
                            <Mail size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                            <input type="email" value={data.guardianEmail || ''} onChange={e => onChange('guardianEmail', e.target.value)} className="input-field pl-10" placeholder="guardian@email.com" />
                        </div>
                    </div>
                </div>
            </div>

            <div className="border-t border-surface-200 dark:border-surface-700 pt-5 space-y-4">
                <h3 className="font-semibold text-surface-900 dark:text-surface-100 flex items-center gap-2">
                    Secondary Contact
                    <span className="text-xs font-normal text-surface-400">(optional)</span>
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Name</label>
                        <input type="text" value={data.secondaryName || ''} onChange={e => onChange('secondaryName', e.target.value)} className="input-field" placeholder="Name" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Phone</label>
                        <input type="tel" value={data.secondaryPhone || ''} onChange={e => onChange('secondaryPhone', e.target.value)} className="input-field" placeholder="+1 234 567 8900" />
                    </div>
                </div>
            </div>
        </div>
    );
}

function StepPreferences({ data, onChange }) {
    const travelStyles = [
        { value: 'luxury', label: 'Luxury', icon: Sparkles, color: 'text-amber-500' },
        { value: 'backpacker', label: 'Backpacker', icon: Backpack, color: 'text-emerald-500' },
        { value: 'budget', label: 'Budget', icon: DollarSign, color: 'text-blue-500' },
        { value: 'moderate', label: 'Moderate', icon: Compass, color: 'text-violet-500' },
    ];

    const foodPrefs = ['No Preference', 'Vegetarian', 'Vegan', 'Halal', 'Kosher', 'Gluten-Free'];
    const frequencies = ['First Timer', '1-2 trips/year', '3-5 trips/year', 'Monthly', 'Digital Nomad'];

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Budget Range (per day)</label>
                <div className="flex items-center gap-4">
                    <span className="text-sm text-surface-500 w-12">${data.budgetMin || 20}</span>
                    <input
                        type="range"
                        min="10" max="500" step="10"
                        value={data.budgetMin || 50}
                        onChange={e => onChange('budgetMin', parseInt(e.target.value))}
                        className="flex-1"
                    />
                    <input
                        type="range"
                        min="10" max="1000" step="10"
                        value={data.budgetMax || 200}
                        onChange={e => onChange('budgetMax', parseInt(e.target.value))}
                        className="flex-1"
                    />
                    <span className="text-sm text-surface-500 w-14">${data.budgetMax || 200}</span>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Travel Style</label>
                <div className="grid grid-cols-2 gap-3">
                    {travelStyles.map(style => {
                        const Icon = style.icon;
                        const isSelected = data.travelStyle === style.value;
                        return (
                            <button
                                key={style.value}
                                onClick={() => onChange('travelStyle', style.value)}
                                className={`flex items-center gap-3 p-3 rounded-xl border-2 transition-all duration-200 ${isSelected
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                                        : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
                                    }`}
                            >
                                <Icon size={20} className={isSelected ? 'text-primary-500' : style.color} />
                                <span className={`text-sm font-medium ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-surface-700 dark:text-surface-300'}`}>
                                    {style.label}
                                </span>
                                {isSelected && <Check size={16} className="ml-auto text-primary-500" />}
                            </button>
                        );
                    })}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">Accommodation</label>
                <select value={data.accommodation || ''} onChange={e => onChange('accommodation', e.target.value)} className="input-field">
                    <option value="">Select preference...</option>
                    {['Hotel', 'Hostel', 'Airbnb', 'Resort', 'Camping', 'No Preference'].map(a => (
                        <option key={a} value={a.toLowerCase()}>{a}</option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Food Preference</label>
                    <select value={data.foodPref || ''} onChange={e => onChange('foodPref', e.target.value)} className="input-field">
                        <option value="">Select...</option>
                        {foodPrefs.map(f => <option key={f} value={f.toLowerCase()}>{f}</option>)}
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Language</label>
                    <div className="relative">
                        <Globe size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-surface-400" />
                        <input type="text" value={data.language || ''} onChange={e => onChange('language', e.target.value)} className="input-field pl-10" placeholder="English" />
                    </div>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-1.5">Travel Frequency</label>
                <select value={data.travelFrequency || ''} onChange={e => onChange('travelFrequency', e.target.value)} className="input-field">
                    <option value="">Select...</option>
                    {frequencies.map(f => <option key={f} value={f.toLowerCase()}>{f}</option>)}
                </select>
            </div>
        </div>
    );
}

function StepMood({ data, onChange }) {
    const moods = [
        { value: 'city', label: 'City Explorer', icon: Building2, emoji: '🏙️' },
        { value: 'nature', label: 'Nature Lover', icon: TreePine, emoji: '🌿' },
        { value: 'adventure', label: 'Adventure', icon: Mountain, emoji: '🏔️' },
        { value: 'cheap', label: 'Budget Fun', icon: DollarSign, emoji: '💰' },
        { value: 'relax', label: 'Relaxation', icon: Sun, emoji: '🧘' },
    ];

    const selectedMoods = data.moods || [];

    const toggleMood = (value) => {
        const updated = selectedMoods.includes(value)
            ? selectedMoods.filter(m => m !== value)
            : [...selectedMoods, value];
        onChange('moods', updated);
    };

    return (
        <div className="space-y-6">
            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                    Default Travel Mood <span className="text-surface-400">(select all that apply)</span>
                </label>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                    {moods.map(mood => {
                        const isSelected = selectedMoods.includes(mood.value);
                        return (
                            <motion.button
                                key={mood.value}
                                onClick={() => toggleMood(mood.value)}
                                whileTap={{ scale: 0.95 }}
                                className={`flex flex-col items-center gap-2 p-4 rounded-2xl border-2 transition-all duration-200 ${isSelected
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10 shadow-md'
                                        : 'border-surface-200 dark:border-surface-700 hover:border-surface-300 dark:hover:border-surface-600'
                                    }`}
                            >
                                <span className="text-3xl">{mood.emoji}</span>
                                <span className={`text-sm font-medium ${isSelected ? 'text-primary-600 dark:text-primary-400' : 'text-surface-700 dark:text-surface-300'}`}>
                                    {mood.label}
                                </span>
                            </motion.button>
                        );
                    })}
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Crowd Tolerance
                </label>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-surface-400 w-16">Avoid</span>
                    <input
                        type="range" min="1" max="10"
                        value={data.crowdTolerance || 5}
                        onChange={e => onChange('crowdTolerance', parseInt(e.target.value))}
                        className="flex-1"
                    />
                    <span className="text-xs text-surface-400 w-16 text-right">Love it</span>
                </div>
                <div className="text-center text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">
                    {data.crowdTolerance || 5}/10
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-2">
                    Walking Tolerance
                </label>
                <div className="flex items-center gap-3">
                    <span className="text-xs text-surface-400 w-16">Minimal</span>
                    <input
                        type="range" min="1" max="10"
                        value={data.walkingTolerance || 5}
                        onChange={e => onChange('walkingTolerance', parseInt(e.target.value))}
                        className="flex-1"
                    />
                    <span className="text-xs text-surface-400 w-16 text-right">Marathon</span>
                </div>
                <div className="text-center text-sm text-primary-600 dark:text-primary-400 font-medium mt-1">
                    {data.walkingTolerance || 5}/10
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-surface-700 dark:text-surface-300 mb-3">
                    Night Activity Preference
                </label>
                <div className="grid grid-cols-3 gap-3">
                    {[
                        { value: 'none', label: 'Early Night', emoji: '😴' },
                        { value: 'moderate', label: 'Some Nightlife', emoji: '🌙' },
                        { value: 'active', label: 'Night Owl', emoji: '🦉' },
                    ].map(opt => {
                        const isSelected = data.nightActivity === opt.value;
                        return (
                            <button
                                key={opt.value}
                                onClick={() => onChange('nightActivity', opt.value)}
                                className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border-2 transition-all ${isSelected
                                        ? 'border-primary-500 bg-primary-50 dark:bg-primary-500/10'
                                        : 'border-surface-200 dark:border-surface-700'
                                    }`}
                            >
                                <span className="text-2xl">{opt.emoji}</span>
                                <span className="text-xs font-medium text-surface-700 dark:text-surface-300">{opt.label}</span>
                            </button>
                        );
                    })}
                </div>
            </div>
        </div>
    );
}

function StepSafety({ data, onChange }) {
    const Toggle = ({ label, description, value, onToggle }) => (
        <div className="flex items-start justify-between gap-4 p-4 rounded-xl bg-surface-50 dark:bg-surface-800/50">
            <div>
                <p className="font-medium text-surface-900 dark:text-surface-100">{label}</p>
                <p className="text-sm text-surface-500 dark:text-surface-400 mt-0.5">{description}</p>
            </div>
            <button
                onClick={onToggle}
                className={`relative w-12 h-7 rounded-full transition-colors duration-300 flex-shrink-0 ${value ? 'bg-primary-500' : 'bg-surface-300 dark:bg-surface-600'
                    }`}
            >
                <motion.div
                    className="absolute top-1 w-5 h-5 rounded-full bg-white shadow-md"
                    animate={{ left: value ? '1.5rem' : '0.25rem' }}
                    transition={{ type: 'spring', stiffness: 500, damping: 30 }}
                />
            </button>
        </div>
    );

    return (
        <div className="space-y-4">
            <div className="p-4 bg-violet-50 dark:bg-violet-500/10 rounded-xl border border-violet-200 dark:border-violet-500/20">
                <p className="text-sm text-violet-700 dark:text-violet-300">
                    <Shield size={14} className="inline mr-1" />
                    Configure safety features to protect you during your travels. All settings can be changed later.
                </p>
            </div>

            <Toggle
                label="Women Safety Mode"
                description="Enable enhanced safety recommendations and features designed for women travelers"
                value={data.womenSafety || false}
                onToggle={() => onChange('womenSafety', !data.womenSafety)}
            />

            <Toggle
                label="Live Location Sharing"
                description="Share your real-time location with your guardian while traveling"
                value={data.liveLocation || false}
                onToggle={() => onChange('liveLocation', !data.liveLocation)}
            />

            <Toggle
                label="Auto Guardian Alert"
                description="Automatically notify your guardian if you don't check in on schedule"
                value={data.autoAlert || false}
                onToggle={() => onChange('autoAlert', !data.autoAlert)}
            />
        </div>
    );
}

function Onboarding() {
    const navigate = useNavigate();
    const { state } = useTrip();
    const [currentStep, setCurrentStep] = useState(1);
    const [direction, setDirection] = useState(0);
    const [isSaving, setIsSaving] = useState(false);
    const [formData, setFormData] = useState({});

    const handleChange = (key, value) => {
        setFormData(prev => ({ ...prev, [key]: value }));
    };

    const nextStep = () => {
        if (currentStep < 5) {
            setDirection(1);
            setCurrentStep(prev => prev + 1);
        }
    };

    const prevStep = () => {
        if (currentStep > 1) {
            setDirection(-1);
            setCurrentStep(prev => prev - 1);
        }
    };

    const handleComplete = async () => {
        setIsSaving(true);
        try {
            const userId = state.user?.uid;
            if (!userId) {
                navigate('/login');
                return;
            }

            // Upload profile image if selected
            if (formData.profileImageFile) {
                await uploadProfileImage(userId, formData.profileImageFile);
            }

            // Save profile data (exclude File and preview fields)
            const { profileImageFile, profileImagePreview, ...profileData } = formData;
            await saveUserProfile(userId, {
                ...profileData,
                onboardingComplete: true,
                createdAt: new Date().toISOString(),
            });

            navigate('/dashboard', { replace: true });
        } catch (error) {
            console.error('Onboarding save error:', error);
        } finally {
            setIsSaving(false);
        }
    };

    const renderStep = () => {
        switch (currentStep) {
            case 1: return <StepPersonal data={formData} onChange={handleChange} />;
            case 2: return <StepGuardian data={formData} onChange={handleChange} />;
            case 3: return <StepPreferences data={formData} onChange={handleChange} />;
            case 4: return <StepMood data={formData} onChange={handleChange} />;
            case 5: return <StepSafety data={formData} onChange={handleChange} />;
            default: return null;
        }
    };

    const currentStepInfo = steps[currentStep - 1];
    const progress = (currentStep / 5) * 100;

    return (
        <div className="min-h-screen bg-gradient-to-br from-primary-50 via-white to-accent-50 dark:from-surface-950 dark:via-surface-900 dark:to-primary-950">
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
                <div className="absolute top-20 -right-40 w-96 h-96 rounded-full bg-primary-400/5 blur-3xl" />
                <div className="absolute -bottom-40 -left-40 w-96 h-96 rounded-full bg-accent-400/5 blur-3xl" />
            </div>

            <div className="relative max-w-2xl mx-auto px-4 py-8">
                {/* Header */}
                <motion.div
                    className="text-center mb-8"
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                >
                    <h1 className="text-2xl font-bold text-surface-900 dark:text-surface-100">
                        Set Up Your Profile
                    </h1>
                    <p className="text-surface-500 dark:text-surface-400 mt-1">
                        Help us personalize your travel experience
                    </p>
                </motion.div>

                {/* Progress bar */}
                <div className="mb-8">
                    <div className="flex items-center justify-between mb-3">
                        {steps.map((step, i) => {
                            const Icon = step.icon;
                            const isComplete = currentStep > step.id;
                            const isCurrent = currentStep === step.id;
                            return (
                                <div key={step.id} className="flex items-center">
                                    <motion.div
                                        className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all duration-300 ${isComplete
                                                ? 'bg-gradient-to-br ' + step.color + ' text-white shadow-md'
                                                : isCurrent
                                                    ? 'bg-gradient-to-br ' + step.color + ' text-white shadow-lg scale-110'
                                                    : 'bg-surface-200 dark:bg-surface-700 text-surface-500'
                                            }`}
                                        animate={isCurrent ? { scale: 1.1 } : { scale: 1 }}
                                    >
                                        {isComplete ? <Check size={18} /> : <Icon size={18} />}
                                    </motion.div>
                                    {i < steps.length - 1 && (
                                        <div className={`hidden sm:block w-12 lg:w-20 h-1 mx-1 rounded ${isComplete ? 'bg-primary-400' : 'bg-surface-200 dark:bg-surface-700'
                                            }`} />
                                    )}
                                </div>
                            );
                        })}
                    </div>
                    <div className="h-1.5 bg-surface-200 dark:bg-surface-700 rounded-full overflow-hidden">
                        <motion.div
                            className="h-full bg-gradient-to-r from-primary-500 to-accent-500 rounded-full"
                            animate={{ width: `${progress}%` }}
                            transition={{ duration: 0.4, ease: 'easeOut' }}
                        />
                    </div>
                </div>

                {/* Step Title */}
                <motion.div
                    key={currentStep}
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="mb-6"
                >
                    <h2 className="text-xl font-semibold text-surface-900 dark:text-surface-100">
                        Step {currentStep}: {currentStepInfo.title}
                    </h2>
                </motion.div>

                {/* Step Content */}
                <div className="glass-card p-6 sm:p-8 min-h-[400px]">
                    <AnimatePresence mode="wait" custom={direction}>
                        <motion.div
                            key={currentStep}
                            custom={direction}
                            variants={slideVariants}
                            initial="enter"
                            animate="center"
                            exit="exit"
                            transition={{ duration: 0.3, ease: 'easeInOut' }}
                        >
                            {renderStep()}
                        </motion.div>
                    </AnimatePresence>
                </div>

                {/* Navigation buttons */}
                <div className="flex items-center justify-between mt-6">
                    <button
                        onClick={prevStep}
                        disabled={currentStep === 1}
                        className="btn-secondary flex items-center gap-2 disabled:opacity-30"
                    >
                        <ChevronLeft size={18} />
                        Back
                    </button>

                    <div className="flex items-center gap-2">
                        {currentStep < 5 && (
                            <button
                                onClick={() => {
                                    setDirection(1);
                                    setCurrentStep(5);
                                    handleComplete();
                                }}
                                className="btn-ghost text-sm"
                            >
                                Skip for now
                            </button>
                        )}

                        {currentStep < 5 ? (
                            <button onClick={nextStep} className="btn-primary flex items-center gap-2">
                                Next
                                <ChevronRight size={18} />
                            </button>
                        ) : (
                            <button
                                onClick={handleComplete}
                                disabled={isSaving}
                                className="btn-primary flex items-center gap-2"
                            >
                                {isSaving ? (
                                    <>
                                        <Loader2 size={18} className="animate-spin" />
                                        Saving...
                                    </>
                                ) : (
                                    <>
                                        Complete Setup
                                        <Check size={18} />
                                    </>
                                )}
                            </button>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Onboarding;
