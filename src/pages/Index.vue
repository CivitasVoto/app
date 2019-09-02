<template>
  <q-page class="flex flex-center column">
    <h2>Communities</h2>
    <div
      v-for="(community, index) in communities"
      :key="index"
      :community="community"
      class="col-12 q-pa-lg"
    >
      <q-card class="full-width">
        <q-card-section>
          <h6 class="q-my-xs">
            <strong>{{ community.name }}</strong>
          </h6>
          <p>
            Token: {{ community.tokenName }}
            <br />
            Symbol: {{ community.tokenSymbol }}
            <br />
            Initial Price: {{ community.tokenInitialPrice }}
            <br />
            Benefit: {{ community.benefit }}
            <br />
          </p>
          <div class="row justify-center q-gutter-md">
            <router-link :to="`communities/${community.address}`">
              <q-btn>Detail</q-btn>
            </router-link>
            <q-btn>Join</q-btn>
          </div>
        </q-card-section>
      </q-card>
    </div>
    <q-btn fab color="primary" size="xl" icon="add" to="/communities/create" />
  </q-page>
</template>

<script>
export default {
  computed: {
    communities() {
      return this.$store.getters["communities/all"];
    }
  }
};
</script>
