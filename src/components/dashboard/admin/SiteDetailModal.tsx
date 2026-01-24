import React, { useEffect, useState } from 'react';
import {
    X,
    MapPin,
    Phone,
    Mail,
    Clock,
    Calendar,
    User,
    Church,
    Building,
    Mountain,
    Home,
    HelpCircle,
    CheckCircle,
    XCircle,
    Loader2,
    ExternalLink,
    BookOpen
} from 'lucide-react';
import { AdminService } from '../../../services/admin.service';
import { SiteDetail, SiteType, SiteRegion } from '../../../types/admin.types';

interface SiteDetailModalProps {
    siteId: string | null;
    isOpen: boolean;
    onClose: () => void;
}

export const SiteDetailModal: React.FC<SiteDetailModalProps> = ({
    siteId,
    isOpen,
    onClose
}) => {
    const [site, setSite] = useState<SiteDetail | null>(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        if (isOpen && siteId) {
            fetchSiteDetail();
        } else {
            setSite(null);
            setError(null);
        }
    }, [isOpen, siteId]);

    const fetchSiteDetail = async () => {
        if (!siteId) return;

        try {
            setLoading(true);
            setError(null);
            const response = await AdminService.getSiteById(siteId);

            if (response.success && response.data) {
                setSite(response.data);
            } else {
                setError(response.message || 'Failed to load site details');
            }
        } catch (err: any) {
            setError(err?.error?.message || 'Failed to load site details');
        } finally {
            setLoading(false);
        }
    };

    const getTypeInfo = (type: SiteType) => {
        const types = {
            church: { label: 'Church', icon: Church, color: 'bg-blue-100 text-blue-700' },
            shrine: { label: 'Shrine', icon: Mountain, color: 'bg-purple-100 text-purple-700' },
            monastery: { label: 'Monastery', icon: Building, color: 'bg-amber-100 text-amber-700' },
            center: { label: 'Center', icon: Home, color: 'bg-green-100 text-green-700' },
            other: { label: 'Other', icon: HelpCircle, color: 'bg-slate-100 text-slate-700' }
        };
        return types[type] || types.other;
    };

    const getRegionInfo = (region: SiteRegion) => {
        const regions = {
            Bac: { label: 'Miền Bắc', color: 'bg-red-50 text-red-600', gradient: 'from-red-500 to-rose-600' },
            Trung: { label: 'Miền Trung', color: 'bg-yellow-50 text-yellow-600', gradient: 'from-yellow-500 to-amber-600' },
            Nam: { label: 'Miền Nam', color: 'bg-blue-50 text-blue-600', gradient: 'from-blue-500 to-indigo-600' }
        };
        return regions[region] || regions.Nam;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
            hour: '2-digit',
            minute: '2-digit'
        });
    };

    const openGoogleMaps = () => {
        if (site?.latitude && site?.longitude) {
            window.open(`https://www.google.com/maps?q=${site.latitude},${site.longitude}`, '_blank');
        }
    };

    if (!isOpen) return null;

    const typeInfo = site ? getTypeInfo(site.type) : null;
    const TypeIcon = typeInfo?.icon || Church;
    const regionInfo = site ? getRegionInfo(site.region) : null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center">
            {/* Backdrop */}
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="relative bg-white rounded-2xl shadow-2xl w-full max-w-2xl mx-4 max-h-[90vh] overflow-hidden">
                {/* Close button */}
                <button
                    onClick={onClose}
                    className="absolute top-4 right-4 z-10 p-2 bg-white/80 hover:bg-white rounded-full shadow-lg transition-all hover:scale-110"
                >
                    <X className="w-5 h-5 text-slate-600" />
                </button>

                {loading ? (
                    <div className="flex flex-col items-center justify-center h-80">
                        <Loader2 className="w-10 h-10 animate-spin text-blue-600 mb-4" />
                        <p className="text-slate-500">Loading site details...</p>
                    </div>
                ) : error ? (
                    <div className="flex flex-col items-center justify-center h-80 p-6">
                        <XCircle className="w-12 h-12 text-red-500 mb-4" />
                        <p className="text-red-600 text-center">{error}</p>
                        <button
                            onClick={fetchSiteDetail}
                            className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                            Try Again
                        </button>
                    </div>
                ) : site ? (
                    <>
                        {/* Header with cover image */}
                        <div className="relative h-56">
                            {site.cover_image ? (
                                <img
                                    src={site.cover_image}
                                    alt={site.name}
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className={`w-full h-full bg-gradient-to-r ${regionInfo?.gradient}`} />
                            )}
                            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent" />

                            {/* Badges on image */}
                            <div className="absolute top-4 left-4 flex gap-2">
                                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm ${site.is_active
                                        ? 'bg-green-500/90 text-white'
                                        : 'bg-red-500/90 text-white'
                                    }`}>
                                    {site.is_active ? <CheckCircle className="w-3 h-3" /> : <XCircle className="w-3 h-3" />}
                                    {site.is_active ? 'Active' : 'Inactive'}
                                </span>
                                <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-medium backdrop-blur-sm bg-white/90 ${typeInfo?.color}`}>
                                    <TypeIcon className="w-3 h-3" />
                                    {typeInfo?.label}
                                </span>
                            </div>

                            {/* Site info on image */}
                            <div className="absolute bottom-4 left-4 right-4 text-white">
                                <p className="text-sm opacity-80 font-mono">{site.code}</p>
                                <h2 className="text-2xl font-bold mb-1">{site.name}</h2>
                                {site.patron_saint && (
                                    <p className="text-sm opacity-90">🙏 {site.patron_saint}</p>
                                )}
                            </div>
                        </div>

                        {/* Content */}
                        <div className="p-6 max-h-[calc(90vh-14rem)] overflow-y-auto space-y-5">
                            {/* Location */}
                            <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                                <div className="p-2 bg-blue-100 rounded-lg">
                                    <MapPin className="w-5 h-5 text-blue-600" />
                                </div>
                                <div className="flex-1">
                                    <p className="text-xs text-slate-500 mb-1">Address</p>
                                    <p className="text-sm font-medium text-slate-900">
                                        {site.address && `${site.address}, `}
                                        {site.district && `${site.district}, `}
                                        {site.province}
                                    </p>
                                    <span className={`inline-flex items-center mt-2 px-2 py-0.5 rounded text-xs font-medium ${regionInfo?.color}`}>
                                        {regionInfo?.label}
                                    </span>
                                </div>
                                {site.latitude && site.longitude && (
                                    <button
                                        onClick={openGoogleMaps}
                                        className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
                                        title="Open in Google Maps"
                                    >
                                        <ExternalLink className="w-4 h-4" />
                                    </button>
                                )}
                            </div>

                            {/* Description */}
                            {site.description && (
                                <div className="p-4 bg-slate-50 rounded-xl">
                                    <p className="text-xs text-slate-500 mb-2">Description</p>
                                    <p className="text-sm text-slate-700 leading-relaxed">{site.description}</p>
                                </div>
                            )}

                            {/* History */}
                            {site.history && (
                                <div className="p-4 bg-amber-50 rounded-xl">
                                    <div className="flex items-center gap-2 mb-2">
                                        <BookOpen className="w-4 h-4 text-amber-600" />
                                        <p className="text-xs text-amber-700 font-medium">History</p>
                                    </div>
                                    <p className="text-sm text-slate-700 leading-relaxed">{site.history}</p>
                                </div>
                            )}

                            {/* Contact & Opening Hours */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {/* Contact Info */}
                                {site.contact_info && (site.contact_info.phone || site.contact_info.email) && (
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <p className="text-xs text-slate-500 mb-3">Contact</p>
                                        {site.contact_info.phone && (
                                            <div className="flex items-center gap-2 mb-2">
                                                <Phone className="w-4 h-4 text-green-600" />
                                                <span className="text-sm text-slate-700">{site.contact_info.phone}</span>
                                            </div>
                                        )}
                                        {site.contact_info.email && (
                                            <div className="flex items-center gap-2">
                                                <Mail className="w-4 h-4 text-blue-600" />
                                                <span className="text-sm text-slate-700">{site.contact_info.email}</span>
                                            </div>
                                        )}
                                    </div>
                                )}

                                {/* Opening Hours */}
                                {site.opening_hours && Object.keys(site.opening_hours).length > 0 && (
                                    <div className="p-4 bg-slate-50 rounded-xl">
                                        <div className="flex items-center gap-2 mb-3">
                                            <Clock className="w-4 h-4 text-slate-500" />
                                            <p className="text-xs text-slate-500">Opening Hours</p>
                                        </div>
                                        <div className="space-y-1 text-sm">
                                            {Object.entries(site.opening_hours).map(([day, hours]) => (
                                                <div key={day} className="flex justify-between">
                                                    <span className="text-slate-500 capitalize">{day}</span>
                                                    <span className="text-slate-700 font-medium">{hours}</span>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Created By & Dates */}
                            <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-200">
                                {site.created_by && (
                                    <div className="flex items-center gap-2">
                                        <User className="w-4 h-4 text-slate-400" />
                                        <div>
                                            <p className="text-xs text-slate-500">Created by</p>
                                            <p className="text-sm font-medium text-slate-700">{site.created_by.full_name}</p>
                                        </div>
                                    </div>
                                )}
                                <div className="flex items-center gap-2">
                                    <Calendar className="w-4 h-4 text-slate-400" />
                                    <div>
                                        <p className="text-xs text-slate-500">Created at</p>
                                        <p className="text-sm font-medium text-slate-700">{formatDate(site.created_at)}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </>
                ) : null}
            </div>
        </div>
    );
};
