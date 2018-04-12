/**
 * Callback_Wait is a JavaScript tool that allows a developer to establish a minimum amount of time that must elapse prior to executing one or more callbacks. This tool is especially useful for delaying a quick AJAX response that may otherwise cause a spinner to flash on/off, or something to that nature. This software is designed to be >=IE11 compatible.
 *
 * @package Callback_Wait
 * @copyright Copyright (c) 2018 Ryan Whitman (https://ryanwhitman.com)
 * @license https://opensource.org/licenses/MIT MIT
 * @version 1.0.0
 * @see https://github.com/RyanWhitman/callback_wait
 */
var Callback_Wait = function(millisecs_to_wait) {

	// Store the start time.
	var start_time = new Date().getTime();

	// Default the millisecs.
	if (typeof millisecs_to_wait === 'undefined')
		millisecs_to_wait = 250;

	// Create an array to hold the callbacks.
	var callbacks = [];

	/**
	 * Add a callback.
	 *
	 * @param {Function}   func     The function to execute.
	 * @param {mixed}      ...args  Any number of arguments to pass to the callback function.
	 */
	this.add_callback = function(func) {
		callbacks.push({
			func: func,
			args: Array.prototype.slice.call(arguments, 1)
		});
	}

	/**
	 * Execute the callbacks. The callbacks will get executed after the minimum wait time has elapsed. Optionally pass in a callback. See add_callback() for argument definition.
	 */
	this.exe = function(func) {

		// If a callback was passed in, add it.
		if (typeof func === 'function') {
			var args = Array.prototype.slice.call(arguments, 1);
			args.unshift(func);
			this.add_callback.apply(null, args);
		}

		// Grab the current time.
		var current_time = new Date().getTime();

		// Determine the amount of time that is remaining.
		var time_remaining = Math.max((start_time + millisecs_to_wait) - current_time, 0);

		// Set a timeout that will loop through and execute the callbacks at the end of the remaining time. If the wait time has already elapsed, "time_remaining" will be 0 and the functionality will run immediately.
		setTimeout(function() {
			callbacks.forEach(function(obj) {
				obj.func.apply(null, obj.args);
			});
		}, time_remaining);
	};
};