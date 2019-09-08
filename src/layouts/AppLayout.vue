<template>
  <!-- eslint-disable -->
  <q-layout view="hHh lpR fFf">
    <!-- <div class="row full-width"> -->

    <q-header elevated class="row full-width">
      <q-space class="col" />
      <q-toolbar class="col-12 col-sm-11 col-md-10">
        <q-toolbar-title class="q-px-xs-sm q-px-sm-xl">
          <q-btn
            flat
            no-caps
            size="lg"
            to="/"
            label="CommunitETHs"
            icon="nature_people"
            color="white"
          />
        </q-toolbar-title>
        <q-space />
        <!-- <q-btn flat dense round aria-label="Menu">
            <q-icon name="menu" />
        </q-btn>-->
      </q-toolbar>
      <q-space class="col" />
    </q-header>

    <!-- </div> -->

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "AppLayout",
  data() {
    return {
      rightDrawerOpen: false
    };
  },
  methods: {
    openURL
  }
};
</script>

<style></style>
