import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const base = {
  width: 16,
  height: 16,
  viewBox: "0 0 16 16",
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 1.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
  "aria-hidden": true,
  focusable: false,
};

export function ArrowRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2.5 8h11M9 3.5 13.5 8 9 12.5" />
    </svg>
  );
}

export function ArrowUpRight(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4.5 11.5 11.5 4.5M5.5 4.5h6v6" />
    </svg>
  );
}

export function ChevronDown(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

export function Search(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="7" cy="7" r="4.5" />
      <path d="m10.5 10.5 3 3" />
    </svg>
  );
}

export function Menu(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M2 4.5h12M2 11.5h12" />
    </svg>
  );
}

export function Close(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M4 4l8 8M12 4l-8 8" />
    </svg>
  );
}

export function Pin(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 14s5-4.2 5-8A5 5 0 0 0 3 6c0 3.8 5 8 5 8Z" />
      <circle cx="8" cy="6" r="1.75" />
    </svg>
  );
}

export function Phone(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M5.2 2.5H3.4a1 1 0 0 0-1 1.1c.4 4.4 4.1 8.1 8.5 8.5a1 1 0 0 0 1.1-1v-1.8l-2.3-.8-1.2 1.2a8.9 8.9 0 0 1-3.2-3.2L6.5 5l-.8-2.3Z" />
    </svg>
  );
}

export function Mail(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <rect x="2" y="3.5" width="12" height="9" rx="1" />
      <path d="m2.5 4.5 5.5 4 5.5-4" />
    </svg>
  );
}

export function Clock(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <circle cx="8" cy="8" r="5.75" />
      <path d="M8 5v3.2l2 1.3" />
    </svg>
  );
}

export function Warning(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 2.5 14 13H2L8 2.5Z" />
      <path d="M8 6.5v3M8 11.4v.1" />
    </svg>
  );
}

export function Check(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="m3 8.5 3.2 3.2L13 5" />
    </svg>
  );
}

export function WhatsApp(props: IconProps) {
  return (
    <svg {...base} {...props} fill="currentColor" stroke="none">
      <path d="M8 1.4a6.5 6.5 0 0 0-5.6 9.8L1.5 14.5l3.4-.9A6.5 6.5 0 1 0 8 1.4Zm0 1.2a5.3 5.3 0 0 1 0 10.6 5.3 5.3 0 0 1-2.7-.8l-.2-.1-2 .5.5-1.9-.1-.2A5.3 5.3 0 0 1 8 2.6Zm-2 2.5c-.1 0-.3 0-.5.2-.2.2-.7.6-.7 1.4s.7 1.6.8 1.7c.1.1 1.3 2 3.1 2.7 1.5.6 1.8.5 2.1.4.3 0 .8-.3.9-.7.1-.3.1-.6.1-.6l-.2-.2-1-.4c-.1-.1-.2-.1-.4.1l-.5.6c-.1.1-.2.1-.3 0-.1 0-.7-.3-1.4-.9-.5-.5-.9-1.1-1-1.3-.1-.2 0-.2.1-.3l.3-.4.2-.3v-.3l-.5-1.1c-.1-.3-.2-.3-.4-.3h-.5Z" />
    </svg>
  );
}

export function Shield(props: IconProps) {
  return (
    <svg {...base} {...props}>
      <path d="M8 1.8 3 3.6v3.9c0 3 2.1 5.4 5 6.6 2.9-1.2 5-3.6 5-6.6V3.6L8 1.8Z" />
      <path d="m5.8 7.8 1.5 1.5 3-3" />
    </svg>
  );
}
