<template>
  <section class="checkup">
    <h2 class="checkup__title">Eftersyn</h2>

    <div class="checkup__card-section">
      <div class="checkup__card">
        <div class="checkup__card-content">
          <p class="checkup__card-title">1 års eftersyn</p>
          <p class="checkup__card-date">22 September 2027</p>
        </div>
      </div>
      <div class="checkup__card">
        <div class="checkup__card-content">
          <p class="checkup__card-title">5 års eftersyn</p>
          <p class="checkup__card-date">22 September 2031</p>
        </div>
      </div>
    </div>
  </section>
</template>

<style lang="scss" scoped>
.checkup {
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding: 1rem 2.5rem;

  &__title {
    color: $color-foreground;
    font-weight: bold;
    margin-bottom: 0.75rem;
  }

  &__card-section {
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    gap: 1rem;
  }

  &__card {
    background: $color-surface;
    border-radius: $border-radius-large;
    padding: 11px 10px;
  }

  &__card-content {
    display: flex;
    flex-direction: column;
    gap: 0.25rem;
  }

  &__card-title {
    font-weight: 600;
    font-size: $font-size-headline-2;
    color: $color-foreground;
  }

  &__card-date {
    font-size: $font-size-body;
    color: $color-foreground;
  }
}
</style>
