import { describe, expect, it } from "vitest";
import { filterProfiles } from "./dataHelpers";
import type { UserProfileSummary } from "@/types";

const profiles: UserProfileSummary[] = [
  {
    user_id: "1",
    username: "MrBeast",
    url: "https://example.com/mrbeast",
    picture: "pic1.jpg",
    fullname: "Jimmy Donaldson",
    is_verified: true,
    followers: 200000000,
  },
  {
    user_id: "2",
    username: "cristiano",
    url: "https://example.com/cristiano",
    picture: "pic2.jpg",
    fullname: "Cristiano Ronaldo",
    is_verified: true,
    followers: 600000000,
  },
];

describe("filterProfiles", () => {
  it("returns all profiles when query is empty", () => {
    expect(filterProfiles(profiles, "")).toHaveLength(2);
  });

  it("matches username case-insensitively", () => {
    const result = filterProfiles(profiles, "mrbeast");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("MrBeast");
  });

  it("matches fullname case-insensitively", () => {
    const result = filterProfiles(profiles, "ronaldo");
    expect(result).toHaveLength(1);
    expect(result[0].username).toBe("cristiano");
  });

  it("returns empty array when nothing matches", () => {
    expect(filterProfiles(profiles, "nonexistent")).toHaveLength(0);
  });
});