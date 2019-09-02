<template>
  <q-card class="full-width">
    <q-card-section>
      <h6 class="q-my-xs">
        <strong>{{ community.name }}</strong>
      </h6>
      <p>
        Token: {{ community.tokenName }}
        <br />
        Symbol: {{ community.tokenSymbol }}
        <br />
        Initial Price: {{ community.tokenInitialPrice }}
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
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  props: {
    community: {
      type: Object
    }
  }
};
</script>
