import { createContext } from "react";

export type ShowInfo = {
  showPart: (part: string) => void;
  clear: () => void;
};

export const ShowInfoContext = createContext<ShowInfo | null>(null);
