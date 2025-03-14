import { Fragment } from "react/jsx-runtime";
import { ALL_PLANETS, PlanetInfo } from "../../lib/missions";
import { UnitInfo, UNITS } from "../../lib/units";
import { PARTS } from "../../lib/parts";

type PartInfoModalContentProps = {
  part: string;
  close: () => void;
};

export default function PartInfoModalContent({ part, close }: PartInfoModalContentProps) {
  const units = UNITS.filter((unit) => unit.parts.includes(part));

  const planets = ALL_PLANETS
    .map((planet) => {
      const missions = planet.missions.filter((mission) => {
        return mission.parts !== '*' && mission.parts.includes(part);
      });

      if (missions.length === 0) {
        return null;
      }

      return {
        ...planet,
        missions,
      } satisfies typeof planet;
    })
    .filter((planet) => planet !== null);

  return (
    <div className="flex justify-center items-center w-full h-full overflow-auto relative">
      <div
        className="bg-white rounded shadow px-6 py-4 relative"
        onClick={(ev) => ev.stopPropagation()}
      >
        <div className="text-center">
          {/* <div className="font-bold text-sm text-blue-700">Part:</div>
          <div className="text-lg">{part}</div> */}
          <span className="font-semibold text-blue-700">Part:</span>{' '}
          <span className="underline">{part}</span>
        </div>

        <div className="border-b border-slate-200 my-4" />

        <div className="flex flex-col items-center">
          <div className="font-bold text-blue-700 mb-1.5">Units:</div>
          <div className="flex flex-wrap gap-4">
            {units.map((unit, index) => (
              <UnitInfoDiv
                key={index}
                unit={unit}
                part={part}
              />
            ))}
          </div>
        </div>

        <div className="border-b border-slate-200 my-4" />

        <div className="flex flex-col items-center">
          <div className="font-bold text-blue-700 mb-1.5">Missions:</div>
          {planets.length === 0 && <span className="text-neutral-500">{'(No mission found)'}</span>}
          <div className="space-y-4">
            {planets.map((planet, index) => (
              <PlanetInfoDiv
                key={index}
                planet={planet}
                part={part}
              />
            ))}
          </div>
        </div>

        <div className="md:hidden absolute top-0 right-0 flex justify-end">
          <button
            className="px-2 py-1"
            onClick={close}
          >
            (X)
          </button>
        </div>
      </div>
    </div>
  );
}

function UnitInfoDiv({ unit, part }: { unit: UnitInfo; part: string }) {
  const arm = PARTS.Arm.find((arm) => unit.parts.includes(arm)) ?? '???';
  const body = PARTS.Body.find((body) => unit.parts.includes(body)) ?? '???';
  const leg = PARTS.Leg.find((leg) => unit.parts.includes(leg)) ?? '???';

  return (
    <div className="flex flex-col bg-neutral-100 rounded">
      <div className="self-center text-sm font-semibold px-2 py-1">
        {unit.name}
      </div>
      <div className="grid grid-cols-2 gap-x-1 text-xs px-4 pb-2">
        <div className="font-semibold">ARM:</div>
        <div className={arm === part ? 'underline' : ''}>{arm}</div>
        <div className="font-semibold">BODY:</div>
        <div className={body === part ? 'underline' : ''}>{body}</div>
        <div className="font-semibold">LEG:</div>
        <div className={leg === part ? 'underline' : ''}>{leg}</div>
      </div>
    </div>
  );
}

function PlanetInfoDiv({ planet, part }: { planet: PlanetInfo; part: string }) {
  return (
    <div>
      <div className="flex bg-neutral-200 rounded-tl rounded-tr px-2 py-1">
        <div className="grow pr-4 text-xs">
          <span className="text-neutral-500 font-semibold">Planet:</span>{' '}
          <span>{planet.name}</span>{' '}
        </div>
        <div className="text-xs">(Vs. {planet.opposition})</div>
      </div>

      <div className="bg-neutral-100 rounded-bl rounded-br px-2 py-1 space-y-2">
        {planet.missions.map((mission, index, arr) => {
          const isLast = index === arr.length - 1;

          return (
            <Fragment key={index}>
              <div>
                <div className="text-sm">
                  <span className="font-semibold">Mission #{mission.order}</span>
                  {mission.faction !== undefined && (
                    <span className="text-red-700">{' ('}{mission.faction} campaign{')'}</span>
                  )}
                </div>

                <div>
                  <span className="text-sm">{mission.name}</span>
                </div>

                <div className="text-sm">
                  <span className="text-neutral-500 font-semibold">Parts:{' '}</span>
                  {mission.parts !== '*' && mission.parts.map((missionPart, idx, arr) => {
                    const isLast = idx === arr.length - 1;

                    return (
                      <Fragment key={idx}>
                        <span className={missionPart === part ? '' : ''}>
                          <span className={missionPart === part ? 'underline' : ''}>
                            {missionPart}
                          </span>
                        </span>
                        {!isLast && <span>{' '}·{' '}</span>}
                      </Fragment>
                    );
                  })}
                </div>
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
