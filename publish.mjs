// publish.js
import path from 'node:path';
import {fileURLToPath} from 'url';
import ghpages from 'gh-pages';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const distPath = path.join(__dirname, 'web/dist');

ghpages.publish(
  distPath,
  {
    branch: 'master',            // gh-pages repo usually uses master
    repo: 'git@github.com:ZVernam/zvernam.github.io.git',
    message: 'Deploy Vite build',
    silent: false,
    dotfiles: true,              // if you ever need .nojekyll
    logger: function (msg) {
      console.log(msg);
    },
  },
  function (err) {
    if (err) {
      console.error('❌ Error publishing:', err);
    } else {
      console.log('🎉 Successfully deployed to GitHub Pages!');
    }
  },
);
