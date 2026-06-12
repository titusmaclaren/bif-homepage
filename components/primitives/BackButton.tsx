import { ArrowLeft } from "lucide-react";

type Props = {
  onClick: () => void;
};

export function BackButton({ onClick }: Props) {
  return (
    <button
      type="button"
      onClick={onClick}
      className="inline-flex items-center gap-2 text-[14px] text-text-secondary hover:text-navy transition-colors py-2"
    >
      <ArrowLeft size={16} />
      Back
    </button>
  );
}
