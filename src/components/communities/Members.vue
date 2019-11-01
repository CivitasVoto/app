<template>
  <div class="row q-gutter-sm justify-center">
    <div v-for="(member, index) in members" :key="index" class="col-5">
      <q-card>
        <q-card-section class="row items-center">
          <q-avatar
            color="grey-7"
            text-color="white"
            :icon="owner == member ? 'fas fa-crown' : 'account_circle'"
            class="q-mr-md"
          />
          <div class="ellipsis">{{ member }}</div>
        </q-card-section>
      </q-card>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      owner: "0x0"
    };
  },
  mounted() {
    const { owner } = this.$store.getters["communities/detailsByAddress"](
      this.$route.params.address
    );
    this.owner = owner;
  },
  computed: {
    members() {
      const { members } = this.$store.getters["communities/detailsByAddress"](
        this.$route.params.address
      );
      return members;
    }
  }
};
</script>
