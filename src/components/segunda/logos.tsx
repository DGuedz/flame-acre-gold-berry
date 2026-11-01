import { useId, type ReactNode } from "react";

export function Logo({ name }: { name: string }) {
  const raw = useId().replace(/:/g, "");
  if (name === "whatsapp") return <WhatsApp id={raw} />;
  if (name === "instagram") return <Instagram id={raw} />;
  if (name === "google") return <Google id={raw} />;
  if (name === "gmail") return <Gmail id={raw} />;
  if (name === "claude") return <Claude id={raw} />;
  return <Codex id={raw} />;
}

function Plate({
  id,
  from,
  to,
  children,
}: {
  id: string;
  from: string;
  to: string;
  children: ReactNode;
}) {
  return (
    <svg viewBox="0 0 64 64" className="logo-mark size-14" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-bg`} x1="18" y1="2" x2="46" y2="62">
          <stop offset="0%" stopColor={from} />
          <stop offset="100%" stopColor={to} />
        </linearGradient>
        <linearGradient id={`${id}-glass`} x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fff" stopOpacity="0.62" />
          <stop offset="42%" stopColor="#fff" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#fff" stopOpacity="0" />
        </linearGradient>
        <filter id={`${id}-shadow`} x="-30%" y="-30%" width="160%" height="170%">
          <feDropShadow dx="0" dy="3" stdDeviation="1.6" floodColor="#000" floodOpacity="0.45" />
        </filter>
      </defs>
      <rect x="4" y="5" width="56" height="56" rx="16" fill={`url(#${id}-bg)`} filter={`url(#${id}-shadow)`} />
      <rect x="4" y="5" width="56" height="56" rx="16" fill="none" stroke="#fff" strokeOpacity="0.28" />
      <path d="M14 8h36c6 0 10 4 10 10v12H4V18C4 12 8 8 14 8Z" fill={`url(#${id}-glass)`} />
      <rect className="logo-shine" x="-6" y="8" width="18" height="48" rx="9" fill="#fff" opacity="0.22" />
      {children}
    </svg>
  );
}

function WhatsApp({ id }: { id: string }) {
  return (
    <Plate id={id} from="#5ef59a" to="#128C4A">
      <path
        fill="#fff"
        d="M32 16.2c-7.2 0-13 5.7-13 12.8 0 2.3.6 4.4 1.7 6.3L19 45.2l6.2-1.6a13 13 0 0 0 6.8 1.8c7.2 0 13-5.7 13-12.8s-5.8-16.4-13-16.4Zm7.6 18.2c-.3.8-1.7 1.5-2.4 1.6-.6.1-1.4.2-2.3-.1-.5-.2-1.2-.4-2-.8-3.5-1.5-5.8-5-6-5.2-.2-.2-1.5-2-1.5-3.8s.9-2.7 1.3-3.1c.3-.4.7-.5 1-.5h.7c.2 0 .5 0 .8.6.3.7 1 2.4 1.1 2.6.1.2.1.4 0 .6-.1.3-.2.4-.4.6l-.6.7c-.2.2-.4.4-.2.8.2.3.9 1.5 2 2.4 1.3 1.2 2.4 1.5 2.8 1.7.3.1.6.1.8-.1.2-.2.9-1 1.1-1.4.2-.4.5-.3.8-.2.3.1 2 .9 2.4 1.1.3.2.6.3.7.4.1.3 0 .8-.3 1.6Z"
      />
    </Plate>
  );
}

function Instagram({ id }: { id: string }) {
  return (
    <Plate id={id} from="#f9ce34" to="#4f5bd5">
      <defs>
        <radialGradient id={`${id}-ig`} cx="28%" cy="108%" r="115%">
          <stop offset="0%" stopColor="#feda75" />
          <stop offset="35%" stopColor="#fa7e1e" />
          <stop offset="62%" stopColor="#d62976" />
          <stop offset="100%" stopColor="#4f5bd5" />
        </radialGradient>
      </defs>
      <rect x="4" y="5" width="56" height="56" rx="16" fill={`url(#${id}-ig)`} />
      <path d="M14 8h36c6 0 10 4 10 10v12H4V18C4 12 8 8 14 8Z" fill="#fff" opacity="0.28" />
      <rect x="20" y="20" width="24" height="24" rx="8" fill="none" stroke="#fff" strokeWidth="2.4" />
      <circle cx="32" cy="32" r="6.2" fill="none" stroke="#fff" strokeWidth="2.4" />
      <circle cx="41.2" cy="22.8" r="1.7" fill="#fff" />
    </Plate>
  );
}

function Google({ id }: { id: string }) {
  return (
    <Plate id={id} from="#ffffff" to="#e6e8ee">
      <path fill="#4285F4" d="M46.2 32.4c0-1-.1-2-.3-2.9H32v5.5h8a6.8 6.8 0 0 1-2.9 4.4v3.7h4.7c2.8-2.6 4.4-6.4 4.4-10.7Z" />
      <path fill="#34A853" d="M32 47.2c4 0 7.3-1.3 9.7-3.6l-4.7-3.7c-1.3.9-3 1.4-5 1.4-3.8 0-7.1-2.6-8.2-6.1h-4.9v3.8a15.2 15.2 0 0 0 13.1 8.2Z" />
      <path fill="#FBBC05" d="M23.8 35.2a9.1 9.1 0 0 1 0-5.8v-3.8h-4.9a15.2 15.2 0 0 0 0 13.4l4.9-3.8Z" />
      <path fill="#EA4335" d="M32 21.4c2.2 0 4.1.7 5.6 2.2l4.2-4.2A15.1 15.1 0 0 0 18.9 25.6l4.9 3.8c1.1-3.5 4.4-6 8.2-6Z" />
    </Plate>
  );
}

function Gmail({ id }: { id: string }) {
  return (
    <Plate id={id} from="#ffffff" to="#f3f4f6">
      <path fill="#EA4335" d="M16 24.5 32 36l16-11.5V44a3 3 0 0 1-3 3H19a3 3 0 0 1-3-3V24.5Z" />
      <path fill="#FBBC05" d="M16 24.5 32 36V22l-12.2.2A3 3 0 0 0 16 24.5Z" />
      <path fill="#34A853" d="M48 24.5 32 36V22l12.2.2A3 3 0 0 1 48 24.5Z" />
      <path fill="#C5221F" d="M16 24.5V44a3 3 0 0 0 3 3h2.2V30.2L16 24.5Z" />
      <path fill="#188038" d="M48 24.5V44a3 3 0 0 1-3 3h-2.2V30.2L48 24.5Z" />
    </Plate>
  );
}

function Claude({ id }: { id: string }) {
  return (
    <Plate id={id} from="#f0b89a" to="#c4653f">
      <path
        fill="#fff"
        d="M32 15.5 34.6 24l8.4-3.6-3.6 8.4 8.6 2.4-8.6 2.4 3.6 8.4L34.6 38 32 46.5 29.4 38l-8.4 3.6 3.6-8.4-8.6-2.4 8.6-2.4-3.6-8.4 8.4 3.6L32 15.5Z"
      />
    </Plate>
  );
}

function Codex({ id }: { id: string }) {
  return (
    <Plate id={id} from="#3a3f46" to="#14161a">
      <path
        fill="#fff"
        d="M32 16.2c.6 3.3 1.8 5.7 3.9 7.8s4.5 3.3 7.8 3.9c-3.3.6-5.7 1.8-7.8 3.9s-3.3 4.5-3.9 7.8c-.6-3.3-1.8-5.7-3.9-7.8s-4.5-3.3-7.8-3.9c3.3-.6 5.7-1.8 7.8-3.9s3.3-4.5 3.9-7.8Z"
      />
    </Plate>
  );
}
