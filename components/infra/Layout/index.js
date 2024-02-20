import Footer from "@/components/infra/Footer";

export default function Layout({ children }) {
  return (
    <main className="min-h-screen">
      {children}
      <Footer />
    </main>
  );
}
