import Sidebar from "@/components/dashboard/Sidebar";

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="mx-auto w-full">
      <div className="mx-auto w-full max-8-xl px-3 sm:px-4">
        {/* Mobile inline sidebar */}
        <div className="lg:hidden py-2">
          <details className="rounded-md border bg-background p-3">
            <summary className="cursor-pointer text-sm font-medium">
              Dashboard Navigation
            </summary>
            <div className="mt-2 text-sm text-muted-foreground">
              Use the desktop sidebar for quick access to pages.
            </div>
          </details>
        </div>
      </div>
      <div className="mx-auto flex w-full max-8-xl px-3 sm:px-4 gap-4 my-8 mb-16">
        <Sidebar />
        <div className="min-w-0 flex-1">
          <div className="bg-white rounded-lg border shadow-sm py-4 sm:py-6 lg:py-8 px-3 sm:px-4">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
