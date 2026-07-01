import { formatFollowers } from "@/utils/formatters";
import { useNavigate } from "react-router-dom";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useShortlistStore } from "@/store/shortlistStore";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
}

export function ProfileCard({ profile, platform }: ProfileCardProps) {
  const navigate = useNavigate();

  const addProfile = useShortlistStore((state) => state.addProfile);
  const removeProfile = useShortlistStore((state) => state.removeProfile);
  const isSelected = useShortlistStore((state) =>
    state.isSelected(platform, profile.user_id)
  );

  const handleClick = () => {
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleToggleList = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSelected) {
      removeProfile(platform, profile.user_id);
    } else {
      addProfile({ ...profile, platform });
    }
  };

  return (
    <div
      onClick={handleClick}
      className="flex items-center gap-3 p-3 border border-gray-300 mb-2 cursor-pointer hover:bg-gray-50 w-[700px]"
    >
      <img src={profile.picture} alt={profile.fullname} className="w-12 h-12 rounded-full" />
      <div className="text-left flex-1">
        <div className="font-bold">
          @{profile.username}
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <div className="text-sm text-gray-600">{profile.fullname}</div>
        <div className="text-sm">{formatFollowers(profile.followers)} followers</div>
      </div>
      <button
        onClick={handleToggleList}
        className={`px-3 py-1 text-sm rounded ${
          isSelected
            ? "bg-red-100 text-red-700 hover:bg-red-200"
            : "bg-blue-600 text-white hover:bg-blue-700"
        }`}
      >
        {isSelected ? "Remove" : "Add to List"}
      </button>
    </div>
  );
}