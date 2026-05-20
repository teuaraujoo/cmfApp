import InformationCard from "@/components/dashboard/InformationCard";
import RecentClasses from "@/components/dashboard/AulasTable";

export default function Home() {

  return (
    <main className="p-6">
      <div className="space-y-6">

        {/* CARDS */}
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-3">

          <InformationCard />

        </div>
        <div>
          <RecentClasses />

        </div>

      </div>
    </main>
  );
}