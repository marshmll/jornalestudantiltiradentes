import Menu from "@/components/infra/Menu";
import Link from "next/link";

export default function NotFound() {
  return (
    <>
      <Menu />
      <main className="flex flex-col items-center">
        <h1 className="text-[12rem] font-bold text-red-800 opacity-90 max-sm:text-[6rem]">404</h1>
        <span className="text-2xl text-red-800 opacity-90 mb-4">Algo saiu mal :(</span>
        <p className="mb-20">Desculpe pelo transtorno, vamos <Link href="/" className="font-bold text-red-800">começar do início?</Link></p>
      </main>
    </>
  );
}
