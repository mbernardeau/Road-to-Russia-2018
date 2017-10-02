// needed for regenerator-runtime
// (ES7 generator support is required by redux-saga)
import 'babel-polyfill';

global.requestAnimationFrame = (callback) => {
  setTimeout(callback, 0);
};
