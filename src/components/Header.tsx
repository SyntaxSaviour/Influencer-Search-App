import { Link } from "react-router-dom";
import { useShortlistStore } from "@/store/shortlistStore";

export function Header() {
  const count = useShortlistStore((state) => state.items.length);

  return (
    <header className="flex items-center justify-between px-6 py-3 border-b border-gray-300 mb-4">
      <Link to="/" className="font-bold text-lg">
        Wobb Influencer Search
      </Link>
      <Link
        to="/selected"
        className="px-3 py-1 bg-blue-600 text-white text-sm rounded hover:bg-blue-700"
      >
        Selected ({count})
      </Link>
    </header>
  );
}