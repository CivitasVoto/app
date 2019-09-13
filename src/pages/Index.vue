<template>
  <!-- eslint-disable -->

  <q-page class="bg-grey-2">
    <section class="column text-center q-px-lg">
      <div class="text-h4 q-my-xl">Communities</div>

      <div class="row full-width justify-center">
        <q-space v-if="$q.screen.gt.xs" />
        <div class="col-10 row justify-center q-gutter-lg">
          <div v-for="(community, index) in communities" :key="index" class="col-grow">
            <CommunityIndexCard :community="community" :user="user" />
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
  // UNCOMMENT FOR PRODUCTION
  // computed: {
  //   communities() {
  data() {
    return {
      //UNCOMMENT FOR DEVELOPMENT
      user: {
        address: "0xFC680634ca2E37b342266412c4BAB1F0D2aad1f8"
      },
      communities: [
        {
          name: "t1",
          tokenName: "tone",
          tokenSymbol: "T1",
          benefit: "t1 benefits",
          address: "0x89856c5C447B066d0b985AfacaCd30b55D84de1c"
        },
        {
          name: "t2",
          tokenName: "ttwo",
          tokenSymbol: "T2",
          benefit: "t2 benefits",
          address: "0x4d5894CcE30484883B5ecdB1f5c523B8bef096Bc"
        }
      ]
      //UNCOMMENT FOR PRODUCTION
      //      return this.$store.getters["communities/all"];
    };
  },
  components: {
    CommunityIndexCard
  }
};
</script>
