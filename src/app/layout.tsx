import type { Metadata } from "next";
import { BRAND, BRAND_TITLE } from "@/lib/brand";
import AppShell from "@/components/AppShell";
import "./globals.css";

export const metadata: Metadata = {
  title: BRAND_TITLE,
  description: `${BRAND.name} is a technology learning marketplace. Courses, live sessions, events, and professional profiles. Payments through RedFace Pay.`,
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppShell>{children}</AppShell>
      </body>
    </html>
  );
}
