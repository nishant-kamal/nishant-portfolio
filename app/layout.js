import "./globals.css"
import Navbar from "../components/Navbar"

export const metadata = {
  title: "Nishant Kamal | Site Reliability Engineer | DevOps | Platform Engineering",
  description:
    "Nishant Kamal is a Site Reliability Engineer with 6+ years of experience in Kubernetes, AWS, distributed systems, DevOps automation, and platform engineering.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>

        <Navbar />

        {children}

      </body>
    </html>
  );
}