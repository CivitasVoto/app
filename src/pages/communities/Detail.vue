<template>
  <!-- eslint-disable -->
  <q-page>
    <div v-if="community" class="column">
      <section class="column gradient-bg full-width q-mb-md">
        <div class="self-center text-h3 q-my-xl">{{community.name}}</div>
        <q-btn label="Join" size="md" color="primary" class="self-center q-mb-xl" />
      </section>
      <CommunityDetailPanels />
    </div>
  </q-page>
</template>

<script>
import CommunityDetailPanels from "src/components/communities/DetailPanels";

export default {
  data() {
    return {};
  },
  computed: {
    community() {
      return this.$store.getters["communities/detailsByAddress"](
        this.$route.params.address
      );
    }
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
