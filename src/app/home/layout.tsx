import Sidebar from "@/components/homeAuth/sidebar";
import ThemeContextProvider from "@/components/hooks/theme";
import { Metadata } from "next";
import { ReactNode } from "react";

export const metadata: Metadata = {
  title: "ServiceEase | Home",
};

export default function layout({ children }: { children: ReactNode }) {
  return (
    <ThemeContextProvider>
      <main className="flex mx-auto static dark:bg-black">
        <div className="h-screen  fixed">
          <Sidebar />
        </div>
        <div className="w-screen ml-14">{children}</div>
      </main>
    </ThemeContextProvider>
  );
}
