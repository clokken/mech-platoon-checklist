import { Fragment, useEffect, useState } from "react";
import { FACTION_PLANETS, FactionName } from "../../lib/factions";
import { FactionSelect } from "./FactionSelect";
import { getPlanetInfo, MissionInfo } from "../../lib/missions";
import PartCheckbox from "../parts/PartCheckbox";
import { localStoragePersistenceService } from "../../lib/services/persistence-service";

type MissionsDisplayProps = {
  partsDone: readonly string[];
  togglePart: (part: string) => void;
};

export default function MissionsDisplay({ partsDone, togglePart }: MissionsDisplayProps) {
  const [faction, setFaction] = useState<FactionName>(
    localStoragePersistenceService.load('faction') || 'Leons'
  );

  // TODO put elsewhere?
  useEffect(() => {
    localStoragePersistenceService.save('faction', faction);
  }, [faction]);

  return (
    <div>
      <div className="mb-4">
        <FactionSelect
          faction={faction}
          setFaction={setFaction}
        />
      </div>

      {faction !== undefined && (
        <div className="space-y-4">
          {FACTION_PLANETS[faction].map((planet, index) => (
            <PlanetMissions
              key={planet}
              index={index + 1}
              planet={planet}
              faction={faction}
              partsDone={partsDone}
              togglePart={togglePart}
            />
          ))}
        </div>
      )}
    </div>
  );
}

function PlanetMissions({
  index,
  planet,
  faction,
  partsDone,
  togglePart,
}: {
  index: number;
  planet: string;
  faction: FactionName;
  partsDone: readonly string[];
  togglePart: (part: string) => void;
}) {
  const info = getPlanetInfo(planet);

  if (info === undefined) {
    return 'Unknown planet: ' + planet;
  }

  return (
    <div className="bg-neutral-100 rounded">
      <div
        className="text-sm font-semibold flex justify-between border-b border-neutral-200
          px-3 py-1.5"
      >
        <div>
          <span
            className="text-neutral-500"
          >#{index}</span>{' '}
          <span className="text-neutral-500">Planet:</span>{' '}
          <span>{planet}</span>
        </div>
        <div className="pl-2">
          <span className="text-neutral-500">Opposition:</span>{' '}
          <span>{info.opposition}</span>
        </div>
      </div>
      {/* <div className="font-semibold">Missions:</div> */}
      <div className="space-y-3 px-4 py-2 sm:max-w-[50vw] md:max-w-[35vw]">
        {info.missions.map((mission, missionIdx, arr) => {
          if (mission.faction !== undefined && mission.faction !== faction) {
            return null;
          }

          const isLast = missionIdx === arr.length - 1;

          return (
            <Fragment key={missionIdx}>
              <div>
                <div>
                  <span className="font-mono">{mission.order + ')'}</span>{' '}
                  <span className="font-semibold">{mission.name}</span>
                  {mission.faction !== undefined && (
                    <span className="text-sm text-neutral-500">{' '}({mission.faction} campaign)</span>
                  )}
                </div>

                <MissionParts
                  missionParts={mission.parts}
                  partsDone={partsDone}
                  togglePart={togglePart}
                />

                {mission.notes && (
                  <div className="text-xs text-neutral-600">
                    Notes: {mission.notes}
                  </div>
                )}
              </div>
              {!isLast && (
                <div>
                  <hr className="border-dashed border-neutral-300" />
                </div>
              )}
            </Fragment>
          );
        })}
      </div>
    </div>
  );
}

function MissionParts({
  missionParts,
  partsDone,
  togglePart,
}: {
  missionParts: MissionInfo['parts'];
  partsDone: readonly string[];
  togglePart: (part: string) => void;
}) {
  if (missionParts === '*') {
    return (
      <span className="text-sm italic text-neutral-600 px-2">{'(Almost all opposition parts)'}</span>
    );
  }

  if (missionParts.length === 0) {
    return (
      <span className="text-sm italic text-neutral-600 px-2">{'(Empty)'}</span>
    );
  }

  return (
    <div className="flex flex-wrap space-x-2">
      {missionParts.map((missionPart, index) => {
        const isDone = partsDone.includes(missionPart);

        return (
          <PartCheckbox
            key={index}
            part={missionPart}
            isChecked={isDone}
            togglePart={togglePart}
          />
        );
      })}
    </div>
  );
}
