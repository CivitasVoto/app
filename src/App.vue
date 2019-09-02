<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "CommunitETHs",
  mounted() {
    this.$store.dispatch("communities/initialize");
  }
};
</script>
