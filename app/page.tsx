import Link from "next/link";

const STEPS = [
  { icon: "📝", title: "Vos coordonnées", text: "Nom, prénom et contact." },
  { icon: "🏠", title: "Vos pièces", text: "Créez salon, cuisine, chambres…" },
  { icon: "➕", title: "Vos objets", text: "Ajoutez vos meubles d'un simple +." },
  { icon: "📦", title: "Votre volume", text: "Le volume en m³ se calcule tout seul." },
  { icon: "✅", title: "Validation", text: "Adresses, accès, et c'est envoyé." },
];

export default function HomePage() {
  return (
    <div className="space-y-12">
      <section className="rounded-2xl bg-gradient-to-r from-logilift-blue to-logilift-cyan px-6 py-12 text-center text-white sm:px-12">
        <h1 className="text-3xl font-extrabold sm:text-4xl">
          Estimez votre déménagement en quelques minutes
        </h1>
        <p className="mx-auto mt-4 max-w-2xl text-lg text-white/90">
          Créez vos pièces, ajoutez vos meubles d&apos;un simple clic et obtenez
          votre volume immédiatement. Plus besoin d&apos;attendre une visite : votre
          devis est déjà presque prêt.
        </p>
        <Link
          href="/devis"
          className="mt-8 inline-block rounded-full bg-logilift-orange px-8 py-3 text-lg font-semibold text-white shadow-lg transition hover:bg-logilift-orange-dark"
        >
          Démarrer mon estimation
        </Link>
      </section>

      <section>
        <h2 className="text-center text-2xl font-bold text-logilift-blue">
          Comment ça marche ?
        </h2>
        <ol className="mt-8 grid gap-4 sm:grid-cols-3 lg:grid-cols-5">
          {STEPS.map((step, i) => (
            <li
              key={step.title}
              className="rounded-xl border border-gray-200 bg-white p-5 text-center"
            >
              <div className="mb-2 text-3xl">{step.icon}</div>
              <div className="text-sm font-semibold text-logilift-orange">
                Étape {i + 1}
              </div>
              <h3 className="mt-1 font-bold text-gray-900">{step.title}</h3>
              <p className="mt-1 text-sm text-gray-500">{step.text}</p>
            </li>
          ))}
        </ol>
      </section>
    </div>
  );
}
