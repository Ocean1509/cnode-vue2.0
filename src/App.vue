<template>
  <div id="app">
    <mheader></mheader>
    <router-view/>
  </div>
</template>

<script>
import mheader from '@/components/Header.vue'
export default {
  name: "App",
  components: {
    mheader
  }
};
</script>

<style>
body{
  margin:0;
}
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
}
</style>
