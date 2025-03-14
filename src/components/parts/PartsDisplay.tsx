import { useMemo } from "react";
import { PART_TYPES, PARTS, PartType } from "../../lib/parts";
import PartCheckbox from "./PartCheckbox";

type PartsDisplayProps = {
  partsDone: readonly string[];
  togglePart: (part: string) => void;
};

export default function PartsDisplay({ partsDone, togglePart }: PartsDisplayProps) {
  return (
    <div className="flex md:grid md:grid-cols-3 max-w-screen overflow-x-auto">
      {PART_TYPES.map((partType, index) => (
        <div
          key={partType}
          className={`${index === 0 ? 'border-x' : 'border-r'} border-dashed border-slate-400`
            + ` px-1.5 sm:px-3`}
        >
          <PartsList
            partType={partType}
            partsDone={partsDone}
            togglePart={togglePart}
          />
        </div>
      ))}
    </div>
  );
}

function PartsList({
  partType,
  partsDone,
  togglePart,
}: {
  partType: PartType;
  partsDone: readonly string[];
  togglePart: (part: string) => void;
}) {
  const allParts = PARTS[partType];

  const doneCount = useMemo(() => {
    let progress = 0;

    for (const part of partsDone) {
      if (allParts.includes(part)) progress++;
    }

    return progress;
  }, [allParts, partsDone]);

  const progress = doneCount / allParts.length;
  const progressPct = Math.floor(100 * progress);
  const textCls = progress === 1 ? 'text-green-700' : 'text-neutral-600';

  return (
    <div>
      <div className="font-semibold px-2">{partType}</div>

      <div
        className={`${textCls} font-mono px-2 my-1`}
        style={{ minWidth: 135 }}
      >
        {doneCount}/{allParts.length}{' '}
        ({progressPct}%)
      </div>

      <div>
        {allParts.map((part) => {
          const isDone = partsDone.includes(part);

          return (
            <PartCheckbox
              key={part}
              part={part}
              isChecked={isDone}
              togglePart={togglePart}
              showInfoButton
            />
          );
        })}
      </div>
    </div>
  );
}
