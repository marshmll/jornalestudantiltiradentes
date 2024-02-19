export default function Footer() {
  const year = new Date().getFullYear();
  return (
    <footer className="text-center bg-red-800 text-white p-1">
      Jornal Estudantil Tiradentes © {year}
    </footer>
  )
}