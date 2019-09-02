<template>
  <!-- eslint-disable -->
  <q-layout view="hHh lpR fFf">
    <q-header elevated>
      <q-toolbar>
        <q-toolbar-title class="q-px-xs-sm q-px-sm-xl">
          <router-link to="/">
            <q-btn flat no-caps color="white" class="q-py-none q-my-none">
              CommunitETHs
            </q-btn>
          </router-link>
        </q-toolbar-title>
        <q-space />
        <q-btn flat dense round aria-label="Menu">
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
