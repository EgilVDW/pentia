<script setup>
import Home from "@/assets/icons/Forside.svg";
import Chat from "@/assets/icons/Beskeder.svg";
import Status from "@/assets/icons/Status.svg";
</script>
<template>
  <section class="nav-container">
    <div>
      <Home class="nav-icons" />
      <p>Home</p>
    </div>
    <div>
      <Chat class="nav-icons" />
      <p>Beskeder</p>
    </div>
    <div>
      <Status class="nav-icons" />
      <p>Status</p>
    </div>
  </section>
</template>
<style scoped lang="scss">
.nav-container{
  display: flex;
  justify-content: space-between;
  width: 100vw;
  background-color: $color-primary;
  padding: 1.5rem 1rem;
  div{
    display: flex;
    flex-direction: column;
    align-items: center;
    p{
      font-size: $font-size-body;
      color: $color-surface;
    }
  }
}
.nav-icons{
  color: $color-highlight;
  height: 42px;
}
</style>