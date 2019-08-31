<template>
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="q-px-xs-sm q-px-sm-xl">
          CommunitEths
        </q-toolbar-title>
        <q-space />
        <q-btn
          flat
          dense
          round
          aria-label="Menu"
        >
          <q-icon name="menu" />
        </q-btn>


      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script>
import { openURL } from "quasar";

export default {
  name: "MyLayout",
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
