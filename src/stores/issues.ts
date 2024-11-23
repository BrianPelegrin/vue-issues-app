import { defineStore } from 'pinia';
import { IIssue, IssueState } from 'src/issues/interfaces';
import { computed, ref } from 'vue';

const useIssuesStore = defineStore('issuesStore', () => {
  const state = ref<IssueState>(IssueState.All);

  const labels = ref<string[]>([]);

  return {
    //State
    state,
    labels,

    //Actions
    toggleLabel(labelName: string) {
      if (labels.value.includes(labelName)) {
        labels.value = labels.value.filter((label) => label != labelName);
        return;
      }

      labels.value.push(labelName);
    },
  };
});
export default useIssuesStore;
