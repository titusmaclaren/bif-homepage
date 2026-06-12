import { BackButton } from "../primitives/BackButton";

type Props = {
  stepLabel?: string;
  title: string;
  subtitle?: string;
  children: React.ReactNode;
  onBack?: () => void;
  footer?: React.ReactNode;
};

/**
 * Shared visual shell for every step.
 * Step label (uppercase tracked), display headline (light 300), subtitle,
 * then content, then an optional footer row with Back + a primary action.
 */
export function StepShell({
  stepLabel,
  title,
  subtitle,
  children,
  onBack,
  footer,
}: Props) {
  return (
    <div>
      <div className="mb-8">
        {stepLabel && (
          <div className="text-[11px] tracking-[0.2em] uppercase font-medium text-text-secondary mb-4">
            {stepLabel}
          </div>
        )}
        <h1 className="font-light text-[32px] sm:text-[40px] leading-[1.15] tracking-[-0.01em] text-navy m-0">
          {title}
        </h1>
        {subtitle && (
          <p className="mt-4 text-[16px] leading-[1.6] text-text-secondary max-w-[58ch]">
            {subtitle}
          </p>
        )}
      </div>

      <div>{children}</div>

      {(onBack || footer) && (
        <div className="mt-10 flex items-center justify-between gap-4 flex-wrap">
          <div>{onBack && <BackButton onClick={onBack} />}</div>
          <div>{footer}</div>
        </div>
      )}
    </div>
  );
}
