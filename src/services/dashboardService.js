import dashboardData from '../data/dashboard.json';
import visitors from '../data/visitors.json';
import complaints from '../data/complaints.json';
import payments from '../data/payments.json';
import notices from '../data/notices.json';

const MOCK_DELAY = 700;
const mockDelay = () => new Promise((resolve) => setTimeout(resolve, MOCK_DELAY));

export const dashboardService = {
  async getDashboardStats() {
    await mockDelay();

    const openComplaints = complaints.filter((c) =>
      ['open', 'under-review'].includes(c.status)
    ).length;

    const pendingPayments = payments.filter((p) =>
      ['pending', 'overdue'].includes(p.status)
    ).length;

    const activeNotices = notices.filter(
      (n) => new Date(n.expiresAt) > new Date()
    ).length;

    const visitorsInside = visitors.filter((v) => v.status === 'inside').length;

    return {
      stats: {
        ...dashboardData.occupancy,
        openComplaints,
        pendingPayments,
        activeNotices,
        visitorsInside,
        paymentsCollected: dashboardData.payments.totalCollected,
        paymentsExpected: dashboardData.payments.totalExpected,
        collectionPercent: dashboardData.payments.collectionPercent,
      },
      amenities: dashboardData.amenities,
      recentActivity: dashboardData.recentActivity,
      society: dashboardData.society,
    };
  },

  async getRecentActivity() {
    await mockDelay();
    return dashboardData.recentActivity;
  },

  async getSocietyInfo() {
    await mockDelay();
    return dashboardData.society;
  },
};
