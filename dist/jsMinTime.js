/**
 * jsMinTime is a JavaScript tool that grants the developer the ability to establish a minimum amount of time that is to elapse prior to executing a function.
 *
 * @package jsMinTime
 * @copyright Copyright (c) 2016 Ryan Whitman (https://ryanwhitman.com)
 * @license https://opensource.org/licenses/MIT MIT
 * @version 1.0.0
 * @see https://github.com/RyanWhitman/jsmintime
 * @since 1.0.0
 */

var jsMinTime = function() {

	// Upon instantiation, grab the time
	this.startTime = new Date().getTime();
	
	// The execution functionality
	this.exe = function(func, minMillisecs, args) {

		// Grab the current time
		var timeCurrent = new Date().getTime();

		// Determine the amount of time that is remaining
		var timeRemaning = Math.max((this.startTime + minMillisecs) - timeCurrent, 0);

		// Create an array of arguments to pass to the execution function. Remove the first 2 arguments "func" and "minMillisecs"
		var args = Array.prototype.slice.call(arguments, 2);

		// Set a timeout that will run the execution function at the end of the remaining time. If the minimum time has already been surpassed, "timeRemaning" will be 0 and the functionality will run immediately.
		setTimeout(function() {
			func.apply(null, args);
		}, timeRemaning);
	};
};