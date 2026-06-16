import type { CatalogItem, RoomPreset, RoomPresetId } from "./types";

// Source de vérité unique des volumes (m³). Valeurs de référence issues des
// barèmes standards des déménageurs. Ne jamais coder un volume en dur ailleurs.

export const ROOM_PRESETS: RoomPreset[] = [
  { id: "salon", label: "Salon / Séjour", icon: "🛋️" },
  { id: "cuisine", label: "Cuisine", icon: "🍽️" },
  { id: "chambre", label: "Chambre", icon: "🛏️" },
  { id: "salle-de-bain", label: "Salle de bain", icon: "🛁" },
  { id: "bureau", label: "Bureau", icon: "💼" },
  { id: "garage", label: "Garage / Cave", icon: "🧰" },
  { id: "autre", label: "Autre pièce", icon: "📦" },
];

export const CATALOG: CatalogItem[] = [
  // --- Salon / Séjour ---
  { id: "canape-2", label: "Canapé 2 places", volume: 1.5, icon: "🛋️", rooms: ["salon"] },
  { id: "canape-3", label: "Canapé 3 places", volume: 2.0, icon: "🛋️", rooms: ["salon"] },
  { id: "canape-angle", label: "Canapé d'angle", volume: 2.8, icon: "🛋️", rooms: ["salon"] },
  { id: "fauteuil", label: "Fauteuil", volume: 0.5, icon: "🪑", rooms: ["salon", "bureau"] },
  { id: "table-basse", label: "Table basse", volume: 0.4, icon: "🪵", rooms: ["salon"] },
  { id: "meuble-tv", label: "Meuble TV", volume: 0.6, icon: "📺", rooms: ["salon"] },
  { id: "television", label: "Télévision", volume: 0.3, icon: "📺", rooms: ["salon", "chambre"] },
  { id: "bibliotheque", label: "Bibliothèque", volume: 1.2, icon: "📚", rooms: ["salon", "bureau"] },
  { id: "buffet", label: "Buffet / Vaisselier", volume: 1.3, icon: "🗄️", rooms: ["salon", "cuisine"] },

  // --- Cuisine ---
  { id: "refrigerateur", label: "Réfrigérateur", volume: 1.2, icon: "🧊", rooms: ["cuisine"] },
  { id: "congelateur", label: "Congélateur", volume: 1.0, icon: "🧊", rooms: ["cuisine", "garage"] },
  { id: "lave-vaisselle", label: "Lave-vaisselle", volume: 0.6, icon: "🍽️", rooms: ["cuisine"] },
  { id: "cuisiniere", label: "Cuisinière / Four", volume: 0.7, icon: "🔥", rooms: ["cuisine"] },
  { id: "table-cuisine", label: "Table de cuisine", volume: 0.6, icon: "🍽️", rooms: ["cuisine"] },
  { id: "chaise", label: "Chaise", volume: 0.35, icon: "🪑", rooms: ["cuisine", "salon", "bureau"] },
  { id: "meuble-cuisine", label: "Meuble de cuisine", volume: 0.8, icon: "🗄️", rooms: ["cuisine"] },

  // --- Chambre ---
  { id: "lit-simple", label: "Lit simple", volume: 1.3, icon: "🛏️", rooms: ["chambre"] },
  { id: "lit-double", label: "Lit double", volume: 2.0, icon: "🛏️", rooms: ["chambre"] },
  { id: "matelas", label: "Matelas", volume: 0.7, icon: "🛏️", rooms: ["chambre"] },
  { id: "armoire-2p", label: "Armoire 2 portes", volume: 1.5, icon: "🚪", rooms: ["chambre"] },
  { id: "armoire-3p", label: "Armoire 3 portes", volume: 2.2, icon: "🚪", rooms: ["chambre"] },
  { id: "commode", label: "Commode", volume: 0.7, icon: "🗄️", rooms: ["chambre"] },
  { id: "table-nuit", label: "Table de nuit", volume: 0.2, icon: "🛏️", rooms: ["chambre"] },

  // --- Salle de bain ---
  { id: "lave-linge", label: "Lave-linge", volume: 0.8, icon: "🧺", rooms: ["salle-de-bain", "cuisine"] },
  { id: "seche-linge", label: "Sèche-linge", volume: 0.8, icon: "🧺", rooms: ["salle-de-bain", "cuisine"] },
  { id: "meuble-sdb", label: "Meuble de salle de bain", volume: 0.5, icon: "🚿", rooms: ["salle-de-bain"] },

  // --- Bureau ---
  { id: "bureau-meuble", label: "Bureau", volume: 0.9, icon: "💼", rooms: ["bureau"] },
  { id: "chaise-bureau", label: "Chaise de bureau", volume: 0.4, icon: "🪑", rooms: ["bureau"] },
  { id: "caisson", label: "Caisson / Rangement", volume: 0.4, icon: "🗄️", rooms: ["bureau"] },
  { id: "ordinateur", label: "Ordinateur / Écran", volume: 0.2, icon: "💻", rooms: ["bureau"] },

  // --- Garage / Cave ---
  { id: "velo", label: "Vélo", volume: 0.5, icon: "🚲", rooms: ["garage"] },
  { id: "etabli", label: "Établi", volume: 1.0, icon: "🧰", rooms: ["garage"] },
  { id: "etagere", label: "Étagère", volume: 0.6, icon: "🗄️", rooms: ["garage", "salon", "bureau"] },
  { id: "barbecue", label: "Barbecue", volume: 0.5, icon: "🔥", rooms: ["garage"] },
  { id: "tondeuse", label: "Tondeuse", volume: 0.4, icon: "🌱", rooms: ["garage"] },

  // --- Cartons (toutes pièces) ---
  { id: "carton-standard", label: "Carton standard", volume: 0.1, icon: "📦", rooms: ["salon", "cuisine", "chambre", "salle-de-bain", "bureau", "garage", "autre"] },
  { id: "carton-livres", label: "Carton à livres", volume: 0.06, icon: "📦", rooms: ["salon", "bureau", "chambre", "autre"] },
  { id: "carton-penderie", label: "Carton penderie", volume: 0.25, icon: "📦", rooms: ["chambre", "autre"] },
];

const CATALOG_BY_ID = new Map(CATALOG.map((item) => [item.id, item]));

/** Retourne un objet du catalogue par son identifiant. */
export function getCatalogItem(id: string): CatalogItem | undefined {
  return CATALOG_BY_ID.get(id);
}

/** Retourne les objets proposés pour un type de pièce donné. */
export function getItemsForRoom(presetId: RoomPresetId): CatalogItem[] {
  return CATALOG.filter((item) => item.rooms.includes(presetId));
}

/** Retourne le modèle de pièce correspondant à un identifiant. */
export function getRoomPreset(id: RoomPresetId): RoomPreset | undefined {
  return ROOM_PRESETS.find((preset) => preset.id === id);
}
