(function($) {

	
	Array.prototype.getMax = function()	{
		var max = Number.MIN_VALUE, v, len = this.length, i = 0;
		for (; i < len; ++i)
		if (typeof (v = this[i]) == 'number')
		max = Math.max(max, v);
		return max;
	}
	
  var current_status = "off";
  var current_time = 10;
  var beak_position = "closed";
  var difference = 0;
	var count = 1;


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

	function set_time_and_go() {
		$('#countdown').css('display','block');
		$('#countdown').countDown({
			targetOffset: {
				'day': 		0,
				'month': 	0,
				'year': 	0,
				'hour': 	0,
				'min': 		10,
				'sec': 		0
			}, omitWeeks: true,
			onComplete: function() { 
				current_status = "off";
				$("#countdown").css("display","none");
				$('.ended').show();
				clearInterval(timer);
			}
		});
	}
	
	$('.ended').hide();
	$.each( $('.spot'), function() {
		$(this).animate( { opacity: 0 }, 0);
	});
	var timer = setInterval(function() {
	
		$('#spot_' + count.toString()).animate( { opacity: 0 }, 1000);
		count++;
		if( count > 3 ) count = 1;
		$('#spot_' + count.toString()).animate( { opacity: 1 }, 1000);
	
	
	
	
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/votes/status',
      success: function(data) {
	
	    var votes_array = [];
	    var total = data["total"];
	
	    for( var i in data["bands"]){
		  votes_array.push( parseInt(data["bands"][i]) )
	    }
	    var top_vote_getter = votes_array.getMax();
	
	    var top_percent = top_vote_getter / total;
	    var offset = 0;
	    if( top_percent <= 0.9) offset = 0.9 - top_percent;	
	
        if (data["status"] == "on") {
			if(current_status == "off") set_time_and_go();
          current_status = "on";
		  // handleTime( parseInt(data['time_remaining']) );
		  $('.ready').hide();
          
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
				if(percent > 0) percent = percent + offset;
				console.log(key + "  " + percent + " / offset = " + offset);
			  }
			$("#band-" + key).animate({ marginTop: (350 - Math.floor(percent * 350)) + "px"}, 250 );
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

}(jQuery));