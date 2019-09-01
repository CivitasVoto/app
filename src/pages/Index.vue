<template>
  <q-page class="flex flex-center column">
    <h2>Communities</h2>
    <div class="row">
      <div
        v-for="(communiteth, index) in communiteths"
        :key="index"
        :communiteth="communiteth"
        class="col-12 col-sm-6 col-md-4 row q-pa-lg"
      >
        <q-card class="full-width">
          <q-card-section>
            <h6 class="q-my-xs">
              <strong>{{ communiteth.communityName }}</strong>
            </h6>
            <p>
              Token: {{ communiteth.tokenName }}
              <br />
              Symbol: {{ communiteth.tokenSymbol }}
              <br />
              Initial Price: {{ communiteth.tokenInitialPrice }}
              <br />
              Benefit: {{ communiteth.benefit }}
              <br />
            </p>
            <div class="text-center">
              <q-btn>Join</q-btn>
            </div>
          </q-card-section>
        </q-card>
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data: () => ({
    communiteths: [
      {
        communityName: "Total Tennis",
        tokenName: "totalTennis",
        tokenSymbol: "TTNS",
        tokenInitialPrice: "500.00",
        benefit: "24/7 Tennis Court Access"
      },
      {
        communityName: "Wild Water",
        tokenName: "wildWater",
        tokenSymbol: "WWTR",
        tokenInitialPrice: "200.00",
        benefit: "24/7 Water Park Access"
      },
      {
        communityName: "Total Tennis",
        tokenName: "totalTennis",
        tokenSymbol: "TTNS",
        tokenInitialPrice: "500.00",
        benefit: "24/7 Tennis Court Access"
      },
      {
        communityName: "Wild Water",
        tokenName: "wildWater",
        tokenSymbol: "WWTR",
        tokenInitialPrice: "200.00",
        benefit: "24/7 Water Park Access"
      }
    ]
  })
};
</script>
