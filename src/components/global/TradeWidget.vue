<template>
  <!-- eslint-disable -->
  <div class="row full-width justify-center">
    <q-card class="col-12 column text-left q-pa-lg">
      <!-- Convert Title -->
      <div class="row full-width q-pb-md justify-center text-center">
        <div>
          Convert to:
          <b>{{ trade.receiveToken.name }}</b>
          <hr />
          {{ trade.receiveToken.address }}
        </div>
      </div>
      <q-form
        @submit.prevent="$store.dispatch('bancor/convert',{
          sendToken: trade.sendToken.address,
          receiveToken: trade.receiveToken.address,
          amount: $web3.utils.toWei(trade.sendAmount),
          sendingETH: trade.sendToken.symbol == 'ETH' ? true : false,
          sendingCommunityToken: trade.sendToken.community ? true : false,
          sendCommunity: { address: trade.sendToken.community ? trade.sendToken.community.address: false },
          receivingCommunityToken: trade.receiveToken.community ? true : false,
          receiveCommunity: { address: trade.receiveToken.community ? trade.receiveToken.community.address: false }
        })"
        class="column items-center"
      >
        <!-- SEND -->
        <div class="row full-width q-col-gutter-md">
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
          <!-- <span>Address: {{ trade.sendToken.address }}</span> -->
        </div>
        <!-- SWAP BUTTON -->
        <q-btn
          @click="swap"
          flat
          size="lg"
          icon="swap_vertical_circle"
          color="primary"
          class="q-my-xs"
        />

        <!-- RECEIVE -->
        <!-- <q-input outlined v-model="trade.receiveAmount" label="Receive Amount *" lazy-rules /> -->

        <div class="row full-width q-col-gutter-md">
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
          <!-- <span>Address: {{ trade.receiveToken.address }}</span> -->
        </div>

        <!-- CONVERT BUTTON -->
        <div class="q-pt-md">
          <q-btn label="Convert" type="submit" color="primary" />
          <!-- <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" /> -->
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
        sendToken: "",
        sendAmount: "",
        receiveToken: "",
        receiveAmount: ""
      },
      tokens: []
    };
  },
  async mounted() {
    this.tokens = this.$store.getters["communities/communityTokens"]
      .concat(await this.$store.getters["communities/networkTokens"])
      .reverse();
    this.trade.sendToken = this.tokens[0];
    this.trade.receiveToken = this.tokens[1];
  },
  methods: {
    swap() {
      const hold = this.trade.sendToken;
      this.trade.sendToken = this.trade.receiveToken;
      this.trade.receiveToken = hold;
    }
  }
};
</script>
