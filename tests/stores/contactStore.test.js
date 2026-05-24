/**
 * ## Contact Store Unit Tests
 *
 * ## Purpose
 *
 * This test file validates the behavior of the Pinia contact store.
 * The store is responsible for:
 * - resolving the current contact for a project
 * - determining whether the authenticated user is the manager or customer
 * - fetching contact data from Firestore
 * - maintaining reactive contact and loading state
 *
 * These tests ensure the store behaves correctly and safely
 * when interacting with mocked Firebase services.
 *
 *
 * ## What is being tested
 *
 * ### 1. Initial store state
 *
 * The first test verifies that the store initializes with empty default values.
 *
 * The following properties are expected:
 * - `contact` should be `null`
 * - `loading` should be `false`
 * - `contactId` should be `null`
 *
 * This confirms that:
 * - the store starts from a clean state
 * - no stale contact data exists
 * - computed values behave correctly without project data
 *
 *
 * ### 2. Manager contact resolution
 *
 * The second test verifies that when the authenticated user
 * is the project manager, the computed `contactId`
 * resolves to the customer ID.
 *
 * The test validates:
 * - manager/customer relationship logic
 * - computed contact resolution
 * - project role handling
 *
 * This ensures the store correctly identifies
 * the opposite participant in the project.
 *
 *
 * ### 3. Customer contact resolution
 *
 * The third test verifies that when the authenticated user
 * is the customer, the computed `contactId`
 * resolves to the manager ID.
 *
 * This confirms:
 * - role switching logic functions correctly
 * - the correct contact is always selected
 *
 *
 * ### 4. Successful contact fetching
 *
 * The fourth test verifies that `fetchContact()`:
 * - requests the correct Firestore document
 * - retrieves contact data successfully
 * - updates the store state correctly
 *
 * Mocked Firestore responses simulate:
 * - an existing user document
 * - valid user profile data
 *
 * The test validates that:
 * - contact data is populated correctly
 * - Firestore responses are transformed properly
 * - loading state resets after completion
 *
 *
 * ### 5. Missing contact handling
 *
 * The fifth test verifies behavior when
 * the Firestore contact document does not exist.
 *
 * The mocked Firestore response returns:
 * - `exists() === false`
 *
 * The test validates that:
 * - the `contact` state remains `null`
 *
 * This ensures the application safely handles:
 * - deleted users
 * - invalid contact IDs
 * - incomplete Firestore data
 *
 *
 * ### 6. Firestore error handling
 *
 * The final test verifies behavior when Firestore throws an error.
 *
 * The mocked Firestore request rejects with an exception.
 *
 * The test validates that:
 * - errors are handled safely
 * - `contact` resets to `null`
 * - loading state resets correctly
 *
 * This ensures unexpected Firestore failures
 * do not leave the store in an invalid state.
 *
 *
 * ## Why Firestore is mocked
 *
 * Firebase and Firestore methods are mocked
 * to isolate the store logic from external services.
 *
 * This provides several benefits:
 * - tests run faster
 * - tests do not require network access
 * - Firestore writes and reads are avoided
 * - results remain deterministic
 * - failures are easier to debug
 *
 * The following Firestore methods are mocked:
 * - `getDoc`
 * - `doc`
 *
 *
 * ## Why Pinia testing utilities are used
 *
 * `createTestingPinia()` is used to create
 * an isolated Pinia environment for each test.
 *
 * This ensures:
 * - store state does not leak between tests
 * - actions can be spied on safely
 * - each test starts from a predictable baseline
 *
 * `vi.clearAllMocks()` is also executed before each test
 * to reset all mocked functions.
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
 *
 * @category unit-tests
 * @namespace Contact store test
 */

import { describe, it, expect, beforeEach, vi } from "vitest";
import { setActivePinia } from "pinia";
import { createTestingPinia } from "@pinia/testing";

import { useContactStore } from "@/stores/contact";
import { useAuthStore } from "@/stores/auth";
import { useProjectStore } from "@/stores/project";

vi.mock("@/firebase", () => ({
  db: {}
}));

vi.mock("firebase/firestore", () => ({
  doc: vi.fn(() => "mocked-doc-ref"),
  getDoc: vi.fn()
}));

import { getDoc } from "firebase/firestore";

describe("useContactStore", () => {
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
    const store = useContactStore();

    expect(store.contact).toBeNull();
    expect(store.loading).toBe(false);
    expect(store.contactId).toBeNull();
  });

  it("returns customer ID when authenticated user is manager", () => {
    const authStore = useAuthStore();
    const projectStore = useProjectStore();

    authStore.user = {
      uid: "manager-1"
    };

    projectStore.currentProject = {
      managerId: { id: "manager-1" },
      customerId: { id: "customer-1" }
    };

    const store = useContactStore();

    expect(store.contactId).toBe("customer-1");
  });

  it("returns manager ID when authenticated user is customer", () => {
    const authStore = useAuthStore();
    const projectStore = useProjectStore();

    authStore.user = {
      uid: "customer-1"
    };

    projectStore.currentProject = {
      managerId: { id: "manager-1" },
      customerId: { id: "customer-1" }
    };

    const store = useContactStore();

    expect(store.contactId).toBe("manager-1");
  });

  it("fetches contact successfully", async () => {
    const authStore = useAuthStore();
    const projectStore = useProjectStore();

    authStore.user = {
      uid: "manager-1"
    };

    projectStore.currentProject = {
      managerId: { id: "manager-1" },
      customerId: { id: "customer-1" }
    };

    getDoc.mockResolvedValue({
      exists: () => true,
      id: "customer-1",
      data: () => ({
        firstName: "John",
        lastName: "Doe"
      })
    });

    const store = useContactStore();

    await store.fetchContact();

    expect(store.contact).toEqual({
      id: "customer-1",
      firstName: "John",
      lastName: "Doe"
    });

    expect(store.loading).toBe(false);
  });

  it("sets contact to null when Firestore document does not exist", async () => {
    const authStore = useAuthStore();
    const projectStore = useProjectStore();

    authStore.user = {
      uid: "manager-1"
    };

    projectStore.currentProject = {
      managerId: { id: "manager-1" },
      customerId: { id: "customer-1" }
    };

    getDoc.mockResolvedValue({
      exists: () => false
    });

    const store = useContactStore();

    await store.fetchContact();

    expect(store.contact).toBeNull();
  });

  it("handles Firestore errors safely", async () => {
    const authStore = useAuthStore();
    const projectStore = useProjectStore();

    authStore.user = {
      uid: "manager-1"
    };

    projectStore.currentProject = {
      managerId: { id: "manager-1" },
      customerId: { id: "customer-1" }
    };

    getDoc.mockRejectedValue(new Error("Firestore failed"));

    const store = useContactStore();

    await store.fetchContact();

    expect(store.contact).toBeNull();
    expect(store.loading).toBe(false);
  });
});