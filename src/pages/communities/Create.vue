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
        <div class="row q-pa-md full-width justify-center q-gutter-md">
          <div class="col">
            <q-input
              dense
              filled
              v-model="community.tokenPrice"
              label="Token Price *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="tokenPrice"
            />

            <q-input
              dense
              filled
              v-model="community.tokenStability"
              label="Token Stability *"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="tokenStability"
            />

            <q-input
              dense
              filled
              v-model="community.tokenCount"
              label="Token Count"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="tokenCount"
            />

            <q-input
              dense
              filled
              v-model="community.initialCost"
              label="Initial Cost"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="initialCost"
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
        name: null,
        description: null,
        address: null,
        initialCost: null,
        tokenName: null,
        tokenSymbol: null,
        tokenPrice: null,
        tokenStability: null,
        tokenCount: null
      },
      step: 1
    };
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
      return (
        this.$refs.tokenStability.validate() &&
        this.$refs.tokenPrice.validate() &&
        this.$refs.tokenCount.validate() &&
        this.$refs.initialCost.validate()
      );
    },
    onSubmit() {
      this.$store.dispatch("communities/create", {
        community: { ...this.$data.community }
      });
    }
  }
};
</script>
