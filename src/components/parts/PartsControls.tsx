import { useCallback } from "react";
import { STARTER_PARTS } from "../../lib/parts";
import FlatButton from "../ui/FlatButton";
import { StateSetter } from "../../lib/react";

type PartsControlsProps = {
  setParts: StateSetter<readonly string[]>;
};

export default function PartsControls({ setParts }: PartsControlsProps) {
  const uncheckAllParts = useCallback(() => {
    const confirmed = confirm('Are you sure you want to clear all parts?');
    if (confirmed) setParts([]);
  }, [setParts]);

  const checkStarterParts = useCallback((label: string, factionParts?: readonly string[]) => {
    const confirmed = confirm(
      `Are you sure you want to check all parts for the ${label}?`
        + ` (Currently checked parts will remain checked)`,
    );

    if (!confirmed) return;

    const starterParts = STARTER_PARTS['*'];

    if (factionParts !== undefined) {
      starterParts.push(...factionParts);
    }

    setParts((prevParts) => [...new Set([...prevParts, ...starterParts])]);
  }, [setParts]);

  return (
    <div className="flex flex-col space-y-1 py-2">
      <button
        className="grow text-sm text-slate-600 bg-slate-200 hover:bg-slate-300
          rounded px-2 py-1"
        onClick={uncheckAllParts}
      >
        Uncheck all parts
      </button>
      <div className="flex flex-col sm:flex-row">
        <div className="self-center text-sm mr-2">Check starter parts:</div>
        <div className="grow grid grid-cols-4 gap-x-2">
          <FlatButton onClick={() => checkStarterParts('common factions')}>
            Common
          </FlatButton>
          <FlatButton onClick={() => checkStarterParts('Leons', STARTER_PARTS['Leons'])}>
            Leons
          </FlatButton>
          <FlatButton onClick={() => checkStarterParts('Minos', STARTER_PARTS['Minos'])}>
            Minos
          </FlatButton>
          <FlatButton onClick={() => checkStarterParts('Tramplers', STARTER_PARTS['Tramplers'])}>
            Tramplers
          </FlatButton>
        </div>
      </div>
    </div>
  );
}
