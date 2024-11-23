<script setup lang="ts">
import { useRoute } from 'vue-router';
import LoaderSpinner from 'src/shared/components/LoaderSpinner.vue';
import IssueCard from 'src/issues/components/issue-list/IssueCard.vue';
import useIssue from '../composables/useIssue';

const route = useRoute();
const { issueQuery, issueCommentsQuery } = useIssue(+route.params.id);
</script>
<template>
  <LoaderSpinner
    show-text
    size="5rem"
    :thickness="3"
    v-if="issueQuery.isLoading.value"
  />

  <div v-else class="q-pa-md">
    <router-link :to="{ name: 'issues-list' }">
      <q-btn
        label="Go Back"
        icon="arrow_back"
        color="positive"
        text-color="white"
      />
    </router-link>

    <IssueCard v-if="issueQuery.data.value" :issue="issueQuery.data.value" />

    <LoaderSpinner
      v-if="issueCommentsQuery.isLoading.value"
      :show-text="false"
      :thickness="1"
      size="3rem"
    />

    <div class="column" v-else-if="issueCommentsQuery.data.value">
      <span
        class="text-h3 q-mb-md"
        :style="
          issueCommentsQuery.data.value?.length == 0 ? 'text-align:center;' : ''
        "
        >{{
          issueCommentsQuery.data.value?.length
            ? 'Comments (' + issueCommentsQuery.data.value?.length + ')'
            : 'No Comments :('
        }}
      </span>
      <IssueCard
        v-for="comment in issueCommentsQuery.data.value"
        :key="comment.id"
        :issue="comment"
      />
    </div>
  </div>
</template>

<style>
.markdown-container div h3 {
  font-size: 2rem !important;
  font-weight: bold;
}
</style>
