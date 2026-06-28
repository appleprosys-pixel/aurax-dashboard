type IconProps = { name: string; className?: string };

/** Lightweight line-icon set used across the site. */
export function Icon({ name, className }: IconProps) {
  const base = {
    className,
    viewBox: "0 0 24 24",
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.6,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };

  switch (name) {
    case "chat":
      return (
        <svg {...base}>
          <path d="M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z" />
          <path d="M8 11h.01M12 11h.01M16 11h.01" />
        </svg>
      );
    case "voice":
      return (
        <svg {...base}>
          <rect x="9" y="2" width="6" height="12" rx="3" />
          <path d="M5 11a7 7 0 0 0 14 0M12 18v4M8 22h8" />
        </svg>
      );
    case "grid":
      return (
        <svg {...base}>
          <rect x="3" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="3" width="7" height="7" rx="1.5" />
          <rect x="14" y="14" width="7" height="7" rx="1.5" />
          <rect x="3" y="14" width="7" height="7" rx="1.5" />
        </svg>
      );
    case "send":
      return (
        <svg {...base}>
          <path d="M22 2 11 13M22 2l-7 20-4-9-9-4 20-7z" />
        </svg>
      );
    case "compass":
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="10" />
          <path d="m16.24 7.76-2.12 6.36-6.36 2.12 2.12-6.36 6.36-2.12z" />
        </svg>
      );
    case "spark":
      return (
        <svg {...base}>
          <path d="M12 3c0 4 1.8 5.8 5.8 5.8C13.8 8.8 12 10.6 12 14.6c0-4-1.8-5.8-5.8-5.8C10.2 8.8 12 7 12 3z" />
          <path d="M19 14v4M21 16h-4" />
        </svg>
      );
    case "arrow":
      return (
        <svg {...base}>
          <path d="M5 12h14M13 6l6 6-6 6" />
        </svg>
      );
    case "check":
      return (
        <svg {...base}>
          <path d="M20 6 9 17l-5-5" />
        </svg>
      );
    case "calendar":
      return (
        <svg {...base}>
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M3 9h18M8 3v4M16 3v4" />
        </svg>
      );
    case "clock":
      return (
        <svg {...base}>
          <circle cx="12" cy="12" r="9" />
          <path d="M12 7v5l3 2" />
        </svg>
      );
    case "phone":
      return (
        <svg {...base}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2.1 4.2 2 2 0 0 1 4.1 2h3a2 2 0 0 1 2 1.7c.1 1 .4 1.9.7 2.8a2 2 0 0 1-.5 2.1L8.1 9.9a16 16 0 0 0 6 6l1.3-1.3a2 2 0 0 1 2.1-.4c.9.3 1.8.6 2.8.7a2 2 0 0 1 1.7 2z" />
        </svg>
      );
    case "mail":
      return (
        <svg {...base}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="m3 7 9 6 9-6" />
        </svg>
      );
    case "shield":
      return (
        <svg {...base}>
          <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
          <path d="m9 12 2 2 4-4" />
        </svg>
      );
    case "menu":
      return (
        <svg {...base}>
          <path d="M3 6h18M3 12h18M3 18h18" />
        </svg>
      );
    case "whatsapp":
      return (
        <svg className={className} viewBox="0 0 24 24" fill="currentColor">
          <path d="M.06 24l1.69-6.16a11.86 11.86 0 0 1-1.6-5.95C.15 5.32 5.5 0 12.07 0a11.82 11.82 0 0 1 8.41 3.49 11.78 11.78 0 0 1 3.48 8.41c0 6.56-5.35 11.9-11.92 11.9a11.97 11.97 0 0 1-5.7-1.45L.06 24zM6.6 20.13c1.68 1 3.28 1.6 5.46 1.6 5.45 0 9.9-4.43 9.9-9.87a9.82 9.82 0 0 0-9.9-9.88c-5.46 0-9.9 4.43-9.9 9.88 0 2.28.67 3.99 1.79 5.78l-.99 3.62 3.64-.95zm11.36-5.6c-.07-.12-.27-.2-.57-.35-.3-.15-1.76-.87-2.03-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.94 1.17-.17.2-.35.22-.65.07-.3-.15-1.25-.46-2.38-1.47-.88-.78-1.47-1.75-1.64-2.05-.17-.3-.02-.46.13-.61.13-.13.3-.35.45-.52.15-.17.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.51l-.57-.01c-.2 0-.52.07-.79.37-.27.3-1.04 1.02-1.04 2.48 0 1.46 1.06 2.87 1.21 3.07.15.2 2.1 3.2 5.08 4.49.71.3 1.26.49 1.69.63.71.22 1.36.19 1.87.12.57-.09 1.76-.72 2-1.41.25-.7.25-1.29.18-1.42z" />
        </svg>
      );
    default:
      return null;
  }
}
