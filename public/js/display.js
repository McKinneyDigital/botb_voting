$(function() {
	
  var current_status = "off";
  var current_time = 10;

  function handleTime(remaining) {
    if(remaining != current_time) {
	
	  $('#bird').addClass("caw").delay(2000).removeClass("caw");
	
	  if(remaining > 1) {
		var pos = 0 - ((remaining - 2) * 145);
	    $('#two-thru-ten').animate({ backgroundPosition: pos + 'px' }, 500);
	  } else if (remaining == 1) {
	    $('#two-thru-ten').remove();
	    $('#time_remaining').css({ background: "none" }).css({ background : "url(/images/numbers/1min.png)" });
	  } else if (remaining < 1) {
	    $('#time_remaining').css({ background: "none" }).css({ background: "url(/images/numbers/lessthan1.png)" });
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
          // $("#header").css({background:"url(/assets/images/off_state.jpg) no-repeat"});
          $("#time-remaining").html("0");
          clearInterval(timer);
        } else {
          $("#number").show();
        }
      }
    });
  }, 3000);
});
