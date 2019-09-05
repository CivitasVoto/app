<template>
  <!-- eslint-disable -->
  <div class="column text-center">
    <!-- <section>
      <div class="col q-py-sm q-pt-lg">Members</div>
    </section>-->
    <section class="column text-center q-px-xs-xs q-px-sm-sm q-px-md-md">
      <div class="row justify-center q-gutter-lg">
        <div v-for="(member, index) in members" :key="index" class="col-grow">
          <q-card class="col-grow">
            <q-card-section class="row items-center">
              <q-avatar color="grey-7" text-color="white" icon="account_circle" class="q-mr-sm" />
              <div>{{ member }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
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
