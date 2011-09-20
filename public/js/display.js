$(function() {
	
  var current_status = "off";
  var current_time = 10;
  var beak_position = "closed";

  function toggleBeak() {
	if(beak_position == "closed"){
	  $('#bird').css({ backgroundPosition: "-160px 0px"});
	  beak_position = "open";
	}else {
	  $('#bird').css({ backgroundPosition: "0px 0px"});
	  beak_position = "closed";
	}
  }

  function handleTime(remaining) {
    if(remaining != current_time) {
	
	  toggleBeak();
	  var closeBeak = window.setTimeout( toggleBeak, 1000 );
	  
	  if(remaining > 1) {
		var pos = 0 - ((remaining - 2) * 145);
	    $('#two-thru-ten').animate({ backgroundPosition: pos + 'px' }, 500);
	  } else if (remaining == 1) {
		$('#min-tray').animate({ marginLeft: "-459px" }, 500);
	  } else if (remaining < 1) {
		$('#min-tray').animate({ marginLeft: "-918px" }, 500);
	  }	  
    }
    current_time = remaining;
  }
  

  var timer = setInterval(function() {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/votes/status',
      success: function(data) {
        if (data["status"] == "on") {
          current_status = "on";
		  handleTime( parseInt(data['time_remaining']) );
		
          var total = data["total"];
          var max = 0;
          $.each(data["bands"], function(key, value) {
            if (max <= value) max = value;
          });
          if (total != 0) {
            $.each(data["bands"], function(key, value) {
			  var percent = value/total;
              $("#band-" + key).animate({ marginTop: (450 - Math.floor(percent * 450)) + "px"}, 250 );
            });
          }
        } else if (current_status == "on") {
          current_status = "off";
          clearInterval(timer);
        } else {
          $("#number").show();
        }
      }
    });
  }, 3000);
});
