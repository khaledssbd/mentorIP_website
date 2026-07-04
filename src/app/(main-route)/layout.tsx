"use client";

import { Navbar } from "@/components/common/Navbar";
import { Sidebar } from "@/components/common/Sidebar";
import { Footer } from "@/components/common/Footer";

export default function MainRouteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex flex-col min-h-screen">
      <Navbar />
      
      <div className="flex-1 flex flex-col">
        <main className="max-w-[1920px] mx-auto w-full px-4 py-8 flex-1">
          <div className="flex flex-col lg:flex-row gap-8">
            {/* Left Sidebar - Desktop only here, Mobile in Navbar Sheet */}
            <div className="hidden lg:block w-[280px] shrink-0">
              <div className="sticky top-24">
                <Sidebar />
              </div>
            </div>

            {/* Main Content Area */}
            <div className="flex-1 min-w-0">
              {children}
            </div>
          </div>
        </main>
      </div>

      {/* Global Footer */}
      <Footer />
    </div>
  );
}
