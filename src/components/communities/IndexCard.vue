<template>
  <!-- eslint-disable -->
  <q-card>
    <q-card-section>
      <div class="text-h6 q-my-xs">
        <q-btn flat no-caps :to="`communities/${community.address}`" :label="community.name" />
      </div>
      <p>
        Token: {{ community.tokenName }}
        <br />
        Symbol: {{ community.tokenSymbol }}
        <br />
      </p>
      <div class="row justify-center q-gutter-md">
        <router-link :to="`communities/${community.address}`">
          <q-btn>Detail</q-btn>
        </router-link>
        <q-btn
          :disabled="isMember"
          @click="$store.dispatch('communities/join', {community: community.address})"
        >Join</q-btn>
      </div>
      <q-btn label="Trade" color="primary" @click="trade = true" class="q-mt-md" />
    </q-card-section>
    <q-dialog v-model="trade">
      <TradeWidget :community="community" />
    </q-dialog>
  </q-card>
</template>

<script>
import TradeWidget from "src/components/global/TradeWidget";

export default {
  props: {
    community: {
      type: Object
    }
  },
  data() {
    return {
      account: "",
      trade: false
    };
  },
  async mounted() {
    [this.account] = await this.$web3.eth.getAccounts();
  },
  computed: {
    isMember() {
      return Boolean(
        this.$props.community.members.find(member => member == this.account)
      );
    }
  },
  components: {
    TradeWidget
  }
};
</script>
