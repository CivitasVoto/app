<template>
  <!-- eslint-disable -->
  <q-page class="flex flex-center">
    <div class="q-pa-md" style="max-width: 400px">

        <q-field color="grey-5" filled label="Community Name" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{community.name}}</div>
          </template>
          <template v-slot:hint>
            <q-icon name="Name of Community" />
          </template>
        </q-field>

        <q-field color="grey-5" filled label="Token Name" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{community.tokenName}}</div>
          </template>
          <template v-slot:hint>
            <q-icon name="Name of token" />
          </template>
        </q-field>

        <q-field color="grey-5" filled label="Token Symbol" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{community.tokenSymbol}}</div>
          </template>
          <template v-slot:hint>
            <q-icon name="Symbol used by token" />
          </template>
        </q-field>

        <q-field color="grey-5" filled label="Initial Token Price" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{community.tokenInitialPrice}}</div>
          </template>
          <template v-slot:hint>
            <q-icon name="Initial Price of token" />
          </template>
        </q-field>

        <q-field color="grey-5" filled label="Benefit" stack-label>
          <template v-slot:control>
            <div class="self-center full-width no-outline" tabindex="0">{{community.benefit}}</div>
          </template>
          <template v-slot:hint>
            <q-icon name="Membership reward" />
          </template>
        </q-field>
        <div class="text-center">
          <q-btn label="Join" type="submit" color="primary" />
        </div>

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
