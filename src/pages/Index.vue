<template>
  <!-- eslint-disable -->

  <q-page class="bg-grey-2">
    <section class="column text-center q-px-lg">
      <div class="text-h4 q-my-xl">Communities</div>

      <div class="row full-width justify-center">
        <q-space v-if="$q.screen.gt.xs" />
        <div class="col-10 row justify-center q-gutter-lg">
          <div v-for="(community, index) in communities" :key="index" class="col-xs-12 col-sm-3">
            <CommunityIndexCard :community="community" />
          </div>
        </div>
        <q-space v-if="$q.screen.gt.xs" />
      </div>

      <q-btn
        fab
        class="self-center q-my-lg"
        color="primary"
        size="xl"
        icon="add"
        to="/communities/create"
      />
    </section>
  </q-page>
</template>

<script>
import CommunityIndexCard from "src/components/communities/IndexCard";

export default {
  computed: {
    communities() {
      return this.$store.getters["communities/all"];
    }
  },
  components: {
    CommunityIndexCard
  }
};
</script>
