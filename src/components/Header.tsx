import { Link, NavLink } from "react-router-dom";
import { useShortlistStore } from "@/store/shortlistStore";
import { BookmarkIcon, SparkIcon } from "./Icons";

export function Header() {
  const count = useShortlistStore((state) => state.items.length);

  return (
    <header className="site-header">
      <div className="header-frame">
        <Link to="/" className="brand-lockup" aria-label="Wobb Scout home">
          <span className="brand-mark">WOBB</span>
          <span className="brand-product">/ SCOUT</span>
        </Link>

        <div className="header-status" aria-label="Creator data is online">
          <span className="status-dot" />
          Discovery desk online
        </div>

        <nav className="header-nav" aria-label="Primary navigation">
          <NavLink
            to="/"
            end
            className={({ isActive }) =>
              `nav-link${isActive ? " is-active" : ""}`
            }
          >
            <SparkIcon />
            Discover
          </NavLink>
          <NavLink
            to="/selected"
            className={({ isActive }) =>
              `nav-link shortlist-link${isActive ? " is-active" : ""}`
            }
          >
            <BookmarkIcon />
            Shortlist
            <span className="nav-count" aria-label={`${count} selected profiles`}>
              {count}
            </span>
          </NavLink>
        </nav>
      </div>
    </header>
  );
}
