<template>
  <q-layout
    view="hHh Lpr lFf"
    :class="layoutStore.isDark ? 'text-white bg-dark' : ''"
  >
    <q-header elevated>
      <q-toolbar :class="layoutStore.isDark ? 'bg-dark' : 'bg-positive'">
        <q-toolbar-title>
          <q-img
            v-if="!layoutStore.isDark"
            src="src/assets/logo-invertido.png"
            style="width: 50px; align-items: center"
          />
          <q-img
            v-else
            src="src/assets/logo.png"
            style="width: 50px; align-items: center"
          />
          Github Vue Issues
        </q-toolbar-title>
        <q-btn
          :icon="layoutStore.isDark ? 'brightness_4' : 'brightness_5'"
          flat
          round
          color="danger"
          @click="layoutStore.setLayouTheme(!layoutStore.isDark)"
        />
      </q-toolbar>
    </q-header>

    <q-page-container>
      <router-view />
    </q-page-container>
  </q-layout>
</template>

<script setup lang="ts">
import useLayoutStore from '../stores/layout';

const layoutStore = useLayoutStore();
</script>
