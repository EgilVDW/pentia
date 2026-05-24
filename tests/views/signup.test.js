/**
 * ## Signup View Unit Tests
 *
 * ## Purpose
 *
 * This test file validates the behavior of the Signup view component.
 * The component is responsible for:
 * - collecting user registration data
 * - creating a new authenticated account
 * - storing user profile information in Firestore
 * - displaying success and error feedback to the user
 *
 * These tests ensure the signup flow behaves correctly under both successful
 * and failing conditions while keeping all external services mocked.
 *
 *
 * ## What is being tested
 *
 * ### 1. Successful user signup flow
 *
 * The first test verifies the complete signup process when registration succeeds.
 *
 * The test simulates:
 * - filling out the signup form
 * - submitting the form
 * - receiving a successful authentication response
 * - storing the user profile in Firestore
 *
 * Mocked signup data includes:
 * - a generated Firebase user ID
 * - a valid email address
 *
 * The test validates that:
 * - the signup service is called with the correct email and password
 * - Firestore `setDoc()` is called with the expected user profile data
 * - the success message is rendered in the component
 *
 * This confirms that:
 * - form bindings work correctly
 * - form submission triggers the expected logic
 * - Firestore persistence is executed correctly
 * - user feedback is displayed after account creation
 *
 *
 * ## 2. Signup failure handling
 *
 * The second test verifies component behavior when the signup request fails.
 *
 * The mocked signup service rejects with an error.
 *
 * The test validates that:
 * - the component catches the error safely
 * - the error message is displayed to the user
 *
 * This ensures the component can safely handle:
 * - authentication failures
 * - invalid signup attempts
 * - backend or network issues
 *
 *
 * ## Why external services are mocked
 *
 * Firebase authentication and Firestore methods are mocked to isolate
 * component behavior from external systems.
 *
 * This provides several benefits:
 * - tests execute faster
 * - network requests are avoided
 * - Firestore writes are prevented
 * - authentication is simulated safely
 * - test results remain deterministic
 *
 * The following services are mocked:
 * - signup authentication service
 * - Firestore `doc()`
 * - Firestore `setDoc()`
 * - Firebase database configuration
 *
 *
 * ## Why Vue Test Utils is used
 *
 * `mount()` from Vue Test Utils is used to render the component in a realistic testing environment.
 *
 * This allows the tests to:
 * - interact with DOM elements
 * - simulate user input
 * - trigger form submission events
 * - inspect rendered UI output
 *
 * The tests simulate actual user behavior rather than testing implementation details directly.
 *
 *
 * ## Testing strategy
 *
 * The tests follow a component-level unit testing strategy:
 * - external dependencies are mocked
 * - user interaction is simulated
 * - UI rendering and business logic are validated together
 *
 * This makes the tests:
 * - reliable
 * - maintainable
 * - fast to execute
 * - focused on user-facing functionality
 *
 * @category unit-tests
 * @namespace Signup test
 */

import { describe, it, expect, vi, beforeEach } from "vitest";
import { mount } from "@vue/test-utils";
import SignupView from "@/views/Signup.vue";


vi.mock("@/signup", () => ({
  default: vi.fn()
}));

import signup from "@/signup";


vi.mock("firebase/firestore", () => ({
  doc: vi.fn(() => "mocked-doc-ref"),
  setDoc: vi.fn()
}));

vi.mock("@/firebase", () => ({
  db: {}
}));

import { setDoc } from "firebase/firestore";

describe("SignupView", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("successfully signs up user and shows success message", async () => {
    signup.mockResolvedValue({
      uid: "user123",
      email: "test@test.com"
    });

    const wrapper = mount(SignupView);

    // fill form
    await wrapper.find("input[type='text']").setValue("John");
    await wrapper.findAll("input")[1].setValue("Doe");
    await wrapper.find("input[type='email']").setValue("test@test.com");
    await wrapper.find("input[type='password']").setValue("123456");

    // submit form
    await wrapper.find("form").trigger("submit.prevent");

    // wait for async updates
    await wrapper.vm.$nextTick();

    // assertions
    expect(signup).toHaveBeenCalledWith("test@test.com", "123456");

    expect(setDoc).toHaveBeenCalledWith(
      expect.anything(),
      expect.objectContaining({
        email: "test@test.com",
        firstName: "John",
        lastName: "Doe",
        isActive: true
      })
    );

    expect(wrapper.text()).toContain("Account created successfully!");
  });

  it("shows error message when signup fails", async () => {
    signup.mockRejectedValue(new Error("Signup failed"));

    const wrapper = mount(SignupView);

    await wrapper.find("input[type='email']").setValue("fail@test.com");
    await wrapper.find("input[type='password']").setValue("123");

    await wrapper.find("form").trigger("submit.prevent");

    await wrapper.vm.$nextTick();

    expect(wrapper.text()).toContain("Signup failed");
  });
});