import { DashboardJson } from "@/interfaces/dashboard.interface";

class Dashboard {
  allUsers: number;
  allUsersActives: number;
  allUsersInactives: number;
  allTransactions: number;
  allTransDeposits: number;
  allTransWithdrawals: number;
  allTransSubscribs: number;
  allTransRewards: number;
  allTransDisbursements: number;
  allReclamations: number;
  allReclamationPendings: number;
  allVipSubscribtions: number;
  allSubscribtions: number;
  sumRewardAmounts: number;
  allAdvertisements: number;
  allCoupons: number;
  allCouponPendings: number;
  allCouponWins: number;
  allCouponLoses: number;
  allEvents: number;
  allEventPendings: number;
  allEventWins: number;
  allEventLoses: number;
  allMatchs: number;
  allChampionnats: number;
  allSports: number;
  allClubs: number;
  allBonus: number;

  constructor(
    allUsers: number,
    allUsersActives: number,
    allUsersInactives: number,
    allTransactions: number,
    allTransDeposits: number,
    allTransWithdrawals: number,
    allTransSubscribs: number,
    allTransRewards: number,
    allTransDisbursements: number,
    allReclamations: number,
    allReclamationPendings: number,
    allVipSubscribtions: number,
    allSubscribtions: number,
    sumRewardAmounts: number,
    allAdvertisements: number,
    allCoupons: number,
    allCouponPendings: number,
    allCouponWins: number,
    allCouponLoses: number,
    allEvents: number,
    allEventPendings: number,
    allEventWins: number,
    allEventLoses: number,
    allMatchs: number,
    allChampionnats: number,
    allSports: number,
    allClubs: number,
    allBonus: number,
  ) {
    this.allUsers = allUsers;
    this.allUsersActives = allUsersActives;
    this.allUsersInactives = allUsersInactives;
    this.allTransactions = allTransactions;
    this.allTransDeposits = allTransDeposits;
    this.allTransWithdrawals = allTransWithdrawals;
    this.allTransSubscribs = allTransSubscribs;
    this.allTransRewards = allTransRewards;
    this.allTransDisbursements = allTransDisbursements;
    this.allReclamations = allReclamations;
    this.allReclamationPendings = allReclamationPendings;
    this.allVipSubscribtions = allVipSubscribtions;
    this.allSubscribtions = allSubscribtions;
    this.sumRewardAmounts = sumRewardAmounts;
    this.allAdvertisements = allAdvertisements;
    this.allCoupons = allCoupons;
    this.allCouponPendings = allCouponPendings;
    this.allCouponWins = allCouponWins;
    this.allCouponLoses = allCouponLoses;
    this.allEvents = allEvents;
    this.allEventPendings = allEventPendings;
    this.allEventWins = allEventWins;
    this.allEventLoses = allEventLoses;
    this.allMatchs = allMatchs;
    this.allChampionnats = allChampionnats;
    this.allSports = allSports;
    this.allClubs = allClubs;
    this.allBonus = allBonus;
  }

  static fromJson(json: DashboardJson): Dashboard {
    return new Dashboard(
      json.all_userss,
      json.all_users_actives,
      json.all_users_inactives,
      json.all_transactions,
      json.all_trans_deposits,
      json.all_trans_withdrawals,
      json.all_trans_subscribs,
      json.all_trans_rewards,
      json.all_trans_disbursements,
      json.all_reclamations,
      json.all_reclamation_pendings,
      json.all_vip_subscribtions,
      json.all_subscribtions,
      json.sum_reward_amounts,
      json.all_advertisements,
      json.all_coupons,
      json.all_coupon_pendings,
      json.all_coupon_wins,
      json.all_coupon_loses,
      json.all_events,
      json.all_event_pendings,
      json.all_event_wins,
      json.all_event_loses,
      json.all_matchs,
      json.all_championnats,
      json.all_sports,
      json.all_clubs,
      json.all_bonus,
    );
  }

  toJson(): DashboardJson {
    return {
      all_userss: this.allUsers,
      all_users_actives: this.allUsersActives,
      all_users_inactives: this.allUsersInactives,
      all_transactions: this.allTransactions,
      all_trans_deposits: this.allTransDeposits,
      all_trans_withdrawals: this.allTransWithdrawals,
      all_trans_subscribs: this.allTransSubscribs,
      all_trans_rewards: this.allTransRewards,
      all_trans_disbursements: this.allTransDisbursements,
      all_reclamations: this.allReclamations,
      all_reclamation_pendings: this.allReclamations,
      all_vip_subscribtions: this.allVipSubscribtions,
      all_subscribtions: this.allSubscribtions,
      sum_reward_amounts: this.sumRewardAmounts,
      all_advertisements: this.allAdvertisements,
      all_coupons: this.allCoupons,
      all_coupon_pendings: this.allCouponPendings,
      all_coupon_wins: this.allCouponWins,
      all_coupon_loses: this.allCouponLoses,
      all_events: this.allEvents,
      all_event_pendings: this.allEventPendings,
      all_event_wins: this.allEventWins,
      all_event_loses: this.allEventLoses,
      all_matchs: this.allMatchs,
      all_championnats: this.allChampionnats,
      all_sports: this.allSports,
      all_clubs: this.allClubs,
      all_bonus: this.allBonus,
    };
  }
}

export default Dashboard;
