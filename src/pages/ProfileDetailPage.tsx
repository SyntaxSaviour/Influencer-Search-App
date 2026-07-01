import { formatEngagementRate, formatFollowers } from "@/utils/formatters";
import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, Platform, ProfileDetailResponse } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useShortlistStore } from "@/store/shortlistStore";
import {
  ArrowLeftIcon,
  ArrowUpRightIcon,
  BookmarkIcon,
  CheckIcon,
} from "@/components/Icons";
import { getPlatformLabel, PLATFORMS } from "@/utils/dataHelpers";

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platformParam = searchParams.get("platform");
  const platform: Platform = PLATFORMS.includes(platformParam as Platform)
    ? (platformParam as Platform)
    : "instagram";
  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(
    null
  );
  const [loadedUsername, setLoadedUsername] = useState<string | null>(null);

  useEffect(() => {
    if (!username) return;
    let cancelled = false;

    loadProfileByUsername(username).then((data) => {
      if (!cancelled) {
        setProfileData(data);
        setLoadedUsername(username);
      }
    });

    return () => {
      cancelled = true;
    };
  }, [username]);

  const loaded = loadedUsername === username;

  const addProfile = useShortlistStore((state) => state.addProfile);
  const removeProfile = useShortlistStore((state) => state.removeProfile);
  const isSelected = useShortlistStore((state) =>
    profileData ? state.isSelected(platform, profileData.data.user_profile.user_id) : false
  );

  if (!username) {
    return (
      <Layout
        eyebrow="Profile file / Error"
        title="Invalid creator profile."
        description="The requested profile address is incomplete."
      >
        <Link to="/" className="button button-primary">
          <ArrowLeftIcon />
          Back to discovery
        </Link>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div className="profile-loading" role="status" aria-live="polite">
          <div className="skeleton skeleton-avatar" />
          <div className="loading-copy">
            <span className="skeleton skeleton-kicker" />
            <span className="skeleton skeleton-title" />
            <span className="skeleton skeleton-line" />
            <span className="skeleton skeleton-line short" />
          </div>
          <p>Loading @{username} creator file…</p>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout
        eyebrow="Profile file / Missing"
        title="Signal lost."
        description={`We could not load the creator file for @${username}.`}
      >
        <Link to="/" className="button button-primary">
          <ArrowLeftIcon />
          Back to discovery
        </Link>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const handleToggleList = () => {
    if (isSelected) {
      removeProfile(platform, user.user_id);
    } else {
      addProfile({ ...user, platform });
    }
  };

  return (
    <Layout>
      <Link to="/" className="back-link">
        <ArrowLeftIcon />
        Back to discovery
      </Link>

      <section className={`profile-hero platform-${platform}`}>
        <div className="profile-portrait-block">
          <span className="profile-file-label">Creator file / Live</span>
          <div className="profile-portrait">
            <img
              src={user.picture}
              alt={`Portrait of ${user.fullname}`}
              referrerPolicy="no-referrer"
            />
          </div>
          <span className="profile-id">ID / {user.user_id.slice(-8)}</span>
        </div>

        <div className="profile-identity">
          <div className="profile-platform-row">
            <span className="platform-stamp">{getPlatformLabel(platform)}</span>
            <span>{user.is_verified ? "Verified signal" : "Open signal"}</span>
          </div>
          <h1>
            {user.fullname}
            <VerifiedBadge verified={user.is_verified} />
          </h1>
          <p className="profile-handle">@{user.username}</p>
          <p className="profile-description">
            {user.description ||
              `${user.fullname} is building an audience on ${getPlatformLabel(
                platform
              )}.`}
          </p>

          <div className="profile-actions">
            <button
              type="button"
              onClick={handleToggleList}
              aria-pressed={isSelected}
              className={`button button-primary${
                isSelected ? " is-selected" : ""
              }`}
            >
              {isSelected ? <CheckIcon /> : <BookmarkIcon />}
              {isSelected ? "Saved to shortlist" : "Add to shortlist"}
            </button>
            {user.url && (
            <a
              href={user.url}
              target="_blank"
              rel="noopener noreferrer"
                className="button button-secondary"
            >
                View on {getPlatformLabel(platform)}
                <ArrowUpRightIcon />
            </a>
          )}
          </div>
        </div>
      </section>

      <section className="metrics-section" aria-labelledby="metrics-title">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Audience intelligence</p>
            <h2 id="metrics-title">The numbers behind the signal.</h2>
          </div>
        </div>

        <dl className="detail-metrics">
          <div className="metric-primary">
            <dt>Followers</dt>
            <dd>{formatFollowers(user.followers)}</dd>
            <span>Total audience</span>
          </div>
          <div>
            <dt>Engagement rate</dt>
            <dd>{formatEngagementRate(user.engagement_rate)}</dd>
            <span>Audience response</span>
          </div>
          {user.posts_count !== undefined && (
            <div>
              <dt>Posts</dt>
              <dd>{formatFollowers(user.posts_count)}</dd>
              <span>Published content</span>
            </div>
          )}
          {user.avg_likes !== undefined && (
            <div>
              <dt>Avg. likes</dt>
              <dd>{formatFollowers(user.avg_likes)}</dd>
              <span>Per post</span>
            </div>
          )}
          {user.avg_comments !== undefined && (
            <div>
              <dt>Avg. comments</dt>
              <dd>{formatFollowers(user.avg_comments)}</dd>
              <span>Per post</span>
            </div>
          )}
          {user.avg_views !== undefined && user.avg_views > 0 && (
            <div>
              <dt>Avg. views</dt>
              <dd>{formatFollowers(user.avg_views)}</dd>
              <span>Per video</span>
            </div>
          )}
          {user.engagements !== undefined && (
            <div>
              <dt>Engagements</dt>
              <dd>{formatFollowers(user.engagements)}</dd>
              <span>Total actions</span>
            </div>
          )}
        </dl>
      </section>
    </Layout>
  );
}
