import "./globals.css"
import Navbar from "../components/Navbar"
import { Inter } from "next/font/google"

const inter = Inter({
  subsets: ["latin"],
  display: "swap",
})

export const metadata = {
  metadataBase: new URL("https://nishantkamal.com"),

  title: {
    default: "Nishant Kamal | Site Reliability Engineer",
    template: "%s | Nishant Kamal",
  },

  description:
    "Portfolio of Nishant Kamal, Site Reliability Engineer with 6+ years of experience in Kubernetes, AWS, distributed systems, DevOps automation, and platform engineering.",

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

  openGraph: {
    title: "Nishant Kamal | Site Reliability Engineer",
    description:
      "Portfolio of Nishant Kamal - Site Reliability Engineer specializing in Kubernetes, AWS, DevOps and platform engineering.",
    url: "https://nishantkamal.com",
    siteName: "Nishant Kamal Portfolio",
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title: "Nishant Kamal | Site Reliability Engineer",
    description:
      "Portfolio of Nishant Kamal - Site Reliability Engineer specializing in Kubernetes, AWS, DevOps and platform engineering.",
  },

  robots: {
    index: true,
    follow: true,
  },
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className + " bg-black text-white"}>
        <Navbar />

        <main className="min-h-screen">
          {children}
        </main>

      </body>
    </html>
  )
}
