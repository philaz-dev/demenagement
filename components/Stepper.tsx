"use client";

export const STEP_LABELS = [
  "Coordonnées",
  "Pièces & objets",
  "Volume",
  "Adresses & accès",
  "Validation",
];

export default function Stepper({ current }: { current: number }) {
  return (
    <ol className="mb-8 flex flex-wrap items-center gap-2">
      {STEP_LABELS.map((label, i) => {
        const done = i < current;
        const active = i === current;
        return (
          <li key={label} className="flex items-center gap-2">
            <div
              className={[
                "flex h-8 w-8 items-center justify-center rounded-full text-sm font-bold",
                active
                  ? "bg-logilift-orange text-white"
                  : done
                  ? "bg-logilift-blue text-white"
                  : "bg-gray-200 text-gray-500",
              ].join(" ")}
            >
              {done ? "✓" : i + 1}
            </div>
            <span
              className={[
                "hidden text-sm sm:inline",
                active ? "font-semibold text-logilift-blue" : "text-gray-500",
              ].join(" ")}
            >
              {label}
            </span>
            {i < STEP_LABELS.length - 1 && (
              <span className="mx-1 hidden h-px w-6 bg-gray-300 sm:inline-block" />
            )}
          </li>
        );
      })}
    </ol>
  );
}
