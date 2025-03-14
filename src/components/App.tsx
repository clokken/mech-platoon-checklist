import { useCallback, useEffect, useState } from "react";
import { Checklist } from "../lib/state";
import PartsDisplay from "./parts/PartsDisplay";
import MissionsDisplay from "./missions/MissionsDisplay";
import { STARTER_PARTS } from "../lib/parts";
import { localStoragePersistenceService } from "../lib/services/persistence-service";
import ShowInfoContextProvider from "./logical/ShowInfoContextProvider";
import PartsControls from "./parts/PartsControls";
import packageJson from '../../package.json';

export default function App() {
  const [parts, setParts] = useState<Checklist['parts']>(
    localStoragePersistenceService.load('parts') || STARTER_PARTS['*']
  );

  useEffect(() => {
    localStoragePersistenceService.save('parts', parts);
  }, [parts]);

  const togglePart = useCallback((newPart: string) => {
    setParts((oldParts) => {
      const existingIdx = oldParts.indexOf(newPart);
      if (existingIdx === -1) return [...oldParts, newPart];
      return [...oldParts.slice(0, existingIdx), ...oldParts.slice(existingIdx + 1)];
    });
  }, []);

  return (
    <ShowInfoContextProvider>
      <div
        className="flex flex-col md:flex-row items-center md:items-start space-y-8 md:space-y-0
          md:space-x-8 px-4 sm:px-8 py-6"
      >
        <div className="shrink-0 flex flex-col items-center md:items-stretch md:sticky md:top-6">
          <div className="text-center font-bold text-blue-700 text-lg mb-2.5">ALL PARTS</div>
          <div className="mb-1">
            <PartsDisplay
              partsDone={parts}
              togglePart={togglePart}
            />
          </div>
          <PartsControls setParts={setParts} />
        </div>

        <div className="flex flex-col md:sticky md:top-6">
          <div className="text-center font-bold text-blue-700 text-lg mb-2.5">MISSIONS</div>
          <MissionsDisplay
            partsDone={parts}
            togglePart={togglePart}
          />
        </div>

        <div>
          <div className="text-center font-bold text-blue-700 text-lg mb-2.5">INFO</div>
          <div>
            <p>
              Credits:{' '}
              <a
                target="_blank"
                href="https://gamefaqs.gamespot.com/gba/534918-mech-platoon/faqs/79629"
              >
                https://gamefaqs.gamespot.com/gba/534918-mech-platoon/faqs/79629
              </a>
            </p>
            <p>
              Source:{' '}
              <a
                target="_blank"
                href="https://github.com/clokken/mech-platoon-checklist"
              >
                https://github.com/clokken/mech-platoon-checklist
              </a>
            </p>
            <p>
              Version:{' '}
              {packageJson.version}
            </p>
          </div>
        </div>
      </div>
    </ShowInfoContextProvider>
  );
}
