<template>
  <!-- eslint-disable -->
  <q-page class="column bg-grey-4">
    <div v-if="user" class="column bg-grey-4">
      <section class="column items-center gradient-bg full-width q-mb-md">
        <div class="text-h6 q-mt-xl">User:</div>
        <div class="row q-mb-xl col-shrink">
          <div class="col-12 ow">{{user.name}}</div>
        </div>
      </section>

      <TradeWidget :user="user" />
    </div>
  </q-page>
</template>

<script>
import TradeWidget from "src/components/global/TradeWidget";

export default {
  data() {
    return {
      user: {
        name: "0xFC680634ca2E37b342266412c4BAB1F0D2aad1f8",
        communitiesJoined: [
          {
            name: "Greenpeace",
            tokens: "23.456789"
          },
          {
            name: "Planet Earth",
            tokens: "12.345678"
          }
        ],
        tokensHeld: [
          {
            name: "ETH",
            tokens: "23.456789"
          },
          {
            name: "MYCOM",
            tokens: "12.345678"
          }
        ]
      }
    };
  },
  computed: {
    // community() {
    //   return this.$store.getters["communities/detailsByAddress"](
    //     this.$route.params.address
    //   );
    // }
  },
  components: {
    TradeWidget
  }
};
</script>

<style scoped>
.ow {
  overflow-wrap: break-word;
  word-wrap: break-word;
  hyphens: auto;
  max-width: 170px;
  text-align: center;
}

.gradient-bg {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 67%,
    rgba(192, 192, 192, 1) 100%
  );
}
</style>
