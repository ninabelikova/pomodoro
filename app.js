
var app = angular.module('Pomodoro', []);

app.controller('MainControl', function($scope, $interval) {
  $scope.breakLength = 5;
  $scope.sessionLength = 25;
  $scope.timeLeft = $scope.sessionLength;
  $scope.fillHeight = '0%';
  $scope.sessionName = 'je travaille';
  $scope.clock_on = false;
  $scope.currentTotal;
  $scope.session_count = 0;

  var runTimer = false;
  var secs = 60 * $scope.timeLeft;
  $scope.originalTime = $scope.sessionLength;

  function secondsToHms(d) {
    d = Number(d);
    var h = Math.floor(d / 3600);
    var m = Math.floor(d % 3600 / 60);
    var s = Math.floor(d % 3600 % 60);
    return (
      (h > 0 ? h + ":" + (m < 10 ? "0" : "") : "") + m + ":" + (s < 10 ? "0" : "") + s
    );
  }

  // Change default session length
  $scope.sessionLengthChange = function(time) {
    if (!runTimer){
      if ($scope.sessionName === 'je travaille') {
        $scope.sessionLength += time;
        if ($scope.sessionLength < 0) {
          $scope.sessionLength = 0;
        }
        $scope.timeLeft = $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.sessionLength;
      }
    }
  }

  // Change default break length
  $scope.breakLengthChange = function(time) {
    if (!runTimer){
      $scope.breakLength += time;
      if ($scope.breakLength < 0) {
        $scope.breakLength = 0;
      }
      if ($scope.sessionName === 'je me détends') {
        $scope.timeLeft = $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        secs = 60 * $scope.breakLength;
      }
    }
  }

  $scope.toggleTimer = function() {
    if (!runTimer) {
      if ($scope.currentName === 'Sesson') {
        $scope.currentLength = $scope.sessionLength;
      } else {
        $scope.currentLength = $scope.breakLength;
      }

      updateTimer();
      runTimer = $interval(updateTimer,  1000);
      $scope.clock_on = true;
    } else {
      $interval.cancel(runTimer);
      runTimer = false;
      $scope.clock_on = false;
    }
  }

  function updateTimer() {
    secs -= 1;
    if (secs < 0) {
      // countdown is finished

      // Play audio
      var wav = 'pewdslove.mp3';
      var audio = new Audio(wav);
			audio.play();

      // toggle break and session
      $scope.fillColor = '#333333';
      if ($scope.sessionName === 'je me détends') {
        $scope.sessionName = 'je travaille';
        $scope.current_session_name = $scope.working;
        $scope.currentLength = $scope.sessionLength;
        $scope.timeLeft = 60 * $scope.sessionLength;
        $scope.originalTime = $scope.sessionLength;
        secs = 60 * $scope.sessionLength;
      } else {
        $scope.session_count += 1;
        $scope.sessionName = 'je me détends';
        $scope.current_session_name = $scope.resting;
        $scope.currentLength = $scope.breakLength;
        $scope.timeLeft = 60 * $scope.breakLength;
        $scope.originalTime = $scope.breakLength;
        secs = 60 * $scope.breakLength;
      }
    } else {
      if ($scope.sessionName === 'je me détends') {
        $scope.fillColor = '#FF4444';
      } else {
        $scope.fillColor = '#99CC00';
      }
	    $scope.timeLeft = secondsToHms(secs);

      var denom = 60 * $scope.originalTime;
      var perc = Math.abs((secs / denom) * 100 - 100);
      $scope.fillHeight = perc + '%';
    }
  };

  /// Multilanguage stuff

  $scope.current_language = 'fr';

  $scope.title = {
    fr: "C'est un pomodoro",
    en: "It's a pomodoro",
    hak: "這係桃麥朵鐘"
  };

  $scope.intro = {
    fr: "Et ce pomodoro veut que tu travailles.",
    en: "And this pomodoro wants you to work.",
    hak: "桃麥朵鐘愛你遽遽去做事"
  };

  $scope.relax = {
    fr: "se détendre",
    en: "play",
    hak: "敨氣尞一下"
  };

  $scope.work = {
    fr: "travailler",
    en: "work",
    hak: "煞猛打拚"
  };

  $scope.working = {
    fr: "je travaille",
    en: "working",
    hak: "做等事"
  };

  $scope.resting = {
    fr: "je me détends",
    en: "playing",
    hak: "尞等"
  };


  $scope.switch_language = function (language) {
    $scope.current_language = language;
  };

  $scope.current_session_name = $scope.working;

});
