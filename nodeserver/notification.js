const notifier = require('node-notifier');
// String
notifier.notify('ALERT!!!!!');

// Object
notifier.notify({
  title: 'FAULT FOUND',
  message: 'Please Check Your Dashboard!'
});
