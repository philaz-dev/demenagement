import type { Config } from "tailwindcss";

/**
 * Charte graphique Logilift, dérivée du logo (camion / avion / bateau).
 * - orange  : couleur primaire, boutons d'action (+ / Envoyer)
 * - blue    : bleu foncé du lettrage, titres et barres
 * - cyan    : bleu clair, accents et survols
 */
const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        logilift: {
          orange: "#F58220",
          "orange-dark": "#D96D10",
          blue: "#1C75BC",
          "blue-dark": "#155A91",
          cyan: "#29ABE2",
        },
      },
    },
  },
  plugins: [],
};

export default config;
