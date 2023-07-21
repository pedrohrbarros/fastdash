module.exports = {
  apps : [{
    script: 'npm start'
  }],

  deploy : {
    production : {
      key: 'fastdash.pem',
      user : 'ubuntu',
      host : '54.235.6.123',
      ref  : 'origin/master',
      repo : 'git@github.com:pedrohrbarros/fastdash.git',
      path : '/home/ubuntu',
      'pre-deploy-local': '',
      'post-deploy' : 'source ~/.nvm/nvm.sh && npm install && npm run build &&  pm2 reload ecosystem.config.js --env production',
      'pre-setup': '',
      'ssh_options': 'ForwardAgent=yes'
    }
  }
};
