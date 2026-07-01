interface VerifiedBadgeProps {
  verified: boolean;
}

export function VerifiedBadge({ verified }: VerifiedBadgeProps) {
  if (!verified) return null;
  return (
    <span className="verified-badge" role="img" aria-label="Verified creator">
      <svg aria-hidden="true" viewBox="0 0 20 20">
        <path d="m10 1.8 2 1.3 2.4-.1.9 2.2 2 1.3-.6 2.4.6 2.3-2 1.4-.9 2.2-2.4-.2-2 1.4-2-1.4-2.4.2-.9-2.2-2-1.4.6-2.3-.6-2.4 2-1.3.9-2.2 2.4.1 2-1.3Z" />
        <path d="m6.7 10 2.1 2.1 4.6-4.7" />
      </svg>
    </span>
  );
}
