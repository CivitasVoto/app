<template>
  <!-- eslint-disable -->
  <div class="row full-width justify-center">
    <q-card class="col-12 column text-left q-pa-lg">
      <!-- Convert Title -->
      <div class="row full-width q-pb-md justify-center">
        <div>
          Convert to:
          <b>{{ trade.receiveToken }}</b>
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
            v-model="sendModel"
            :options="tokens"
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
            v-model="receiveModel"
            :options="tokens"
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
        receiveToken: "MYCOM",
        receiveAmount: ""
      },
      sendModel: "ETH",
      receiveModel: "MYCOM",
      options: ["ETH", "MYCOM", "BNT", "PLNTE", "GRNPC"],
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
