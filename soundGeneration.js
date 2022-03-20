/******************** 
Experiments functions
********************/

/* 
 reproduces same interval beeps and listens to keystrokes 
 Params: nbeats- number of beats to be played
         duration- beat interval duration
 */
function synchronizationOnly(nbeats, duration){
  var trial = [];
  
  var firstSound = createSound(true, false, duration);
  trial.push(firstSound);
  
  var soundEl = createSound(false, false, duration);
  for (var i = 0; i < (nbeats - 2); i++) {
    trial.push(soundEl);
  }
  
  soundEl = {
    type: "audio-keyboard-response",
    stimulus: "tone100ms.wav",
    choices: 'a',
    response_ends_trial: true,
    trial_duration: 800,
    on_finish:  function() {
      document.removeEventListener('keydown', listenKey);
    }
  }
  trial.push(soundEl);
  
  return trial;
}

/* 
 reproduce beeps on the first half, only listen to keystrokes on the second half 
 Params: nbeats- number of beats to be played
         duration- beat interval duration
         silenceDuration- duration of silence period
 */
function synchronizationContinuation(nBeats, duration, silenceDuration){
  var trial = [];
  
  var firstSound = createSound(true, false, duration);
  trial.push(firstSound);
  
  var soundEl = createSound(false, false, duration);
  for (var i = 0; i < (nBeats - 1); i++) {
    trial.push(soundEl);
  }
  
  var silence = createSilence(silenceDuration);
  trial.push(silence);
  
  return trial;
}

function rythmTrial(nBeats, timings){
    var sound;
    var silence;
    var sounds = [];
    
    for (let i = 0; i < nBeats; i++){
        for(let j = 0; j < timings.length; j++){
            if(i == 0 && j == 0){
                sound = createSound(true, true, timings[j]); //create first sound
            }
            else if(j == 0 && i != 0){
                sound = createSound(false, true, timings[j]); //create first sound of the series
            }
            else{
                sound = createSound(false, false, timings[j]); //create regular sound
            }
            sounds.push(sound);
        }
    }
    
    silence = createSilence(4800);
    sounds.push(silence);
    return sounds;
    
}

function createSilence(duration){
    var silence = {
    type: "html-keyboard-response",
    stimulus: " ",
    response_ends_trial: false,
    trial_duration: duration,
    on_finish: function() {
      document.removeEventListener('keydown', listenKey);
      jsPsych.data.get().addToLast({time:timeList});
    }
  }
  
  return silence;
}

function createSound(isFirstSound, isAltSound, duration){
    if(isFirstSound && isAltSound){
        var sound = {
            type: "audio-keyboard-response",
            stimulus: "880Hz_100ms.wav",
            choices: 'a',
            response_ends_trial: false,
            trial_duration: duration,
            on_start:  function() {
                document.addEventListener('keydown', listenKey);
            }
        }
    }
    else if(isFirstSound && !isAltSound){
        var sound = {
            type: "audio-keyboard-response",
            stimulus: "tone100ms.wav",
            choices: 'a',
            response_ends_trial: false,
            trial_duration: duration,
            on_start:  function() {
                document.addEventListener('keydown', listenKey);
            }
        }
    }
    else if(!isFirstSound && isAltSound){
        var sound = {
            type: "audio-keyboard-response",
            stimulus: "880Hz_100ms.wav",
            choices: 'a',
            response_ends_trial: false,
            trial_duration: duration,
            on_start:  function() {
                document.addEventListener('keydown', listenKey);
            }
        }
    }
    else{
        var sound = {
            type: "audio-keyboard-response",
            stimulus: "tone100ms.wav",
            choices: 'a',
            response_ends_trial: false,
            trial_duration: duration,
            on_start:  function() {
                document.addEventListener('keydown', listenKey);
            }
        }
    }
    return sound;
}












/* reproduce beeps on the first half, only listen to keystrokes on the second half 
4/4 rythm*/
function thirdTrial(){
  var trial = [];
  
  var firstSound = {
    type: "audio-keyboard-response",
    stimulus: "tone100ms.wav",
    choices: 'a',
    response_ends_trial: false,
    trial_duration: 800,
    on_start:  function() {
      document.addEventListener('keydown', listenKey);
    }
  }
  trial.push(firstSound);
  
  var duration = 700;
  var soundEl = {
    type: "audio-keyboard-response",
    stimulus: "tone100ms.wav",
    choices: 'a',
    response_ends_trial: false,
    trial_duration: 800
  }
  var loop = 0;
  for (var i = 0; i < 2; i++) {
    if (loop === 0){
      duration = 700;
      loop++;
    }
    else if (loop === 1){
      duration = 900;
      loop++;
    }
    else if (loop === 2){
      duration = 700;
      loop++;
    }
    else{
      duration = 700;
      loop = 0;
    }
    
    soundEl = {
    type: "audio-keyboard-response",
    stimulus: "tone100ms.wav",
    choices: 'a',
    response_ends_trial: false,
    trial_duration: duration
  }
    
    trial.push(soundEl);
  }
  
  var silence = {
    type: "html-keyboard-response",
    stimulus: " ",
    response_ends_trial: false,
    trial_duration: 4800,
    on_finish: function() {
      document.removeEventListener('keydown', listenKey);
      jsPsych.data.get().addToLast({time:timeList});
    }
  }
  trial.push(silence);
  
  return trial;
}


