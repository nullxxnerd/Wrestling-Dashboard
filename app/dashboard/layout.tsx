import Sidebar from "@/components/dashboard/Sidebar";
import MobileHeader from "@/components/dashboard/MobileHeader";
import Breadcrumbs from "@/components/dashboard/Breadcrumbs";
import WrestlerSelect from "@/components/dashboard/WrestlerSelect";
import Navbar from "@/components/navbar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div dir="rtl" className="mx-auto w-full">
      <div className="hidden lg:block">
        <Navbar />
      </div>

      <div className="mx-auto w-full max-8-xl ">
        {/* Mobile navigation header */}
        <div className="lg:hidden py-2 bg-blue-100">
          <MobileHeader />
        </div>
        <div className="flex flex-col gap-y-4 lg:flex-row items-center justify-between pb-3 pt-8">
          <Breadcrumbs />

          <WrestlerSelect />
        </div>
      </div>
      <div className="mx-auto flex w-full max-8-xl px-2 sm:px-0 gap-4 mt-2 mb-16 ">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <div className="bg-white rounded-md border border-gray-300  py-4 sm:py-6 lg:py-8 px-2 sm:px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
