import Footer from "@/components/infra/Footer";

export default function Layout({ children }) {
  return (
    <main>
      {children}
      <Footer />
    </main>
  );
}
