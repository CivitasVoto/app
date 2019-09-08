<template>
  <div>
    <section class="row">
      <div class="row full-width">
        <!-- <q-space v-if="$q.screen.gt.xs" /> -->
        <q-toolbar class="row justify-center">
          <div class="column col-12">
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
        <!-- <q-space v-if="$q.screen.gt.xs" /> -->
      </div>
    </section>
    <section class="row full-width justify-center bg-grey-4">
      <q-tab-panels v-model="tab" animated class="bg-grey-4 col-sm-10">
        <q-tab-panel name="about">
          <CommunityAbout />
        </q-tab-panel>

        <q-tab-panel name="members">
          <CommunityMembers />
        </q-tab-panel>
      </q-tab-panels>
    </section>
  </div>
</template>

<script>
import CommunityMembers from "src/components/communities/Members";
import CommunityAbout from "src/components/communities/About";

export default {
  data() {
    return {
      tab: "about"
    };
  },
  components: {
    CommunityMembers,
    CommunityAbout
  }
};
</script>
