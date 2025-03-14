import React, { useMemo, useState } from 'react';
import { ShowInfoContext } from "./ShowInfoContext";
import { createPortal } from "react-dom";
import PartInfoModalContent from "../parts/PartInfoModalContent";
import Modal from "../ui/Modal";

type ShowInfoContextProviderProps = {
  children: React.ReactNode;
};

export default function ShowInfoContextProvider({ children }: ShowInfoContextProviderProps) {
  const [currentPart, setCurrentPart] = useState<string>();

  return (
    <ShowInfoContext.Provider value={useMemo(() => ({
      showPart: setCurrentPart,
      clear: () => setCurrentPart(undefined),
    }), [])}>
      {children}
      {currentPart !== undefined && createPortal(
        <Modal close={() => setCurrentPart(undefined)}>
          <PartInfoModalContent part={currentPart} />
        </Modal>,
        document.body,
      )}
    </ShowInfoContext.Provider>
  );
}
