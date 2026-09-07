import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  title: "Refesco",
  description: "Technology learning marketplace. Courses, live sessions, events, and professional profiles. Payments through RedFace Pay.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="shell">
          <nav className="nav">
            <Link className="brand" href="/">Refesco</Link>
            <div>
              <Link href="/courses">Courses</Link>
              <Link href="/events">Events</Link>
              <Link href="/instructors">Instructors</Link>
              <Link href="/u/manace">Learning identity</Link>
              <Link href="/account">Enrollments</Link>
              <Link href="/teach">Teach</Link>
              <Link href="/setup/pay">Pay setup</Link>
            </div>
          </nav>
          {children}
          <footer className="site">
            Refesco is a learning marketplace. Instructors are not employed as professors.
            Payments run through RedFace Pay. Refesco never holds card details.
          </footer>
        </div>
      </body>
    </html>
  );
}
