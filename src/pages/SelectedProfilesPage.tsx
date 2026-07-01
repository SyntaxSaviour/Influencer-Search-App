import { Link } from "react-router-dom";
import { BookmarkIcon, SparkIcon } from "@/components/Icons";
import { Layout } from "@/components/Layout";
import { ProfileCard } from "@/components/ProfileCard";
import { formatFollowers } from "@/utils/formatters";
import { useShortlistStore } from "@/store/shortlistStore";

export function SelectedProfilesPage() {
  const items = useShortlistStore((state) => state.items);
  const clear = useShortlistStore((state) => state.clear);
  const totalAudience = items.reduce(
    (total, profile) => total + profile.followers,
    0
  );
  const channelCount = new Set(items.map((profile) => profile.platform)).size;

  return (
    <Layout
      eyebrow="Campaign board / Saved locally"
      title="Your creator shortlist."
      description="A focused roster of creators worth a second look. Your picks stay here between sessions."
      actions={
        items.length > 0 ? (
          <button type="button" className="button button-danger" onClick={clear}>
            Clear board
          </button>
        ) : undefined
      }
    >
      {items.length === 0 ? (
        <section className="shortlist-empty" aria-labelledby="empty-title">
          <div className="empty-bookmark" aria-hidden="true">
            <BookmarkIcon />
          </div>
          <p className="eyebrow">Board status / Empty</p>
          <h2 id="empty-title">Nothing pinned—yet.</h2>
          <p>
            Browse the discovery desk and save creators that match your next
            campaign.
          </p>
          <Link to="/" className="button button-primary">
            <SparkIcon />
            Discover creators
          </Link>
        </section>
      ) : (
        <>
          <section className="shortlist-summary" aria-label="Shortlist summary">
            <div>
              <span>{String(items.length).padStart(2, "0")}</span>
              <p>Creators pinned</p>
            </div>
            <div>
              <span>{channelCount}</span>
              <p>Channels covered</p>
            </div>
            <div>
              <span>{formatFollowers(totalAudience)}</span>
              <p>Combined audience</p>
            </div>
            <p className="summary-note">
              Stored on this device
              <br />
              <strong>No account required.</strong>
            </p>
          </section>

          <div className="section-title-row shortlist-title">
            <div>
              <p className="eyebrow">Candidate files</p>
              <h2>Ready for review.</h2>
            </div>
          </div>

          <div className="profile-grid">
            {items.map((profile, index) => (
              <ProfileCard
                key={`${profile.platform}:${profile.user_id}`}
                profile={profile}
                platform={profile.platform}
                rank={index + 1}
              />
            ))}
          </div>
        </>
      )}
    </Layout>
  );
}
