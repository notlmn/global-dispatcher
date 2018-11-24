/*! (c) Laxman Damera */

var allSubscriptions = [];

function assertEventName(eventName) {
	if (typeof eventName !== 'string') {
		throw new TypeError('eventName must be a string');
	}
}

function assertListener(listener) {
	if (typeof listener !== 'function') {
		throw new TypeError('listener must be a function');
	}
}

function subscribe(eventName, listener) {
	assertEventName(eventName);
	assertListener(listener);

	if (!allSubscriptions[eventName]) {
		allSubscriptions[eventName] = [];
	}

	allSubscriptions[eventName].push(listener);

	// Return a function that can be used to unsubscribe
	return function() {
		var subscribers = allSubscriptions[eventName];
		var indexOfListener = subscribers.indexOf(listener);

		subscribers.splice(indexOfListener, 1);
	};
}

function dispatch(eventName, eventData) {
	assertEventName(eventName);

	var subscribers = allSubscriptions[eventName] || [];
	var promises = [];

	for (var i = 0, len = subscribers.length; i < len; i++) {
		promises.push(new Promise(function () {
			subscribers[i](eventData);
		}));
	}

	return Promise.all(promises);
}

function dispatchSync(eventName, eventData) {
	assertEventName(eventName);

	var subscribers = allSubscriptions[eventName] || [];
	for (var i = 0, len = subscribers.length; i < len; i++) {
		subscribers[i](eventData);
	}
}

export {
  subscribe,
  dispatch,
  dispatchSync
}

