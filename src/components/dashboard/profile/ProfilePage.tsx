import React, { useEffect, useState, useRef } from 'react';
import { User, Mail, Phone, Calendar, Clock, Camera, Save, Loader2, X, Edit3, CheckCircle } from 'lucide-react';
import { AuthService } from '../../../services/auth.service';
import { UserProfile } from '../../../types/auth.types';

export const ProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<UserProfile | null>(null);
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [success, setSuccess] = useState<string | null>(null);
    const [isEditing, setIsEditing] = useState(false);

    // Edit form state
    const [fullName, setFullName] = useState('');
    const [phone, setPhone] = useState('');
    const [dateOfBirth, setDateOfBirth] = useState('');
    const [language, setLanguage] = useState('vi');
    const [avatarFile, setAvatarFile] = useState<File | null>(null);
    const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
    const fileInputRef = useRef<HTMLInputElement>(null);

    useEffect(() => {
        fetchProfile();
    }, []);

    const fetchProfile = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await AuthService.getProfile();
            if (response.success && response.data) {
                setProfile(response.data);
                // Initialize form with current values
                setFullName(response.data.full_name || '');
                setPhone(response.data.phone || '');
                setDateOfBirth(response.data.date_of_birth || '');
                setLanguage(response.data.language || 'vi');
            } else {
                setError(response.message || 'Failed to load profile');
            }
        } catch (err) {
            setError('Failed to load profile');
        } finally {
            setLoading(false);
        }
    };

    const handleAvatarChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            setAvatarFile(file);
            const reader = new FileReader();
            reader.onloadend = () => {
                setAvatarPreview(reader.result as string);
            };
            reader.readAsDataURL(file);
        }
    };

    const handleSave = async () => {
        try {
            setSaving(true);
            setError(null);
            setSuccess(null);

            const response = await AuthService.updateProfile({
                full_name: fullName,
                phone: phone || undefined,
                date_of_birth: dateOfBirth || undefined,
                language: language,
                avatar: avatarFile || undefined,
            });

            if (response.success && response.data) {
                setProfile(response.data);
                setSuccess('Profile updated successfully!');
                setIsEditing(false);
                setAvatarFile(null);
                setAvatarPreview(null);
                setTimeout(() => setSuccess(null), 3000);
            } else {
                setError(response.message || 'Failed to update profile');
            }
        } catch (err: any) {
            setError(err?.error?.message || 'Failed to update profile');
        } finally {
            setSaving(false);
        }
    };

    const handleCancel = () => {
        if (profile) {
            setFullName(profile.full_name || '');
            setPhone(profile.phone || '');
            setDateOfBirth(profile.date_of_birth || '');
            setLanguage(profile.language || 'vi');
            setAvatarFile(null);
            setAvatarPreview(null);
        }
        setIsEditing(false);
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-64">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    if (error && !profile) {
        return (
            <div className="bg-red-50 border border-red-200 rounded-xl p-6 text-center">
                <p className="text-red-600">{error}</p>
            </div>
        );
    }

    if (!profile) {
        return null;
    }

    const formatDate = (dateString: string | null) => {
        if (!dateString) return 'Not provided';
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    const getStatusColor = (status: string) => {
        switch (status.toLowerCase()) {
            case 'active':
                return 'bg-green-100 text-green-700';
            case 'inactive':
                return 'bg-gray-100 text-gray-700';
            case 'banned':
                return 'bg-red-100 text-red-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const getRoleColor = (role: string) => {
        switch (role.toLowerCase()) {
            case 'admin':
                return 'bg-purple-100 text-purple-700';
            case 'manager':
                return 'bg-blue-100 text-blue-700';
            default:
                return 'bg-gray-100 text-gray-700';
        }
    };

    const displayAvatar = avatarPreview || profile.avatar_url || 'https://images.pexels.com/photos/2379005/pexels-photo-2379005.jpeg?auto=compress&cs=tinysrgb&w=150';

    return (
        <div className="max-w-4xl mx-auto">
            {/* Header */}
            <div className="mb-8">
                <h1 className="text-2xl font-bold text-slate-900">Profile</h1>
                <p className="text-slate-600 mt-1">View and manage your account information</p>
            </div>

            {/* Success/Error Messages */}
            {success && (
                <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-xl text-green-600 flex items-center gap-2">
                    <CheckCircle className="w-5 h-5" />
                    {success}
                </div>
            )}
            {error && (
                <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-xl text-red-600">
                    {error}
                </div>
            )}

            {/* Profile Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Cover & Avatar */}
                <div className="h-32 bg-gradient-to-r from-blue-600 to-indigo-600 relative">
                    <div className="absolute -bottom-12 left-8">
                        <div className="relative">
                            <img
                                src={displayAvatar}
                                alt={profile.full_name}
                                className="w-24 h-24 rounded-2xl border-4 border-white object-cover shadow-lg"
                            />
                            {isEditing && (
                                <button
                                    onClick={() => fileInputRef.current?.click()}
                                    className="absolute bottom-0 right-0 p-1.5 bg-blue-600 rounded-lg text-white hover:bg-blue-700 transition-colors"
                                >
                                    <Camera className="w-4 h-4" />
                                </button>
                            )}
                            <input
                                ref={fileInputRef}
                                type="file"
                                accept="image/png,image/jpeg,image/jpg,image/webp"
                                onChange={handleAvatarChange}
                                className="hidden"
                            />
                        </div>
                    </div>
                </div>

                {/* Profile Info */}
                <div className="pt-16 px-8 pb-8">
                    <div className="flex items-start justify-between mb-6">
                        <div>
                            <h2 className="text-xl font-bold text-slate-900">{profile.full_name}</h2>
                            <div className="flex items-center gap-2 mt-2">
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getRoleColor(profile.role)}`}>
                                    {profile.role}
                                </span>
                                <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(profile.status)}`}>
                                    {profile.status}
                                </span>
                            </div>
                        </div>
                        <div className="flex gap-2">
                            {isEditing ? (
                                <>
                                    <button
                                        onClick={handleCancel}
                                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                                    >
                                        <X className="w-4 h-4" />
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleSave}
                                        disabled={saving}
                                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors disabled:opacity-50"
                                    >
                                        {saving ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
                                        {saving ? 'Saving...' : 'Save Changes'}
                                    </button>
                                </>
                            ) : (
                                <button
                                    onClick={() => setIsEditing(true)}
                                    className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                                >
                                    <Edit3 className="w-4 h-4" />
                                    Edit Profile
                                </button>
                            )}
                        </div>
                    </div>

                    {/* Info Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        {/* Email (Read-only) */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <Mail className="w-4 h-4 text-slate-400" />
                                Email
                            </label>
                            <input
                                type="email"
                                value={profile.email}
                                readOnly
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                            />
                        </div>

                        {/* Phone */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <Phone className="w-4 h-4 text-slate-400" />
                                Phone Number
                            </label>
                            <input
                                type="tel"
                                value={isEditing ? phone : (profile.phone || 'Not provided')}
                                onChange={(e) => setPhone(e.target.value)}
                                readOnly={!isEditing}
                                placeholder="Enter phone number"
                                className={`w-full px-4 py-3 border rounded-xl text-slate-900 ${isEditing
                                        ? 'bg-white border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'bg-slate-50 border-slate-200'
                                    }`}
                            />
                        </div>

                        {/* Full Name */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <User className="w-4 h-4 text-slate-400" />
                                Full Name
                            </label>
                            <input
                                type="text"
                                value={isEditing ? fullName : profile.full_name}
                                onChange={(e) => setFullName(e.target.value)}
                                readOnly={!isEditing}
                                placeholder="Enter full name"
                                className={`w-full px-4 py-3 border rounded-xl text-slate-900 ${isEditing
                                        ? 'bg-white border-slate-300 focus:ring-2 focus:ring-blue-500 focus:border-transparent'
                                        : 'bg-slate-50 border-slate-200'
                                    }`}
                            />
                        </div>

                        {/* Language */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <User className="w-4 h-4 text-slate-400" />
                                Language
                            </label>
                            {isEditing ? (
                                <select
                                    value={language}
                                    onChange={(e) => setLanguage(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                >
                                    <option value="vi">Tiếng Việt</option>
                                    <option value="en">English</option>
                                </select>
                            ) : (
                                <input
                                    type="text"
                                    value={profile.language === 'vi' ? 'Tiếng Việt' : 'English'}
                                    readOnly
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                                />
                            )}
                        </div>

                        {/* Date of Birth */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <Calendar className="w-4 h-4 text-slate-400" />
                                Date of Birth
                            </label>
                            {isEditing ? (
                                <input
                                    type="date"
                                    value={dateOfBirth}
                                    onChange={(e) => setDateOfBirth(e.target.value)}
                                    className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl text-slate-900 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                                />
                            ) : (
                                <input
                                    type="text"
                                    value={formatDate(profile.date_of_birth)}
                                    readOnly
                                    className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                                />
                            )}
                        </div>

                        {/* Account Created */}
                        <div className="space-y-2">
                            <label className="flex items-center gap-2 text-sm font-medium text-slate-700">
                                <Clock className="w-4 h-4 text-slate-400" />
                                Account Created
                            </label>
                            <input
                                type="text"
                                value={formatDate(profile.created_at)}
                                readOnly
                                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl text-slate-900"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
