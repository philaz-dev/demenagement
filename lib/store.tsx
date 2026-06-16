"use client";

import {
  createContext,
  useContext,
  useEffect,
  useReducer,
  type ReactNode,
} from "react";
import type {
  AccessInfo,
  Identity,
  MoveRequest,
  Room,
  RoomPresetId,
} from "./types";
import { getRoomPreset } from "./catalog";

const STORAGE_KEY = "logilift-move-request";

const emptyAccess: AccessInfo = {
  address: "",
  floor: 0,
  hasElevator: false,
  hasStairs: false,
  carryingDistance: 0,
};

const initialState: MoveRequest = {
  identity: { firstName: "", lastName: "", email: "", phone: "" },
  rooms: [],
  departure: { ...emptyAccess },
  arrival: { ...emptyAccess },
};

type Action =
  | { type: "HYDRATE"; payload: MoveRequest }
  | { type: "SET_IDENTITY"; payload: Partial<Identity> }
  | { type: "ADD_ROOM"; presetId: RoomPresetId; name: string }
  | { type: "REMOVE_ROOM"; roomId: string }
  | { type: "RENAME_ROOM"; roomId: string; name: string }
  | { type: "INCREMENT_ITEM"; roomId: string; itemId: string }
  | { type: "DECREMENT_ITEM"; roomId: string; itemId: string }
  | { type: "SET_ACCESS"; which: "departure" | "arrival"; payload: Partial<AccessInfo> }
  | { type: "RESET" };

function genId(): string {
  return Math.random().toString(36).slice(2, 10);
}

function updateRoom(rooms: Room[], roomId: string, fn: (room: Room) => Room): Room[] {
  return rooms.map((room) => (room.id === roomId ? fn(room) : room));
}

function reducer(state: MoveRequest, action: Action): MoveRequest {
  switch (action.type) {
    case "HYDRATE":
      return action.payload;

    case "SET_IDENTITY":
      return { ...state, identity: { ...state.identity, ...action.payload } };

    case "ADD_ROOM": {
      const preset = getRoomPreset(action.presetId);
      const room: Room = {
        id: genId(),
        presetId: action.presetId,
        name: action.name || preset?.label || "Pièce",
        items: [],
      };
      return { ...state, rooms: [...state.rooms, room] };
    }

    case "REMOVE_ROOM":
      return { ...state, rooms: state.rooms.filter((r) => r.id !== action.roomId) };

    case "RENAME_ROOM":
      return {
        ...state,
        rooms: updateRoom(state.rooms, action.roomId, (room) => ({
          ...room,
          name: action.name,
        })),
      };

    case "INCREMENT_ITEM":
      return {
        ...state,
        rooms: updateRoom(state.rooms, action.roomId, (room) => {
          const existing = room.items.find((i) => i.itemId === action.itemId);
          if (existing) {
            return {
              ...room,
              items: room.items.map((i) =>
                i.itemId === action.itemId ? { ...i, quantity: i.quantity + 1 } : i
              ),
            };
          }
          return { ...room, items: [...room.items, { itemId: action.itemId, quantity: 1 }] };
        }),
      };

    case "DECREMENT_ITEM":
      return {
        ...state,
        rooms: updateRoom(state.rooms, action.roomId, (room) => ({
          ...room,
          items: room.items
            .map((i) =>
              i.itemId === action.itemId ? { ...i, quantity: i.quantity - 1 } : i
            )
            .filter((i) => i.quantity > 0),
        })),
      };

    case "SET_ACCESS":
      return {
        ...state,
        [action.which]: { ...state[action.which], ...action.payload },
      };

    case "RESET":
      return initialState;

    default:
      return state;
  }
}

interface StoreContextValue {
  state: MoveRequest;
  dispatch: React.Dispatch<Action>;
}

const StoreContext = createContext<StoreContextValue | null>(null);

export function MoveRequestProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(reducer, initialState);

  // Hydrate depuis localStorage au montage.
  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY);
      if (raw) {
        dispatch({ type: "HYDRATE", payload: JSON.parse(raw) as MoveRequest });
      }
    } catch {
      // localStorage indisponible ou JSON invalide : on ignore.
    }
  }, []);

  // Persiste à chaque changement.
  useEffect(() => {
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state));
    } catch {
      // ignore
    }
  }, [state]);

  return (
    <StoreContext.Provider value={{ state, dispatch }}>
      {children}
    </StoreContext.Provider>
  );
}

export function useMoveRequest(): StoreContextValue {
  const ctx = useContext(StoreContext);
  if (!ctx) {
    throw new Error("useMoveRequest doit être utilisé dans <MoveRequestProvider>");
  }
  return ctx;
}

export function clearStoredRequest(): void {
  try {
    window.localStorage.removeItem(STORAGE_KEY);
  } catch {
    // ignore
  }
}
