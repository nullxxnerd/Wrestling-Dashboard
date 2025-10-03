import Sidebar from "@/components/dashboard/Sidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full">
      <div className="mx-auto w-full max-8-xl px-2 sm:px-4">
        {/* Mobile navigation header */}
        <div className="lg:hidden py-3">
          <MobileHeader />
        </div>
      </div>
      <div className="mx-auto flex w-full max-8-xl px-2 sm:px-4 gap-4 mt-2 lg:my-8 mb-16">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <div className="bg-white rounded-lg border shadow-sm py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
