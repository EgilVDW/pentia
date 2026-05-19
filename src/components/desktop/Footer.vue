<template>
  <footer class="footer">
    <button type="button" class="footer__button">
      Gå til login / bygherre portal
    </button>
  </footer>
</template>
<style scoped lang="scss">
.footer {
  background-color: $color-primary;
  padding: 6.25rem 4.375rem 3.75rem;

  &__button {
    padding: 1rem 2rem;
    border-radius: $border-radius-large;
    background-color: $color-highlight;
    font-weight: 600;
  }
}
</style>
