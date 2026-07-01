import { beforeEach, describe, expect, it } from "vitest";
import { useShortlistStore } from "./shortlistStore";
import type { ShortlistItem } from "@/types";

const mockProfile: ShortlistItem = {
  user_id: "123",
  username: "testuser",
  url: "https://example.com/testuser",
  fullname: "Test User",
  picture: "https://example.com/pic.jpg",
  followers: 1000,
  is_verified: false,
  platform: "instagram",
};

const mockProfile2: ShortlistItem = {
  ...mockProfile,
  user_id: "456",
  username: "anotheruser",
};

describe("useShortlistStore", () => {
  beforeEach(() => {
    useShortlistStore.setState({ items: [] });
  });

  it("starts with an empty list", () => {
    expect(useShortlistStore.getState().items).toHaveLength(0);
  });

  it("adds a profile", () => {
    useShortlistStore.getState().addProfile(mockProfile);
    expect(useShortlistStore.getState().items).toHaveLength(1);
    expect(useShortlistStore.getState().items[0].username).toBe("testuser");
  });

  it("prevents duplicate entries for the same platform + user_id", () => {
    useShortlistStore.getState().addProfile(mockProfile);
    useShortlistStore.getState().addProfile(mockProfile);
    expect(useShortlistStore.getState().items).toHaveLength(1);
  });

  it("allows the same user_id on a different platform", () => {
    useShortlistStore.getState().addProfile(mockProfile);
    useShortlistStore.getState().addProfile({ ...mockProfile, platform: "youtube" });
    expect(useShortlistStore.getState().items).toHaveLength(2);
  });

  it("removes a profile by platform + user_id", () => {
    useShortlistStore.getState().addProfile(mockProfile);
    useShortlistStore.getState().addProfile(mockProfile2);
    useShortlistStore.getState().removeProfile("instagram", "123");
    const items = useShortlistStore.getState().items;
    expect(items).toHaveLength(1);
    expect(items[0].user_id).toBe("456");
  });

  it("isSelected reflects current state correctly", () => {
    expect(useShortlistStore.getState().isSelected("instagram", "123")).toBe(false);
    useShortlistStore.getState().addProfile(mockProfile);
    expect(useShortlistStore.getState().isSelected("instagram", "123")).toBe(true);
  });

  it("clear empties the list", () => {
    useShortlistStore.getState().addProfile(mockProfile);
    useShortlistStore.getState().clear();
    expect(useShortlistStore.getState().items).toHaveLength(0);
  });
});