$(function() {
  var current_status = "off";

  var timer = setInterval(function() {
    $.ajax({
      type: 'GET',
      dataType: 'json',
      url: '/votes/status',
      success: function(data) {
        if (data["status"] == "on") {
          current_status = "on";
          $("#number").hide();
          $("#time-remaining").html(parseInt(data["time_remaining"]) < 1 ? "<1" : data["time_remaining"]);
          var total = data["total"];
          var max = 0;
          $.each(data["bands"], function(key, value) {
            if (max <= value) max = value;
          });
          if (total != 0) {
            $.each(data["bands"], function(key, value) {
			  var percent = value/total;
			  console.log(percent + " | " + (450 - Math.floor(percent * 450) + "px"))
              $("#band-" + key).css('margin-top', (450 - Math.floor(percent * 450)) + "px");
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
