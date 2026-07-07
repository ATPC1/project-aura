import type { Metadata } from "next";
import "./globals.css";
import SmoothScrollProvider from "@/components/providers/SmoothScrollProvider";
import BackgroundScene from "@/components/3d/BackgroundScene";

export const metadata: Metadata = {
  title: "PROJECT AURA — The Main Character Experience",
  description: "Limited Edition. One of One. Exclusively for Anshi. An award-winning interactive digital journey.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="dark">
      <body className="antialiased bg-[#070709] text-white min-h-screen relative font-sans">
        <SmoothScrollProvider>
          <BackgroundScene />
          <div className="relative z-10">{children}</div>
        </SmoothScrollProvider>
      </body>
    </html>
  );
}
