<template>
  <div>
    <section class="row">
      <div class="row full-width">
        <q-space class="col" />
        <q-toolbar class="row justify-center">
          <div class="column col-10">
            <q-tabs
              v-model="tab"
              no-caps
              dense
              class="row text-grey text-center justify-center"
              active-color="primary"
              indicator-color="primary"
              narrow-indicator
            >
              <q-tab name="about" label="About" />
              <q-tab name="members" label="Members" />
            </q-tabs>
          </div>
        </q-toolbar>
        <q-space class="col" />
      </div>
    </section>
    <section class="row full-width">
      <q-space class="col" />

      <q-tab-panels v-model="tab" animated class="col-9">
        <q-tab-panel name="about">
          <div class="text-h6">About</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>

        <q-tab-panel name="members">
          <div class="text-h6">Members</div>Lorem ipsum dolor sit amet consectetur adipisicing elit.
        </q-tab-panel>
      </q-tab-panels>

      <q-space class="col" />
    </section>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: "about"
    };
  }
};
</script>
