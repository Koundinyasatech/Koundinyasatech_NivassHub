import SocietyPlanManagement from "../sections/SocietyPlanManagement/SocietyPlanManagement";
import SubscriptionBilling from "../sections/SubscriptionBilling/SubscriptionBilling";
import FeatureFlagConfig from "../sections/FeatureFlagConfig/FeatureFlagConfig";
import TrialManagement from "../sections/TrialManagement/TrialManagement";
import RevenueDashboard from "../sections/RevenueDashboard/RevenueDashboard";
import CouponDiscountManager from "../sections/CouponDiscountManager/CouponDiscountManager";

export const billingPlansTabs = [
  {
    id: "plans",
    label: "Society Plan Management",
    title: "Society Plan Management",
    subtitle: "Manage society subscriptions and plans.",
    component: SocietyPlanManagement,
  },

  {
    id: "billing",
    label: "Subscription Billing",
    title: "Subscription Billing",
    subtitle: "Manage subscription billing.",
    component: SubscriptionBilling,
  },

  {
    id: "feature-flags",
    label: "Feature Flag Config",
    title: "Feature Flag Config",
    subtitle: "Configure feature availability.",
    component: FeatureFlagConfig,
  },

  {
    id: "trials",
    label: "Trial Management",
    title: "Trial Management",
    subtitle: "Manage society trial periods.",
    component: TrialManagement,
  },

  {
    id: "revenue",
    label: "Revenue Dashboard",
    title: "Revenue Dashboard",
    subtitle: "View revenue and billing insights.",
    component: RevenueDashboard,
  },

  {
    id: "coupons",
    label: "Coupon & Discount Manager",
    title: "Coupon & Discount Manager",
    subtitle: "Manage coupons and discounts.",
    component: CouponDiscountManager,
  },
];