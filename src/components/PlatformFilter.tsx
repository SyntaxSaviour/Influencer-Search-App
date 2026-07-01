import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";
import { CloseIcon, SearchIcon } from "./Icons";

interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="discovery-controls">
      <div className="filter-block">
        <p className="control-label">Pick a channel</p>
        <div className="platform-tabs" aria-label="Filter by platform">
          {PLATFORMS.map((platform) => (
            <button
              key={platform}
              type="button"
              aria-pressed={selected === platform}
              onClick={() => onChange(platform)}
              className={`platform-tab platform-${platform}${
                selected === platform ? " is-active" : ""
              }`}
            >
              <span className="platform-monogram" aria-hidden="true">
                {platform === "instagram"
                  ? "IG"
                  : platform === "youtube"
                    ? "YT"
                    : "TT"}
              </span>
              {getPlatformLabel(platform)}
            </button>
          ))}
        </div>
      </div>

      <div className="search-block">
        <label htmlFor="creator-search" className="control-label">
          Search the roster
        </label>
        <div className="search-field">
          <SearchIcon />
          <input
            id="creator-search"
            type="search"
            value={searchQuery}
            onChange={(event) => onSearchChange(event.target.value)}
            placeholder="Username or creator name..."
            autoComplete="off"
          />
          {searchQuery && (
            <button
              type="button"
              className="clear-search"
              onClick={() => onSearchChange("")}
              aria-label="Clear search"
            >
              <CloseIcon />
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
