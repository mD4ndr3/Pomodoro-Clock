  $(document).ready(function() {

    var setSessionLength = 1500000;
    var setBreakLength = 300000;
    var sessionRunning = false;
    var breakRunning = false;
    var clock;
    var remaining = setSessionLength;
    var clockInactive = true;

    //functions to turn milliseconds into minutes or seconds for display
    function formatMinutes(current) {
      var currentMinutes = Math.floor(current / 60000);
      if (currentMinutes > 9) {
        return currentMinutes;
      } else {
        return "0" + currentMinutes;
      }
    }

    function formatSeconds(current) {
      var currentSeconds = Math.floor((current % 60000) / 1000);
      if (currentSeconds > 9) {
        return currentSeconds;
      } else {
        return "0" + currentSeconds;
      }
    }

    //formatting and displaying the time in MM:SS on the session and break length displays.
    $("#session-length-display").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
    $("#break-length-display").html(formatMinutes(setBreakLength) + ":" + formatSeconds(setBreakLength));

    //changes the break and session lengths (only when clock in inactive or reset state)
    $("#session-plus").click(function() {
      if (setSessionLength < 108008000 && sessionRunning === false && clockInactive === true) {
        setSessionLength += 60000;
        remaining = setSessionLength;
        $("#session-length-display").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
        $("#timer").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
      }
    });

    $("#session-minus").click(function() {
      if (setSessionLength > 60000 && sessionRunning === false && clockInactive === true) {
        setSessionLength -= 60000;
        remaining = setSessionLength;
        $("#session-length-display").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
        $("#timer").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
      }
    });

    $("#break-plus").click(function() {
      if (setBreakLength < 10, 800, 8000 && sessionRunning === false && clockInactive === true) {
        setBreakLength += 60000;
        $("#break-length-display").html(formatMinutes(setBreakLength) + ":" + formatSeconds(setBreakLength));
      }
    });

    $("#break-minus").click(function() {
      if (setBreakLength > 60000 && sessionRunning === false && clockInactive === true) {
        setBreakLength -= 60000;
        $("#break-length-display").html(formatMinutes(setBreakLength) + ":" + formatSeconds(setBreakLength));
      }
    });

    //display the current break and session length on the main clock display
    $("#timer").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));

    //run the clock
    $("#start").click(function() {
      clockInactive = false;
      if (sessionRunning === false) {
        sessionRunning = true;
        clock = window.setInterval(clockRunning, 1000);
      }

      function clockRunning() {
        remaining -= 1000;
        if (remaining === 0) {
          $.playSound('http://www.noiseaddicts.com/samples_1w72b820/3724');
          if (breakRunning === false) {
            breakRunning = true;
            remaining = setBreakLength;
            $("#circle").css("background", "red");
            $("#session-or-break").html("Break");
          } else if (breakRunning === true) {
            breakRunning = false;
            remaining = setSessionLength;
            $("#circle").css("background", "green");
            $("#session-or-break").html("Session");
          }
        }
        $("#timer").html(formatMinutes(remaining) + ":" + formatSeconds(remaining));
      }
    });

    //handle pausing the clock
    $("#pause").on("click", function() {
      if (sessionRunning === true) {
        sessionRunning = false;
        window.clearInterval(clock);
      }
    });

    //handle resetting the clock
    $("#reset").on("click", function() {
      window.clearInterval(clock);
      sessionRunning = false;
      breakRunning = false;
      clockInactive = true;
      remaining = setSessionLength;
      $("#timer").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
      $("#circle").css("background", "green");
      $("#session-or-break").html("Session");
    });

    //use of playSound library
    (function($) {
      $.extend({
        playSound: function() {
          return $(
            '<audio autoplay="autoplay" style="display:none;">' + '<source src="' + arguments[0] + '.mp3" />' + '<source src="' + arguments[0] + '.ogg" />' + '<embed src="' + arguments[0] + '.mp3" hidden="true" autostart="true" loop="false" class="playSound" />' + '</audio>'
          ).appendTo('body');
        }
      });
      /**
       * @author Alexander Manzyuk <admsev@gmail.com>
       * Copyright (c) 2012 Alexander Manzyuk - released under MIT License
       * https://github.com/admsev/jquery-play-sound
       * Usage: $.playSound('http://example.org/sound.mp3');
       **/
    })(jQuery);
  });
