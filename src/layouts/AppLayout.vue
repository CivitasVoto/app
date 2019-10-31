<template>
  <!-- eslint-disable -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated class="row full-width q-pa-sm">
      <q-toolbar-title>
        <q-btn flat no-caps size="lg" to="/" label="Civitas" icon="nature_people" color="white" />
      </q-toolbar-title>
      <q-card class="col-8 q-px-sm gt-xs">
        <q-form
          @submit.prevent="$store.dispatch('bancor/convert',{
          sendToken: trade.sendToken.address,
          receiveToken: trade.receiveToken.address,
          amount: trade.sendAmount,
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
              @input="changeFirst"
              option-value="address"
              option-label="symbol"
              class="col-sm-12 col-md-4 q-ma-md-sm"
            />
            <q-input
              dense
              outlined
              v-model="trade.sendAmount"
              @input="getReturn"
              mask="#.##"
              fill-mask="0"
              reverse-fill-mask
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
              @input="changeSecond"
              option-value="address"
              option-label="symbol"
              class="col-sm-12 col-md-4 q-ma-md-sm"
            />
            <q-field
              dense
              outlined
              stack-label
              label="Receive Amount"
              lazy-rules
              class="col-sm-12 col-md-7 q-mb-xs-sm q-mb-md-none"
            >
              <template v-slot:control>
                <div class="self-center full-width no-outline" tabindex="0">{{trade.receiveAmount}}</div>
              </template>
            </q-field>
          </div>

          <!-- TRADE BUTTON -->
          <q-btn size="sm" label="Trade" type="submit" color="primary" class="col-2 q-ma-sm" />
        </q-form>
      </q-card>
      <q-btn class="q-ml-md" flat size="md" icon="person" :to="`/users/${account}`" />
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
        sendAmount: 0,
        receiveToken: "",
        receiveAmount: "0.00"
      },
      tokens: []
    };
  },
  async mounted() {
    const [account] = await this.$web3.eth.getAccounts();
    this.account = account;

    this.tokens = await this.$store.getters["communities/networkTokens"];
    this.tokens.reverse();
    this.trade.sendToken = this.tokens[0];
    this.trade.receiveToken = this.tokens[1];
  },
  methods: {
    openURL,
    swap() {
      const hold = this.trade.sendToken;
      this.trade.sendToken = this.trade.receiveToken;
      this.trade.receiveToken = hold;
      this.trade.sendAmount = this.trade.receiveAmount = "";
    },
    changeFirst(value) {
      if (value.symbol == "ETH") {
        this.trade.receiveToken = this.tokens[1];
      } else {
        this.trade.receiveToken = this.tokens[0];
      }
      this.trade.sendAmount = this.trade.receiveAmount = "";
    },
    changeSecond(value) {
      if (value.symbol == "ETH") {
        this.trade.sendToken = this.tokens[1];
      } else {
        this.trade.sendToken = this.tokens[0];
      }
      this.trade.sendAmount = this.trade.receiveAmount = "";
    },
    async getReturn() {
      if (this.trade.sendAmount == 0) {
        this.trade.receiveAmount = "0.00";
        return;
      }
      const returnAmount = await this.$store.dispatch("bancor/getReturn", {
        sendToken: this.trade.sendToken.address,
        receiveToken: this.trade.receiveToken.address,
        amount: this.trade.sendAmount,
        sendingETH: this.trade.sendToken.symbol == "ETH" ? true : false,
        sendingCommunityToken: this.trade.sendToken.community ? true : false,
        sendCommunity: {
          address: this.trade.sendToken.community
            ? this.trade.sendToken.community.address
            : false
        },
        receivingCommunityToken: this.trade.receiveToken.community
          ? true
          : false,
        receiveCommunity: {
          address: this.trade.receiveToken.community
            ? this.trade.receiveToken.community.address
            : false
        }
      });

      this.trade.receiveAmount = this.$web3.utils.fromWei(
        returnAmount[0].toString()
      );
    }
  }
};
</script>

<style></style>
