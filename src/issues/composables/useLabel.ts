import { useQuery } from '@tanstack/vue-query';
import GithubApiService from 'src/api/GithubApiService';
import { IGithubIssueLabel } from '../interfaces';
import useIssuesStore from '../../stores/issues';
import { computed } from 'vue';

const getLabels = async (): Promise<IGithubIssueLabel[]> => {
  const { data } = await GithubApiService.get<IGithubIssueLabel[]>(
    '/labels?per_page=100'
  );

  return data;
};

const useLabel = () => {
  const issueStore = useIssuesStore();

  const labelsQuery = useQuery(['labels'], getLabels, {
    staleTime: 1000 * 60 * 60,
  });

  return {
    labelsQuery,
    toggleLabel: issueStore.toggleLabel,
    selectedLabels: computed<string[]>(() => issueStore.labels),
  };
};

export default useLabel;
