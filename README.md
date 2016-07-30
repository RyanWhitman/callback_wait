# jsMinTime
jsMinTime is a JavaScript tool that grants the developer the ability to establish a minimum amount of time that is to elapse prior to executing a function.

## Usage
**Instantiate Timer:** `var myVar = new jsMinTime();`

**Execute Function:** `myVar.exe(function, milliseconds, param1, param2, ...);`

## Example
```javascript
// Display the spinner and start jsMinTime
jQuery('#my-spinner').show();
var spinner = new jsMinTime();

// Make AJAX call
jQuery.ajax({
    url: '/my-url',
    success: function(res) {

        // Do stuff with the response
        do_stuff(res);
        
        // Hide the spinner - We want the spinner to display for a minimum of a half second. If the AJAX call was quick and took .25 secs, the spinner will be hidden after an additional .25 secs. If the AJAX call took a while and responded after 2 secs, the spinner will be hidden immediately. 
        spinner.exe(function() {
			jQuery('#my-spinner').hide();
		}, 500);
	});
```
