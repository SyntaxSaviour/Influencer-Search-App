import type { Platform, UserProfileSummary } from "@/types";
import { ProfileCard } from "./ProfileCard";

interface ProfileListProps {
  profiles: UserProfileSummary[];
  platform: Platform;
}

export function ProfileList({ profiles, platform }: ProfileListProps) {
  if (profiles.length === 0) {
    return (
      <div className="empty-state" role="status">
        <span className="empty-state-code">404 / NO SIGNAL</span>
        <h2>No creators found.</h2>
        <p>Try a different name or switch channels to widen the search.</p>
      </div>
    );
  }

  return (
    <div className="profile-grid">
      {profiles.map((profile, index) => (
        <ProfileCard
          key={profile.user_id}
          profile={profile}
          platform={platform}
          rank={index + 1}
        />
      ))}
    </div>
  );
}
