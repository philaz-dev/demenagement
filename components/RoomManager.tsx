"use client";

import { useState } from "react";
import { ROOM_PRESETS } from "@/lib/catalog";
import { useMoveRequest } from "@/lib/store";
import ItemPicker from "./ItemPicker";

export default function RoomManager() {
  const { state, dispatch } = useMoveRequest();
  const [openRoomId, setOpenRoomId] = useState<string | null>(null);

  const addRoom = (presetId: (typeof ROOM_PRESETS)[number]["id"], label: string) => {
    dispatch({ type: "ADD_ROOM", presetId, name: label });
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-bold text-logilift-blue">Vos pièces</h2>
        <p className="text-sm text-gray-500">
          Ajoutez les pièces de votre logement, puis listez les objets à déménager.
        </p>
      </div>

      {/* Boutons d'ajout de pièce */}
      <div className="flex flex-wrap gap-2">
        {ROOM_PRESETS.map((preset) => (
          <button
            key={preset.id}
            type="button"
            onClick={() => addRoom(preset.id, preset.label)}
            className="flex items-center gap-2 rounded-full border border-logilift-blue px-4 py-2 text-sm font-medium text-logilift-blue transition hover:bg-logilift-blue hover:text-white"
          >
            <span>{preset.icon}</span> + {preset.label}
          </button>
        ))}
      </div>

      {/* Liste des pièces créées */}
      {state.rooms.length === 0 ? (
        <p className="rounded-lg border border-dashed border-gray-300 p-6 text-center text-gray-400">
          Aucune pièce pour l&apos;instant. Ajoutez-en une ci-dessus pour commencer.
        </p>
      ) : (
        <div className="space-y-3">
          {state.rooms.map((room) => {
            const open = openRoomId === room.id;
            const itemCount = room.items.reduce((n, i) => n + i.quantity, 0);
            return (
              <div
                key={room.id}
                className="overflow-hidden rounded-xl border border-gray-200 bg-white"
              >
                <div className="flex items-center justify-between gap-2 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => setOpenRoomId(open ? null : room.id)}
                    className="flex flex-1 items-center gap-2 text-left"
                  >
                    <span className="text-xl">
                      {ROOM_PRESETS.find((p) => p.id === room.presetId)?.icon}
                    </span>
                    <input
                      value={room.name}
                      onClick={(e) => e.stopPropagation()}
                      onChange={(e) =>
                        dispatch({
                          type: "RENAME_ROOM",
                          roomId: room.id,
                          name: e.target.value,
                        })
                      }
                      className="rounded border border-transparent bg-transparent px-1 font-semibold text-gray-800 hover:border-gray-200 focus:border-logilift-blue focus:outline-none"
                    />
                    <span className="text-xs text-gray-400">
                      {itemCount} objet{itemCount > 1 ? "s" : ""}
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={() => setOpenRoomId(open ? null : room.id)}
                    className="rounded px-2 py-1 text-sm text-logilift-blue"
                  >
                    {open ? "Réduire ▲" : "Ajouter des objets ▼"}
                  </button>
                  <button
                    type="button"
                    aria-label="Supprimer la pièce"
                    onClick={() => dispatch({ type: "REMOVE_ROOM", roomId: room.id })}
                    className="rounded px-2 py-1 text-sm text-gray-400 transition hover:text-red-500"
                  >
                    🗑
                  </button>
                </div>

                {open && (
                  <div className="border-t border-gray-100 px-4 py-3">
                    <ItemPicker room={room} />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
