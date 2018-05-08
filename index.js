'use strict';

/**
 * Global subscriptions handler
 *
 * Usage:
 * ```
 * const unsubscribe = subscribe('event', (...args) => console.log(...args));
 *
 * // ...
 *
 * unsubscribe();
 * ```
 *
 * Somewhere else in the code land
 * ```
 * dispatch('event', 'a', 'b');
 * ```
 */

const subsMap = new Map();

/**
 * Adds a new subscriber to the list
 *
 * @param {*} event Any object that can be identified as an event
 * @param {Function} callback Function that needs to be called for the event
 * @returns {Function} Function that when called, unsubscribes the callback
 */
const subscribe = (event, callback) => {
  const subscribers = subsMap.get(event) || new Set();
  subscribers.add(callback);
  subsMap.set(event, subscribers);

  // Return a function that can be used to unsubscribe
  return () => {
    subscribers.delete(callback);
  };
};

/**
 * Dispatch an event, all subscribers for that event are called with the given arguments
 *
 * @param {*} event Any object used before to subscribe events
 * @param {...*} data List of arguments to call each listener with
 */
const dispatch = (event, ...data) => {
  const subscribers = subsMap.get(event);

  if (subscribers) {
    for (const subscriber of subscribers) {
      subscriber(...data);
    }
  }
};

module.exports = {
  subscribe,
  dispatch
};
