import Link from "next/link";

export default function ConfirmationPage() {
  return (
    <div className="mx-auto max-w-xl py-12 text-center">
      <div className="mx-auto mb-6 flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-4xl">
        ✅
      </div>
      <h1 className="text-2xl font-extrabold text-logilift-blue">
        Votre demande a bien été envoyée !
      </h1>
      <p className="mt-3 text-gray-600">
        Merci d&apos;avoir préparé votre déménagement avec Logilift. Notre équipe
        étudie votre estimation et vous recontacte très vite avec votre devis
        détaillé — sans visite préalable.
      </p>
      <Link
        href="/"
        className="mt-8 inline-block rounded-full bg-logilift-orange px-6 py-3 font-semibold text-white transition hover:bg-logilift-orange-dark"
      >
        Retour à l&apos;accueil
      </Link>
    </div>
  );
}
