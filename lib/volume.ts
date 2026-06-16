import { getCatalogItem } from "./catalog";
import type { Room } from "./types";

/** Volume total d'une pièce : Σ (volume unitaire × quantité). */
export function computeRoomVolume(room: Room): number {
  return room.items.reduce((sum, roomItem) => {
    const item = getCatalogItem(roomItem.itemId);
    if (!item) return sum;
    return sum + item.volume * roomItem.quantity;
  }, 0);
}

/** Volume total du déménagement, toutes pièces confondues. */
export function computeTotalVolume(rooms: Room[]): number {
  return rooms.reduce((sum, room) => sum + computeRoomVolume(room), 0);
}

/** Arrondit un volume à 2 décimales pour l'affichage. */
export function formatVolume(volume: number): string {
  return `${volume.toFixed(2).replace(".", ",")} m³`;
}
