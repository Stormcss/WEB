$(document).ready(function() {
		
	// page is now ready, initialize the calendar...
		
	$('#calendar').fullCalendar({
		header: {
				left: 'prev,next today',
				center: 'title',
				right: 'month,agendaWeek,agendaDay',
				
		},
		
		eventClick: function(calEvent, jsEvent, view) {
            alert('Event: ' + calEvent.title);
            alert('Coordinates: ' + jsEvent.pageX + ',' + jsEvent.pageY);
            alert('View: ' + view.name);
    
            // change the border color just for fun
            $(this).css('border-color', 'red');

        },
        eventRender: function(event, element) {
            if(event.status == "booked") {
                element.css('background-color', '#f57c00');
            } else if (event.status == "free"){
                element.css('background-color', '#0A0');
            }
        },    
		themeSystem: 'jquery-ui',
		locale: 'ru',
		fixedWeekCount: false,
		buttonIcons: false,
		/*themeButtonIcons: false,*/
		navLinks: true, // can click day/week names to navigate views
		editable: false,
		eventLimit: true, // allow "more" link when too many events
			
		events: function (start, end, timezone, callback) {
			$.ajax({
				url: '../fullcalendar/Events/Events.json',
				type: "GET",
				datatype: 'json',
				success: function (doc) {
		var events = [];
		if ( doc != undefined && doc.length > 0 ) {
			doc.forEach( function( entry ) {
			    
			    //chech status. iF free or booked then show
			    
			    if (entry.status != 'occupied'){
    				events.push({
    					title: entry.title,
    					status: entry.status,
    					start: entry.start,
    					end:   entry.end
    				});	
			    }
			});
		}
		callback(events);
				},error: function (err) {
		alert('Error in fetching data');
				}
			});
		}
	});    
});