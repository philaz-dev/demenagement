"use client";

import { computeRoomVolume, computeTotalVolume, formatVolume } from "@/lib/volume";
import { useMoveRequest } from "@/lib/store";

export default function VolumeSummary({ compact = false }: { compact?: boolean }) {
  const { state } = useMoveRequest();
  const total = computeTotalVolume(state.rooms);

  if (compact) {
    return (
      <div className="rounded-xl bg-logilift-blue px-4 py-3 text-center text-white">
        <div className="text-xs uppercase tracking-wide text-white/80">
          Volume estimé
        </div>
        <div className="text-2xl font-extrabold">{formatVolume(total)}</div>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      <h2 className="text-xl font-bold text-logilift-blue">Votre volume estimé</h2>

      <div className="rounded-2xl bg-gradient-to-r from-logilift-blue to-logilift-cyan p-6 text-center text-white">
        <div className="text-sm uppercase tracking-wide text-white/80">
          Volume total à déménager
        </div>
        <div className="mt-1 text-5xl font-extrabold">{formatVolume(total)}</div>
      </div>

      {state.rooms.length > 0 && (
        <ul className="divide-y divide-gray-100 rounded-xl border border-gray-200 bg-white">
          {state.rooms.map((room) => (
            <li key={room.id} className="flex justify-between px-4 py-3">
              <span className="font-medium text-gray-700">{room.name}</span>
              <span className="font-semibold text-logilift-blue">
                {formatVolume(computeRoomVolume(room))}
              </span>
            </li>
          ))}
        </ul>
      )}

      <p className="text-sm text-gray-500">
        Cette estimation est calculée à partir des volumes moyens de vos objets.
        Vous pourrez l&apos;ajuster avec Logilift lors de la validation du devis.
      </p>
    </div>
  );
}
