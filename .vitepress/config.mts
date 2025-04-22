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
          ],
          '/linux/': [
            { text: 'introduction-to-linux', link: '/linux/introduction-to-linux' },
            { text: 'basic-linux-commands', link: '/linux/basic-linux-commands' },
            { text: 'file-system-structure-and-permissions', link: '/linux/file-system-structure-and-permissions' },
            { text: 'user-management-and-groups', link: '/linux/user-management-and-groups' },
            { text: 'package-management', link: '/linux/package-management' },
            { text: 'advanced-file-permissions-and-access-control', link: '/linux/advanced-file-permissions-and-access-control' },
            { text: 'file-search', link: '/linux/file-search' },
            { text: 'file-compression-and-archiving', link: '/linux/file-compression-and-archiving' },
            { text: 'disk-management', link: '/linux/disk-management' },
            { text: 'backup-and-restore-data', link: '/linux/backup-and-restore-data' },
            { text: 'process-management', link: '/linux/process-management' },
            { text: 'system-services', link: '/linux/system-services' },
            { text: 'process-scheduling', link: '/linux/process-scheduling' },
            { text: 'cron', link: '/linux/cron' },
            { text: 'logs-and-system-monitoring', link: '/linux/logs-and-system-monitoring' },
            { text: 'managing-services', link: '/linux/managing-services' },
            { text: 'network-configuration', link: '/linux/network-configuration' },
            { text: 'firewall-configuration', link: '/linux/firewall-configuration' },
            { text: 'secure-ssh-access', link: '/linux/secure-ssh-access' },
            { text: 'file-encryption-and-secure-file-transfer', link: '/linux/file-encryption-and-secure-file-transfer' },
            { text: 'security-best-practices', link: '/linux/security-best-practices' },
            { text: 'performance-tuning', link: '/linux/performance-tuning' },
            { text: 'using-docker-with-linux', link: '/linux/using-docker-with-linux' },
            { text: 'virtualization-with-kvm', link: '/linux/virtualization-with-kvm' },
            { text: 'linux-kernel-compilation', link: '/linux/linux-kernel-compilation' },
            { text: 'system-monitoring-and-automation', link: '/linux/system-monitoring-and-automation' },
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
          ],
          '/th/linux/': [
            { text: 'introduction-to-linux', link: '/th/linux/introduction-to-linux' },
            { text: 'basic-linux-commands', link: '/th/linux/basic-linux-commands' },
            { text: 'file-system-structure-and-permissions', link: '/th/linux/file-system-structure-and-permissions' },
            { text: 'user-management-and-groups', link: '/th/linux/user-management-and-groups' },
            { text: 'package-management', link: '/th/linux/package-management' },
            { text: 'advanced-file-permissions-and-access-control', link: '/th/linux/advanced-file-permissions-and-access-control' },
            { text: 'file-search', link: '/th/linux/file-search' },
            { text: 'file-compression-and-archiving', link: '/th/linux/file-compression-and-archiving' },
            { text: 'disk-management', link: '/th/linux/disk-management' },
            { text: 'backup-and-restore-data', link: '/th/linux/backup-and-restore-data' },
            { text: 'process-management', link: '/th/linux/process-management' },
            { text: 'system-services', link: '/th/linux/system-services' },
            { text: 'process-scheduling', link: '/th/linux/process-scheduling' },
            { text: 'cron', link: '/th/linux/cron' },
            { text: 'logs-and-system-monitoring', link: '/th/linux/logs-and-system-monitoring' },
            { text: 'managing-services', link: '/th/linux/managing-services' },
            { text: 'network-configuration', link: '/th/linux/network-configuration' },
            { text: 'firewall-configuration', link: '/th/linux/firewall-configuration' },
            { text: 'secure-ssh-access', link: '/th/linux/secure-ssh-access' },
            { text: 'file-encryption-and-secure-file-transfer', link: '/th/linux/file-encryption-and-secure-file-transfer' },
            { text: 'security-best-practices', link: '/th/linux/security-best-practices' },
            { text: 'performance-tuning', link: '/th/linux/performance-tuning' },
            { text: 'using-docker-with-linux', link: '/th/linux/using-docker-with-linux' },
            { text: 'virtualization-with-kvm', link: '/th/linux/virtualization-with-kvm' },
            { text: 'linux-kernel-compilation', link: '/th/linux/linux-kernel-compilation' },
            { text: 'system-monitoring-and-automation', link: '/th/linux/system-monitoring-and-automation' },
          ]
        }
      }
    }
  }
})
