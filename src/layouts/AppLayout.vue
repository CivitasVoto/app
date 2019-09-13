<template>
  <!-- eslint-disable -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="row full-width q-pa-sm">
      <q-toolbar>
        <q-toolbar-title>
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
        <q-card class="row q-px-sm">
          <q-form @submit="onConvert" class="row">
            <!-- SEND -->
            <q-select borderless dense v-model="sendModel" :options="options" class="q-ma-sm" />
            <q-input dense outlined v-model="trade.sendAmount" label="Send Amount" lazy-rules />

            <!-- SWAP BUTTON -->
            <q-btn flat size="lg" icon="swap_horizontal_circle" color="primary" />

            <!-- RECEIVE -->
            <q-select borderless dense v-model="receiveModel" :options="options" class="q-ma-sm" />
            <q-input
              dense
              outlined
              v-model="trade.receiveAmount"
              label="Receive Amount"
              lazy-rules
            />

            <!-- CONVERT BUTTON -->
            <q-btn size="md" label="Convert" type="submit" color="primary" class="q-ma-sm" />
          </q-form>
        </q-card>
      </q-toolbar>
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
  methods: {
    openURL,
    onConvert() {}
  }
};
</script>

<style></style>
