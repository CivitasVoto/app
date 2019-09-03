<template>
  <!-- eslint-disable -->
  <q-page class="flex flex-center column bg-grey-2">
    <h2>Communities</h2>
    <div v-for="(community, index) in communities" :key="index" class="col-12 q-pa-lg">
      <CommunityCard :community="community" />
    </div>
    <q-btn fab color="primary" size="xl" icon="add" to="/communities/create" />
  </q-page>
</template>

<script>
import CommunityCard from "src/components/communities/Card";

export default {
  computed: {
    communities() {
      return this.$store.getters["communities/all"];
    }
  },
  components: {
    CommunityCard
  }
};
</script>
