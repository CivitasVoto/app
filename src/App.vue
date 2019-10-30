<template>
  <div id="q-app">
    <router-view />
  </div>
</template>

<script>
export default {
  name: "Civitas",
  mounted() {
    this.$store.dispatch("communities/initialize");
  }
};
</script>
