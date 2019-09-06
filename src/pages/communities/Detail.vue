<template>
  <!-- eslint-disable -->
  <q-page>
    <div v-if="community" class="column">
      <section class="column gradient-bg items-center full-width q-mb-md">
        <div class="self-center text-h6 q-mt-xl">Community:</div>
        <div class="self-center text-h6 q-mb-xl">{{community.name}}</div>
        <q-btn
          label="Join"
          size="md"
          color="primary"
          class="self-center q-mb-xl"
          @click="$store.dispatch('communities/join', {community: community.address})"
        />
      </section>
      <CommunityDetailPanels />
    </div>
  </q-page>
</template>

<script>
import CommunityDetailPanels from "src/components/communities/DetailPanels";

export default {
  data() {
    return {
      //UNCOMMENT FOR DEVELOPMENT
      community: {
        name: "t1"
      },
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
  computed: {
    //UNCOMMENT FOR PRODUCTION
    // community() {
    //   return this.$store.getters["communities/detailsByAddress"](
    //     this.$route.params.address
    //   );
    // }
  },
  components: {
    CommunityDetailPanels
  }
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 67%,
    rgba(102, 102, 102, 1) 100%
  );
}
</style>
