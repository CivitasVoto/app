<template>
  <q-card class="col-auto">
    <q-card-section>
      <h6 class="q-my-xs">
        <strong>{{ community.name }}</strong>
      </h6>
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
        <q-btn>Join</q-btn>
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
