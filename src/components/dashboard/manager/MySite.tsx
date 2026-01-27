import React, { useEffect, useState } from 'react';
import {
    Loader2,
    MapPin,
    Clock,
    Phone,
    Mail,
    Church,
    Building,
    Mountain,
    Home,
    HelpCircle,
    Plus,
    Edit,
    CheckCircle,
    XCircle,
    RefreshCw
} from 'lucide-react';
import { ManagerService } from '../../../services/manager.service';
import { ManagerSite } from '../../../types/manager.types';
import { SiteType, SiteRegion } from '../../../types/admin.types';
import { SiteFormModal } from './SiteFormModal';

export const MySite: React.FC = () => {
    const [site, setSite] = useState<ManagerSite | null>(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [hasSite, setHasSite] = useState<boolean | null>(null);

    // Modal states
    const [isFormModalOpen, setIsFormModalOpen] = useState(false);
    const [formMode, setFormMode] = useState<'create' | 'edit'>('create');

    useEffect(() => {
        fetchMySite();
    }, []);

    const fetchMySite = async () => {
        try {
            setLoading(true);
            setError(null);
            const response = await ManagerService.getMySite();

            if (response.success && response.data) {
                setSite(response.data);
                setHasSite(true);
            } else {
                // Manager doesn't have a site yet
                setSite(null);
                setHasSite(false);
            }
        } catch (err: any) {
            // 404 or similar - manager has no site
            if (err?.error?.statusCode === 404 || err?.status === 404) {
                setSite(null);
                setHasSite(false);
            } else {
                setError(err?.error?.message || 'Failed to load site');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleOpenCreateModal = () => {
        setFormMode('create');
        setIsFormModalOpen(true);
    };

    const handleOpenEditModal = () => {
        setFormMode('edit');
        setIsFormModalOpen(true);
    };

    const handleFormSuccess = () => {
        fetchMySite(); // Refresh data after create/edit
    };

    const getTypeInfo = (type: SiteType) => {
        const types = {
            church: { label: 'Nhà thờ', icon: Church, color: 'text-blue-600 bg-blue-100' },
            shrine: { label: 'Đền thánh', icon: Mountain, color: 'text-purple-600 bg-purple-100' },
            monastery: { label: 'Tu viện', icon: Building, color: 'text-amber-600 bg-amber-100' },
            center: { label: 'Trung tâm', icon: Home, color: 'text-green-600 bg-green-100' },
            other: { label: 'Khác', icon: HelpCircle, color: 'text-slate-600 bg-slate-100' }
        };
        return types[type] || types.other;
    };

    const getRegionLabel = (region: SiteRegion) => {
        const labels = { Bac: 'Miền Bắc', Trung: 'Miền Trung', Nam: 'Miền Nam' };
        return labels[region] || region;
    };

    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'long',
            day: 'numeric'
        });
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center h-96">
                <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
        );
    }

    // No site yet - show create button
    if (hasSite === false) {
        return (
            <div className="p-6">
                <div className="max-w-2xl mx-auto">
                    <div className="bg-gradient-to-br from-blue-50 to-indigo-100 rounded-3xl p-12 text-center">
                        <div className="w-20 h-20 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                            <Church className="w-10 h-10 text-white" />
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900 mb-3">
                            Bạn chưa có địa điểm nào
                        </h2>
                        <p className="text-slate-600 mb-8">
                            Tạo địa điểm đầu tiên của bạn để bắt đầu quản lý và thu hút người hành hương.
                        </p>
                        <button
                            onClick={handleOpenCreateModal}
                            className="inline-flex items-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors font-medium"
                        >
                            <Plus className="w-5 h-5" />
                            Tạo địa điểm mới
                        </button>
                        <p className="text-sm text-slate-500 mt-4">
                            Lưu ý: Mỗi Manager chỉ được quản lý 1 địa điểm
                        </p>
                    </div>
                </div>

                {/* Form Modal */}
                <SiteFormModal
                    isOpen={isFormModalOpen}
                    onClose={() => setIsFormModalOpen(false)}
                    onSuccess={handleFormSuccess}
                    mode={formMode}
                    existingSite={null}
                />
            </div>
        );
    }

    // Error state
    if (error) {
        return (
            <div className="p-6">
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 flex items-center gap-2">
                    <XCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                    <button onClick={fetchMySite} className="ml-auto px-3 py-1 bg-red-100 rounded-lg hover:bg-red-200 transition-colors">
                        Thử lại
                    </button>
                </div>
            </div>
        );
    }

    // Show site details
    if (!site) return null;

    const typeInfo = getTypeInfo(site.type);
    const TypeIcon = typeInfo.icon;

    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Địa điểm của tôi</h1>
                    <p className="text-slate-500 mt-1">Quản lý thông tin địa điểm hành hương</p>
                </div>
                <div className="flex items-center gap-3">
                    <button
                        onClick={fetchMySite}
                        className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors"
                    >
                        <RefreshCw className="w-4 h-4" />
                        Làm mới
                    </button>
                    <button
                        onClick={handleOpenEditModal}
                        className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded-xl hover:bg-blue-700 transition-colors"
                    >
                        <Edit className="w-4 h-4" />
                        Chỉnh sửa
                    </button>
                </div>
            </div>

            {/* Site Card */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
                {/* Cover Image */}
                <div className="relative h-64 bg-gradient-to-br from-blue-400 to-indigo-600">
                    {site.cover_image && (
                        <img
                            src={site.cover_image}
                            alt={site.name}
                            className="w-full h-full object-cover"
                        />
                    )}
                    <div className="absolute bottom-4 left-4 right-4 flex items-end justify-between">
                        <div>
                            <span className="text-xs font-mono bg-white/20 backdrop-blur-sm text-white px-2 py-1 rounded">
                                {site.code}
                            </span>
                        </div>
                        <span className={`inline-flex items-center gap-1 px-3 py-1.5 rounded-full text-sm font-medium ${site.is_active
                            ? 'bg-green-100 text-green-700'
                            : 'bg-red-100 text-red-700'
                            }`}>
                            {site.is_active ? (
                                <><CheckCircle className="w-4 h-4" /> Đang hoạt động</>
                            ) : (
                                <><XCircle className="w-4 h-4" /> Tạm ngưng</>
                            )}
                        </span>
                    </div>
                </div>

                {/* Content */}
                <div className="p-6 space-y-6">
                    {/* Name & Type */}
                    <div>
                        <div className="flex items-center gap-3 mb-2">
                            <div className={`p-2 rounded-lg ${typeInfo.color}`}>
                                <TypeIcon className="w-5 h-5" />
                            </div>
                            <span className="text-sm font-medium text-slate-500">{typeInfo.label}</span>
                            <span className="text-sm text-slate-400">•</span>
                            <span className="text-sm text-slate-500">{getRegionLabel(site.region)}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-slate-900">{site.name}</h2>
                        {site.patron_saint && (
                            <p className="text-slate-600 mt-1">Bổn mạng: {site.patron_saint}</p>
                        )}
                    </div>

                    {/* Address */}
                    <div className="flex items-start gap-3 p-4 bg-slate-50 rounded-xl">
                        <MapPin className="w-5 h-5 text-slate-400 mt-0.5" />
                        <div>
                            <p className="font-medium text-slate-900">{site.address}</p>
                            <p className="text-sm text-slate-500">
                                {site.district && `${site.district}, `}{site.province}
                            </p>
                        </div>
                    </div>

                    {/* Description */}
                    {site.description && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Mô tả</h3>
                            <p className="text-slate-600">{site.description}</p>
                        </div>
                    )}

                    {/* History */}
                    {site.history && (
                        <div>
                            <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-2">Lịch sử</h3>
                            <p className="text-slate-600">{site.history}</p>
                        </div>
                    )}

                    {/* Opening Hours & Contact */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {/* Opening Hours */}
                        {site.opening_hours && Object.keys(site.opening_hours).length > 0 && (
                            <div className="p-4 border border-slate-200 rounded-xl">
                                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3 flex items-center gap-2">
                                    <Clock className="w-4 h-4" />
                                    Giờ mở cửa
                                </h3>
                                <div className="space-y-1 text-sm">
                                    {Object.entries(site.opening_hours).map(([day, hours]) => (
                                        <div key={day} className="flex justify-between">
                                            <span className="text-slate-500 capitalize">{day}</span>
                                            <span className="text-slate-900 font-medium">{hours}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Contact Info */}
                        {site.contact_info && (
                            <div className="p-4 border border-slate-200 rounded-xl">
                                <h3 className="text-sm font-semibold text-slate-700 uppercase tracking-wider mb-3">
                                    Thông tin liên hệ
                                </h3>
                                <div className="space-y-2 text-sm">
                                    {site.contact_info.phone && (
                                        <div className="flex items-center gap-2">
                                            <Phone className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{site.contact_info.phone}</span>
                                        </div>
                                    )}
                                    {site.contact_info.email && (
                                        <div className="flex items-center gap-2">
                                            <Mail className="w-4 h-4 text-slate-400" />
                                            <span className="text-slate-900">{site.contact_info.email}</span>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}
                    </div>

                    {/* Timestamps */}
                    <div className="flex items-center justify-between text-sm text-slate-500 pt-4 border-t border-slate-200">
                        <span>Ngày tạo: {formatDate(site.created_at)}</span>
                        <span>Cập nhật: {formatDate(site.updated_at)}</span>
                    </div>
                </div>
            </div>

            {/* Form Modal */}
            <SiteFormModal
                isOpen={isFormModalOpen}
                onClose={() => setIsFormModalOpen(false)}
                onSuccess={handleFormSuccess}
                mode={formMode}
                existingSite={site}
            />
        </div>
    );
};

