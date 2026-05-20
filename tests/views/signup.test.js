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