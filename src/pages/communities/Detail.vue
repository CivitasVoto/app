<template>
  <!-- eslint-disable -->
  <q-page>
    <div v-if="community" class="column">
      <h3 class="q-py-xl q-my-xl self-center">{{community.name}}</h3>
      <hr class="full-width" />
      <div class="menu-wrap">
        <q-toolbar>
          <q-tabs
            flat
            indicator-color="secondary"
            active-color="grey-8"
            class="bg-white text-grey-8 cursor-pointer q-gutter-md"
            align="right"
          >
            <q-route-tab
              v-for="(item,index) in menu"
              :key="index"
              :to="item.to"
              :label="item.label"
            >{{ item.label }}</q-route-tab>
          </q-tabs>
        </q-toolbar>
      </div>

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
          <div
            class="self-center full-width no-outline"
            tabindex="0"
          >{{community.tokenInitialPrice}}</div>
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
      <div class="text-center q-pt-lg">
        <q-btn label="Join" type="submit" color="primary" />
      </div>
    </div>
  </q-page>
</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          label: "About",
          to: "/communities/c1/about"
        },
        {
          label: "Token",
          to: "/communities/c1/token"
        },
        {
          label: "Members",
          to: "/communities/c1/members"
        }
      ]
    };
  },
  computed: {
    community() {
      return this.$store.getters["communities/detailsByAddress"](
        this.$route.params.address
      );
    }
  }
};
</script>
