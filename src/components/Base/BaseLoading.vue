<template>
  <span class="loading">
    <img
      src="../../assets/img/poke-ball.png"
      alt="Pokebola"
      class="loading__image"
    />
  </span>
</template>

<style lang="scss" scoped>
  .loading {
    animation: jump 1s linear infinite;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translateX(-50%);
  }
  .loading__image {
    width: 40px;
    height: 40px;
  }

  @keyframes jump {
    0% {
      transform: translateY(-50%);
    }
    50% {
      transform: translateY(-150%);
    }
    55% {
      transform: translateY(-150%) rotate(15deg);
    }
    60% {
      transform: translateY(-150%) rotate(-15deg);
    }
    65% {
      transform: translateY(-150%) rotate(15deg);
    }
    70% {
      transform: translateY(-150%) rotate(-15deg);
    }
    100% {
      transform: translateY(-50%);
    }
  }
</style>
