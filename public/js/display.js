$(function() {
	
  var current_status = "off";
  var current_time = 10;
  var beak_position = "closed";
  var difference = 0;

  //$('.ended').hide();

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
	
	    var top_vote_getter = Math.max(data['total']);
	    console.log(top_vote_getter);
	
        if (data["status"] == "on") {
          current_status = "on";
		  handleTime( parseInt(data['time_remaining']) );
		  $('.ended').hide();
          var total = data["total"];
          var max = 0;
          $.each(data["bands"], function(key, value) {
            if (max <= value) max = value;
          });
          if (total != 0) {
            $.each(data["bands"], function(key, value) {
			  var percent = value/total;
			  var original = 0;
			  if( value == top_vote_getter) {
				original = percent;
				percent = .9;
			  } else {
				original = percent;
				
			  }
			$("#band-" + key).animate({ marginTop: (450 - Math.floor(percent * 450)) + "px"}, 250 );
            });
          }
        } else if (current_status == "on") {
          current_status = "off";
          clearInterval(timer);
		  $('.ended').show();
        } else {
          $("#number").show();
        }
      }
    });
  }, 3000);
});
