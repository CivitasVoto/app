<template>
  <!-- eslint-disable -->

  <q-page class="bg-grey-2">
    <section class="row">
      <div class="row full-width justify-center">
        <div class="text-h4 q-mt-xl">Communities</div>
        <div
          v-for="(community, index) in communities"
          :key="index"
          class="row full-width q-gutter-lg q-pa-lg"
        >
          <CommunityCard :community="community" />
        </div>
        <q-btn fab color="primary" size="xl" icon="add" to="/communities/create" />
      </div>
    </section>
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
