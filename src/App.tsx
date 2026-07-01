import { BrowserRouter, Route, Routes } from "react-router-dom";
import { SearchPage } from "@/pages/SearchPage";
import { ProfileDetailPage } from "@/pages/ProfileDetailPage";
import { SelectedProfilesPage } from "@/pages/SelectedProfilesPage";
import { Header } from "@/components/Header";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/profile/:username" element={<ProfileDetailPage />} />
        <Route path="/selected" element={<SelectedProfilesPage />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;