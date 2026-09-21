export type IconName =
  | "building"
  | "leaf"
  | "plan"
  | "orbit"
  | "reset"
  | "plus"
  | "minus"
  | "labels"
  | "arrow"
  | "close"
  | "chevron";

const paths: Record<IconName, React.ReactNode> = {
  building: (
    <>
      <path d="M4 20V4h6v16M14 20V4h6v16M2 20h20" />
      <path d="M6.5 8h1M6.5 12h1M16.5 8h1M16.5 12h1" />
    </>
  ),
  leaf: (
    <>
      <path d="M20 4C7 2 2 9 6 15s15 3 14-11Z" />
      <path d="m4 21 11-12M9 16l-1-5M12 13h5" />
    </>
  ),
  plan: (
    <>
      <path d="m3 5 6-2 6 2 6-2v16l-6 2-6-2-6 2ZM9 3v16M15 5v16" />
    </>
  ),
  orbit: (
    <>
      <ellipse cx="12" cy="12" rx="10" ry="4.5" transform="rotate(-30 12 12)" />
      <circle cx="12" cy="12" r="3" />
    </>
  ),
  reset: (
    <>
      <path d="M4 10a8 8 0 1 1 1 8M4 4v6h6" />
    </>
  ),
  plus: <path d="M12 5v14M5 12h14" />,
  minus: <path d="M5 12h14" />,
  labels: (
    <>
      <path d="M3 3h8l10 10-8 8L3 11Z" />
      <circle cx="7.5" cy="7.5" r="1" />
    </>
  ),
  arrow: <path d="M5 12h14m-5-5 5 5-5 5" />,
  close: <path d="m6 6 12 12M6 18 18 6" />,
  chevron: <path d="m8 10 4 4 4-4" />,
};

export default function Icon({
  name,
  size = 20,
}: {
  name: IconName;
  size?: number;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      {paths[name]}
    </svg>
  );
}
