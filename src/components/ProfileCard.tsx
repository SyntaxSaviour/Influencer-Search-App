import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { Link } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useShortlistStore } from "@/store/shortlistStore";
import { ArrowUpRightIcon, BookmarkIcon, CheckIcon } from "./Icons";
import { getPlatformLabel } from "@/utils/dataHelpers";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  rank?: number;
}

export function ProfileCard({ profile, platform, rank = 1 }: ProfileCardProps) {
  const addProfile = useShortlistStore((state) => state.addProfile);
  const removeProfile = useShortlistStore((state) => state.removeProfile);
  const isSelected = useShortlistStore((state) =>
    state.isSelected(platform, profile.user_id)
  );

  const handleToggleList = () => {
    if (isSelected) {
      removeProfile(platform, profile.user_id);
    } else {
      addProfile({ ...profile, platform });
    }
  };

  return (
    <article className={`profile-card platform-${platform}`}>
      <div className="card-topline">
        <span>Creator file / {String(rank).padStart(2, "0")}</span>
        <span className="platform-stamp">{getPlatformLabel(platform)}</span>
      </div>

      <div className="profile-card-body">
        <Link
          to={`/profile/${profile.username}?platform=${platform}`}
          className="profile-avatar-link"
          aria-label={`View ${profile.fullname}'s profile`}
        >
          <span className="avatar-frame">
            <img
              src={profile.picture}
              alt=""
              loading="lazy"
              referrerPolicy="no-referrer"
            />
          </span>
        </Link>

        <div className="profile-copy">
          <p className="creator-name">
            {profile.fullname}
            <VerifiedBadge verified={profile.is_verified} />
          </p>
          <p className="creator-handle">@{profile.username}</p>
        </div>
      </div>

      <dl className="card-metrics">
        <div>
          <dt>Audience</dt>
          <dd>{formatFollowers(profile.followers)}</dd>
        </div>
        <div>
          <dt>
            {profile.engagement_rate !== undefined ? "Engagement" : "Signal"}
          </dt>
          <dd>
            {profile.engagement_rate !== undefined
              ? formatEngagementRate(profile.engagement_rate)
              : profile.avg_views
                ? `${formatFollowers(profile.avg_views)} views`
                : profile.engagements
                  ? formatFollowers(profile.engagements)
                  : "Verified"}
          </dd>
        </div>
      </dl>

      <div className="card-actions">
        <Link
          to={`/profile/${profile.username}?platform=${platform}`}
          className="button button-secondary"
        >
          Inspect
          <ArrowUpRightIcon />
        </Link>
      <button
          type="button"
          onClick={handleToggleList}
          aria-pressed={isSelected}
          aria-label={`${isSelected ? "Remove" : "Add"} ${profile.fullname} ${
            isSelected ? "from" : "to"
          } shortlist`}
          className={`button button-shortlist${isSelected ? " is-selected" : ""}`}
      >
          {isSelected ? <CheckIcon /> : <BookmarkIcon />}
          {isSelected ? "Saved" : "Shortlist"}
      </button>
      </div>
    </article>
  );
}
