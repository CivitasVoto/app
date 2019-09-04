<template>
  <div class="column text-center">
    <section>
      <div class="col q-py-sm q-pt-lg">Members</div>
    </section>
    <section class="column text-center q-px-xs-xs q-px-sm-sm q-px-md-md">
      <div class="row justify-center q-gutter-lg">
        <div v-for="n in 33" :key="n" class="col-grow">
          <q-card class="col-grow">
            <q-card-section class="row items-center">
              <q-avatar color="grey-7" text-color="white" icon="account_circle" class="q-mr-sm" />
              <div>Member-{{ n }}</div>
            </q-card-section>
          </q-card>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      n: 1
    };
  }
};
</script>
