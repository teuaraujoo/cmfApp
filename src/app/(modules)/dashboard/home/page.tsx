import InformationCard from "@/components/dashboard/home/InformationCard";
import RecentClasses from "@/components/dashboard/home/AulasTable";
import StatisticsChart from "@/components/dashboard/home/StatisticsChart";
import PendingAulasCard from "@/components/dashboard/home/PendingAulasCard";
import RecentStudentsGrid from "@/components/dashboard/home/RecentStudentsGrid";

export default function Home() {

  return (
    <main className="p-6">
      <div className="space-y-6">

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">

          <InformationCard />

        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,2fr)_360px]">
          <StatisticsChart />
          <PendingAulasCard />
        </div>
        <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)]">
          <RecentClasses />
          <RecentStudentsGrid />
        </div>

      </div>
    </main>
  );
}
