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
        <q-form @submit="onConvert" class="row full-width justify-evenly">
          <div class="col-4 row">
            <!-- SEND -->
            <q-select
              borderless
              dense
              v-model="sendModel"
              :options="options"
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
          />

          <div class="col-4 row">
            <!-- RECEIVE -->
            <q-select
              borderless
              dense
              v-model="receiveModel"
              :options="options"
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
        sendToken: "ETH",
        sendAmount: "",
        receiveToken: "MYCOM",
        receiveAmount: ""
      },
      sendModel: "ETH",
      receiveModel: "MYCOM",
      options: ["ETH", "MYCOM", "BNT", "PLNTE", "GRNPC"]
    };
  },
  async mounted() {
    const [account] = await this.$web3.eth.getAccounts();
    this.account = account;
  },
  methods: {
    openURL,
    onConvert() {}
  }
};
</script>

<style></style>
