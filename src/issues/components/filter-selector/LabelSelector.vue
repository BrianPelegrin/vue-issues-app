<script setup lang="ts">
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import useLabel from '../../composables/useLabel';

const { labelsQuery, toggleLabel, selectedLabels } = useLabel();
</script>
<template>
  <div class="q-py-md">
    <LoaderSpinner
      v-if="labelsQuery.isLoading.value"
      size="50px"
      :thickness="3"
    />

    <template v-if="labelsQuery.data">
      <q-chip
        v-for="label in labelsQuery.data.value"
        :key="label.id"
        :style="
          selectedLabels.includes(label.name)
            ? ` background-color: #${label.color} !important; color: #fff; border-color: #${label.color} `
            : `color: #${label.color}`
        "
        outline
        clickable
        @click="toggleLabel(label.name)"
      >
        {{ label.name }}
      </q-chip>
    </template>
  </div>
</template>

<style scoped></style>
