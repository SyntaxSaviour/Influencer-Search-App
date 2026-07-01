import { BrowserRouter, Link, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import { SelectedProfilesPage } from "@/pages/SelectedProfilesPage";
import { Header } from "@/components/Header";

function App() {
  return (
    <BrowserRouter>
      <div className="app">
        <a className="skip-link" href="#main-content">
          Skip to content
        </a>
        <Header />
        <Routes>
          <Route path="/" element={<SearchPage />} />
          <Route path="/profile/:username" element={<ProfileDetailPage />} />
          <Route path="/selected" element={<SelectedProfilesPage />} />
        </Routes>
        <footer className="site-footer">
          <div>
            <Link to="/" className="footer-brand">
              WOBB / SCOUT
            </Link>
            <p>Creator discovery with a sharper signal.</p>
          </div>
          <p className="footer-note">
            Built for the Wobb Vibe Coder assignment
            <span aria-hidden="true"> ↗</span>
          </p>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;
