type FlatButtonProps = {
  onClick: () => void;
  children: React.ReactNode;
};

export default function FlatButton({ onClick, children }: FlatButtonProps) {
  return (
    <button
      className="w-full grow text-sm text-slate-600 bg-slate-200 hover:bg-slate-300 rounded
        px-2 py-1"
      onClick={onClick}
    >
      {children}
    </button>
  );
}
