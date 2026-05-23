/**
 * ## User Store Unit Tests
 *
 * ## Purpose
 *
 * This test file validates the behavior of the Pinia user store.
 * The store is responsible for:
 * - storing authenticated user data
 * - storing related project data
 * - handling Firestore fetch operations
 * - maintaining reactive application state
 *
 * These tests ensure the store behaves predictably and safely when interacting with mocked Firebase services.
 *
 *
 * ## What is being tested
 *
 * ### 1. Initial store state
 *
 * The first test verifies that the store initializes with empty default values.
 *
 * The following properties are expected to be `null`:
 * - `user`
 * - `project`
 * - `projectId`
 * - `firebaseUser`
 *
 * This confirms that:
 * - the store starts from a clean state
 * - no stale data exists before loading
 * - state defaults are correctly configured
 *
 *
 * ### 2. Loading user and project data
 *
 * The second test verifies that the `loadData()` action:
 * - retrieves user data from Firestore
 * - retrieves project data related to the user
 * - updates the Pinia state correctly
 *
 * Mocked Firestore responses simulate:
 * - an existing user document
 * - a matching project query result
 *
 * The test validates that:
 * - the user object is populated correctly
 * - the project object contains merged Firestore data
 * - the project ID is extracted and stored separately
 *
 * This confirms that the store correctly transforms and stores Firestore responses.
 *
 *
 * ### 3. Missing user handling
 *
 * The final test verifies behavior when a Firestore user document does not exist.
 *
 * The mocked Firestore response returns:
 * - `exists() === false`
 *
 * The test validates that:
 * - the `user` state remains `null`
 *
 * This ensures the application can safely handle:
 * - deleted users
 * - invalid user IDs
 * - incomplete Firestore data
 *
 *
 * ## Why Firestore is mocked
 *
 * Firebase and Firestore methods are mocked to isolate the store logic from external services.
 *
 * This provides several benefits:
 * - tests run faster
 * - tests do not require network access
 * - Firestore billing is avoided
 * - results remain deterministic
 * - failures are easier to debug
 *
 * The following Firestore methods are mocked:
 * - `getDoc`
 * - `getDocs`
 * - `doc`
 * - `collection`
 * - `query`
 * - `where`
 *
 *
 * ## Why Pinia testing utilities are used
 *
 * `createTestingPinia()` is used to create an isolated Pinia environment for each test.
 *
 * This ensures:
 * - store state does not leak between tests
 * - actions can be spied on safely
 * - each test starts from a predictable baseline
 *
 * `vi.clearAllMocks()` is also executed before each test to reset all mocked functions.
 *
 *
 * ## Testing strategy
 *
 * The tests follow a unit testing approach:
 * - dependencies are mocked
 * - only store behavior is validated
 * - external systems are excluded
 *
 * This makes the tests:
 * - stable
 * - maintainable
 * - fast to execute
 * - focused on business logic
 *
 * @category tests
 * @namespace Unit testing
 */



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

    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ name: "John Doe" })
    });

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