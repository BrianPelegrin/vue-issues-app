import axios from 'axios';

const GithubApiService = axios.create({
  baseURL: `https://api.github.com/repos/${process.env.GITHUB_USER}/${process.env.GITHUB_REPO}/`,
});

export default GithubApiService;
