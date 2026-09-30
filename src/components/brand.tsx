export function Brand({ large = false }: { large?: boolean }) {
  return (
    <span className={`brand${large ? " brand-large" : ""}`}>
      <svg
        className="brand-symbol"
        viewBox="0 0 44 40"
        fill="none"
        aria-hidden="true"
      >
        <path
          d="M3 33 20.5 5 38 33M10 33l10.5-17L31 33M18 33l8-13 15 0"
          stroke="currentColor"
          strokeWidth="2.8"
          strokeLinejoin="miter"
        />
      </svg>
      <span>
        asgela<span className="brand-weight">group</span>
        <span className="brand-dot">.</span>
      </span>
    </span>
  );
}
