$(document).ready(function() {

  var setSessionLength = 3000;
  var setBreakLength = 3000;
  var sessionRunning = false;
  var breakRunning = false;
  var pausing = false;

  $("#session-length-display").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));

  $("#break-length-display").html(formatMinutes(setBreakLength) + ":" + formatSeconds(setBreakLength));

  $("#session-plus").click(function() {
    if (setSessionLength < 108008000) {
      setSessionLength += 60000;
      $("#session-length-display").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
      $("#timer").html("Session<br>" + formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
    }
  });

  $("#session-minus").click(function() {
    if (setSessionLength > 60000) {
      setSessionLength -= 60000;
      $("#session-length-display").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
      $("#timer").html("Session<br>" + formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
      console.log(setSessionLength);
    }
  });

  $("#break-plus").click(function() {
    if (setBreakLength < 10, 800, 8000) {
      setBreakLength += 60000;
      $("#break-length-display").html(formatMinutes(setBreakLength) + ":" + formatSeconds(setBreakLength));
    }
  });

  $("#break-minus").click(function() {
    if (setBreakLength > 60000) {
      setBreakLength -= 60000;
      $("#break-length-display").html(formatMinutes(setBreakLength) + ":" + formatSeconds(setBreakLength));
    }
  });

  $("#timer").html("Session<br>" + formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));

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

  function startSession() {
    var sessionRemaining = setSessionLength;
    function run() {
      $("#timer").html("Session<br>" + formatMinutes(sessionRemaining) + ":" + formatSeconds(sessionRemaining));
      $("#circle").css("background", "green");
      sessionRemaining -= 1000;

      if (sessionRemaining < 0) {
      $.playSound('http://www.noiseaddicts.com/samples_1w72b820/3724');
      clearInterval(running);
      sessionRunning = false;
      startBreak();
      }
    }
    run();
    var running = setInterval(run, 1000);

  }

  function startBreak() {
    breakRunning = true;
    var breakRemaining = setBreakLength;
    function run() {
      $("#timer").html("Break<br>" + formatMinutes(breakRemaining) + ":" + formatSeconds(breakRemaining));
      $("#circle").css("background", "red");
      breakRemaining -= 1000;

      function pauseSession() {
  pausing = true;
}
       $("#pause").click(pauseSession);
      if (pausing === true) {
        clearInterval(run);
      }

      if (breakRemaining < 0) {
      $.playSound('http://www.noiseaddicts.com/samples_1w72b820/3724');
      clearInterval(running);
      breakRunning = false;
      startSession();
      }
    }
    run();
    var running = setInterval(run, 1000);
  }

function pauseSession() {
  clearInterval(startBreak);
}

function resetSession() {
  clearInterval(startBreak);
  $("#session-length-display").html(formatMinutes(setSessionLength) + ":" + formatSeconds(setSessionLength));
  $("#circle").css("background", "green");
}

 $("#start").click(startSession);
 $("#pause").click(pauseSession);
 $("#reset").click(resetSession);



//use of playSound library

(function($){

  $.extend({
    playSound: function(){
      return $(
        '<audio autoplay="autoplay" style="display:none;">'
          + '<source src="' + arguments[0] + '.mp3" />'
          + '<source src="' + arguments[0] + '.ogg" />'
          + '<embed src="' + arguments[0] + '.mp3" hidden="true" autostart="true" loop="false" class="playSound" />'
        + '</audio>'
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