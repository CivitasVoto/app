<template>
  <!-- eslint-disable -->
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">
      <q-form @submit="onSubmit" @reset="onReset" class="q-gutter-md">
        <q-field color="grey-5" filled label="Community Name" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{community.name}}</div>
          </template>
          <template v-slot:hint>
            <q-icon name="Name of Community" />
          </template>
        </q-field>

        <q-input
          filled
          v-model="name"
          label="Community Name *"
          hint="Name of community"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          v-model="tokenName"
          label="Token Name *"
          hint="Name of token"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          v-model="tokenSymbol"
          label="Token Symbol *"
          hint="Symbol representing token"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          type="number"
          v-model="tokenInitialPrice"
          label="Initial Token Price *"
          hint="Initial price of token"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />

        <q-input
          filled
          v-model="benefit"
          label="Benefit *"
          hint="Membership reward"
          lazy-rules
          :rules="[ val => val && val.length > 0 || 'Please type something']"
        />
        <div>
          <q-btn label="Submit" type="submit" color="primary" />
          <q-btn label="Reset" type="reset" color="primary" flat class="q-ml-sm" />
        </div>
      </q-form>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      community: {
        communityId: "1",
        name: "Total Tennis",
        tokenName: "totalTennis",
        tokenSymbol: "TTNS",
        tokenInitialPrice: "500.00",
        benefit: "24/7 Tennis Access"
      }
    };
  },

  methods: {
    onSubmit() {},

    onReset() {
      this.name = null;
      this.tokenName = null;
      this.tokenSymbol = null;
      this.tokenInitialPrice = null;
      this.benefit = null;
    }
  }
};
</script>
