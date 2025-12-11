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

    return chrome.storage.sync.set(data);
  },
  load() {
    return chrome.storage.sync.get().then((items) => fillElements(items ? items : defaultValues));
  },
  reset() {
    fillElements(defaultValues);
    return this.save(defaultValues);
  }
};

const statusElement = document.getElementById('status');
const handlePromise = (promise, successMessage, failMessage) => promise.
  then(() => statusElement.textContent = successMessage).
  catch(({message = failMessage}) => statusElement.textContent = message).
  then(() => window.setTimeout(() => statusElement.textContent = '', CLEANUP_DELAY));

// Saves options to chrome.storage
const save = () => handlePromise(myStorage.save(), 'Options saved.', 'Failed to save options.');

// Drop options to defaults
const reset = () => handlePromise(myStorage.reset(), 'Options have been dropped.', 'Failed to reset options.');

// Loads preferences stored in chrome.storage.
const restore = () => handlePromise(myStorage.load(), 'Options were loaded successfully.', 'Failed to load options.');

document.addEventListener('DOMContentLoaded', restore);
document.getElementById('save').addEventListener('click', save);
document.getElementById('reset').addEventListener('click', reset);
