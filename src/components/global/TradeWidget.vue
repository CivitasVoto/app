<template>
  <!-- eslint-disable -->
  <div class="row full-width justify-center">
    <q-card class="col-12 column text-left q-pa-lg">
      <!-- Convert Title -->
      <div class="row full-width q-pb-md justify-center">
        <div>
          Convert to:
          <b>{{ trade.receiveToken.name ? trade.receiveToken.name : "The Network Token" }}</b>
        </div>
      </div>
      <q-form class="column items-center">
        <!-- SEND -->
        <div class="row full-width justify-center">
          <q-input
            class="col-grow"
            outlined
            v-model="trade.sendAmount"
            label="Send Amount *"
            lazy-rules
          />
          <q-select
            outlined
            class="col-grow"
            v-model="trade.sendToken"
            :options="tokens"
            option-value="address"
            option-label="symbol"
            label="Token"
            stack-label
          />
        </div>
        <!-- SWAP BUTTON -->
        <q-btn flat size="lg" icon="swap_vertical_circle" color="primary" class="q-my-xs" />

        <!-- RECEIVE -->
        <!-- <q-input outlined v-model="trade.receiveAmount" label="Receive Amount *" lazy-rules /> -->

        <div class="row full-width justify-center">
          <q-input
            class="col-grow"
            outlined
            v-model="trade.receiveAmount"
            label="Receive Amount *"
            lazy-rules
          />
          <q-select
            outlined
            class="col-grow"
            v-model="trade.receiveToken"
            :options="tokens"
            option-value="address"
            option-label="symbol"
            label="Token"
            stack-label
          />
        </div>

        <!-- CONVERT BUTTON -->
        <div class="q-pt-md">
          <q-btn label="Convert" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </div>
  <!-- Unused rules -->
  <!-- :rules="[ val => val && val.length > 0 || 'Please type something']" -->
</template>

<script>
export default {
  props: {
    user: {
      type: Object
    }
  },
  data() {
    return {
      dense: true,
      denseOpts: true,
      trade: {
        sendToken: "ETH",
        sendAmount: "",
        receiveToken: "TNT",
        receiveAmount: ""
      },
      tokens: []
    };
  },
  async mounted() {
    this.tokens = this.$store.getters["communities/communityTokens"]
      .concat(await this.$store.getters["communities/networkTokens"])
      .reverse();
  }
};
</script>
