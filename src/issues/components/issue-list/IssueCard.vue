<script setup lang="ts">
import { IIssue, IssueState } from '../../interfaces/index';
import timeSince from '../../../shared/helpers/time-sice';
import VueMarkDown from 'vue-markdown-render';
import useIssue from '../../composables/useIssue';
interface IIssueCardProps {
  issue: IIssue;
}
const props = defineProps<IIssueCardProps>();
const { preFetch, setIssueCacheData } = useIssue(props.issue.number, {
  autoload: false,
});
</script>
<template>
  <q-card
    @mouseenter="setIssueCacheData(issue)"
    class="q-my-md col-12"
    style="color: #000"
    :style="`box-shadow: 0 0 8px 3px #000000${20} !important`"
    flat
    bordered
  >
    <!-- <q-card
    @mouseenter="preFetch(issue.number)"
    class="q-my-md col-12"
    style="color: #000"
    :style="`box-shadow: 0 0 8px 3px #000000${20} !important`"
    flat
    bordered
  > -->
    <q-item>
      <q-item-section avatar>
        <q-img :src="issue.user.avatar_url" alt="User Avatar" />
      </q-item-section>
      <q-item-label>
        {{ issue.user.login }}
      </q-item-label>
    </q-item>

    <q-item>
      <q-item-section>
        <q-item-label>
          <router-link
            :to="{
              name: 'issue-view',
              params: { id: issue.number },
            }"
          >
            {{ issue.title }}
          </router-link>
        </q-item-label>
        <q-item-label caption>
          {{ issue.created_at }} - {{ timeSince(issue.created_at) }}
        </q-item-label>
      </q-item-section>

      <q-item-section>
        <q-item-label class="row items-center justify-end">
          <q-item-label class="q-mr-md">
            <q-icon name="question_answer" />
            {{ issue.comments }}
          </q-item-label>
          <q-chip
            v-if="issue.state === IssueState.Closed"
            color="positive"
            text-color="white"
            icon="check"
          >
            Closed
          </q-chip>
          <q-chip v-else color="negative" text-color="white" icon="bug_report">
            Open
          </q-chip>
        </q-item-label>
      </q-item-section>
    </q-item>

    <q-separator />
    <q-item-section class="q-pa-md markdown-container">
      <vue-mark-down :source="issue.body || ''" />
    </q-item-section>
    <template v-if="issue.labels?.length">
      <q-separator />

      <q-item-section class="q-pa-xs q-gutter-xs">
        <div>
          <q-chip
            v-for="label in issue.labels"
            :key="label.id"
            :style="` background-color: #${label.color} !important; color: #fff; border-color: #${label.color} `"
            outline
          >
            {{ label.name }}
          </q-chip>
        </div>
      </q-item-section>
    </template>
  </q-card>
</template>

<style>
.markdown-container div h3 {
  font-size: 2rem !important;
  font-weight: bold;
}
.markdown-container div img {
  width: 850px !important;
}
</style>
