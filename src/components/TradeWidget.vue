<template>
  <div class="row full-width justify-center">
    <q-card class="column text-left q-pa-lg">
      <div class="col q-py-md">
        Convert to:
        <b>{{ trade.receive }}</b>
      </div>
      <q-form @submit="onSubmit" @reset="onReset" class="column items-center">
        <q-input
          outlined
          v-model="disburse"
          label="Disburse *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <q-select
          v-model="token"
          :options="tokens"
          label="Label (stacked)"
          stack-label
          :dense="dense"
          :options-dense="denseOpts"
        />
        <q-btn flat size="lg" icon="swap_vertical_circle" color="primary" />

        <q-input
          outlined
          v-model="tokenName"
          label="Receive *"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </q-card>
  </div>
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
      trade: {
        payWith: "ETH",
        payWithAmount: "",
        receive: "MYCOM",
        receiveAmount: ""
      },
      token: null,
      tokens: [
        {
          name: "ETH",
          tokens: "23.456789"
        },
        {
          name: "BNT",
          tokens: "12.345678"
        },
        {
          name: "Planet Earth",
          tokens: "23.456789"
        },
        {
          name: "Greenpeace",
          tokens: "12.345678"
        }
      ]
    };
  }
};
</script>
