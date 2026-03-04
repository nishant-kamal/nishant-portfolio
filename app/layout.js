import "./globals.css"
import Navbar from "../components/Navbar"

export const metadata = {
  title: "Nishant Kamal | Site Reliability Engineer | DevOps | Platform Engineering",
  description:
    "Portfolio of Nishant Kamal, a Site Reliability Engineer with 6+ years of experience in Kubernetes, AWS, distributed systems, DevOps automation, and platform engineering.",
  keywords: [
    "Nishant Kamal",
    "Site Reliability Engineer",
    "DevOps Engineer",
    "Kubernetes",
    "AWS",
    "Terraform",
    "Kafka",
    "Platform Engineering",
  ],
  authors: [{ name: "Nishant Kamal" }],
  metadataBase: new URL("https://nishantkamal.com"),
  openGraph: {
    title: "Nishant Kamal | Site Reliability Engineer",
    description:
      "Portfolio of Nishant Kamal - Site Reliability Engineer specializing in Kubernetes, AWS, DevOps and platform engineering.",
    url: "https://nishantkamal.com",
    siteName: "Nishant Kamal Portfolio",
    locale: "en_US",
    type: "website",
  },
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
