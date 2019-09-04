<template>
  <!-- eslint-disable -->

  <q-page class="bg-grey-2">
    <section class="column text-center q-px-lg">
      <div class="text-h4 q-my-xl">Communities</div>
      <div class="row justify-center q-gutter-lg">
        <div v-for="(community, index) in communities" :key="index">
          <CommunityCard :community="community" />
        </div>
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
