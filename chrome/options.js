const patternElement = document.getElementById('pattern');
const tokenElement = document.getElementById('token');

const statusElement = document.getElementById('status');
const CLEANUP_DELAY = 750;
const DEFAULT_PATTERN = '${site.url}${user.token}';
const DEFAULT_TOKEN = '';
const storage = chrome.storage.sync;

// Saves options to chrome.storage
const save = () => {
  storage.set({
    pattern: patternElement.value,
    user: {
      token: tokenElement.value
    }
  }, () => {
    // Update status to let user know options were saved.
    statusElement.textContent = 'Options saved.';
    setTimeout(() => statusElement.textContent = '', CLEANUP_DELAY);
  });
};

// Restores preferences stored in chrome.storage.
const restore = () => {
  storage.get({
    pattern: DEFAULT_PATTERN,
    user: {
      token: DEFAULT_TOKEN
    }
  }, (data) => {
    patternElement.value = data.pattern;
    tokenElement.value = data.user.token;
  });
};

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);