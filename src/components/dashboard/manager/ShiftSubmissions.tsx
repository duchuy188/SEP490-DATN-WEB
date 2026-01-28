import React, { useEffect, useState, useCallback } from 'react';
import {
    Filter,
    ChevronLeft,
    ChevronRight,
    Loader2,
    RefreshCw,
    Calendar,
    Clock,
    User,
    CheckCircle,
    XCircle,
    AlertCircle,
    Eye,
    FileText
} from 'lucide-react';
import { ManagerService } from '../../../services/manager.service';
import {
    ShiftSubmission,
    ShiftSubmissionStatus,
    LocalGuide
} from '../../../types/manager.types';
import { ShiftSubmissionDetailModal } from './ShiftSubmissionDetailModal';

/**
 * ShiftSubmissions Component
 * 
 * Giải thích:
 * - Hiển thị danh sách đăng ký lịch làm việc của Local Guides
 * - Có filter theo: trạng thái (pending/approved/rejected), Local Guide, tuần
 * - Pagination
 */
export const ShiftSubmissions: React.FC = () => {
    // ============ STATE ============
    const [submissions, setSubmissions] = useState<ShiftSubmission[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    // Pagination
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(0);
    const [totalItems, setTotalItems] = useState(0);
    const [limit] = useState(10);

    // Filters
    const [statusFilter, setStatusFilter] = useState<ShiftSubmissionStatus | ''>('');
    const [guideFilter, setGuideFilter] = useState('');

    // Local Guides list for filter dropdown
    const [guides, setGuides] = useState<LocalGuide[]>([]);

    // ============ MODAL STATE ============
    // selectedSubmissionId: ID của submission đang xem chi tiết
    const [selectedSubmissionId, setSelectedSubmissionId] = useState<string | null>(null);

    // ============ FETCH DATA ============
    const fetchSubmissions = useCallback(async () => {
        try {
            setLoading(true);
            setError(null);

            const response = await ManagerService.getShiftSubmissions({
                page: currentPage,
                limit,
                status: statusFilter,
                guide_id: guideFilter || undefined
            });

            if (response.success && response.data) {
                setSubmissions(response.data.data);
                setTotalPages(response.data.pagination.totalPages);
                setTotalItems(response.data.pagination.totalItems);
            } else {
                setError(response.message || 'Không thể tải danh sách');
            }
        } catch (err: any) {
            setError(err?.error?.message || 'Không thể tải danh sách submissions');
        } finally {
            setLoading(false);
        }
    }, [currentPage, limit, statusFilter, guideFilter]);

    // Fetch Local Guides for filter dropdown
    const fetchGuides = useCallback(async () => {
        try {
            const response = await ManagerService.getLocalGuides({ limit: 100 });
            if (response.success && response.data) {
                setGuides(response.data.data);
            }
        } catch (err) {
            console.error('Error fetching guides:', err);
        }
    }, []);

    useEffect(() => {
        fetchSubmissions();
    }, [fetchSubmissions]);

    useEffect(() => {
        fetchGuides();
    }, [fetchGuides]);

    // ============ HELPERS ============
    const handlePageChange = (page: number) => {
        if (page >= 1 && page <= totalPages) {
            setCurrentPage(page);
        }
    };

    // Status info với màu sắc và icon
    const getStatusInfo = (status: ShiftSubmissionStatus) => {
        const statuses = {
            pending: { label: 'Chờ duyệt', color: 'bg-yellow-100 text-yellow-700 border-yellow-200', icon: Clock },
            approved: { label: 'Đã duyệt', color: 'bg-green-100 text-green-700 border-green-200', icon: CheckCircle },
            rejected: { label: 'Từ chối', color: 'bg-red-100 text-red-700 border-red-200', icon: XCircle }
        };
        return statuses[status] || statuses.pending;
    };

    // Chuyển day_of_week thành tên ngày
    const getDayName = (day: number): string => {
        const days = ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'];
        return days[day] || `Ngày ${day}`;
    };

    // Format date
    const formatDate = (dateString: string) => {
        return new Date(dateString).toLocaleDateString('vi-VN', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    };

    // Format time (HH:mm:ss -> HH:mm)
    const formatTime = (timeString: string) => {
        return timeString.slice(0, 5);
    };

    // ============ RENDER ============
    return (
        <div className="p-6 space-y-6">
            {/* Header */}
            <div className="flex items-center justify-between">
                <div>
                    <h1 className="text-2xl font-bold text-slate-900">Shift Submissions</h1>
                    <p className="text-slate-500 mt-1">Quản lý đăng ký lịch làm việc của Local Guides</p>
                </div>
                <button
                    onClick={fetchSubmissions}
                    disabled={loading}
                    className="flex items-center gap-2 px-4 py-2 border border-slate-200 text-slate-700 rounded-xl hover:bg-slate-50 transition-colors disabled:opacity-50"
                >
                    <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} />
                    Làm mới
                </button>
            </div>

            {/* Filters */}
            <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-4">
                <div className="flex flex-wrap items-center gap-4">
                    {/* Status Filter */}
                    <div className="flex items-center gap-2">
                        <Filter className="w-5 h-5 text-slate-400" />
                        <select
                            value={statusFilter}
                            onChange={(e) => { setStatusFilter(e.target.value as ShiftSubmissionStatus | ''); setCurrentPage(1); }}
                            className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        >
                            <option value="">Tất cả trạng thái</option>
                            <option value="pending">Chờ duyệt</option>
                            <option value="approved">Đã duyệt</option>
                            <option value="rejected">Từ chối</option>
                        </select>
                    </div>

                    {/* Guide Filter */}
                    <div className="flex items-center gap-2">
                        <User className="w-5 h-5 text-slate-400" />
                        <select
                            value={guideFilter}
                            onChange={(e) => { setGuideFilter(e.target.value); setCurrentPage(1); }}
                            className="px-4 py-2.5 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent min-w-[200px]"
                        >
                            <option value="">Tất cả Local Guide</option>
                            {guides.map(guide => (
                                <option key={guide.id} value={guide.id}>
                                    {guide.full_name}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>
            </div>

            {/* Error */}
            {error && (
                <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-red-600 flex items-center gap-2">
                    <AlertCircle className="w-5 h-5 flex-shrink-0" />
                    <span>{error}</span>
                </div>
            )}

            {/* Loading */}
            {loading ? (
                <div className="flex items-center justify-center h-64">
                    <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
                </div>
            ) : (
                <>
                    {/* Content */}
                    {submissions.length === 0 ? (
                        /* Empty State */
                        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-12 text-center">
                            <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mx-auto mb-4">
                                <FileText className="w-8 h-8 text-blue-600" />
                            </div>
                            <h3 className="text-lg font-semibold text-slate-900 mb-2">
                                Chưa có submission nào
                            </h3>
                            <p className="text-slate-500">
                                Các Local Guide chưa đăng ký lịch làm việc
                            </p>
                        </div>
                    ) : (
                        /* Card List */
                        <div className="space-y-4">
                            {submissions.map((submission) => {
                                const statusInfo = getStatusInfo(submission.status);
                                const StatusIcon = statusInfo.icon;

                                return (
                                    <div
                                        key={submission.id}
                                        className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 hover:shadow-md transition-shadow"
                                    >
                                        {/* Header */}
                                        <div className="flex items-start justify-between mb-4">
                                            <div className="flex items-center gap-3">
                                                {/* Avatar */}
                                                <div className="w-12 h-12 rounded-full bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
                                                    {submission.guide.avatar_url ? (
                                                        <img
                                                            src={submission.guide.avatar_url}
                                                            alt={submission.guide.full_name}
                                                            className="w-12 h-12 rounded-full object-cover"
                                                        />
                                                    ) : (
                                                        <User className="w-6 h-6 text-white" />
                                                    )}
                                                </div>
                                                {/* Guide Info */}
                                                <div>
                                                    <h3 className="font-semibold text-slate-900">
                                                        {submission.guide.full_name}
                                                    </h3>
                                                    <p className="text-sm text-slate-500">
                                                        {submission.guide.email}
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Status Badge */}
                                            <span className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-medium border ${statusInfo.color}`}>
                                                <StatusIcon className="w-3.5 h-3.5" />
                                                {statusInfo.label}
                                            </span>
                                        </div>

                                        {/* Week Info */}
                                        <div className="flex items-center gap-2 mb-4 text-sm text-slate-600">
                                            <Calendar className="w-4 h-4" />
                                            <span>Tuần bắt đầu: <strong>{formatDate(submission.week_start_date)}</strong></span>
                                            <span className="text-slate-300">|</span>
                                            <span>Tổng ca: <strong>{submission.total_shifts}</strong></span>
                                            <span className="text-slate-300">|</span>
                                            <span>Loại: <strong>{submission.submission_type === 'new' ? 'Mới' : 'Thay đổi'}</strong></span>
                                        </div>

                                        {/* Shifts */}
                                        <div className="mb-4">
                                            <h4 className="text-sm font-medium text-slate-700 mb-2">Các ca làm việc:</h4>
                                            <div className="flex flex-wrap gap-2">
                                                {submission.shifts.map((shift) => (
                                                    <div
                                                        key={shift.id}
                                                        className="inline-flex items-center gap-2 px-3 py-2 bg-slate-100 rounded-lg text-sm"
                                                    >
                                                        <span className="font-medium text-blue-600">
                                                            {getDayName(shift.day_of_week)}
                                                        </span>
                                                        <Clock className="w-3.5 h-3.5 text-slate-400" />
                                                        <span className="text-slate-600">
                                                            {formatTime(shift.start_time)} - {formatTime(shift.end_time)}
                                                        </span>
                                                    </div>
                                                ))}
                                            </div>
                                        </div>

                                        {/* Rejection Reason (if rejected) */}
                                        {submission.status === 'rejected' && submission.rejection_reason && (
                                            <div className="mb-4 p-3 bg-red-50 border border-red-200 rounded-lg text-sm text-red-600">
                                                <strong>Lý do từ chối:</strong> {submission.rejection_reason}
                                            </div>
                                        )}

                                        {/* Footer */}
                                        <div className="flex items-center justify-between pt-4 border-t border-slate-100">
                                            <span className="text-xs text-slate-400">
                                                Tạo lúc: {formatDate(submission.createdAt)}
                                            </span>
                                            <button
                                                onClick={() => setSelectedSubmissionId(submission.id)}
                                                className="flex items-center gap-1 px-3 py-1.5 text-sm border border-slate-200 text-slate-600 rounded-lg hover:bg-slate-50 transition-colors"
                                            >
                                                <Eye className="w-4 h-4" />
                                                Chi tiết
                                            </button>
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    )}

                    {/* Pagination */}
                    {totalPages > 1 && (
                        <div className="flex items-center justify-between">
                            <p className="text-sm text-slate-500">
                                Hiển thị {(currentPage - 1) * limit + 1} đến {Math.min(currentPage * limit, totalItems)} trong tổng số {totalItems} submissions
                            </p>
                            <div className="flex items-center gap-2">
                                <button
                                    onClick={() => handlePageChange(currentPage - 1)}
                                    disabled={currentPage === 1}
                                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronLeft className="w-5 h-5" />
                                </button>
                                <div className="flex items-center gap-1">
                                    {Array.from({ length: Math.min(totalPages, 5) }, (_, i) => {
                                        let pageNum;
                                        if (totalPages <= 5) {
                                            pageNum = i + 1;
                                        } else if (currentPage <= 3) {
                                            pageNum = i + 1;
                                        } else if (currentPage >= totalPages - 2) {
                                            pageNum = totalPages - 4 + i;
                                        } else {
                                            pageNum = currentPage - 2 + i;
                                        }
                                        return (
                                            <button
                                                key={pageNum}
                                                onClick={() => handlePageChange(pageNum)}
                                                className={`w-10 h-10 rounded-lg font-medium transition-colors ${pageNum === currentPage
                                                    ? 'bg-blue-600 text-white'
                                                    : 'hover:bg-slate-100 text-slate-600'
                                                    }`}
                                            >
                                                {pageNum}
                                            </button>
                                        );
                                    })}
                                </div>
                                <button
                                    onClick={() => handlePageChange(currentPage + 1)}
                                    disabled={currentPage === totalPages}
                                    className="p-2 rounded-lg border border-slate-200 hover:bg-slate-100 disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    <ChevronRight className="w-5 h-5" />
                                </button>
                            </div>
                        </div>
                    )}
                </>
            )}

            {/* ============ DETAIL MODAL ============ */}
            <ShiftSubmissionDetailModal
                isOpen={selectedSubmissionId !== null}
                submissionId={selectedSubmissionId}
                onClose={() => setSelectedSubmissionId(null)}
                onStatusChange={() => {
                    // Refresh list sau khi approve/reject
                    fetchSubmissions();
                }}
            />
        </div>
    );
};
