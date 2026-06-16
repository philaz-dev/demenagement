"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useMoveRequest } from "@/lib/store";
import { computeTotalVolume, formatVolume } from "@/lib/volume";
import { getCatalogItem } from "@/lib/catalog";
import type { AccessInfo } from "@/lib/types";

function AccessRecap({ access, title }: { access: AccessInfo; title: string }) {
  return (
    <div className="rounded-lg border border-gray-200 p-4">
      <div className="font-semibold text-logilift-blue">{title}</div>
      <div className="mt-1 text-sm text-gray-700">{access.address || "—"}</div>
      <div className="mt-1 text-sm text-gray-500">
        Étage {access.floor} · {access.hasElevator ? "Ascenseur" : "Sans ascenseur"} ·{" "}
        {access.hasStairs ? "Escalier" : "Sans escalier"} · Portage{" "}
        {access.carryingDistance} m
      </div>
    </div>
  );
}

export default function ReviewSubmit() {
  const { state } = useMoveRequest();
  const router = useRouter();
  const [status, setStatus] = useState<"idle" | "sending" | "error">("idle");

  const total = computeTotalVolume(state.rooms);

  const submit = async () => {
    setStatus("sending");
    try {
      const res = await fetch("/api/quotes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...state, totalVolume: total }),
      });
      if (!res.ok) throw new Error("Échec de l'envoi");
      router.push("/devis/confirmation");
    } catch {
      setStatus("error");
    }
  };

  return (
    <div className="space-y-5">
      <div>
        <h2 className="text-xl font-bold text-logilift-blue">Validation</h2>
        <p className="text-sm text-gray-500">
          Vérifiez votre demande puis envoyez-la à Logilift.
        </p>
      </div>

      {/* Identité */}
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="font-semibold text-logilift-blue">Coordonnées</div>
        <div className="mt-1 text-sm text-gray-700">
          {state.identity.firstName} {state.identity.lastName}
        </div>
        <div className="text-sm text-gray-500">
          {state.identity.email} · {state.identity.phone}
        </div>
      </div>

      {/* Volume + détail objets */}
      <div className="rounded-lg border border-gray-200 p-4">
        <div className="flex items-center justify-between">
          <span className="font-semibold text-logilift-blue">Volume total</span>
          <span className="text-lg font-extrabold text-logilift-orange">
            {formatVolume(total)}
          </span>
        </div>
        <ul className="mt-3 space-y-3">
          {state.rooms.map((room) => (
            <li key={room.id}>
              <div className="text-sm font-medium text-gray-700">{room.name}</div>
              <ul className="ml-4 text-sm text-gray-500">
                {room.items.length === 0 && <li>Aucun objet</li>}
                {room.items.map((ri) => {
                  const item = getCatalogItem(ri.itemId);
                  if (!item) return null;
                  return (
                    <li key={ri.itemId}>
                      {ri.quantity} × {item.label}
                    </li>
                  );
                })}
              </ul>
            </li>
          ))}
        </ul>
      </div>

      {/* Accès */}
      <div className="grid gap-4 sm:grid-cols-2">
        <AccessRecap access={state.departure} title="Départ" />
        <AccessRecap access={state.arrival} title="Arrivée" />
      </div>

      {status === "error" && (
        <p className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-600">
          Une erreur est survenue lors de l&apos;envoi. Merci de réessayer.
        </p>
      )}

      <button
        type="button"
        onClick={submit}
        disabled={status === "sending"}
        className="w-full rounded-full bg-logilift-orange px-6 py-3 text-lg font-semibold text-white transition hover:bg-logilift-orange-dark disabled:opacity-60"
      >
        {status === "sending" ? "Envoi en cours…" : "Envoyer ma demande à Logilift"}
      </button>
    </div>
  );
}
