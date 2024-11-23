<script setup lang="ts">
import { IssueState } from 'src/issues/interfaces';
import useIssuesStore from '../../../stores/issues';

const issuesState = useIssuesStore();
</script>
<template>
  <q-btn-toggle
    toggle-color="positive"
    spread
    v-model="issuesState.state"
    :options="[
      { label: 'All', value: IssueState.All },
      { label: 'Open', value: IssueState.Open },
      { label: 'Closed', value: IssueState.Closed },
    ]"
  >
  </q-btn-toggle>
</template>

<style scoped></style>
