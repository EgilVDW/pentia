
import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";
import { useUserStore } from "@/stores/user";


vi.mock("@/firebase", () => ({
  auth: {},
  db: {}
}));


vi.mock("firebase/firestore", () => ({
  getDoc: vi.fn(),
  getDocs: vi.fn(),
  doc: vi.fn(),
  collection: vi.fn(),
  query: vi.fn(),
  where: vi.fn()
}));

import { getDoc, getDocs } from "firebase/firestore";


describe("useUserStore", () => {
  beforeEach(() => {
    setActivePinia(
      createTestingPinia({
        createSpy: vi.fn,
        stubActions: false
      })
    );

    vi.clearAllMocks();
  });

  it("initial state is empty", () => {
    const store = useUserStore();

    expect(store.user).toBeNull();
    expect(store.project).toBeNull();
    expect(store.projectId).toBeNull();
    expect(store.firebaseUser).toBeNull();
  });

  it("loads user and project correctly", async () => {
    const store = useUserStore();

    // Mock user document
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ name: "John Doe" })
    });

    // Mock project query
    getDocs.mockResolvedValue({
      empty: false,
      docs: [
        {
          id: "project123",
          data: () => ({ title: "Test Project" })
        }
      ]
    });

    await store.loadData("user123");

    expect(store.user).toEqual({ name: "John Doe" });

    expect(store.project).toEqual({
      id: "project123",
      title: "Test Project"
    });

    expect(store.projectId).toBe("project123");
  });

  it("sets user to null when user does not exist", async () => {
    const store = useUserStore();

    getDoc.mockResolvedValue({
      exists: () => false
    });

    await store.loadData("user123");

    expect(store.user).toBeNull();
  });
});