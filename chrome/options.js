const CLEANUP_DELAY = 750;

const mapping = {
  pattern: {
    id: 'pattern',
    defaultValue: '${site.url}${user.token}'
  },
  token: {
    id: 'token',
    defaultValue: ''
  },
  hashed: {
    id: 'hashed',
    defaultValue: true
  }
};

const storage = chrome.storage.sync;
const runtime = chrome.runtime;

const defaultValues = {};
for (const [name, value] of Object.entries(mapping)) {
  value.element = document.getElementById(value.id);
  defaultValues[name] = value.defaultValue;
}

const fillElements = (data) => {
  for (const [name, value] of Object.entries(data)) {
    const {element} = mapping[name];
    switch (typeof value) {
      case 'boolean':
        element.checked = value;
        break;
      default:
        element.value = value;
    }
  }
};

const promisify = (fn) => {
  return (...args) => new Promise((onSuccess, onFail) => {
    fn(...args, (data) => {
      if (runtime.lastError) {
        onFail(runtime.lastError);
      } else {
        onSuccess(...(data ? [data] : args));
      }
    });
  });
};

const handlePromise = (promise, successMessage, failMessage) => promise.
  then(() => statusElement.textContent = successMessage).
  catch(({message = failMessage}) => statusElement.textContent = message).
  then(() => setTimeout(() => statusElement.textContent = '', CLEANUP_DELAY));


const myStorage = {
  save() {
    const data = {};

    for (const [name, value] of Object.entries(mapping)) {
      const input = value.element;
      if (input.type === `checkbox`) {
        data[name] = input.checked;
      } else {
        data[name] = input.value;
      }
    }

    return promisify(storage.set)(data);
  },
  load() {
    return promisify(storage.get)(defaultValues).then(fillElements);
  },
  reset() {
    fillElements(defaultValues);
    return this.save(defaultValues);
  }
};

const statusElement = document.getElementById('status');

// Saves options to chrome.storage
const save = () => handlePromise(myStorage.save(), 'Options saved.', 'Failed to save options.');

// Drop options to defaults
const reset = () => handlePromise(myStorage.reset(), 'Options have been dropped.', 'Failed to reset options.');

// Loads preferences stored in chrome.storage.
const restore = () => handlePromise(myStorage.load(), 'Options were loaded successfully.', 'Failed to load options.');

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
document.getElementById('reset').addEventListener('click', reset);