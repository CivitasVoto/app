<template>
  <!-- eslint-disable -->
  <q-page class="column bg-grey-4">
    <div v-if="user" class="column bg-grey-4">
      <section class="column items-center gradient-bg full-width q-mb-md">
        <div class="text-h6 q-mt-xl">User:</div>
        <div class="row q-mb-xl col-shrink">
          <div class="col-12">{{ $route.params.account }}</div>
        </div>
      </section>

      <section
        class="row items-start justify-center full-width text-center q-col-gutter-md q-pr-md"
      >
        <div class="col-12 col-md-7 justify-center">
          <CommunitiesJoined />
          <TokensHeld />
        </div>

        <!-- <div class="col-12 col-md-4 column">
          <TradeWidget :user="user" />
        </div>-->
      </section>
    </div>
  </q-page>
</template>

<script>
// import TradeWidget from "src/components/global/TradeWidget";
import CommunitiesJoined from "src/components/users/CommunitiesJoined";
import TokensHeld from "src/components/users/TokensHeld";

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
  components: {
    // TradeWidget,
    CommunitiesJoined,
    TokensHeld
  }
};
</script>

<style scoped>
.gradient-bg {
  background: linear-gradient(
    180deg,
    rgba(255, 255, 255, 1) 67%,
    rgba(192, 192, 192, 1) 100%
  );
}
</style>
