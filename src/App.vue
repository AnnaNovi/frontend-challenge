<template>
  <nav>
    <router-link to="/">Все котики</router-link>
    <router-link to="/favorite">Любимые котики</router-link>
  </nav>
  <router-view />
</template>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
  outline: none;
  text-decoration: none;
  font-family: "Montserrat", sans-serif;
}
body {
  max-width: 1440px;
  margin: 0 auto;
}
#app {
  font-family: "Roboto", sans-serif;
  font-style: normal;
  font-weight: 400;
}
nav {
  padding: 23px 62px;
  background: #2196f3;
  box-shadow: 0px 4px 4px rgba(0, 0, 0, 0.24);

  a {
    font-size: 14px;
    line-height: 21px;
    color: rgba(255, 255, 255, 0.7);
    letter-spacing: 0.25px;
    padding: 23px 25px;
    transition: 0.3;
    text-decoration: none;
    &.router-link-exact-active {
      background: #1e88e5;
      color: white;
    }
    &:hover {
      background: rgba($color: #1e88e5, $alpha: 0.5);
      color: white;
      transition: 0.5;
    }
  }
}
</style>
