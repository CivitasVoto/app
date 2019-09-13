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
              hint="Name of community"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="name"
            />

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
          </div>

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

            <q-input
              dense
              filled
              v-model="community.benefit"
              label="Benefit *"
              hint="Membership reward"
              lazy-rules
              :rules="[ val => val && val.length > 0 || 'Please type something']"
              ref="benefit"
            />
          </div>
        </div>

        <q-stepper-navigation>
          <q-btn
            @click="() => { if (validateStep1()) {onSubmit(); done1 = true; step = 2} }"
            color="primary"
            label="Continue"
          />
        </q-stepper-navigation>
      </q-step>

      <q-step
        :name="2"
        title="Generate Community"
        icon="create_new_folder"
        :done="step > 2"
        :header-nav="step > 2"
      >
        Hang tight. We're creating your community...
        <q-stepper-navigation>
          <q-btn @click="() => { done2 = true; step = 3 }" color="primary" label="Continue" />
          <q-btn flat @click="step = 1" color="primary" label="Back" class="q-ml-sm" />
        </q-stepper-navigation>
      </q-step>

      <q-step :name="3" title="Finish" icon="add_comment" :header-nav="step > 3">
        Your community has been created. Click 'Finish' to go to your new Community!
        <q-stepper-navigation>
          <q-btn color="primary" @click="done3 = true" label="Finish" />
        </q-stepper-navigation>
      </q-step>
    </q-stepper>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      community: {
        name: null,
        tokenName: null,
        tokenSymbol: null,
        benefit: null
      },
      step: 1
    };
  },
  methods: {
    validateStep1() {
      return (
        this.$refs.name.validate() &&
        this.$refs.tokenName.validate() &&
        this.$refs.tokenSymbol.validate() &&
        this.$refs.benefit.validate()
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
