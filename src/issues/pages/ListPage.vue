<script setup lang="ts">
import FilterSelector from 'src/issues/components/filter-selector/FilterSelector.vue';
import IssueList from 'src/issues/components/issue-list/IssueList.vue';
import useIssues from '../composables/useIssues';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';

const { issuesQuery } = useIssues();
</script>

<template>
  <div class="q-pa-md">
    <div class="row q-mb-md">
      <div class="col-12">
        <span class="text-h2"> Vue Issues </span>
      </div>
    </div>
    <div class="row">
      <div class="col-xs-12 col-md-4">
        <!-- TODO: Filtro -->
        <!-- Filter Selecction -->
        <FilterSelector />
      </div>
      <div class="col-xs-12 col-md-8">
        <LoaderSpinner v-if="issuesQuery.isLoading.value" />
        <template v-else-if="issuesQuery.data.value?.length">
          <IssueList :issues-list="issuesQuery.data.value" />
        </template>
        <template v-else>
          <h3 style="text-align: center">No Issues found :'(</h3>
        </template>
      </div>
    </div>
  </div>
</template>

<style scoped></style>
