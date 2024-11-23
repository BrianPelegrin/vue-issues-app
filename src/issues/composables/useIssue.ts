import GithubApiService from 'src/api/GithubApiService';
import { IIssue } from '../interfaces';
import { useQuery, useQueryClient } from '@tanstack/vue-query';
import { computed } from 'vue';

const getIssue = async (issueNumber: number): Promise<IIssue> => {
  const { data } = await GithubApiService.get<IIssue>(`/issues/${issueNumber}`);
  return data;
};

const getIssueComments = async (issueNumber: number): Promise<IIssue[]> => {
  const { data } = await GithubApiService.get<IIssue[]>(
    `/issues/${issueNumber}/comments`
  );

  return data;
};

interface IOptions {
  autoload?: boolean;
}

const useIssue = (issueNumber: number, options?: IOptions) => {
  const queryClient = useQueryClient();

  const { autoload = true } = options || {};

  const issueQuery = useQuery(
    ['issue', issueNumber],
    () => getIssue(issueNumber),
    {
      enabled: autoload,
    }
  );

  const issueCommentsQuery = useQuery(
    ['issue', issueNumber, 'comments'],
    () => getIssueComments(issueQuery.data.value?.number || 0),
    {
      enabled: computed<boolean>(() => !!issueQuery.data.value),
    }
  );

  const preFetch = (preIssueNumber: number): void => {
    queryClient.prefetchQuery(['issue', preIssueNumber], () =>
      getIssue(preIssueNumber)
    );

    queryClient.prefetchQuery(
      ['issue', preIssueNumber, 'comments'],
      () => getIssueComments(preIssueNumber),
      {
        staleTime: 1000 * 15,
      }
    );
  };

  const setIssueCacheData = (issue: IIssue) => {
    queryClient.setQueryData(['issue', issue.number], issue);
  };

  return { issueQuery, issueCommentsQuery, preFetch, setIssueCacheData };
};

export default useIssue;
