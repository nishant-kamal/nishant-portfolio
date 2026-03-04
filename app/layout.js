import "./globals.css"

export const metadata = {
  title: "Nishant Kamal | Site Reliability Engineer",
  description:
    "Portfolio of Nishant Kamal - Site Reliability Engineer specializing in Kubernetes, AWS, Kafka and DevOps automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        {children}
      </body>
    </html>
  );
}
