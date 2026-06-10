import { clsx } from "clsx";

interface ChipProps {
  label: string;
  active?: boolean;
  icon?: string;
  onClick?: () => void;
}

export function Chip({ label, active, icon, onClick }: ChipProps) {
  return (
    <button
      onClick={onClick}
      className={clsx(
        "flex items-center gap-xs px-md py-2 rounded-full whitespace-nowrap transition-colors font-label-md text-label-md",
        active
          ? "bg-primary text-white shadow-md"
          : "bg-surface-container-lowest text-on-surface-variant border border-outline-variant/30 shadow-sm hover:bg-surface-container-high"
      )}
    >
      {icon && (
        <span className="material-symbols-outlined text-[18px]">{icon}</span>
      )}
      {label}
    </button>
  );
}
