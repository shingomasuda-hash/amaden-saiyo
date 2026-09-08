export function ArrowUpRight({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 20 20" aria-hidden="true" fill="none">
      <path
        d="M5 15L15 5M15 5H6.5M15 5v8.5"
        stroke="currentColor"
        strokeWidth="1.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MailIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 18" aria-hidden="true">
      <path
        d="M1 1h22v16H1z"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
      <path
        d="M1.6 1.8 12 10 22.4 1.8"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function ExternalIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 18 16" aria-hidden="true" fill="none">
      <path d="M6 1h11v10H6z" stroke="currentColor" strokeWidth="1.4" />
      <path d="M12 15H1V5h3" stroke="currentColor" strokeWidth="1.4" />
    </svg>
  );
}
