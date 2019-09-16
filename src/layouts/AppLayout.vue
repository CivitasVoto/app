<template>
  <!-- eslint-disable -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="row full-width q-pa-sm">
      <q-btn class="q-ml-md" flat size="md" icon="person" :to="`/users/${account}`" />
      <q-toolbar-title class="col-xs-12 col-sm-4 col-md-3">
        <q-btn
          flat
          no-caps
          size="lg"
          to="/"
          label="CommunitETHs"
          icon="nature_people"
          color="white"
        />
      </q-toolbar-title>
      <q-card class="col-xs-12 col-sm-8 q-px-sm">
        <q-form
          @submit.prevent="$store.dispatch('bancor/convert',{
          sendToken: trade.sendToken.address,
          receiveToken: trade.receiveToken.address,
          amount: $web3.utils.toWei(trade.sendAmount),
          sendingETH: trade.sendToken.symbol == 'ETH' ? true : false
        })"
          class="row full-width justify-evenly"
        >
          <div class="col-4 row">
            <!-- SEND -->
            <q-select
              borderless
              dense
              v-model="trade.sendToken"
              :options="tokens"
              option-value="address"
              option-label="symbol"
              class="col-sm-12 col-md-4 q-ma-md-sm"
            />
            <q-input
              dense
              outlined
              v-model="trade.sendAmount"
              label="Send Amount"
              lazy-rules
              class="col-sm-12 col-md-7 q-mb-xs-sm q-mb-md-none"
            />
          </div>

          <!-- SWAP BUTTON -->
          <q-btn
            class="col-md-1 q-ma-none q-pa-none"
            flat
            size="lg"
            icon="swap_horizontal_circle"
            color="primary"
            @click="swap"
          />

          <div class="col-4 row">
            <!-- RECEIVE -->
            <q-select
              borderless
              dense
              v-model="trade.receiveToken"
              :options="tokens"
              option-value="address"
              option-label="symbol"
              class="col-sm-12 col-md-4 q-ma-md-sm"
            />
            <q-input
              dense
              outlined
              v-model="trade.receiveAmount"
              label="Receive Amount"
              lazy-rules
              class="col-sm-12 col-md-7 q-mb-xs-sm q-mb-md-none"
            />
          </div>

          <!-- TRADE BUTTON -->
          <q-btn size="sm" label="Trade" type="submit" color="primary" class="col-2 q-ma-sm" />
        </q-form>
      </q-card>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "AppLayout",
  data() {
    return {
      account: "",
      rightDrawerOpen: false,
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
    const [account] = await this.$web3.eth.getAccounts();
    this.account = account;

    this.tokens = await this.$store.getters[
      "communities/networkTokens"
    ].reverse();
    this.trade.sendToken = this.tokens[0];
    this.trade.receiveToken = this.tokens[1];
  },
  methods: {
    openURL,
    swap() {
      const hold = this.trade.sendToken;
      this.trade.sendToken = this.trade.receiveToken;
      this.trade.receiveToken = hold;
    }
  }
};
</script>

<style></style>
