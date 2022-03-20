/**************** 
Load components
****************/

var timeline = [];
const timeList = [];

/* preload images */
var preload = {
  type: 'preload',
  audio: ['tone100ms.wav']
}
timeline.push(preload);

var z = document.createElement('script'); // is a node
z.innerHTML = 'src="file.js"';
document.head.appendChild(z);

hola();

/* add keystroke time to the list */
function listenKey(event){
  timeList.push(Math.round(event.timeStamp));
}

/******************** 
Experiments functions
********************/

/* reproduce beeps and listen to keystrokes */
function firstTrial(){
  var trial = [];
  
  var firstSound = {
    type: "audio-keyboard-response",
    stimulus: "tone100ms.wav",
    choices: 'a',
    response_ends_trial: false,
    trial_duration: 200,
    on_start:  function() {
      document.addEventListener('keydown', listenKey);
    }
  }
  trial.push(firstSound);
  
  var soundEl = {
    type: "audio-keyboard-response",
    stimulus: "tone100ms.wav",
    choices: 'a',
    response_ends_trial: false,
    trial_duration: 200
  }
  
  for (var i = 0; i < 10; i++) {
    trial.push(soundEl);
  }
  
  soundEl = {
    type: "audio-keyboard-response",
    stimulus: "tone100ms.wav",
    choices: 'a',
    response_ends_trial: true,
    trial_duration: 200,
    on_finish:  function() {
      document.removeEventListener('keydown', listenKey);
    }
  }
  trial.push(soundEl);
  
  return trial;
}

/* reproduce beeps on the first half, only listen to keystrokes on the second half */
function secondTrial(){
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
  
  var soundEl = {
    type: "audio-keyboard-response",
    stimulus: "tone100ms.wav",
    choices: 'a',
    response_ends_trial: false,
    trial_duration: 800
  }
  
  for (var i = 0; i < 6; i++) {
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


/******************** 
Timeline
********************/

var prueba = {
  type: 'survey-html-form',
  preamble: '<p>This is a psychophysics experiment where your rythm will be tested</p>',
  html: '<script src="https://gist.github.com/danrovito/977bcb97c9c2dfd3398a.js"></script>',
  autofocus: 'test-resp-box'
};
timeline.push(prueba);

/* get user data */
var survey_trial = {
  type: 'survey-text',
  questions: [
    {prompt: "How old are you?", name: 'Age'}, 
    {prompt: "Where were you born?", name: 'BirthLocation'}
  ],
};
timeline.push(survey_trial);

/* define trial 1 procedure */
var controlTrialWelcome = {
  type: "html-button-response",
  stimulus: "You will hear a series of beeps, follow the rythm by taping any letter key.",
  choices: ['Ready']
};
timeline.push(controlTrialWelcome);

/* add trial 1 to timeline */
var controlTrial = firstTrial();
timeline = timeline.concat(controlTrial);

/* define trial 2 procedure */
var silenceTrialWelcome = {
  type: "html-button-response",
  stimulus: "You will hear a series of beeps, follow the rythm by taping any letter key. \n At some point the beeps will stop, but you have to keep taping to the rythm.",
  choices: ['Ready']
};
timeline.push(silenceTrialWelcome);

/* add trial 2 to timeline */
var silenceTrial = secondTrial();
timeline = timeline.concat(silenceTrial);


/******************** 
End the experiment
********************/

/* returns array with the times of all keystrokes */
function getExperimentsTimes(){
  var times = [];
  var all_data = jsPsych.data.get().json();
  var all_data_json = JSON.parse(all_data);
  for (var i = 4; i < 8; i++) {
    console.log(all_data_json[i].time_elapsed);
    times.push(all_data[i].time_elapsed);
  }
  console.log(times);
  return(times);
}

var showResults = {
  type: "html-button-response",
  stimulus: function(data){
    
    getExperimentsTimes();
    
          var temp = "<ul>";
          for (var i = 0; i < timeList.length; i++) {
            temp += "<li>" + timeList[i] + "</li>";
          }
          temp += "</ul>";
          return temp;
        },
  response_ends_trial: true,
  choices: ['end'],
  on_start: function() {
      stim = "<ul> <li>" + timeList[0] + "</li> <li> Tea </li> </ul> ";
  }
}
timeline.push(showResults);
var lasttrialdata = jsPsych.data.getLastTrialData();

console.log("lasttrialdata");



jsPsych.init({
  timeline: timeline,
  on_finish: function() {
    jsPsych.data.displayData();
  }
}); 
