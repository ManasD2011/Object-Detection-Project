import Sidebar from "@/components/Sidebar";
import Navbar from "@/components/Navbar";
import VideoCard from "@/components/VideoCard";
import SummaryCards from "@/components/SummaryCards";
import RecentDetections from "@/components/RecentDetections";

export default function Home() {
  return (
    <div className="flex h-screen overflow-hidden bg-base">

      <Sidebar />

      <div className="flex flex-1 flex-col overflow-hidden">

        <Navbar />

        <main className="flex-1 overflow-y-auto">
          <div className="p-6 lg:p-8">

            {/* Main grid: 3 left / 2 right */}
            <div className="grid grid-cols-5 gap-6">

              {/* Left — live feed */}
              <div className="col-span-3">
                <VideoCard />
              </div>

              {/* Right — summary + detections */}
              <div className="col-span-2 flex flex-col gap-6">
                <SummaryCards />
                <RecentDetections />
              </div>

            </div>

          </div>
        </main>

      </div>
    </div>
  );
}