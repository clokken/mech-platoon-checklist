import { useShowInfo } from "../logical/useShowInfo";

type PartCheckboxProps = {
  part: string;
  isChecked: boolean;
  togglePart: (part: string) => void;
  showInfoButton?: boolean;
};

export default function PartCheckbox({
  part,
  isChecked,
  togglePart,
  showInfoButton,
}: PartCheckboxProps) {
  const { showPart } = useShowInfo();

  return (
    <div className="flex group">
      <label
        role="checkbox"
        className="grow flex items-center px-2 py-1 cursor-pointer rounded hover:bg-neutral-200
          group-hover:bg-neutral-100"
      >
        <input
          type="checkbox"
          className="cursor-pointer"
          checked={isChecked}
          onChange={() => togglePart(part)}
        />
        <span className={`${isChecked ? 'text-green-700' : ''} grow pl-2 whitespace-nowrap`}>
          {part}
        </span>
      </label>
      {showInfoButton && (
        <button
          className="px-2 py-1 cursor-pointer text-neutral-300 hover:text-sky-500"
          onClick={() => showPart(part)}
        >
          {'(?)'}
        </button>
      )}
    </div>
  );
}
