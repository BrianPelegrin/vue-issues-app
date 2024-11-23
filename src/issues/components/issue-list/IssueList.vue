<script setup lang="ts">
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import { IIssue } from '../../interfaces/index';
interface IIssueListPage {
  issuesList: IIssue[];
}

const props = defineProps<IIssueListPage>();
</script>
<template>
  <div class="row">
    <IssueCard
      v-for="issue in props.issuesList"
      :issue="issue"
      :key="issue.id"
    />
  </div>
</template>

<style scoped></style>
