import GithubApiService from 'src/api/GithubApiService';
import { IIssue, IssueState } from '../interfaces';
import { useQuery } from '@tanstack/vue-query';
import useIssuesStore from '../../stores/issues';
import { storeToRefs } from 'pinia';

const getIssues = async (
  labels: string[],
  state: IssueState
): Promise<IIssue[]> => {
  const params = new URLSearchParams();

  if (state) params.append('state', state);

  if (labels.length > 0) {
    const labelParams: string = labels.join(',');
    params.append('labels', labelParams);
  }

  params.append('per_page', '10');
  const { data } = await GithubApiService.get<IIssue[]>('/issues', {
    params,
  });

  return data;
};

const useIssues = () => {
  const issuesStore = useIssuesStore();
  const { labels, state } = storeToRefs(issuesStore);
  const issuesQuery = useQuery(['Issues', { labels, state }], () =>
    getIssues(labels.value, state.value)
  );

  return {
    issuesQuery,
  };
};

export default useIssues;
