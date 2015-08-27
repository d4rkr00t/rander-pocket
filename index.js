'use strict';

exports.__esModule = true;

var _slicedToArray = (function () { function sliceIterator(arr, i) { var _arr = []; var _n = true; var _d = false; var _e = undefined; try { for (var _i = arr[Symbol.iterator](), _s; !(_n = (_s = _i.next()).done); _n = true) { _arr.push(_s.value); if (i && _arr.length === i) break; } } catch (err) { _d = true; _e = err; } finally { try { if (!_n && _i['return']) _i['return'](); } finally { if (_d) throw _e; } } return _arr; } return function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { return sliceIterator(arr, i); } else { throw new TypeError('Invalid attempt to destructure non-iterable instance'); } }; })();

exports.setup = setup;
exports.run = run;

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj['default'] = obj; return newObj; } }

function _toArray(arr) { return Array.isArray(arr) ? arr : Array.from(arr); }

var _messages = require('./messages');

var moduleMessages = _interopRequireWildcard(_messages);

var _tokens = require('./tokens');

var _tokens2 = _interopRequireDefault(_tokens);

var _commandsFavorite = require('./commands/favorite');

var _commandsFavorite2 = _interopRequireDefault(_commandsFavorite);

function setup(params, config, imports) {
  var messages = imports.messages;
  var request = imports.request;

  var _params = _slicedToArray(params, 1);

  var consumerKey = _params[0];

  if (!consumerKey) {
    moduleMessages.noConsumerKey(messages);
    return;
  }

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.start(messages);

    _tokens2['default'](request, messages, consumerKey).then(function (accessToken) {
      return moduleMessages.accessToken(messages, accessToken, consumerKey);
    })['catch'](function (err) {
      return messages.error(err.message);
    });
  } else {
    moduleMessages.noNeedSetup(messages);
  }
}

function run(params, config, imports) {
  var messages = imports.messages;

  var _params2 = _toArray(params);

  var command = _params2[0];

  var options = _params2.slice(1);

  if (!config.accessToken || !config.consumerKey) {
    moduleMessages.needSetup(messages, config.accessToken, config.consumerKey);
    return null;
  }

  switch (command) {
    case 'fav':
      return _commandsFavorite2['default'](options, config, imports);
    default:
      moduleMessages.commandNotFound(messages, command);
      return Promise.reject('Command not found');
  }
}