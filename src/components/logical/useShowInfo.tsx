import { useContext } from "react";
import { ShowInfoContext } from "./ShowInfoContext";

export function useShowInfo() {
  const showInfo = useContext(ShowInfoContext);
  if (showInfo === null) throw new Error(`No ShowInfoContextProvider in component tree.`);
  return showInfo;
}
