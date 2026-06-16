import Image from "next/image";
import Link from "next/link";

export default function Header() {
  return (
    <header className="border-b border-gray-200 bg-white">
      <div className="mx-auto flex max-w-5xl items-center justify-between px-4 py-3">
        <Link href="/" className="flex items-center gap-3">
          <Image
            src="/Logo_Logilift.png"
            alt="Logilift — Le transit qui fait avancer vos affaires"
            width={210}
            height={140}
            priority
            className="h-20 w-auto"
          />
        </Link>
        <Link
          href="/devis"
          className="hidden rounded-full bg-logilift-orange px-5 py-2 text-sm font-semibold text-white transition hover:bg-logilift-orange-dark sm:inline-block"
        >
          Estimer mon déménagement
        </Link>
      </div>
    </header>
  );
}
