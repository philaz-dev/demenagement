import { NextResponse } from "next/server";
import { getCatalogItem } from "@/lib/catalog";
import type { MoveRequest } from "@/lib/types";

interface QuotePayload extends MoveRequest {
  totalVolume: number;
}

/** Construit un résumé texte lisible de la demande (pour l'email / les logs). */
function buildSummary(data: QuotePayload): string {
  const { identity, rooms, departure, arrival, totalVolume } = data;
  const lines: string[] = [];
  lines.push(`Nouvelle demande de devis Logilift`);
  lines.push(`Client : ${identity.firstName} ${identity.lastName}`);
  lines.push(`Contact : ${identity.email} · ${identity.phone}`);
  lines.push(`Volume total estimé : ${totalVolume.toFixed(2)} m³`);
  lines.push("");
  lines.push("Détail par pièce :");
  for (const room of rooms) {
    lines.push(`- ${room.name}`);
    for (const ri of room.items) {
      const item = getCatalogItem(ri.itemId);
      if (item) lines.push(`    ${ri.quantity} × ${item.label}`);
    }
  }
  lines.push("");
  lines.push(
    `Départ : ${departure.address} (étage ${departure.floor}, ${
      departure.hasElevator ? "ascenseur" : "sans ascenseur"
    }, portage ${departure.carryingDistance} m)`
  );
  lines.push(
    `Arrivée : ${arrival.address} (étage ${arrival.floor}, ${
      arrival.hasElevator ? "ascenseur" : "sans ascenseur"
    }, portage ${arrival.carryingDistance} m)`
  );
  return lines.join("\n");
}

/** Envoie l'email via Resend si configuré. Retourne true si envoyé. */
async function sendEmail(summary: string, data: QuotePayload): Promise<boolean> {
  const apiKey = process.env.RESEND_API_KEY;
  const to = process.env.COMPANY_EMAIL;
  const from = process.env.FROM_EMAIL;
  if (!apiKey || !to || !from) return false;

  const res = await fetch("https://api.resend.com/emails", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${apiKey}`,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      from,
      to,
      reply_to: data.identity.email,
      subject: `Devis déménagement — ${data.identity.firstName} ${data.identity.lastName} (${data.totalVolume.toFixed(
        1
      )} m³)`,
      text: summary,
    }),
  });
  return res.ok;
}

export async function POST(request: Request) {
  let data: QuotePayload;
  try {
    data = (await request.json()) as QuotePayload;
  } catch {
    return NextResponse.json({ error: "Corps de requête invalide." }, { status: 400 });
  }

  if (!data.identity?.email || !Array.isArray(data.rooms)) {
    return NextResponse.json({ error: "Données incomplètes." }, { status: 422 });
  }

  const summary = buildSummary(data);
  let emailed = false;
  try {
    emailed = await sendEmail(summary, data);
  } catch (err) {
    console.error("Logilift — échec de l'envoi de l'email :", err);
  }

  if (!emailed) {
    // Email non configuré ou en échec : on journalise pour ne rien perdre.
    console.log("Logilift — demande de devis reçue :\n" + summary);
  }

  return NextResponse.json({ ok: true, emailed });
}
