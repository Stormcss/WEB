$(document).ready(function() {
    
	var dateAdd;
	
	function drawAddButtons(){
	    $('.fc-day-number').after('<span class="event-add-button">[+]</span>');
	    $('.event-add-button').click(function(){
    	    var data = jQuery.parseJSON( $(this).prev().attr("data-goto"));
    	    dateAdd = data.date;
            $('.header-window').text('Добавить запись на ' + dateAdd);
            $('#editAdminEventWindow').show();
        });
	}
	
	function addButtonsDrawn(){
	    return !$('.fc-day-number').next().is('span');
	}
	
	function saveButtonAction(){
	    var events = new Array();
	    event = new Object();
	    console.log('dateAdd '+dateAdd );
        console.log('!!!!!!!!!!!! Start: year'+dateAdd.substring(0, 4)+' / month: '+(dateAdd.substring(5, 7))+' / day: '+dateAdd.substring(8, 10));
        
        dateStart = new Date();
	    dateEnd = new Date();
	    
	    dateStart = new Date(dateAdd.substring(0, 4), dateAdd.substring(5, 7)-1, dateAdd.substring(8, 10), $('#add-time-start').val().substring(0,2), $('#add-time-start').val().substring(3,5));
	    dateEnd = new Date(dateAdd.substring(0, 4), dateAdd.substring(5, 7)-1, dateAdd.substring(8, 10), $('#add-time-end').val().substring(0,2), $('#add-time-end').val().substring(3,5));

	    
	    /*dateStart.setFullYear(dateAdd.substring(0, 4)); dateEnd.setFullYear(dateAdd.substring(0, 4));
	    dateStart.setMonth(dateAdd.substring(6, 7)-1); dateEnd.setMonth(dateAdd.substring(6, 7)-1);
	    dateStart.setDate(dateAdd.substring(9, 10)); dateEnd.setDate(dateAdd.substring(9, 10));

        dateStart.setHours($('#add-time-start').val().substring(0,2)); dateEnd.setHours($('#add-time-start').val().substring(3,5));
        dateStart.setMinutes($('#add-time-end').val().substring(0,2)); dateEnd.setMinutes($('#add-time-end').val().substring(3,5));*/
        
	    $('#editAdminEventWindow').hide();

	    event.title = "Свободно"; // this should be string
        event.start = dateStart;// + ' ' +$('add-time-start').text() + ':00';
        event.end = dateEnd; // this should be date object
        event.status = "free";
        events.push(event);
        console.log('added new event. START EVENT is: ' + event.start + ' / END EVENT is:' + event.end + ' / status: ' + event.status);
        
        $('#calendar-admin').fullCalendar('addEventSource',events);
        
        listEvents = $('#calendar-admin').fullCalendar('clientEvents');
        
        let json = JSON.stringify($("#calendar-admin").fullCalendar("clientEvents").map(e => ({
                start: e.start,
                status: e.status,
                end: e.end,
                title: e.title
            })));
            
     //commented temporary   
/*
        var url ="../fullcalendar/php/saveEvents.php";
        $.post(url, {json: json}, function(data){
            console.log('response from the callback function: '+ data); 
        }).fail(function(jqXHR){
            alert(jqXHR.status +' '+jqXHR.statusText+ ' $.post failed!');
        });

        console.log('ALL! ' + JSON.stringify(json));*/
	}
		
		
	$('#calendar-admin').fullCalendar({
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
        eventAfterAllRender: function(event){
            //alert(event.title);
            if (addButtonsDrawn()===true) drawAddButtons();
            console.log("LEEEEEENGTH is " + $('#calendar-admin').fullCalendar('clientEvents').length);
            //console.log('ALL! ' + JSON.stringify($('#calendar-admin').fullCalendar('clientEvents')));
            
            /*let json = JSON.stringify($("#calendar-admin").fullCalendar("clientEvents").map(e => ({
                start: e.start,
                status: e.status,
                end: e.end,
                title: e.title
            })));
        
            console.log(json);*/
        },

        navLinkDayClick: function(date, jsEvent) {
            console.log('day', date.format()); // date is a moment
            console.log('coords', jsEvent.pageX, jsEvent.pageY);
        },
        eventRender: function(event, element) {
            if(event.status == "booked") {
                element.css('background-color', '#f57c00');
            } else if (event.status == "free"){
                element.css('background-color', '#0A0')
            } else if (event.status == "occupied"){
                element.css('background-color', '#F00')   
            }
        },    
		themeSystem: 'jquery-ui',
		locale: 'ru',
		fixedWeekCount: false,
		buttonIcons: false,
		/*themeButtonIcons: false,*/
		navLinks: true, // can click day/week names to navigate views
		editable: true,
		eventLimit: false, // allow "more" link when too many events
		height: 750,	
		events: function (start, end, timezone, callback) {
			$.ajax({
				url: '../fullcalendar/Events/Events.json',
				type: "GET",
				datatype: 'json',
				success: function (doc) {
		var events = [];
		if ( doc != undefined && doc.length > 0 ) {
			doc.forEach( function( entry ) {
			    
    			events.push({
    				title: entry.title,
    				status: entry.status,
    				start: entry.start,
    				end:   entry.end
    			});	
			    
			});
		}
		callback(events);
				},error: function (err) {
		alert('Error in fetching data');
				}
			});
		}
	});    
	


    $('#add-time-start').mask("99:99");
    $('#add-time-end').mask("99:99");
    
    
    $('#editAdminEventWindow #close').click(function(){
        $('#editAdminEventWindow').hide();
    });
    $('#editAdminEventWindow #save').click(function(){
        saveButtonAction();
    });
    
    $('.fc-left').click(function(){
        allowDrawAddButtons = true;
    });
    
    
    

    
});