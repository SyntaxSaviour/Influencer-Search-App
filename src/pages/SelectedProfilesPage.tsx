import { formatFollowers } from "@/utils/formatters";
import { useShortlistStore } from "@/store/shortlistStore";

export function SelectedProfilesPage() {
  const items = useShortlistStore((state) => state.items);
  const removeProfile = useShortlistStore((state) => state.removeProfile);

  if (items.length === 0) {
    return (
      <div className="flex flex-col items-center mt-10">
        <p className="text-gray-500">No profiles selected yet.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center">
      <h1 className="text-xl font-bold mb-4">Selected Profiles</h1>
      {items.map((profile) => (
        <div
          key={`${profile.platform}:${profile.user_id}`}
          className="flex items-center gap-3 p-3 border border-gray-300 mb-2 w-[700px]"
        >
          <img
            src={profile.picture}
            alt={profile.fullname}
            className="w-12 h-12 rounded-full"
          />
          <div className="text-left flex-1">
            <div className="font-bold">@{profile.username}</div>
            <div className="text-sm text-gray-600">{profile.fullname}</div>
            <div className="text-sm">
              {formatFollowers(profile.followers)} followers
            </div>
          </div>
          <button
            onClick={() => removeProfile(profile.platform, profile.user_id)}
            className="px-3 py-1 bg-red-100 text-red-700 text-sm rounded hover:bg-red-200"
          >
            Remove
          </button>
        </div>
      ))}
    </div>
  );
}