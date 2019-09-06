<template>
  <!-- eslint-disable -->
  <div class="column text-center">
    <section class="column text-center q-px-xs-xs q-px-sm-sm q-px-md-md">
      <div class="row justify-center">
        <div class="col-auto row bg-white q-pa-sm rounded-borders justify-evenly q-gutter-sm">
          <!-- UNCOMMENT FOR PRODUCTION -->
          <!-- <div v-for="(member, index) in members" :key="index" class="col-grow"> -->
          <!-- UNCOMMENT FOR DEVELOPMENT -->
          <div v-for="member in 15" :key="member" class="col-10 col-sm-5 col-md-3 justify-evenly">
            <q-card>
              <q-card-section class="row items-center">
                <q-avatar color="grey-7" text-color="white" icon="account_circle" class="q-mr-sm" />
                <div>Member-{{ member }}</div>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  // computed: {
  //   members() {
  //     const { members } = this.$store.getters["communities/detailsByAddress"](
  //       this.$route.params.address
  //     );
  //     return members;
  //   }
  // }
};
</script>
