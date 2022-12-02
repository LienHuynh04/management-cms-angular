module.exports = shipit => {
  // Load shipit-deploy tasks
  require('shipit-deploy')(shipit)

  shipit.initConfig({
    default: {
      workspace: './dist',
      keepWorkspace: false,
      repositoryUrl: '', // Skip fetching repo
      ignores: ['.git', 'node_modules', 'deploy'],
      deleteOnRollback: true,
      shallowClone: false,
      keepReleases: 2,
    },
    develop: {
      deployTo: '/var/www/wCRM-FE',
      servers: 'root@104.248.150.199',
      key: '',
      build: 'npm run build'
    },
  })

  shipit.blTask('deploy:build', async () => {
    await shipit.local(shipit.config.build)
  })

  shipit.on('deploy', async () => {
    await shipit.start(['deploy:build'])
  })
}
