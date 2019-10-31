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
          amount: trade.sendAmount,
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
            class="col-8"
            outlined
            v-model="trade.sendAmount"
            mask="#.##"
            fill-mask="0"
            reverse-fill-mask
            label="Send Amount *"
            lazy-rules
            @input="getReturn"
          />
          <q-field
            outlined
            class="col-4"
            option-value="address"
            option-label="symbol"
            label="Token"
            stack-label
          >
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{trade.sendToken.symbol}}</div>
            </template>
          </q-field>
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
          <q-field class="col-8" outlined label="Receive Amount *" lazy-rules stack-label>
            <template v-slot:control>
              <div class="self-center full-width no-outline" tabindex="0">{{trade.receiveAmount}}</div>
            </template>
          </q-field>
          <q-field
            outlined
            class="col-4"
            option-value="address"
            option-label="symbol"
            label="Token"
            stack-label
          >
            <template v-slot:control>
              <div
                class="self-center full-width no-outline"
                tabindex="0"
              >{{trade.receiveToken.symbol}}</div>
            </template>
          </q-field>
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
    community: {
      type: Object
    }
  },
  data() {
    return {
      dense: true,
      denseOpts: true,
      trade: {
        sendToken: {},
        sendAmount: 0,
        receiveToken: {},
        receiveAmount: "0.00"
      }
    };
  },
  async mounted() {
    const networkTokens = await this.$store.getters[
      "communities/networkTokens"
    ];
    this.trade.sendToken = networkTokens[1];

    let community;

    if (this.$route.params.address) {
      community = await this.$store.getters["communities/detailsByAddress"](
        this.$route.params.address
      );
    } else {
      community = this.$props.community;
    }

    this.trade.receiveToken = {
      name: community.tokenName,
      symbol: community.tokenSymbol,
      address: community.tokenAddress,
      community
    };
  },
  methods: {
    swap() {
      const hold = this.trade.sendToken;
      this.trade.sendToken = this.trade.receiveToken;
      this.trade.receiveToken = hold;
      this.trade.sendAmount = 0;
      this.trade.receiveAmount = "0.00";
    },
    changeFirst(value) {
      if (value.symbol == "ETH") {
        this.trade.receiveToken = this.tokens[1];
      } else {
        this.trade.receiveToken = this.tokens[0];
      }
    },
    changeSecond(value) {
      if (value.symbol == "ETH") {
        this.trade.sendToken = this.tokens[1];
      } else {
        this.trade.sendToken = this.tokens[0];
      }
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
