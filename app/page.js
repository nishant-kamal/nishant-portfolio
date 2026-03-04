// app/page.js — Server Component
// metadata must live here (not in a "use client" file)
import PageClient from "./PageClient"

export const metadata = {
  title: "Nishant | Site Reliability Engineer",
  description:
    "Portfolio of Nishant, a Site Reliability Engineer specializing in Kubernetes, Kafka, AWS, Terraform, and DevOps automation.",
}

export default function Home() {
  return <PageClient />
}
