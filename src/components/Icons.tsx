import type { SVGProps } from "react";

type IconProps = SVGProps<SVGSVGElement>;

const iconDefaults: IconProps = {
  "aria-hidden": true,
  fill: "none",
  focusable: "false",
  viewBox: "0 0 24 24",
};

export function ArrowUpRightIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="M7 17 17 7M8 7h9v9" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function ArrowLeftIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="m10 6-6 6 6 6M5 12h15" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function BookmarkIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path
        d="M6.5 4.5h11v15l-5.5-3.7-5.5 3.7v-15Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="2.2"
      />
    </svg>
  );
}

export function CheckIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="m5 12 4 4L19 6" stroke="currentColor" strokeWidth="2.4" />
    </svg>
  );
}

export function CloseIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path d="m6 6 12 12M18 6 6 18" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function SearchIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <circle cx="10.8" cy="10.8" r="6.3" stroke="currentColor" strokeWidth="2.2" />
      <path d="m15.5 15.5 4 4" stroke="currentColor" strokeWidth="2.2" />
    </svg>
  );
}

export function SparkIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path
        d="M12 2.5c.5 5.1 2.4 7 7.5 7.5-5.1.5-7 2.4-7.5 7.5-.5-5.1-2.4-7-7.5-7.5 5.1-.5 7-2.4 7.5-7.5Z"
        stroke="currentColor"
        strokeLinejoin="round"
        strokeWidth="1.9"
      />
      <path d="M19 16v5M16.5 18.5h5" stroke="currentColor" strokeWidth="1.9" />
    </svg>
  );
}

export function UsersIcon(props: IconProps) {
  return (
    <svg {...iconDefaults} {...props}>
      <path
        d="M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM16 4.2a3.5 3.5 0 0 1 0 6.6M21 20v-1.5a4 4 0 0 0-3-3.9"
        stroke="currentColor"
        strokeLinecap="square"
        strokeWidth="2"
      />
    </svg>
  );
}
