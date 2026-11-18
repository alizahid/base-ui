// only what touches this package counts, for the changelog and for working out
// the next version
const commits = {
  path: '.',
}

/** @type {import('release-it').Config} */
export default {
  // release-it fills in the version itself
  git: {
    // biome-ignore lint/suspicious/noTemplateCurlyInString: release-it's placeholder
    commitMessage: 'chore: release v${version}',
    // biome-ignore lint/suspicious/noTemplateCurlyInString: release-it's placeholder
    tagName: 'v${version}',
  },
  // a release on github for the tag, with the version's changelog as its
  // notes. needs GITHUB_TOKEN, which the release script takes from gh
  github: {
    release: true,
    // biome-ignore lint/suspicious/noTemplateCurlyInString: release-it's placeholder
    releaseName: 'v${version}',
  },
  plugins: {
    '@release-it/conventional-changelog': {
      commitsOpts: commits,
      gitRawCommitsOpts: commits,
      infile: 'changelog.md',
      preset: 'conventionalcommits',
      writerOpts: {
        // the changelog is the library's: commits for the docs site are left
        // out, even ones that touched a file here, and the rest lose their
        // scope, which would say "ui" on every line
        finalizeContext: (context) => ({
          ...context,
          commitGroups: context.commitGroups
            .map((group) => ({
              ...group,
              commits: group.commits
                .filter((commit) => commit.scope !== 'web')
                .map((commit) => ({
                  ...commit,
                  scope: null,
                })),
            }))
            .filter((group) => group.commits.length > 0),
        }),
      },
    },
  },
}
