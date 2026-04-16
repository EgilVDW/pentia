<script setup>
import { ref } from "vue";
import LoginInput from "@/components/LoginInput.vue";
import LoginPassword from "@/components/LoginPassword.vue";
import LoginButton from "@/components/LoginButton.vue";

import logoUrl from "@/assets/images/Milton_logo_white_outline.png";

const email = ref("");
const password = ref("");

const handleLogin = () => {
  console.log("Logger ind med:", email.value, password.value);
};
</script>

<template>
  <div class="login-view">
    <div class="login-view__container">

      <header class="login-view__header">
        <div class="login-view__logo-container">
          <img :src="logoUrl" alt="Milton huse logo" class="login-view__logo-image" />
        </div>
      </header>

      <main class="login-view__content">
        <h2 class="login-view__title">Log ind</h2>

        <form class="login-view__form" @submit.prevent="handleLogin">
          <LoginInput
            v-model="email"
            placeholder="Brugernavn"
            class="login-view__input"
          />

          <LoginPassword
            v-model="password"
            placeholder="Adgangskode"
            class="login-view__input"
          />

          <LoginButton type="submit" class="login-view__submit-btn">
            Log ind
          </LoginButton>
        </form>

        <a href="#" class="login-view__forgot-link">Glemt adgangskode?</a>
      </main>

      <footer class="login-view__footer">
        <p class="login-view__terms">
          Ved at logge ind acceptere du vores <br>
          <a href="#" class="login-view__terms-link">Terms of service</a>
        </p>
      </footer>

    </div>
  </div>
</template>

<style lang="scss" scoped>
.login-view {
  min-height: 100vh;
  width: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  overflow: hidden;
  background-image: url("@/assets/images/Baggrundsbillede.svg");
  background-size: cover;
  background-position: center;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: $color-primary;
    opacity: $opacity-primary;
    z-index: 0;
  }

  &__container {
    width: 100%;
    max-width: 300px;
    display: flex;
    flex-direction: column;
    align-items: center;
    z-index: 1;
  }

  &__header {
    margin-bottom: 6rem;
  }

  &__logo-container {
    color: $color-surface;
    text-align: center;

    :deep(svg) {
      width: 70px;
      height: auto;
      margin-bottom: 0.5rem;
    }
  }

  &__content {
    width: 100%;
  }

  &__title {
    color: $color-surface;
    text-align: left;
    font-size: 1rem;
    font-weight: 500;
    margin-bottom: 0.8rem;
    padding-left: 2px;
  }

  &__form {
    display: flex;
    flex-direction: column;
    gap: 0;
  }

  &__input {
    :deep(.login-input), :deep(.login-password) {
      margin-bottom: 2px;
    }
  }

  &__submit-btn {
    margin-top: 15px;
    background-color: $color-primary;
    height: 38px;
    font-weight: 400;
  }

  &__forgot-link {
    display: block;
    margin-top: 1.2rem;
    color: $color-surface;
    text-decoration: underline;
    font-size: $font-size-body;
    opacity: 0.8;
    text-align: center;
  }

  &__footer {
    position: absolute;
    bottom: 40px;
    width: 100%;
    text-align: center;
  }

  &__terms {
    color: $color-surface;
    font-size: 0.65rem;
    line-height: 1.5;
    opacity: 0.9;
    font-weight: 300;
  }

  &__terms-link {
    color: $color-surface;
    text-decoration: underline;
  }
}
</style>