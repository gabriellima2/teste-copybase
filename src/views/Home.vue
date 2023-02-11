<script lang="ts" setup>
  import SearchBar from "../components/SearchBar.vue";
</script>

<template>
  <div class="home">
    <SearchBar class="form">
      <header class="header">
        <img src="../assets/img/poke-ball.png" alt="" class="header__img" />
        <h1 class="header__title">Buscador de Pokemon</h1>
      </header>
    </SearchBar>

    <a
      href="https://www.linkedin.com/in/gabriel-lima-860612236"
      target="_blank"
      rel="noreferrer"
      class="link"
    >
      <small>&copy; Gabriel Lima</small>
    </a>
  </div>
</template>

<style lang="scss" scoped>
  @import "../styles/main";
  .home {
    @include center-full-screen(column);
    gap: 12px;
  }
  .form {
    @include flex-center(column);
    width: 100%;
    padding: 36px 12px;
    border-radius: 8px;
    gap: 28px;
    background-color: #12141d;
  }
  .header {
    @include flex-center(row);
    gap: 4px;
  }
  .header__img {
    width: 36px;
    height: 36px;
  }
  .header__title {
    font-size: 1.4rem;
  }

  @media screen and (min-width: $md-screen) {
    .form {
      max-width: 400px;
      padding: 36px;
    }
  }
</style>
