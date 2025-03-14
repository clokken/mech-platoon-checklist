import { FACTION_NAMES, FactionName, isFactionName } from "../../lib/factions";

export function FactionSelect({
  faction,
  setFaction,
}: {
  faction: FactionName | undefined;
  setFaction: (faction: FactionName) => void;
}) {
  return (
    <div className="flex items-center">
      <span className="font-semibold mr-2">Player Faction:</span>
      <select
        className="border border-neutral-300 rounded-sm px-1.5 py-0.5"
        value={faction}
        onChange={(ev) => {
          const value = ev.target.value;
          if (isFactionName(value)) setFaction(value);
        }}
      >
        {FACTION_NAMES.map((factionName) => (
          <option
            key={factionName}
            value={factionName}
          >
            {factionName}
          </option>
        ))}
      </select>
    </div>
  );
}
