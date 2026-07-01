import { useMemo, useState } from "react";
import type { Platform } from "@/types";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import {
  extractProfiles,
  filterProfiles,
  getPlatformLabel,
  PLATFORMS,
} from "@/utils/dataHelpers";
import { useShortlistStore } from "@/store/shortlistStore";
import { SparkIcon, UsersIcon } from "@/components/Icons";

export function SearchPage() {
  const [platform, setPlatform] = useState<Platform>("instagram");
  const [searchQuery, setSearchQuery] = useState("");
  const shortlistCount = useShortlistStore((state) => state.items.length);

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );
  const creatorCount = useMemo(
    () =>
      PLATFORMS.reduce(
        (total, currentPlatform) =>
          total + extractProfiles(currentPlatform).length,
        0
      ),
    []
  );

  return (
    <Layout>
      <section className="dashboard-hero" aria-labelledby="dashboard-title">
        <div className="hero-copy">
          <p className="eyebrow">
            <span className="live-dot" />
            Creator discovery desk
          </p>
          <h1 id="dashboard-title">
            Find the people
            <span> who move culture.</span>
          </h1>
          <p className="hero-description">
            Search high-signal creators across the platforms that matter. Build
            a campaign-ready shortlist without losing the plot.
          </p>
          <div className="hero-tags" aria-label="Product benefits">
            <span>Fast filters</span>
            <span>Real metrics</span>
            <span>Persistent lists</span>
          </div>
        </div>

        <aside className="signal-board" aria-label="Discovery overview">
          <div className="signal-board-label">
            <SparkIcon />
            Live roster
          </div>
          <div className="signal-number">{creatorCount}</div>
          <p>curated creator profiles across three active channels.</p>
          <div className="signal-grid">
            <div>
              <UsersIcon />
              <span>{shortlistCount}</span>
              <small>Shortlisted</small>
            </div>
            <div>
              <span className="channel-bars" aria-hidden="true">
                <i />
                <i />
                <i />
              </span>
              <span>03</span>
              <small>Channels</small>
            </div>
          </div>
        </aside>
      </section>

      <section className="discovery-section" aria-labelledby="discover-title">
        <div className="section-title-row">
          <div>
            <p className="eyebrow">Search console / 01</p>
            <h2 id="discover-title">Scan the creator roster.</h2>
          </div>
          <span className="result-ticket" aria-live="polite">
            {filtered.length} / {allProfiles.length} results
          </span>
        </div>

        <PlatformFilter
          selected={platform}
          onChange={(nextPlatform) => {
            setPlatform(nextPlatform);
            setSearchQuery("");
          }}
          searchQuery={searchQuery}
          onSearchChange={setSearchQuery}
        />

        <div className="results-heading">
          <p>
            Now scanning <strong>{getPlatformLabel(platform)}</strong>
          </p>
          <span>{searchQuery ? `Query: “${searchQuery}”` : "All signals"}</span>
        </div>

        <ProfileList profiles={filtered} platform={platform} />
      </section>
    </Layout>
  );
}
