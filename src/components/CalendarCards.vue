<script setup>

</script>

<template>
  <section class="checkup">
    <h2 class="checkup__title">
      Eftersyn
    </h2>

    <div class="checkup__card">
      <div class="checkup__card-content">
        <p class="checkup__card-title">
          1 års eftersyn
        </p>
        <p class="checkup__card-date">
          22 September 2027
        </p>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.checkup {
  padding: 1rem;

  &__title {
    color: $color-foreground;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  &__card {
    background: $color-surface;
    border-radius: 12px;
    padding: 1rem;
  }

  &__card-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__card-title {
    font-weight: 600;
    font-size: 1.1rem;
    color: $color-foreground;
  }

  &__card-date {
    font-size: 0.95rem;
    color: $color-foreground;
  }
}
</style>