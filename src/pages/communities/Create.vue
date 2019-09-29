<template>
  <!-- eslint-disable -->
  <q-page class="flex flex-center">
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
              v-model="community.description"
              label="Description *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="description"
            />

            <q-input
              dense
              filled
              v-model="community.address"
              label="Postal Address *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="address"
            />
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="() => { if (validateStep1()) {done1 = true; step = 2} }"
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
            @click="() => { if (validateStep2()) {done2 = true; step = 3} }"
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
        <div class="row q-py-md q-col-gutter-md items-end">
          <div class="col-xs-12 col-sm-4">
            <q-input
              dense
              filled
              v-model="community.tokenPrice"
              label="Initial Token Price *"
              ref="tokenPrice"
            />

            <q-input
              dense
              filled
              v-model="initialDeposit"
              label="Initial Deposit"
              ref="initialDeposit"
            />
          </div>

          <div class="col-xs-12 col-sm-4 text-center">
            <div>Reserve Ratio:</div>
            <q-knob
              show-value
              font-size="12px"
              v-model="community.reserveRatio"
              size="150px"
              :thickness="0.5"
              color="teal"
              track-color="grey-3"
            >{{ community.reserveRatio }}%</q-knob>
          </div>

          <div class="col-xs-12 col-sm-4 text-center">
            <div>Initial Mint:</div>
            <q-knob
              :min="1"
              :max="1000"
              show-value
              font-size="12px"
              v-model="community.tokensToMint"
              size="150px"
              :thickness="0.5"
              color="teal"
              track-color="grey-3"
            />
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="() => { if (validateStep3()) {done3 = true; step = 4} }"
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
        name: "MyCoin Community Name",
        description: "MyCoin Community Description",
        address: "MyCoin Address 80918",
        tokenName: "MyCoin",
        tokenSymbol: "MYC",
        tokenPrice: 0.01,
        tokensToMint: 100,
        reserveRatio: 50,
        initialDeposit: 0
      },
      step: 1
    };
  },
  computed: {
    initialDeposit: {
      // getter
      get: function() {
        return (
          this.community.tokenPrice *
          (this.community.reserveRatio / 100) *
          this.community.tokensToMint
        );
      },
      // setter
      set: function(newValue) {
        this.community.tokenPrice =
          newValue /
          (this.community.tokensToMint * (this.community.reserveRatio / 100));
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
      // this.$refs.tokensToMint.validate() &&
      // this.$refs.reserveRatio.validate() &&
      // this.$refs.initialDeposit.validate()
    },
    onSubmit() {
      this.$store.dispatch("communities/create", {
        community: { ...this.$data.community }
      });
    }
  }
};
</script>
