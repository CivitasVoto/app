<template>
  <!-- eslint-disable -->
  <q-card>
    <q-card-section>
      <div class="text-h6 q-my-xs">
        <q-btn flat no-caps :to="`communities/${community.address}`" :label="community.name" />
      </div>
      <p>
        Token: {{ community.tokenName }}
        <br />
        Symbol: {{ community.tokenSymbol }}
        <br />
        Price: {{ community.price }}
        <br />
        Benefit: {{ community.benefit }}
        <br />
      </p>
      <div class="row justify-center q-gutter-md">
        <router-link :to="`communities/${community.address}`">
          <q-btn>Detail</q-btn>
        </router-link>
        <q-btn @click="$store.dispatch('communities/join', {community: community.address})">Join</q-btn>
      </div>
      <BuySell />
    </q-card-section>
  </q-card>
</template>

<script>
import BuySell from "./BuySell";

export default {
  props: {
    community: {
      type: Object
    }
  },
  components: {
    BuySell
  }
};
</script>
