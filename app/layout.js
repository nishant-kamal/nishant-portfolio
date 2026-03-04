export const metadata = {
  title: "Nishant Kamal | Site Reliability Engineer",
  description:
    "Portfolio of Nishant Kamal - Site Reliability Engineer specializing in Kubernetes, AWS, Kafka and DevOps automation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <header style={{ padding: "20px", borderBottom: "1px solid #333" }}>
          <h2>Nishant Kamal</h2>
        </header>

        {children}

        <footer style={{ padding: "20px", borderTop: "1px solid #333", marginTop: "40px" }}>
          <p>© {new Date().getFullYear()} Nishant Kamal</p>
        </footer>
      </body>
    </html>
  );
}
