import ThemeContextProvider from "@/components/hooks/theme";
import "./globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "ServiceEase | Home",
  description: "Ease for your business",
  icons: "/logopng.png",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt">
      <ThemeContextProvider>
        <body className={poppins.className}>{children}</body>
      </ThemeContextProvider>
    </html>
  );
}
