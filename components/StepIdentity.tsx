"use client";

import { useMoveRequest } from "@/lib/store";

const inputClass =
  "mt-1 w-full rounded-lg border border-gray-300 px-3 py-2 focus:border-logilift-blue focus:outline-none focus:ring-1 focus:ring-logilift-blue";

export default function StepIdentity() {
  const { state, dispatch } = useMoveRequest();
  const { identity } = state;

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-logilift-blue">Vos coordonnées</h2>
      <p className="text-sm text-gray-500">
        Pour que Logilift puisse vous recontacter avec votre devis.
      </p>

      <div className="grid gap-4 sm:grid-cols-2">
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Prénom</span>
          <input
            className={inputClass}
            value={identity.firstName}
            onChange={(e) =>
              dispatch({ type: "SET_IDENTITY", payload: { firstName: e.target.value } })
            }
            placeholder="Marie"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Nom</span>
          <input
            className={inputClass}
            value={identity.lastName}
            onChange={(e) =>
              dispatch({ type: "SET_IDENTITY", payload: { lastName: e.target.value } })
            }
            placeholder="Dupont"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Email</span>
          <input
            type="email"
            className={inputClass}
            value={identity.email}
            onChange={(e) =>
              dispatch({ type: "SET_IDENTITY", payload: { email: e.target.value } })
            }
            placeholder="marie.dupont@email.fr"
          />
        </label>
        <label className="block">
          <span className="text-sm font-medium text-gray-700">Téléphone</span>
          <input
            type="tel"
            className={inputClass}
            value={identity.phone}
            onChange={(e) =>
              dispatch({ type: "SET_IDENTITY", payload: { phone: e.target.value } })
            }
            placeholder="06 12 34 56 78"
          />
        </label>
      </div>
    </div>
  );
}
