module.exports = {
  apps: [
    {
      name: 'prod',
      script: 'dist/server.js',
      exec_mode: 'fork', // to run in fork mode for prevent memory leak
      instances: 1,
      autorestart: true, // auto restart if process crash
      watch: false, // files change automatic restart
      ignore_watch: ['node_modules', 'logs'], // ignore files change
      max_memory_restart: '1G', // restart if process use more than 1G memory
      merge_logs: true, // if true, stdout and stderr will be merged and sent to pm2 log
      output: './logs/access.log', // pm2 log file
      error: './logs/error.log', // pm2 error log file
      env: {
        PORT: 8080,
        NODE_ENV: 'production',
      },
    },
  ],
}
