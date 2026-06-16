// Types partagés entre le store client et l'API.

/** Un objet du catalogue dont on connaît le volume. */
export interface CatalogItem {
  id: string;
  label: string;
  /** Volume unitaire en m³. */
  volume: number;
  /** Emoji/icone pour l'affichage. */
  icon: string;
  /** Identifiants des pièces où proposer cet objet par défaut. */
  rooms: RoomPresetId[];
}

/** Identifiants des pièces proposées par défaut. */
export type RoomPresetId =
  | "salon"
  | "cuisine"
  | "chambre"
  | "salle-de-bain"
  | "bureau"
  | "garage"
  | "autre";

/** Modèle de pièce proposé au client. */
export interface RoomPreset {
  id: RoomPresetId;
  label: string;
  icon: string;
}

/** Un objet ajouté dans une pièce, avec sa quantité. */
export interface RoomItem {
  /** Référence vers CatalogItem.id. */
  itemId: string;
  quantity: number;
}

/** Une pièce créée par le client. */
export interface Room {
  /** Identifiant unique de l'instance de pièce. */
  id: string;
  /** Modèle d'origine (pour proposer les bons objets). */
  presetId: RoomPresetId;
  /** Nom affiché (modifiable, ex. « Chambre des enfants »). */
  name: string;
  items: RoomItem[];
}

/** Informations d'accès d'une adresse. */
export interface AccessInfo {
  address: string;
  floor: number;
  hasElevator: boolean;
  hasStairs: boolean;
  /** Distance de portage estimée (m) entre le camion et la porte. */
  carryingDistance: number;
}

/** Coordonnées du client. */
export interface Identity {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
}

/** Demande de déménagement complète envoyée à la société. */
export interface MoveRequest {
  identity: Identity;
  rooms: Room[];
  departure: AccessInfo;
  arrival: AccessInfo;
}
