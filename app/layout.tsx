import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

export const metadata: Metadata = {
  title: "Logilift — Estimez votre déménagement en ligne",
  description:
    "Préparez votre devis de déménagement en quelques minutes : créez vos pièces, ajoutez vos meubles, obtenez votre volume. Le transit qui fait avancer vos affaires.",
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="fr">
      <body>
        <Header />
        <main className="mx-auto max-w-5xl px-4 py-8">{children}</main>
        <footer className="mt-12 border-t border-gray-200 bg-white py-6 text-center text-sm text-gray-500">
          Logilift — Le transit qui fait avancer vos affaires
        </footer>
      </body>
    </html>
  );
}
