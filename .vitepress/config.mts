import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "JN-Trail-Compass",
  description: "A VitePress Site",
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    socialLinks: [
      { icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  },
  base: '/jn-trail-compass/',
  locales: {
    root: {
      label: 'English',
      lang: 'en',
      link: '/',
      themeConfig: {
        sidebar: {
          '/git-&-github/': [
            { text: 'introduction-to-git', link: '/git-&-github/introduction-to-git' },
            { text: 'repository-initialization', link: '/git-&-github/repository-initialization' },
            { text: 'git-status-&-staging-area', link: '/git-&-github/git-status-&-staging-area' },
            { text: 'git-commit-&-history', link: '/git-&-github/git-commit-&-history' },
            { text: 'git-branching', link: '/git-&-github/git-branching' },
            { text: 'git-merging', link: '/git-&-github/git-merging' },
            { text: 'git-merging', link: '/git-&-github/git-merging' },
            { text: 'handling-merge-conflicts', link: '/git-&-github/handling-merge-conflicts' },
            { text: 'handling-merge-conflicts', link: '/git-&-github/handling-merge-conflicts' },
            { text: 'git-rebase', link: '/git-&-github/git-rebase' },
            { text: 'git-reset-checkout', link: '/git-&-github/git-reset-checkout' },
            { text: 'git-stash', link: '/git-&-github/git-stash' },
            { text: 'introduction-to-github', link: '/git-&-github/introduction-to-github' },
            { text: 'pushing-to-github', link: '/git-&-github/pushing-to-github' },
            { text: 'pull-requests', link: '/git-&-github/pull-requests' },
            { text: 'collaborating-with-teams', link: '/git-&-github/collaborating-with-teams' },
            { text: 'github-actions', link: '/git-&-github/github-actions' },
            { text: 'git-submodules', link: '/git-&-github/git-submodules' },
            { text: 'git-tags', link: '/git-&-github/git-tags' },
            { text: 'git-hooks', link: '/git-&-github/git-hooks' },
            { text: 'cherry-picking-changes', link: '/git-&-github/cherry-picking-changes' },
            { text: 'git-bisect', link: '/git-&-github/git-bisect' },
            { text: 'git-with-large-project', link: '/git-&-github/git-with-large-project' },
            { text: 'git-with-ci-cd', link: '/git-&-github/git-with-ci-cd' },
            { text: 'reverting-changes-and-handling-history', link: '/git-&-github/reverting-changes-and-handling-history' },
            { text: 'git-workflow-for-teams', link: '/git-&-github/git-workflow-for-teams' },
            { text: 'handling-multiple-remotes', link: '/git-&-github/handling-multiple-remotes' },
          ]
        }
      }
    },
    th: {
      label: 'ภาษาไทย',
      lang: 'th-TH',
      link: '/th/',
      themeConfig: {
        sidebar: {
          '/th/git-&-github/': [
            { text: 'introduction-to-git', link: '/th/git-&-github/introduction-to-git' },
            { text: 'repository-initialization', link: '/th/git-&-github/repository-initialization' },
            { text: 'git-status-&-staging-area', link: '/th/git-&-github/git-status-&-staging-area' },
            { text: 'git-commit-&-history', link: '/th/git-&-github/git-commit-&-history' },
            { text: 'git-branching', link: '/th/git-&-github/git-branching' },
            { text: 'git-merging', link: '/th/git-&-github/git-merging' },
            { text: 'handling-merge-conflicts', link: '/th/git-&-github/handling-merge-conflicts' },
            { text: 'git-rebase', link: '/th/git-&-github/git-rebase' },
            { text: 'git-reset-checkout', link: '/th/git-&-github/git-reset-checkout' },
            { text: 'git-stash', link: '/th/git-&-github/git-stash' },
            { text: 'introduction-to-github', link: '/th/git-&-github/introduction-to-github' },
            { text: 'pushing-to-github', link: '/th/git-&-github/pushing-to-github' },
            { text: 'pull-requests', link: '/th/git-&-github/pull-requests' },
            { text: 'collaborating-with-teams', link: '/th/git-&-github/collaborating-with-teams' },
            { text: 'github-actions', link: '/th/git-&-github/github-actions' },
            { text: 'git-submodules', link: '/th/git-&-github/git-submodules' },
            { text: 'git-tags', link: '/th/git-&-github/git-tags' },
            { text: 'git-hooks', link: '/th/git-&-github/git-hooks' },
            { text: 'cherry-picking-changes', link: '/th/git-&-github/cherry-picking-changes' },
            { text: 'git-bisect', link: '/th/git-&-github/git-bisect' },
            { text: 'git-with-large-project', link: '/th/git-&-github/git-with-large-project' },
            { text: 'git-with-ci-cd', link: '/th/git-&-github/git-with-ci-cd' },
            { text: 'reverting-changes-and-handling-history', link: '/th/git-&-github/reverting-changes-and-handling-history' },
            { text: 'git-workflow-for-teams', link: '/th/git-&-github/git-workflow-for-teams' },
            { text: 'handling-multiple-remotes', link: '/th/git-&-github/handling-multiple-remotes' },
          ]
        }
      }
    }
  }
})
