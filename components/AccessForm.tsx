"use client";

import { useMoveRequest } from "@/lib/store";
import type { AccessInfo } from "@/lib/types";

const inputClass =
  "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-logilift-blue focus:outline-none focus:ring-1 focus:ring-logilift-blue";

function AccessFields({ which, title }: { which: "departure" | "arrival"; title: string }) {
  const { state, dispatch } = useMoveRequest();
  const access = state[which];

  const set = (payload: Partial<AccessInfo>) =>
    dispatch({ type: "SET_ACCESS", which, payload });

  return (
    <div className="rounded-xl border border-gray-200 bg-white p-5">
      <h3 className="mb-3 font-bold text-logilift-blue">{title}</h3>

      <label className="block">
        <span className="text-sm font-medium text-gray-700">Adresse</span>
        <input
          className={inputClass}
          value={access.address}
          onChange={(e) => set({ address: e.target.value })}
          placeholder="12 rue des Lilas, 75011 Paris"
        />
      </label>

      <div className="mt-4 grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Étage</span>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={access.floor}
            onChange={(e) => set({ floor: Number(e.target.value) })}
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">
            Distance de portage (m)
          </span>
          <input
            type="number"
            min={0}
            className={inputClass}
            value={access.carryingDistance}
            onChange={(e) => set({ carryingDistance: Number(e.target.value) })}
          />
        </label>
      </div>

      <div className="mt-4 flex flex-wrap gap-6">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 accent-logilift-orange"
            checked={access.hasElevator}
            onChange={(e) => set({ hasElevator: e.target.checked })}
          />
          <span className="text-sm text-gray-700">Ascenseur</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            className="h-4 w-4 accent-logilift-orange"
            checked={access.hasStairs}
            onChange={(e) => set({ hasStairs: e.target.checked })}
          />
          <span className="text-sm text-gray-700">Escalier</span>
        </label>
      </div>
    </div>
  );
}

export default function AccessForm() {
  return (
    <div className="space-y-4">
      <div>
        <h2 className="text-xl font-bold text-logilift-blue">Adresses & accès</h2>
        <p className="text-sm text-gray-500">
          Ces informations permettent à Logilift de finaliser votre devis sans visite.
        </p>
      </div>
      <div className="grid gap-4 lg:grid-cols-2">
        <AccessFields which="departure" title="🚚 Départ" />
        <AccessFields which="arrival" title="🏁 Arrivée" />
      </div>
    </div>
  );
}
