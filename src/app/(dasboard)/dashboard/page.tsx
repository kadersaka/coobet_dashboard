"use client";

import React, { useEffect } from "react";
import useDashboardStore from "@/store/useDashboard.store";
import {
  ArrowLeft,
  ArrowLeftRight,
  ArrowRight,
  Calendar,
  ChevronDown,
  Eye,
  Forward,
  Medal,
  Megaphone,
  RedoDot,
  RefreshCcw,
  Snowflake,
  Sparkle,
  Ticket,
  Trophy,
  Users,
  UserSquare,
  Volleyball,
} from "lucide-react";
import AppSelect from "@/components/widget/Form/Select";
import ProcessingLoader from "@/components/common/Loader/ProcessingLoader";
import CardDataStats from "@/components/CardDataStats";

const Dashboard: React.FC = () => {
  const {
    loading,
    dashboardData,
    period,
    setPeriod,
    periods,
    fetchDashboardData,
  } = useDashboardStore();

  useEffect(() => {
    fetchDashboardData(period);
  }, [fetchDashboardData, period]);

  return (
    <>
      <div className="my-10 flex items-center justify-center">
        <span className="mr-5 font-medium text-boxdark dark:text-white">
          Filtre:
        </span>
        <AppSelect
          id="period"
          name="period"
          items={periods}
          icon={<ChevronDown />}
          value={periods.find((prd) => prd.value == period)?.name ?? "all"}
          onChange={setPeriod}
        />
      </div>
      <div className="flex h-full w-full items-center justify-center">
        {loading ? (
          <ProcessingLoader />
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-2 md:gap-6 xl:grid-cols-4 2xl:gap-7.5">
            <CardDataStats
              title="Total Utilisateurs"
              total={`${dashboardData.allUsers ?? 0}`} // rate="0.43%" levelUp
            >
              <Users className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Utilisateurs Actifs"
              total={`${dashboardData.allUsersActives ?? 0}`} // rate="0.43%" levelUp
            >
              <Users className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Utilisateurs Inactifs"
              total={`${dashboardData.allUsersInactives ?? 0}`} // rate="0.43%" levelUp
            >
              <Users className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Matchs"
              total={`${dashboardData.allMatchs ?? 0}`} // rate="0.43%" levelUp
            >
              <Volleyball className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Championnats"
              total={`${dashboardData.allChampionnats ?? 0}`} // rate="0.43%" levelUp
            >
              <Trophy className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Sports"
              total={`${dashboardData.allSports ?? 0}`} // rate="0.43%" levelUp
            >
              <Medal className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Clubs"
              total={`${dashboardData.allClubs ?? 0}`} // rate="0.43%" levelUp
            >
              <UserSquare className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Bonus"
              total={`${dashboardData.allBonus ?? 0}`} // rate="0.43%" levelUp
            >
              <Snowflake className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Transactions"
              total={`${dashboardData.allTransactions ?? 0}`} // rate="0.43%" levelUp
            >
              <ArrowLeftRight className="fill-primary dark:fill-white" />
            </CardDataStats>

            <CardDataStats
              title="Total Transactions Service"
              total={`${dashboardData.allServiceTransactions ?? 0}`} // rate="0.43%" levelUp
            >
              <ArrowLeftRight className="fill-primary dark:fill-white" />
            </CardDataStats>

            <CardDataStats
              title="Total Transactions Coobet"
              total={`${dashboardData.allCoobetTransactions ?? 0}`} // rate="0.43%" levelUp
            >
              <ArrowLeftRight className="fill-primary dark:fill-white" />
            </CardDataStats>

            <CardDataStats
              title={`${dashboardData.allTransDeposits} ${dashboardData.allTransDeposits > 1 ? "Dépôts" : "Dépôt"}`}
              total={`${dashboardData.depositsAmount ?? 0} F CFA`} // rate="0.43%" levelUp
            >
              <ArrowLeft className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title={`${dashboardData.allTransWithdrawals} ${dashboardData.allTransWithdrawals > 1 ? "Retraits" : "Retrait"}`}
              total={`${dashboardData.withdrawalsAmount ?? 0} F CFA`} // rate="0.43%" levelUp
            >
              <ArrowRight className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Transactions Abonnements "
              total={`${dashboardData.allTransSubscribs ?? 0}`} // rate="0.43%" levelUp
            >
              <ArrowLeftRight className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Récompenses"
              total={`${dashboardData.allTransRewards ?? 0}`} // rate="0.43%" levelUp
            >
              <Sparkle className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Remboursements"
              total={`${dashboardData.allTransDisbursements ?? 0}`} // rate="0.43%" levelUp
            >
              <Forward className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Reclamations"
              total={`${dashboardData.allReclamations ?? 0} F CFA`} // rate="0.43%" levelUp
            >
              <RedoDot className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Reclamations en cours"
              total={`${dashboardData.allReclamationPendings ?? 0} F CFA`} // rate="0.43%" levelUp
            >
              <RedoDot className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Abonnements"
              total={`${dashboardData.allSubscribtions ?? 0}`} // rate="0.43%" levelUp
            >
              <RefreshCcw className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Abonnements VIP"
              total={`${dashboardData.allVipSubscribtions ?? 0}`} // rate="0.43%" levelUp
            >
              <RefreshCcw className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Montant Récompense"
              total={`${dashboardData.sumRewardAmounts ?? 0} F CFA`} // rate="0.43%" levelUp
            >
              <Sparkle className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Publicités"
              total={`${dashboardData.allAdvertisements ?? 0}`} // rate="0.43%" levelUp
            >
              <Megaphone className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Coupons"
              total={`${dashboardData.allCoupons ?? 0}`} // rate="0.43%" levelUp
            >
              <Ticket className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Coupons en cours"
              total={`${dashboardData.allCouponPendings ?? 0}`} // rate="0.43%" levelUp
            >
              <Ticket className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Coupons perdus"
              total={`${dashboardData.allCouponLoses ?? 0}`} // rate="0.43%" levelUp
            >
              <Ticket className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Coupons gagnés"
              total={`${dashboardData.allCouponWins ?? 0}`} // rate="0.43%" levelUp
            >
              <Ticket className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Évènement"
              total={`${dashboardData.allEvents ?? 0}`} // rate="0.43%" levelUp
            >
              <Calendar className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Combinés en cours"
              total={`${dashboardData.allEventPendings ?? 0}`} // rate="0.43%" levelUp
            >
              <Calendar className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Combinés perdus"
              total={`${dashboardData.allEventLoses ?? 0}`} // rate="0.43%" levelUp
            >
              <Calendar className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Combinés gagnés"
              total={`${dashboardData.allEventWins ?? 0}`} // rate="0.43%" levelUp
            >
              <Calendar className="fill-primary dark:fill-white" />
            </CardDataStats>
            {/* <CardDataStats
              title="Total Matchs"
              total={`${dashboardData.allMatchs ?? 0}`} // rate="0.43%" levelUp
            >
              <Volleyball className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Championnats"
              total={`${dashboardData.allChampionnats ?? 0}`} // rate="0.43%" levelUp
            >
              <Trophy className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Sports"
              total={`${dashboardData.allSports ?? 0}`} // rate="0.43%" levelUp
            >
              <Medal className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Clubs"
              total={`${dashboardData.allClubs ?? 0}`} // rate="0.43%" levelUp
            >
              <UserSquare className="fill-primary dark:fill-white" />
            </CardDataStats>
            <CardDataStats
              title="Total Bonus"
              total={`${dashboardData.allBonus ?? 0}`} // rate="0.43%" levelUp
            >
              <Users className="fill-primary dark:fill-white" />
            </CardDataStats> */}
          </div>
        )}
      </div>

      {/* <div className="mt-4 grid grid-cols-12 gap-4 md:mt-6 md:gap-6 2xl:mt-7.5 2xl:gap-7.5">
        <ChartOne />
        <ChartTwo />
        <ChartThree />
       <MapOne /> 
        <div className="col-span-12 xl:col-span-8">
          <TableOne />
        </div>
        <ChatCard />
      </div> 
      */}
    </>
  );
};

export default Dashboard;
