"use client";

import { getItemsForRoom } from "@/lib/catalog";
import { computeRoomVolume, formatVolume } from "@/lib/volume";
import { useMoveRequest } from "@/lib/store";
import type { Room } from "@/lib/types";

export default function ItemPicker({ room }: { room: Room }) {
  const { dispatch } = useMoveRequest();
  const items = getItemsForRoom(room.presetId);

  const quantityOf = (itemId: string) =>
    room.items.find((i) => i.itemId === itemId)?.quantity ?? 0;

  return (
    <div>
      <ul className="divide-y divide-gray-100">
        {items.map((item) => {
          const qty = quantityOf(item.id);
          return (
            <li key={item.id} className="flex items-center justify-between py-2">
              <div className="flex items-center gap-3">
                <span className="text-2xl">{item.icon}</span>
                <div>
                  <div className="font-medium text-gray-800">{item.label}</div>
                  <div className="text-xs text-gray-400">
                    {formatVolume(item.volume)}
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  aria-label={`Retirer un(e) ${item.label}`}
                  disabled={qty === 0}
                  onClick={() =>
                    dispatch({ type: "DECREMENT_ITEM", roomId: room.id, itemId: item.id })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-300 text-lg font-bold text-gray-600 transition hover:border-logilift-blue hover:text-logilift-blue disabled:cursor-not-allowed disabled:opacity-30"
                >
                  −
                </button>
                <span className="w-6 text-center font-semibold tabular-nums">
                  {qty}
                </span>
                <button
                  type="button"
                  aria-label={`Ajouter un(e) ${item.label}`}
                  onClick={() =>
                    dispatch({ type: "INCREMENT_ITEM", roomId: room.id, itemId: item.id })
                  }
                  className="flex h-8 w-8 items-center justify-center rounded-full bg-logilift-orange text-lg font-bold text-white transition hover:bg-logilift-orange-dark"
                >
                  +
                </button>
              </div>
            </li>
          );
        })}
      </ul>

      <div className="mt-3 text-right text-sm font-semibold text-logilift-blue">
        Volume de la pièce : {formatVolume(computeRoomVolume(room))}
      </div>
    </div>
  );
}
