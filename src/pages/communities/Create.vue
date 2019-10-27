<template>
  <!-- eslint-disable -->
  <q-page class="flex flex-center">
    <!-- TODO: Break steps into multiple components -->
    <q-stepper v-model="step" header-nav ref="stepper" color="primary" animated>
      <q-step
        :name="1"
        title="Add Community Information"
        icon="settings"
        :done="step > 1"
        :header-nav="step > 1"
      >
        <div class="row q-pa-md full-width justify-center q-gutter-md">
          <div class="col">
            <q-input
              dense
              filled
              v-model="community.name"
              label="Community Name *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="name"
            />

            <q-input
              dense
              filled
              v-model="description"
              label="Description *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="description"
            />

            <q-input
              dense
              filled
              v-model="address"
              label="Membership Price (in community tokens)"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="address"
            />
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="() => { if (validateStep1()) {step = 2} }"
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Set Token Name &amp; Symbol"
        icon="settings"
        :done="step > 2"
        :header-nav="step > 2"
      >
        <div class="row q-pa-md full-width justify-center q-gutter-md">
          <div class="col">
            <q-input
              dense
              filled
              v-model="community.tokenName"
              label="Token Name *"
              hint="Name of token"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="tokenName"
            />

            <div class="col">
              <q-input
                dense
                filled
                v-model="community.tokenSymbol"
                label="Token Symbol *"
                hint="Symbol representing token"
                lazy-rules
                :rules="[ val => val && val.length > 0 || 'Please type something']"
                ref="tokenSymbol"
              />
            </div>
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="() => { if (validateStep2()) {submitStep2()} }"
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="3"
        title="Set Token Price"
        icon="settings"
        :done="step > 3"
        :header-nav="step > 3"
      >
        <div class="row q-py-md q-col-gutter-md items-center">
          <div class="col-xs-12 q-col-gutter-md col-sm-4">
            <q-input
              dense
              filled
              v-model="converter.tokenPrice"
              label="Initial Token Price *"
              ref="tokenPrice"
            />

            <q-input
              dense
              filled
              v-model="amountToDeposit"
              label="Initial Deposit"
              ref="amountToDeposit"
            />
          </div>

          <div class="col-xs-12 col-sm-4 text-center">
            <div>Reserve Ratio:</div>
            <q-knob
              show-value
              font-size="12px"
              v-model="converter.reserveRatio"
              size="150px"
              :thickness="0.5"
              color="teal"
              track-color="grey-3"
            >{{ converter.reserveRatio }}%</q-knob>
          </div>

          <div class="col-xs-12 col-sm-4 text-center">
            <div>Initial Mint:</div>
            <q-knob
              :min="1"
              :max="1000"
              show-value
              font-size="12px"
              v-model="converter.amountToMint"
              size="150px"
              :thickness="0.5"
              color="teal"
              track-color="grey-3"
            />
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="() => { if (validateStep3()) {submitStep3()} }"
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="4"
        title="Generate Community"
        icon="create_new_folder"
        :done="step > 4"
        :header-nav="step > 4"
        class="q-pa-xl"
      >Hang on, we are creating your community... Please accept both transactions.</q-step>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      community: {
        name: "",
        tokenName: "",
        tokenSymbol: ""
      },
      converter: {
        tokenPrice: 0.01,
        amountToMint: 100,
        reserveRatio: 50
      },
      description: "",
      address: "",
      ethAddress: "0x0",
      step: 1
    };
  },
  computed: {
    amountToDeposit: {
      // getter
      get: function() {
        return (
          this.converter.tokenPrice *
          (this.converter.reserveRatio / 100) *
          this.converter.amountToMint
        );
      },
      // setter
      set: function(newValue) {
        this.converter.tokenPrice =
          newValue /
          (this.converter.amountToMint * (this.converter.reserveRatio / 100));
      }
    }
  },
  methods: {
    validateStep1() {
      return (
        this.$refs.name.validate() &&
        this.$refs.description.validate() &&
        this.$refs.address.validate()
      );
    },
    validateStep2() {
      return (
        this.$refs.tokenName.validate() && this.$refs.tokenSymbol.validate()
      );
    },
    validateStep3() {
      return true;
      // this.$refs.tokenPrice.validate() &&
      // this.$refs.amountToMint.validate() &&
      // this.$refs.reserveRatio.validate() &&
      // this.$refs.amountToDeposit.validate()
    },
    async submitStep2() {
      this.ethAddress = await this.$store.dispatch(
        "communities/createCommunity",
        {
          community: { ...this.community }
        }
      );
      this.step = 3;
    },
    async submitStep3() {
      await this.$store.dispatch("communities/addConnector", {
        community: { address: this.ethAddress },
        converter: { ...this.converter, amountToDeposit: this.amountToDeposit }
      });
      this.step = 4;
    }
  }
};
</script>
