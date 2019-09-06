<template>
  <div class="row full-width justify-center">
    <q-card class="col-xs-11 col-sm-8 col-md-6 column text-left q-pa-lg">
      <!-- Convert Title -->
      <div class="row full-width q-py-md justify-center">
        <div>
          Convert to:
          <b>{{ trade.receiveToken }}</b>
        </div>
      </div>
      <q-form @submit="onSubmit" @reset="onReset" class="column items-center">
        <!-- SPEND -->
        <div class="row full-width justify-center">
          <q-input outlined v-model="trade.sendAmount" label="Send Amount *" lazy-rules />
          <q-select
            outlined
            class="col-4 q-pa-md"
            v-model="sendModel"
            :options="options"
            label="Token"
            stack-label
          />
        </div>
        <!-- SWAP BUTTON -->
        <q-btn flat size="lg" icon="swap_vertical_circle" color="primary" class="q-my-xs" />

        <!-- RECEIVE -->
        <!-- <q-input outlined v-model="trade.receiveAmount" label="Receive Amount *" lazy-rules /> -->

        <div class="row full-width justify-center">
          <q-input outlined v-model="trade.receiveAmount" label="Receieve Amount *" lazy-rules />
          <q-select
            outlined
            class="col-4 q-pa-md"
            v-model="receiveModel"
            :options="options"
            label="Token"
            stack-label
          />
        </div>

        <!-- CONVERT BUTTON -->
        <div>
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
      sendModel: null,
      receiveModel: "MYCOM",
      options: ["ETH", "MYCOM", "BNT", "PLNTE", "GRNPC"]
    };
  },
  methods: {
    onSubmit() {
      // this.$store.dispatch("communities/create", {
      //   community: { ...this.$data }
      // });
    },
    onReset() {
      // this.name = null;
      // this.tokenName = null;
      // this.tokenSymbol = null;
      // this.benefit = null;
    }
  }
};
</script>
