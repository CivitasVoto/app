<template>
  <div class="row full-width justify-center">
    <q-card class="col-xs-11 col-sm-6 column text-left q-pa-lg">
      <!-- Convert Title -->
      <div class="col q-py-md">
        Convert to:
        <b>{{ trade.receive }}</b>
      </div>
      <!-- SPEND -->
      <q-form @submit="onSubmit" @reset="onReset" class="column items-center">
        <div class="row full-width">
          <q-input outlined v-model="trade.spendAmount" label="Send *" lazy-rules />
          <q-select v-model="model" :options="options" label="Token" stack-label />
        </div>
        <q-btn flat size="lg" icon="swap_vertical_circle" color="primary" class="q-mb-lg" />

        <q-input outlined v-model="trade.receiveAmount" label="Receive *" lazy-rules />

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
        spend: "ETH",
        spendAmount: "",
        receive: "MYCOM",
        receiveAmount: ""
      },
      model: null,
      options: ["ETH", "BNT", "PLNTE", "GRNPC"]
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
