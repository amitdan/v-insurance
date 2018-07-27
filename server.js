'use strict';
const Alexa = require('alexa-sdk');
var https = require('https');
//const DateDiff = require('date-diff');
var persistenceEnabled;

  const welcomeCardImg = {
      smallImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_small.png',
      largeImageUrl: 'https://s3.amazonaws.com/webappvui/img/breakfast_sandwich_large.png'
  };

  
  
const APP_ID = "";

function getSpeechDescription(item)
{
    let sentence = item.RiverName + " is the " + item.RankBasedOnLengthInMiles + "th longest river based on length,  It originates from " + item.OriginatesFrom + ", and ends in " + item.EndsIn + ". The Length in kilometer is " + item.LengthInMiles + ", and Benefitted Countries Or States are " + item.BenefittedCountriesOrStates + ". Which other river would you like to know about?";
    return sentence;
}

//This is the small version of the card image.  We use our data as the naming convention for our images so that we can dynamically
//generate the URL to the image.  The small image should be 720x400 in dimension.
function getSmallImage1() { return "https://s3.amazonaws.com/svdglobal/720x400.jpg"; }

//This is the large version of the card image.  It should be 1200x800 pixels in dimension.
function getLargeImage11() { return "https://s3.amazonaws.com/svdglobal/1200x800.jpg"; }


function getLargeImage1() { return "https://s3.amazonaws.com/svdglobal/vaccine-diplomacy.jpg"; }

function getSpeechDescription1(item)
{       
    let sentence = NEW_SCHEDULE_SUCCESS_MESSAGE;
    return sentence;
}

function getSpeechDescription1(item)
{       
    let sentence = NEW_SCHEDULE_SUCCESS_MESSAGE;
    return sentence;
}

function getImmediateNextVaccineScheduleMessage(birthDateOfKid)
{
   let ageFromString2 = getAgeInMonths(birthDateOfKid)
   let sentence  = getListOfVaccines(ageFromString2);   
   return sentence;
}

function getResponseMessage(typeOfRequest, birthDateOfKid, vaccineSchedule) {
   if (vaccineSchedule == undefined)
        {                                      
            return "Vaccine schedule does not exist. Say create new schedule to create new vaccine schedule.";
        }   
   
   let ageFromString2 = getAgeInMonths(birthDateOfKid)
   let listOfVaccines  = getListOfVaccines(ageFromString2,vaccineSchedule); 
   switch(typeOfRequest)
    {
        case "create":
            return NEW_SCHEDULE_SUCCESS_MESSAGE + WHAT_CAN_I_DO_1 + listOfVaccines + WHAT_CAN_I_DO;
        break;
        case "show":
            if (listOfVaccines) {
			    return SHOW_SCHEDULE_MESSAGE + listOfVaccines + WHAT_CAN_I_DO;
			}
            return "We did not find any pending vaccine schedule to show." + WHAT_CAN_I_DO;
        break;
		
		case "showDisplayView":
		      var list = [];			
             list = getListItemOfVaccines(ageFromString2,vaccineSchedule);             				 
             if (list.length == 0) {              			 
	           list.push('No pending vaccine');
               return list;
			 }
             return list;
        break;
		
		case "showDisplay":
            if (listOfVaccines) {
			    return listOfVaccines;
			}
            return "No pending vaccine schedule";
        break;
       
        case "markAsDone":
		if (listOfVaccines) {
			    return "Hang on, looks like vaccine " + listOfVaccines + " was scheduled in this week or month, Should I mark it as done ?";
			}
            return "We did not find any pending vaccine schedule to mark as done." + WHAT_CAN_I_DO;	
        break;
		
		case "markAsDoneDisplay":
		if (listOfVaccines) {
			    return listOfVaccines;
			}
            return "We did not find any pending vaccine schedule to mark as done. What else would you like to do?";	
        break;
		
        case "update":
            return "Welcome to Insurance buddy";
        break;
        default:
            return "Welcome to Insurance buddy";
        break;
    } 
}

function getImmediateNextVaccine(birthDateOfKid)
{    
    let ageFromString2 = getAgeInMonths(birthDateOfKid);    
    let sentence = getActiveVaccines(ageFromString2);
    return sentence;
}

const vaccineSchedule =   {
  "vaccineView": { "months": [
  {
    "startDay": 0,
    "endDay": 30,
    "month": 0, 
    "vaccineList": {"vaccines": [    	  
	 { 
     "vacName": "Hep B",
	 "VacFullName":"Hepititus B",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     }]},  
  },
  {
    "startDay": 31,
    "endDay": 61,
    "month": 1, 
    "vaccineList": {"vaccines": [    	  
	 { 
     "vacName": "Hep B",
	 "VacFullName":"Hepititus B",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "Hib",
	 "VacFullName":"Haemophilus influenzae type b vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "IPV",
	 "VacFullName":"Inactivated poliovirus vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "PCV",
	 "VacFullName":"Pneumococcal conjugate vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "RV",
	 "VacFullName":"Rotavirus vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "DTaP",
	 "VacFullName":"Diphtheria, tetanus, and acellular pertussis vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     }
    ]},  
  },
  {
    "startDay": 62,
    "endDay": 91,
    "month": 2, 
    "vaccineList": {"vaccines": [    	  
	 ]},  
  },
  {
    "startDay": 92,
    "endDay": 123,
    "month": 3, 
    "vaccineList": {"vaccines": [
	 { 
     "vacName": "Hib",
	 "VacFullName":"Haemophilus influenzae type b vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "IPV",
	 "VacFullName":"Inactivated poliovirus vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "PCV",
	 "VacFullName":"Pneumococcal conjugate vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "RV",
	 "VacFullName":"Rotavirus vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "DTaP",
	 "VacFullName":"Diphtheria, tetanus, and acellular pertussis vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     }
    ]},  
  },
  {
    "startDay": 124,
    "endDay": 153,
    "month": 4, 
    "vaccineList": {"vaccines": [    	  
	 ]},  
  },
  {
    "startDay": 154,
    "endDay": 184,
    "month": 5, 
    "vaccineList": {"vaccines": [
	 { 
     "vacName": "Hib",
	 "VacFullName":"Haemophilus influenzae type b vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },	 
	 { 
     "vacName": "PCV",
	 "VacFullName":"Pneumococcal conjugate vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "RV",
	 "VacFullName":"Rotavirus vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     },
	 { 
     "vacName": "DTaP",
	 "VacFullName":"Diphtheria, tetanus, and acellular pertussis vaccine",
	 "status": null,
     "originalScheduleDate": null,
	 "reScheduleDate": null,
	 "dateDone": null 
     }
    ]},  
  }
  ]
  }
  };

function getListOfVaccines(ageFromString2, vSchedule) {
var say = "";
var list = [];
var monthIndicator = getMonthIndicator(ageFromString2); 


for (var i = 0; i < vSchedule.vaccineView.months.length; i++) {
      var vac = vSchedule.vaccineView.months[i];

var month = vac.month ;
if (month == monthIndicator) {	
	for (var i = 0; i < vac.vaccineList.vaccines.length; i++) 
    { 
	   var status = vac.vaccineList.vaccines[i].status;
	   if (status != "Done") {	   
	       var vacName = vac.vaccineList.vaccines[i].VacFullName;		  
	       list.push(vacName);
	   }		
	}   	
    say += sayArray(list,'and');
    say = say ;
    
}
}
return say;
}

function getListItemOfVaccines(ageFromString2, vSchedule) {
var list = [];
var monthIndicator = getMonthIndicator(ageFromString2); 


for (var i = 0; i < vSchedule.vaccineView.months.length; i++) {
      var vac = vSchedule.vaccineView.months[i];

var month = vac.month ;
if (month == monthIndicator) {	
	for (var i = 0; i < vac.vaccineList.vaccines.length; i++) 
    { 
	   var status = vac.vaccineList.vaccines[i].status;
	   if (status != "Done") {	   
	       var vacName = vac.vaccineList.vaccines[i].VacFullName;		  
	       list.push(vacName);
	   }		
	} 
}
}
return list;
}

  function getMonthIndicator(ageInDaysValue) {
  if (ageInDaysValue >= 0 &&  ageInDaysValue <= 30) {
      return 0;
  } else if (ageInDaysValue >= 31 &&  ageInDaysValue <= 61) {
      return 1;
  } else if (ageInDaysValue >= 62 &&  ageInDaysValue <= 91) {
      return 2;
  } else if (ageInDaysValue >= 92 &&  ageInDaysValue <= 123) {
      return 3;
  } else if (ageInDaysValue >= 124  &&  ageInDaysValue <= 153) {
      return 4;
  } else if (ageInDaysValue >= 154  &&  ageInDaysValue <= 184) {
      return 5;
  } else if (ageInDaysValue >= 185  &&  ageInDaysValue <= 215) {
      return 6;
  }   
   }

function diff_months(dt2, dt1) 
 {

  var diff =(dt2.getTime() - dt1.getTime()) / 1000;
   diff /= (60 * 60 * 24 * 7 * 4);
  return Math.abs(Math.round(diff));
  
 }
 
 function ageInDays(date1, date2) {
var dt1 = new Date(date1);
var dt2 = new Date(date2);
return Math.floor((Date.UTC(dt2.getFullYear(), dt2.getMonth(), dt2.getDate()) - Date.UTC(dt1.getFullYear(), dt1.getMonth(), dt1.getDate()) ) /(1000 * 60 * 60 * 24));
}

function getAgeInMonths(birthDateOfKid)
{
   var date1 = new Date(); // 2015-12-1   
   var date2 = new Date(birthDateOfKid); // 2014-01-1
   var d = ageInDays(date2, date1);
   return d;
}


function getVaccines(ageFromString)
{       
    switch(ageFromString)
    {
        case "0":
                                var say = "";
        var list = [];
                                for (var i = 0; i < data.zero.length; i++) {
              var item = data.zero[i];
              //list.push(item.name + ' ' + item.fullForm);
                                                  list.push(item.fullForm);
          }
                                  say += sayArray(list,'and');
          say = NEW_SCHEDULE_SUCCESS_MESSAGE + '  and as per kids age vaccines  ' + say  + ' is due.' + WHAT_CAN_I_DO;
            return say;
        break;
                                
                                case "2":
                                var say = "";
        var list = [];
                                for (var i = 0; i < data.two.length; i++) {
              var item = data.two[i];
              //list.push(item.name + ' ' + item.fullForm);
                                                  list.push(item.fullForm);
          }
                                  say += sayArray(list,'and');
          say = NEW_SCHEDULE_SUCCESS_MESSAGE + ' and as per kids age vaccines ' + say + ' is due.';
            return say;
        break;
                                
                                
                                case "4":
                                var say = "";
        var list = [];
                                for (var i = 0; i < data.four.length; i++) {
              var item = data.four[i];
              //list.push(item.name + ' ' + item.fullForm);
                                                  list.push(item.fullForm);
          }
                                  say += sayArray(list,'and');
          say = NEW_SCHEDULE_SUCCESS_MESSAGE + '  and as per kids age vaccines  ' + say  + ' is due.' + WHAT_CAN_I_DO;
            return say;
        break;
                                
                                case "6":
                                var say = "";
        var list = [];
                                for (var i = 0; i < data.six.length; i++) {
              var item = data.six[i];
              //list.push(item.name + ' ' + item.fullForm);
                                                  list.push(item.fullForm);
          }
                                  say += sayArray(list,'and');
          say = NEW_SCHEDULE_SUCCESS_MESSAGE + '  and as per kids age vaccines  ' + say  + ' is due.' + WHAT_CAN_I_DO;
            return say;
        break;

        default:
            return "No any vaccine is due";
        break;
    }
    
}

function getActiveVaccines(ageFromString)
{       
    switch(ageFromString)
    {
        case "0":
                                var say = "";
        var list = [];
                                for (var i = 0; i < data.zero.length; i++) {
              var item = data.zero[i];
              //list.push(item.name + ' ' + item.fullForm);
                                                  //list.push(item.fullForm);
          }
                                  list.push("Hepatitis B");
                                  say += sayArray(list,'and');
          say = say ;
            return say;
        break;
                                
                                case "2":
                                var say = "";
        var list = [];
                                for (var i = 0; i < data.two.length; i++) {
              var item = data.two[i];
              //list.push(item.name + ' ' + item.fullForm);
                                                  //list.push(item.fullForm);
          }
                                  list.push("Hepatitis B");
                                  list.push("Diphtheria, tetanus, and acellular pertussis vaccine");
                                  list.push("Haemophilus influenzae type b vaccine");
                                  list.push("Inactivated poliovirus vaccine");
                                  list.push("Pneumococcal conjugate vaccine");
                                  list.push("Rotavirus vaccine");                   
                                  say += sayArray(list,'and');
          say =  say ;
            return say;
        break;
                                
                                case "4":
                                var say = "";
        var list = [];
                                for (var i = 0; i < data.four.length; i++) {
              var item = data.four[i];
              //list.push(item.name + ' ' + item.fullForm);
                                                  //list.push(item.fullForm);
          }                      
                                  list.push("Diphtheria, tetanus, and acellular pertussis vaccine");
                                  list.push("Haemophilus influenzae type b vaccine");
                                  list.push("Inactivated poliovirus vaccine");
                                  list.push("Pneumococcal conjugate vaccine");
                                  list.push("Rotavirus vaccine");                   
                                  say += sayArray(list,'and');
          say =  say ;
            return say;
        break;
                                
                                case "6":
                                var say = "";
        var list = [];
                                for (var i = 0; i < data.six.length; i++) {
              var item = data.six[i];
              //list.push(item.name + ' ' + item.fullForm);
                                                  //list.push(item.fullForm);
          }                      
                                  list.push("Diphtheria, tetanus, and acellular pertussis vaccine");
                                  list.push("Haemophilus influenzae type b vaccine");
                                  //list.push("Inactivated poliovirus vaccine");
                                  list.push("Pneumococcal conjugate vaccine");
                                  list.push("Rotavirus vaccine");                   
                                  say += sayArray(list,'and');
          say =  say ;
            return say;
        break;
                
       default:
            return "No vaccine are due ";
        break;
    }
    
}

function sayArray(myData, andor) {
      //say items in an array with commas and conjunctions.
      // the first argument is an array [] of items
      // the second argument is the list penultimate word; and/or/nor etc.

      var listString = '';

      if (myData.length == 1) {
          //just say the one item
          listString = myData[0];
      } else {
          if (myData.length == 2) {
              //add the conjuction between the two words
              listString = myData[0] + ' ' + andor + ' ' + myData[1];
          } else if (myData.length == 4 && andor=='and'){
              //read the four words in pairs when the conjuction is and
              listString=myData[0]+" and "+myData[1]+", as well as, "
                  + myData[2]+" and "+myData[3];

          }  else {
              //build an oxford comma separated list
              for (var i = 0; i < myData.length; i++) {
                  if (i < myData.length - 2) {
                      listString = listString + myData[i] + ', ';
                  } else if (i == myData.length - 2) {            //second to last
                      listString = listString + myData[i] + ', ' + andor + ' ';
                  } else {                                        //last
                      listString = listString + myData[i];
                  }
              }
          }
      }

      return(listString);
  }

function getQuestion(counter, property, item)
{       
    switch(property)
    {
        case "RankBasedOnLengthInMiles":
            return "Here is your " + counter + "th question.  What is the rank based on length in kilometers of " + item.RiverName + " ?";
        break;
        case "OriginatesFrom":
            return "Here is your " + counter + "th question.  From where did " + item.RiverName + " River originate ?";
        break;
        case "EndsIn":
            return "Here is your " + counter + "th question.  Where does " + item.RiverName + " River end ?";
        break;
                                case "LengthInMiles":
            return "Here is your " + counter + "th question.  What is the length in kilometers of " + item.RiverName + " River ?";
        break;
                                case "BenefittedCountriesOrStates":
            return "Here is your " + counter + "th question.  Which are the benefitted countries or states from " + item.RiverName + " River ?";
        break;
        default:
            return "Here is your " + counter + "th question.  What is the " + formatCasing(property) + " of "  + item.RiverName + "?";
        break;
    }
    
}

function getAnswer(property, item)
{
    switch(property)
    {
        case "RankBasedOnLengthInMiles":
            return "The rank based on length in kilometers of " + item.RiverName + " is " + item[property] + ". "
        break;
                                case "OriginatesFrom":
            return item.RiverName + " river originates from " + item[property] + ". "
        break;
                                case "EndsIn":
            return item.RiverName + " river ends in " + item[property] + ". "
        break;
                                case "LengthInMiles":
            return "The length in kilometers of " + item.RiverName + " is " + item[property] + ". "
        break;
                                case "BenefittedCountriesOrStates":
            return "The benefitted countries or states from " + item.RiverName + " are " + item[property] + ". "
        break;
        default:
            return "The " + formatCasing(property) + " of " + item.RiverName + " is " + item[property] + ". "
        break;
    }
}
const speechConsCorrect = ["Booya", "All righty", "Bam", "Bazinga", "Bingo", "Boom", "Bravo", "Cha Ching", "Cheers", "Dynomite",
"Hip hip hooray", "Hurrah", "Hurray", "Huzzah", "Oh dear.  Just kidding.  Hurray", "Kaboom", "Kaching", "Oh snap", "Phew",
"Righto", "Way to go", "Well done", "Whee", "Woo hoo", "Yay", "Wowza", "Yowsa"];

const speechConsWrong = ["Argh", "Aw man", "Blarg", "Blast", "Boo", "Bummer", "Darn", "D'oh", "Dun dun dun", "Eek", "Honk", "Le sigh",
"Mamma mia", "Oh boy", "Oh dear", "Oof", "Ouch", "Ruh roh", "Shucks", "Uh oh", "Wah wah", "Whoops a daisy", "Yikes"];
/*
const WELCOME_MESSAGE = "Welcome to Insurance Buddy! You can ask me to create vaccine schedule, mark vaccine schedule as done, show upcoming schedule or set reminder.  What would you like to do?";
*/

const WELCOME_MESSAGE = "Welcome to Insurance Buddy! I can help you to get insurance quote, Issue policy and send policy document. What would you like to do?";

const USE_IMAGES_FLAG = true;

const START_QUIZ_MESSAGE1 = "OK.  I will ask you 10 questions about the Rivers in India.";

const START_QUIZ_MESSAGE = "What is the nick name of kid ?";

const NEW_SCHEDULE_SUCCESS_MESSAGE = "Vaccine schedule has been created succcesfully";

const WHAT_CAN_I_DO =  "<break time='1s'/> What else would you like to do?"

const WHAT_CAN_I_DO_1 =  "<break time='2s'/> As per kid's age below vaccines are due <break time='1s'/>"

//const SHOW_SCHEDULE_MESSAGE = "Hang on, here is vaccine schedule as per your request. <break time='2s'/> Do you want to set reminder ?  ";

const SHOW_SCHEDULE_MESSAGE = "Hang on, here is vaccine schedule of this month <break time='1s'/>";

const EXIT_SKILL_MESSAGE = "Thank you for using Insurance buddy!  Let's meet again soon!";

const REPROMPT_SPEECH = "<break time='1s'/> What else would you like to do ?";



const REMINDER_SET_MESSAGE = "Hurrray, Reminder has set successfully ";

const MARK_AS_DONE_MESSAGE = "Hurrray, pending vaccines has marked as done";

const HELP_MESSAGE = "I know lots of things about travel insurance. You can ask me to get travel insurance premium.  What would you like to do?";

function getBadAnswer(item) { return "I'm sorry. " + item + " is not something I know very much about in this skill. " + HELP_MESSAGE; }

function getCurrentScore(score, counter) { return "Your current score is " + score + " out of " + counter + ". "; }

function getFinalScore(score, counter) { return "Your final score is " + score + " out of " + counter + ". "; }

const USE_CARDS_FLAG = false;

function getCardTitle(nameOfKid) { return "Vaccine Buddy : : " + nameOfKid +"'s Vaccine Schedule";}

function getSmallImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/720x400/" + item.Abbreviation + "._TTH_.png"; }

function getLargeImage(item) { return "https://m.media-amazon.com/images/G/01/mobile-apps/dex/alexa/alexa-skills-kit/tutorials/quiz-game/state_flag/1200x800/" + item.Abbreviation + "._TTH_.png"; }                                                    

  const data = {    
      "zero" :
          [
              {"name": "HepB",  "fullForm": "Hepatitis B", "units": "pieces of"}         
          ],
                  "1-2" :
          [
              {"name": "HepB",  "fullForm": "HepB", "units": "pieces of"}         
          ],     
                  "two" :
          [
              {"name": "DTaP",  "fullForm": "Diphtheria, tetanus, and acellular pertussis vaccine", "units": "pieces of"},
              {"name": "Hib",    "fullForm": "Haemophilus influenzae type b vaccine", "units": ""  },
              {"name": "IPV", "fullForm": "Inactivated poliovirus vaccine", "units": "slice of" },
                                                  {"name": "PCV", "fullForm": "Pneumococcal conjugate vaccine", "units": "slice of" },
                                                  {"name": "RV", "fullForm": "Rotavirus vaccine", "units": "slice of" }
          ],     
                  "four" :
          [
              {"name": "DTaP",  "fullForm": "DTaP", "units": "pieces of"},
              {"name": "Hib",    "fullForm": "Hib", "units": ""  },
              {"name": "IPV", "fullForm": "IPV", "units": "slice of" },
                                                  {"name": "PCV", "fullForm": "PCV", "units": "slice of" },
                                                  {"name": "RV", "fullForm": "RV", "units": "slice of" }
          ],                     
                 "six" :
          [
              {"name": "DTaP",  "fullForm": "DTaP", "units": "pieces of"},
              {"name": "Hib",    "fullForm": "Hib", "units": ""  },              
                                                  {"name": "PCV", "fullForm": "PCV", "units": "slice of" },
                                                  {"name": "RV", "fullForm": "RV", "units": "slice of" }
          ]
};                                                             
const vaccineSchedules = {       
      "two" :
      [
          "DTaP-HB-IPV-Hib",
          "Pneumococcal Conjugate",
          "Rotavirus",
          "Meningococcal C Conjugate"
      ]
};
                                                                                                
const counter = 0;

const states = {
    START: "_START",
    QUIZ: "_QUIZ"
};

const handlers = {
     "LaunchRequest": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
     },
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AnswerIntent": function() {
        this.handler.state = states.START;
        this.emitWithState("AnswerIntent");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.handler.state = states.START;
        this.emitWithState("Start");
    }
};

const startHandlers = Alexa.CreateStateHandler(states.START,{
    "Start": function() {
        this.response.speak(WELCOME_MESSAGE).listen(HELP_MESSAGE);
		//var imageObj = {smallImageUrl: getSmallImage1(), largeImageUrl: getLargeImage1()};
        //this.response.cardRenderer("Welcome to Vaccine Buddy", "\n1-To create schedule say, create new schedule \n2- To see schedule say, show schedule please \n3- To set reminder say, set reminder please \n4- To mark s done say , mark as done", imageObj);		                
        this.emit(":responseReady");		
		
    },
    "CreateScheduleIntent": function() {
        //this.handler.state = states.QUIZ;
        //this.emitWithState("Quiz");
                                // One item with two properties: question_id and title.                                                 
        
                                const { userId } = this.event.session.user;
        const { slots } = this.event.request.intent;
                                
                   // RecipeName
    if (!slots.nameOfKid.value) {
      const slotToElicit = 'nameOfKid';
      const speechOutput = 'What is the name of kid?';
      const repromptSpeech = 'Please tell me the name of kid';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    else if (slots.nameOfKid.confirmationStatus !== 'CONFIRMED') {

      if (slots.nameOfKid.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
        const slotToConfirm = 'nameOfKid';
        const speechOutput = `The name of kid is ${slots.nameOfKid.value}, correct?`;
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'nameOfKid';
      const speechOutput = 'What is the name of kid you would like to create vaccine schedule ?';
      const repromptSpeech = 'Please tell me the name of kid';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
}              
                   this.attributes["nameOfKid"] = slots.nameOfKid.value;
                   
                   
                                   // dateOfBirthOfKid
    if (!slots.dateOfBirthOfKid.value) {
      const slotToElicit = 'dateOfBirthOfKid';
      const speechOutput = 'What is the date of birth of kid?';
      const repromptSpeech = 'Please tell me the date of birth of kid';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    else if (slots.dateOfBirthOfKid.confirmationStatus !== 'CONFIRMED') {

      if (slots.dateOfBirthOfKid.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
        const slotToConfirm = 'dateOfBirthOfKid';
        const speechOutput = `The date Of Birth Of Kid is ${slots.dateOfBirthOfKid.value}, correct?`;
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'dateOfBirthOfKid';
      const speechOutput = 'What is the date Of Birth Of Kid you would like to create vaccine schedule for ?';
      const repromptSpeech = 'Please tell me the date Of Birth Of Kid';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
}

this.attributes["dateOfBirthOfKid"] = slots.dateOfBirthOfKid.value;

console.log("############slots.dateOfBirthOfKid.value ", slots.dateOfBirthOfKid.value);


this.attributes["dateOfCreationOfDefaultSchedule"] = new Date();

                   
       if (this.attributes["nameOfKid"] == undefined)
        {                                      
            //this.attributes["nameOfKid"] = getKidName(this.event.request.intent.slots);
        }                      
                                this.attributes["defaultSchedule"] = "Yes";
                                
                                   var speechOutput = getSpeechDescription1() + this.attributes["nameOfKid"];
           const randomFact = "123456789";
		          let birthDateOfKid = this.attributes["dateOfBirthOfKid"];
								  this.attributes["vaccineSchedule"] = vaccineSchedule;
								  var nameOfKid = this.attributes["nameOfKid"];
                                   
          //if(true) {
          if (supportsDisplay.call(this)||isSimulator.call(this)) {
                                  //console.log("has display:"+ supportsDisplay.call(this));
          //console.log("is simulator:"+isSimulator.call(this));
          let content = {                     
                    "hasDisplaySpeechOutput" : getResponseMessage("create",birthDateOfKid, vaccineSchedule),
                    "hasDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "noDisplaySpeechOutput" : getResponseMessage("create",birthDateOfKid, vaccineSchedule),
                    "noDisplayRepromptText" : REPROMPT_SPEECH,
                    "simpleCardTitle" : getCardTitle(nameOfKid),                    
                    "simpleCardContent" : NEW_SCHEDULE_SUCCESS_MESSAGE,
                    "bodyTemplateTitle" : getCardTitle(nameOfKid),                    
                    "bodyTemplateContent" : NEW_SCHEDULE_SUCCESS_MESSAGE,
                    "templateToken" : "FinalScoreView",					  
					"backgroundImageUrl": getLargeImage1(),					
                    "askOrTell": ":ask",
                    "sessionAttributes" : this.attributes
                };
                if (USE_IMAGES_FLAG) {
                  content["imageSmallUrl"]=getSmallImage1();
                  content["imageLargeUrl"]=getLargeImage1();
                }
                renderTemplate.call(this,content);
        } else {
        // Just use a card if the device doesn't support a card.
          //this.response.cardRenderer(this.t('SKILL_NAME'), randomFact);
          //this.response.speak(speechOutput);
          
                                  //this.attributes["creationDate"] = new Date();                                 
                                  //var reprompt = 'What else would you like to do ?';
                           
                                  this.response.speak(getResponseMessage("create", birthDateOfKid, vaccineSchedule)).listen(REPROMPT_SPEECH);
                                  //this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
                                  this.emit(':responseReady');								  
                                  }          

                                  
                                  //if (USE_CARDS_FLAG)
                                // {
                //let imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};

               // this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
                //this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);    
                                                                //}
            //else
            //{
                //this.response.speak(getSpeechDescription1() + this.attributes["nameOfKid"]).listen(REPROMPT_SPEECH);
                                                                //this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
            //}
                                //this.emit(":responseReady");
                                
    },         
    "ShowScheduleIntent": function() {
        //this.handler.state = states.QUIZ;
		
                                var nameOfKid = this.attributes["nameOfKid"];  
                                
                                var reprompt = 'Say yes if you would like to set reminder ?';
                                let birthDateOfKid = this.attributes["dateOfBirthOfKid"];                              
                                 var vSchedule = this.attributes["vaccineSchedule"];	                               
                                console.log("Answer Intent event: "+JSON.stringify(this.event));
        //var item = getItem(this.event.request.intent.slots);

        //if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {
            if (supportsDisplay.call(this)||isSimulator.call(this)) {
             //if (true) {
              //this device supports a display
              var answerList = [];
              answerList = getResponseMessage("showDisplayView",birthDateOfKid, vSchedule);			 
              let listItems = answerList.map((x) => {
                return { "token" : x,
                  "textContent" : {
                    "primaryText":
                    {
                      "text": x,
                      "type": "PlainText"
                    }
                  }
                }
              })
 
              let content = {                     
                    "hasDisplaySpeechOutput" : getResponseMessage("show",birthDateOfKid, vSchedule),
                    "hasDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "noDisplaySpeechOutput" : getResponseMessage("show",birthDateOfKid, vSchedule),
                    "noDisplayRepromptText" : REPROMPT_SPEECH,
                    "simpleCardTitle" : getCardTitle(nameOfKid),                    
                    "simpleCardContent" : getResponseMessage("showDisplay",birthDateOfKid, vSchedule),
					"listTemplateTitle" : getCardTitle(nameOfKid),
                    "listTemplateContent" : getResponseMessage("showDisplay",birthDateOfKid, vSchedule), 
                    "listItems" : listItems,
                    "hint" : "Add a hint here",
                    "templateToken" : "MultipleChoiceListView",
                    "askOrTell": ":ask",
                    "sessionAttributes" : this.attributes
                };
                if (USE_IMAGES_FLAG) {
                  content["imageSmallUrl"]=getSmallImage1();
                  content["imageLargeUrl"]=getLargeImage1();
                }
				content["backgroundImageLargeUrl"]=getLargeImage1();
                renderTemplate.call(this,content);
            } else {
              //this device does not support a display
              if (USE_IMAGES_FLAG) {
                //we have images so produce a card
                var imageObj = {smallImageUrl: getSmallImage1(), largeImageUrl: getLargeImage1()};
                //this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);
                //this.response.cardRenderer("Amit's Vaccine Schedule", getSchedule1(), imageObj);
              }
              //this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
              this.response.speak(getResponseMessage("show",birthDateOfKid, vSchedule)).listen(REPROMPT_SPEECH);
              this.emit(":responseReady");
            }
/*  
        } else {
            this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));
            this.emit(":responseReady");
        }
                                
                */           
                                
                                
                                /*
        let response = "";                     
                                
                                for (var i = 0; i < vaccineSchedules.two.length; i++) {
              var item = vaccineSchedules.two[i];
                                                  
               response += "<break time='1s'/>" + (i+1) + " <break time='1s'/>" + item + " ," ;
          }
                                  response += "  and its recommended to take within " + " two " + " months. Do you want to set reminder ? " ; 
                                
        this.response.speak(SHOW_SCHEDULE_MESSAGE + response).listen(REPROMPT_SPEECH);
                                this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
                                this.emit(':responseReady');
                                */
                                
    },
                "SetReminderIntent": function() {
        //this.handler.state = states.QUIZ;
                                var nameOfKid = this.attributes["nameOfKid"];  
                                
                                
                                const { userId } = this.event.session.user;
        const { slots } = this.event.request.intent;
                                
                   // mobileNumber
    if (!slots.mobileNumber.value) {
      const slotToElicit = 'mobileNumber';
      const speechOutput = 'What is the mobile Number?';
      const repromptSpeech = 'Please tell me the mobile Number';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    else if (slots.mobileNumber.confirmationStatus !== 'CONFIRMED') {

      if (slots.mobileNumber.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
                                const mobileNumber = slots.mobileNumber.value;                         
        const slotToConfirm = 'mobileNumber';
        const speechOutput = "The mobile Number is " + getRandomSymbolSpeech(mobileNumber) + " , correct?";
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'mobileNumber';
      const speechOutput = 'What is the mobile Number on which you want to get reminders ?';
      const repromptSpeech = 'Please tell me the mobile Number';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
}              
                   this.attributes["mobileNumber"] = slots.mobileNumber.value;
                                
                                   // numOfDaysPriorToRemind
    if (!slots.numOfDaysPriorToRemind.value) {
      const slotToElicit = 'numOfDaysPriorToRemind';
      const speechOutput = 'How many days prior of appointment you want to get reminders ?';
      const repromptSpeech = 'Please tell number of days prior of appointment you want to get reminders';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
   }
    else if (slots.numOfDaysPriorToRemind.confirmationStatus !== 'CONFIRMED') {

      if (slots.numOfDaysPriorToRemind.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
        const slotToConfirm = 'numOfDaysPriorToRemind';
        const speechOutput = `The number of days prior of getting reminder is ${slots.numOfDaysPriorToRemind.value}, correct?`;
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'numOfDaysPriorToRemind';
      const speechOutput = 'How many days prior of appointment you want to get reminders ?';
      const repromptSpeech = 'Please tell number of days prior of appointment you want to get reminders';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
}              
                   this.attributes["numOfDaysPriorToRemind"] = slots.numOfDaysPriorToRemind.value;               
                                
                                                                                                               
                                console.log("Answer Intent event: "+JSON.stringify(this.event));
        //var item = getItem(this.event.request.intent.slots);

        //if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {
            if (supportsDisplay.call(this)||isSimulator.call(this)) {
                                                //if (true) {
              //this device supports a display

              let content = {                     
                    "hasDisplaySpeechOutput" : REMINDER_SET_MESSAGE + REPROMPT_SPEECH,
                    "hasDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "noDisplaySpeechOutput" : REMINDER_SET_MESSAGE + REPROMPT_SPEECH,
                    "noDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "simpleCardTitle" : getCardTitle(nameOfKid),
                    "simpleCardContent" : REMINDER_SET_MESSAGE + " to " + this.attributes["mobileNumber"],                    
                    "bodyTemplateTitle" : getCardTitle(nameOfKid),
                    "bodyTemplateContent" : REMINDER_SET_MESSAGE + " to " + this.attributes["mobileNumber"],
                    "templateToken" : "FinalScoreView",
                    "askOrTell": ":ask",
					"backgroundImageUrl": getLargeImage1(),
                    "sessionAttributes" : this.attributes
                };
                if (USE_IMAGES_FLAG) {
                  content["imageSmallUrl"]=getSmallImage1();
                  content["imageLargeUrl"]=getLargeImage1();
                }
                renderTemplate.call(this,content);
            } else {
              //this device does not support a display
              if (USE_IMAGES_FLAG) {
                //we have images so produce a card
                var imageObj = {smallImageUrl: getSmallImage1(), largeImageUrl: getLargeImage1()};
                //this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);
                //this.response.cardRenderer("Amit's Vaccine Schedule", getSchedule1(), imageObj);
              }
              //this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
              this.response.speak(REMINDER_SET_MESSAGE + REPROMPT_SPEECH).listen(REPROMPT_SPEECH);
              this.emit(":responseReady");
            }
/*  
        } else {
            this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));
            this.emit(":responseReady");
        }
                                
                */           
                                
                                
                                /*
        let response = "";                     
                                
                                for (var i = 0; i < vaccineSchedules.two.length; i++) {
              var item = vaccineSchedules.two[i];
                                                  
               response += "<break time='1s'/>" + (i+1) + " <break time='1s'/>" + item + " ," ;
          }
                                  response += "  and its recommended to take within " + " two " + " months. Do you want to set reminder ? " ; 
                                
        this.response.speak(SHOW_SCHEDULE_MESSAGE + response).listen(REPROMPT_SPEECH);
                                this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
                                this.emit(':responseReady');
                                */
                                
    },
                
        "MarkAsDoneIntent": function() {
        //this.handler.state = states.QUIZ;
        
                                
        const { userId } = this.event.session.user;
        const { slots } = this.event.request.intent;
                                
        //let birthDateOfKid = this.attributes["dateOfBirthOfKid"];                          
        //let vaccines = getActiveVaccines(getAgeInMonths(birthDateOfKid));
                                
        let birthDateOfKid = this.attributes["dateOfBirthOfKid"]; 
        var vSchedule = this.attributes["vaccineSchedule"];	
        var nameOfKid = this.attributes["nameOfKid"];  		 
                                
        // vaccineName
        if (slots.vaccineName.confirmationStatus !== 'CONFIRMED') {

        if (slots.vaccineName.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
        const slotToConfirm = 'vaccineName';
                                                                  
        const speechOutput = getResponseMessage("markAsDone",birthDateOfKid, vSchedule);
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'vaccineName';
      const speechOutput = getResponseMessage("markAsDone",birthDateOfKid, vSchedule);
      const repromptSpeech = speechOutput;
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);}                                                            
         
	  //vSchedule.vaccineView.months[0].vaccineList.vaccines[0] = "TEst";
		
	
	for (var i = 0; i < vSchedule.vaccineView.months.length; i++) {
      var vac = vSchedule.vaccineView.months[i];
   let ageFromString2 = getAgeInMonths(birthDateOfKid)
   var monthIndicator = getMonthIndicator(ageFromString2);
   if (vac.month == monthIndicator) {
	console.log("11############vac.vaccineList.vaccines. ", vac.vaccineList.vaccines);
	for (var i = 0; i < vac.vaccineList.vaccines.length; i++) 
    {
		vac.vaccineList.vaccines[i].status = "Done";
		vac.vaccineList.vaccines[i].dateDone = new Date();
		console.log("11############vacName. ", vac.vaccineList.vaccines[i].status);	    
	} 
}
}                                                                                                              
        console.log("11##################vSchedule: "+JSON.stringify(vSchedule));
        //var item = getItem(this.event.request.intent.slots);

        //if (item && item[Object.getOwnPropertyNames(data[0])[0]] !== undefined) {
            if (supportsDisplay.call(this)||isSimulator.call(this)) {
                                                //if (true) {
              //this device supports a display

              let content = {                     
                    "hasDisplaySpeechOutput" : MARK_AS_DONE_MESSAGE+REPROMPT_SPEECH,
                    "hasDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "noDisplaySpeechOutput" : MARK_AS_DONE_MESSAGE+REPROMPT_SPEECH,
                    "noDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "simpleCardTitle" : getCardTitle(nameOfKid),
                    //"simpleCardContent" :getResponseMessage("markAsDoneDisplay",birthDateOfKid, vSchedule),
                    "simpleCardContent" :MARK_AS_DONE_MESSAGE,					
                    "bodyTemplateTitle" : getCardTitle(nameOfKid),
                    //"bodyTemplateContent" : getResponseMessage("markAsDoneDisplay",birthDateOfKid, vSchedule),
					"bodyTemplateContent" : MARK_AS_DONE_MESSAGE,
                    "templateToken" : "FinalScoreView",
                    "askOrTell": ":ask",
					"backgroundImageUrl": getLargeImage1(),
                    "sessionAttributes" : this.attributes
                };
                if (USE_IMAGES_FLAG) {
                  content["imageSmallUrl"]=getSmallImage1();
                  content["imageLargeUrl"]=getLargeImage1();
                }
                renderTemplate.call(this,content);
            } else {
              //this device does not support a display
              if (USE_IMAGES_FLAG) {
                //we have images so produce a card
                var imageObj = {smallImageUrl: getSmallImage1(), largeImageUrl: getLargeImage1()};
                //this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);
                //this.response.cardRenderer(getCardTitle(nameOfKid), getSchedule1(), imageObj);
              }
              //this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
              this.response.speak(MARK_AS_DONE_MESSAGE+REPROMPT_SPEECH).listen(REPROMPT_SPEECH);
              this.emit(":responseReady");
            }
/*  
        } else {
            this.response.speak(getBadAnswer(item)).listen(getBadAnswer(item));
            this.emit(":responseReady");
        }
                                
                */           
                                
                                
                                /*
        let response = "";                     
                                
                                for (var i = 0; i < vaccineSchedules.two.length; i++) {
              var item = vaccineSchedules.two[i];
                                                  
               response += "<break time='1s'/>" + (i+1) + " <break time='1s'/>" + item + " ," ;
          }
                                  response += "  and its recommended to take within " + " two " + " months. Do you want to set reminder ? " ; 
                                
        this.response.speak(SHOW_SCHEDULE_MESSAGE + response).listen(REPROMPT_SPEECH);
                                this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
                                this.emit(':responseReady');
                                */
                                
    },
    "RatePolicyIntent11": function() {
                   
          if (false) {
          //if (supportsDisplay.call(this)||isSimulator.call(this)) {
                                  //console.log("has display:"+ supportsDisplay.call(this));
          //console.log("is simulator:"+isSimulator.call(this));
          let content = {                     
                    "hasDisplaySpeechOutput" : getResponseMessage("create",birthDateOfKid, vaccineSchedule),
                    "hasDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "noDisplaySpeechOutput" : getResponseMessage("create",birthDateOfKid, vaccineSchedule),
                    "noDisplayRepromptText" : REPROMPT_SPEECH,
                    "simpleCardTitle" : getCardTitle(nameOfKid),                    
                    "simpleCardContent" : NEW_SCHEDULE_SUCCESS_MESSAGE,
                    "bodyTemplateTitle" : getCardTitle(nameOfKid),                    
                    "bodyTemplateContent" : NEW_SCHEDULE_SUCCESS_MESSAGE,
                    "templateToken" : "FinalScoreView",					  
					"backgroundImageUrl": getLargeImage1(),					
                    "askOrTell": ":ask",
                    "sessionAttributes" : this.attributes
                };
                if (USE_IMAGES_FLAG) {
                  content["imageSmallUrl"]=getSmallImage1();
                  content["imageLargeUrl"]=getLargeImage1();
                }
                renderTemplate.call(this,content);
        } else {
		
		
		var pop = 0;
        var myRequest = 'Virginia';

        httpsPost(myRequest,  myResult => {
                console.log("sent     : " + myRequest);
                console.log("received : " + myResult);

                this.response.speak('The population of ' + myRequest + ' is ' + myResult);
                this.emit(':responseReady');

            }
        );
		
		
        // Just use a card if the device doesn't support a card.
          //this.response.cardRenderer(this.t('SKILL_NAME'), randomFact);
          //this.response.speak(speechOutput);
          
                                  //this.attributes["creationDate"] = new Date();                                 
                                  //var reprompt = 'What else would you like to do ?';
                           
        //this.response.speak("Welcome to insurance Buddy").listen("I am insurance Buddy");
                                  //this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
        //this.emit(':responseReady');								  
                                  }          

                                  
                                  //if (USE_CARDS_FLAG)
                                // {
                //let imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};

               // this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
                //this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);    
                                                                //}
            //else
            //{
                //this.response.speak(getSpeechDescription1() + this.attributes["nameOfKid"]).listen(REPROMPT_SPEECH);
                                                                //this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
            //}
                                //this.emit(":responseReady");
                                
    },
	"RatePolicyIntent": function() {
                   
          if (false) {
          //if (supportsDisplay.call(this)||isSimulator.call(this)) {
                                  //console.log("has display:"+ supportsDisplay.call(this));
          //console.log("is simulator:"+isSimulator.call(this));
          let content = {                     
                    "hasDisplaySpeechOutput" : getResponseMessage("create",birthDateOfKid, vaccineSchedule),
                    "hasDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "noDisplaySpeechOutput" : getResponseMessage("create",birthDateOfKid, vaccineSchedule),
                    "noDisplayRepromptText" : REPROMPT_SPEECH,
                    "simpleCardTitle" : getCardTitle(nameOfKid),                    
                    "simpleCardContent" : NEW_SCHEDULE_SUCCESS_MESSAGE,
                    "bodyTemplateTitle" : getCardTitle(nameOfKid),                    
                    "bodyTemplateContent" : NEW_SCHEDULE_SUCCESS_MESSAGE,
                    "templateToken" : "FinalScoreView",					  
					"backgroundImageUrl": getLargeImage1(),					
                    "askOrTell": ":ask",
                    "sessionAttributes" : this.attributes
                };
                if (USE_IMAGES_FLAG) {
                  content["imageSmallUrl"]=getSmallImage1();
                  content["imageLargeUrl"]=getLargeImage1();
                }
                renderTemplate.call(this,content);
        } else {
		
		const { slots } = this.event.request.intent;
		
		
     // departureDate
    if (!slots.departureDate.value) {
      const slotToElicit = 'departureDate';
      const speechOutput = 'What is departure Date?';
      const repromptSpeech = 'Please tell me departureDate';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    else if (slots.departureDate.confirmationStatus !== 'CONFIRMED') {

      if (slots.departureDate.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
                                const departureDate = slots.departureDate.value;                         
        const slotToConfirm = 'departureDate';
        const speechOutput = "Departure date is " + departureDate + " , correct?";
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'departureDate';
      const speechOutput = 'What is departure Date ?';
      const repromptSpeech = 'Please tell departure Date';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
}              
      this.attributes["departureDate"] = slots.departureDate.value;
		
	
     // returnDate
    if (!slots.returnDate.value) {
      const slotToElicit = 'returnDate';
      const speechOutput = 'What is return Date?';
      const repromptSpeech = 'Please tell me return Date';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    else if (slots.returnDate.confirmationStatus !== 'CONFIRMED') {

      if (slots.returnDate.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
                                const returnDate = slots.returnDate.value;                         
        const slotToConfirm = 'returnDate';
        const speechOutput = "Return date is " + returnDate + " , correct?";
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'returnDate';
      const speechOutput = 'What is return Date ?';
      const repromptSpeech = 'Please tell return Date';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
}              
      this.attributes["returnDate"] = slots.returnDate.value;

	       // destinationCountry
    if (!slots.destinationCountry.value) {
      const slotToElicit = 'destinationCountry';
      const speechOutput = 'What is destination Country?';
      const repromptSpeech = 'Please tell me destination Country';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    else if (slots.destinationCountry.confirmationStatus !== 'CONFIRMED') {

      if (slots.destinationCountry.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
                                const destinationCountry = slots.destinationCountry.value;                         
        const slotToConfirm = 'destinationCountry';
        const speechOutput = "destination Country is " + destinationCountry + " , correct?";
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'destinationCountry';
      const speechOutput = 'What is destination Country ?';
      const repromptSpeech = 'Please tell destination Country';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
}              
      this.attributes["destinationCountry"] = slots.destinationCountry.value;
	
		                   // travelCost
    if (!slots.travelCost.value) {
      const slotToElicit = 'travelCost';
      const speechOutput = 'What is approximate travel Cost?';
      const repromptSpeech = 'Please tell me the travel Cost';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
    }
    else if (slots.travelCost.confirmationStatus !== 'CONFIRMED') {

      if (slots.travelCost.confirmationStatus !== 'DENIED') {
        // slot status: unconfirmed
                                const travelCost = slots.travelCost.value;                         
        const slotToConfirm = 'travelCost';
        const speechOutput = "Travel Cost is " + travelCost + " , correct?";
        const repromptSpeech = speechOutput;
        return this.emit(':confirmSlot', slotToConfirm, speechOutput, repromptSpeech);
      }

      // slot status: denied -> reprompt for slot data
      const slotToElicit = 'travelCost';
      const speechOutput = 'What is the approximate travel cost ?';
      const repromptSpeech = 'Please tell approximate travel cost';
      return this.emit(':elicitSlot', slotToElicit, speechOutput, repromptSpeech);
}              
      this.attributes["travelCost"] = slots.travelCost.value;
	  
	  var travelCostNew =  slots.travelCost.value;
		
		
		
		
		
		
		var pop = 0;
        var myRequest = 'Virginia';

        httpsPost(travelCostNew,  myResult => {
                console.log("sent     : " + myRequest);
                console.log("received : " + myResult);
                
                this.response.speak('Thanks for sharing details. Premium amount is ' + myResult + '  USD. What else would you like to do ?');
                this.emit(':responseReady');

            }
        );
		
		
        // Just use a card if the device doesn't support a card.
          //this.response.cardRenderer(this.t('SKILL_NAME'), randomFact);
          //this.response.speak(speechOutput);
          
                                  //this.attributes["creationDate"] = new Date();                                 
                                  //var reprompt = 'What else would you like to do ?';
                           
        //this.response.speak("Welcome to insurance Buddy").listen("I am insurance Buddy");
                                  //this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
        //this.emit(':responseReady');								  
                                  }          

                                  
                                  //if (USE_CARDS_FLAG)
                                // {
                //let imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};

               // this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
                //this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);    
                                                                //}
            //else
            //{
                //this.response.speak(getSpeechDescription1() + this.attributes["nameOfKid"]).listen(REPROMPT_SPEECH);
                                                                //this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
            //}
                                //this.emit(":responseReady");
                                
    },
	"IssuePolicyIntent": function() {
                   
          if (false) {
          //if (supportsDisplay.call(this)||isSimulator.call(this)) {
                                  //console.log("has display:"+ supportsDisplay.call(this));
          //console.log("is simulator:"+isSimulator.call(this));
          let content = {                     
                    "hasDisplaySpeechOutput" : getResponseMessage("create",birthDateOfKid, vaccineSchedule),
                    "hasDisplayRepromptText" : REPROMPT_SPEECH,                    
                    "noDisplaySpeechOutput" : getResponseMessage("create",birthDateOfKid, vaccineSchedule),
                    "noDisplayRepromptText" : REPROMPT_SPEECH,
                    "simpleCardTitle" : getCardTitle(nameOfKid),                    
                    "simpleCardContent" : NEW_SCHEDULE_SUCCESS_MESSAGE,
                    "bodyTemplateTitle" : getCardTitle(nameOfKid),                    
                    "bodyTemplateContent" : NEW_SCHEDULE_SUCCESS_MESSAGE,
                    "templateToken" : "FinalScoreView",					  
					"backgroundImageUrl": getLargeImage1(),					
                    "askOrTell": ":ask",
                    "sessionAttributes" : this.attributes
                };
                if (USE_IMAGES_FLAG) {
                  content["imageSmallUrl"]=getSmallImage1();
                  content["imageLargeUrl"]=getLargeImage1();
                }
                renderTemplate.call(this,content);
        } else {
	  
	    
	  
	

        httpsPostCreateCustomer(myResult => {
          
                console.log("received : " + myResult);
                this.attributes["customerReferenceNumber"] = myResult;
				httpsPostIssuePolicy(myResult,myResult1 => {
				console.log("received : " + myResult1);
                this.response.speak('Insurance policy has been issued succesfully. Policy number is ' + getRandomSymbolSpeech(myResult1) + ' . What else would you like to do ?');
                this.emit(':responseReady');
                }
				);
            }
        );
		
		
        // Just use a card if the device doesn't support a card.
          //this.response.cardRenderer(this.t('SKILL_NAME'), randomFact);
          //this.response.speak(speechOutput);
          
                                  //this.attributes["creationDate"] = new Date();                                 
                                  //var reprompt = 'What else would you like to do ?';
                           
        //this.response.speak("Welcome to insurance Buddy").listen("I am insurance Buddy");
                                  //this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
        //this.emit(':responseReady');								  
                                  }          

                                  
                                  //if (USE_CARDS_FLAG)
                                // {
                //let imageObj = {smallImageUrl: getSmallImage(item), largeImageUrl: getLargeImage(item)};

               // this.response.speak(getSpeechDescription(item)).listen(REPROMPT_SPEECH);
                //this.response.cardRenderer(getCardTitle(item), getTextDescription(item), imageObj);    
                                                                //}
            //else
            //{
                //this.response.speak(getSpeechDescription1() + this.attributes["nameOfKid"]).listen(REPROMPT_SPEECH);
                                                                //this.response.cardRenderer(this.t('TITLE'), this.t('WELCOME'), welcomeCardImg);
            //}
                                //this.emit(":responseReady");
                                
    },	
    "QuizIntent": function() {
        this.handler.state = states.QUIZ;
        this.emitWithState("Quiz");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.emitWithState("Start");
    }
});


const quizHandlers = Alexa.CreateStateHandler(states.QUIZ,{
    "Quiz": function() {
        this.attributes["response"] = "";
                                this.attributes["kidNickName"] = "";
        this.attributes["counter"] = 0;
        this.attributes["quizscore"] = 0;
        this.emitWithState("AskQuestion");
    },
    "AskQuestion": function() {
        if (this.attributes["kidNickName"] == "")
        {   
            this.attributes["response"] = START_QUIZ_MESSAGE + " ";
        }

        let random = getRandom(0, data.length-1);
        let item = data[random];

        let propertyArray = Object.getOwnPropertyNames(item);
        let property = propertyArray[getRandom(1, propertyArray.length-1)];

        this.attributes["quizitem"] = item;
        this.attributes["quizproperty"] = property;
        this.attributes["counter"]++;

        let question = getQuestion(this.attributes["counter"], property, item);
        //let speech = this.attributes["response"] + question;
                                let speech = this.attributes["response"];

        this.emit(":ask", speech, question);
    },
    "AnswerIntent": function() {
        let response = "";
        let speechOutput = "";
        let item = this.attributes["quizitem"];
        let property = this.attributes["quizproperty"]

        let correct = compareSlots(this.event.request.intent.slots, item[property]);

        if (correct)
        {
            response = getSpeechCon(true);
            this.attributes["quizscore"]++;
        }
        else
        {
            response = getSpeechCon(false);
        }

        response += getAnswer(property, item);

        if (this.attributes["counter"] < 10)
        {
            response += getCurrentScore(this.attributes["quizscore"], this.attributes["counter"]);
            this.attributes["response"] = response;
            this.emitWithState("AskQuestion");
        }
        else
        {
            response += getFinalScore(this.attributes["quizscore"], this.attributes["counter"]);
            speechOutput = response + " " + EXIT_SKILL_MESSAGE;

            this.response.speak(speechOutput);
            this.emit(":responseReady");
        }
    },
    "AMAZON.RepeatIntent": function() {
        let question = getQuestion(this.attributes["counter"], this.attributes["quizproperty"], this.attributes["quizitem"]);
        this.response.speak(question).listen(question);
        this.emit(":responseReady");
    },
    "AMAZON.StartOverIntent": function() {
        this.emitWithState("Quiz");
    },
    "AMAZON.StopIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.PauseIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.CancelIntent": function() {
        this.response.speak(EXIT_SKILL_MESSAGE);
        this.emit(":responseReady");
    },
    "AMAZON.HelpIntent": function() {
        this.response.speak(HELP_MESSAGE).listen(HELP_MESSAGE);
        this.emit(":responseReady");
    },
    "Unhandled": function() {
        this.emitWithState("AnswerIntent");
    }
});

function getKidName(slots)
{ console.log("#########2 ");
    for (let slot in slots)
    {
                console.log("#########3 ");
        if (slots[slot].value != undefined)
        {      console.log("#########4 " + slots[slot].name.toString().toLowerCase());                           
            if (slots[slot].name.toString().toLowerCase() == "nameofkid")
            {   
                                                console.log("#########5 ");                                     
                let nameOfKid = slots[slot].value.toString();
                                                                return nameOfKid;
            }
        }
    }
    return "";
}



function httpsPostIssuePolicy(customerNumber,callback) {

    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey

	
	
	var post_data = {
  "ServiceRequestDetail": {
    "ServiceRequestVersion": "1.0",
    "ServiceResponseVersion": "1.0",
    "OwnerId": "15",
    "ResponseType": "JSON",
    "RegionCode": "US",
    "Token": "FK8KA9to4/LHKyC28Rsv0wR9i5j3dnrwGQRILW/8MkzAuWoimT7wulJVg3cS+2dW9GeGoqnrLT3ZN44dzwztduSs7X/MgcZvxiqxWRpCzolF8RMcGIsESQs7AvCtLKn7+Pi5HjyBGO/2LwQrVBFGX1sp9faSYo8bbtX89ENdEREse4y3Z1niXChJtel6E5IxhB12xYX8R+5jZevfvFIHMZdk6lkxyHedo2UipPyjN+0mdf87C6sQG8h1r6hKb04LEmXZ1BU3jF61VNK/GgaduY0lMmPL81e6nEBkcH0KIlXTUMLZLozOdpnetxAq8wLxtseNSFd530pMt9CYTG99SFRnH8sd+BgM0Rez5x1HXtJsxmmSocsu7aM6X7h4tRI09ja6eS3YMndyPUCaAIX4r08rFmfeJE/yhxYdN9OrrhKegiqZ0Z5sPWeMUdYjij7ERCWiYO/sCHW7A2SCkiheEh1e/+iRPwub5Etbe6/jv0QHhMUvhbV+fxBIwMZ+h/TpdXaLdBpz+LcK6o/vVDiC7BiJ+X1o/O6u9Bmft39DqDNBPRtZCVXFbjPc6tSBtCqZda6debd6ih5Q7LFl2i3rpMQNYWbPB5hFVVTalEXW8lomy7ibLpvGe50CpdYqy2uiTuDEV2nQK2443AFbAUZkMkSImQ2OLrfqscPDhCdD6wJN3d9rGqIh12WiBMlsHlrYrfN2cawRumUC96m1/sMIK6GPUyTndDmrV0xIXWepGqyW+Q76nzG+KT2qKJ/TT3J4OruCnE4ELmCGfaAD6J6w4ajfyw0ctYsjrnfufI5R4B/gco9z18dSe5OXowbwGT55td9YyEXuURYw4ubWb2LxHFRpYSQ3f5fYn0XsvtG5cghuuteDKqd8xbs93+cv+0aTYdPesM+MuKf+6HYItv+4uR5No8N/ar8RkYgBDxofe2yfxb8+Mrg51+uddbuTXIjJQOdhulWKv+0IR0S8sBeteQ==",
    "UserName": "travelagent",
    "LanguageCode": "en"
  },
  "PolicyInformation": {
    "ProductVerID": "706",
    "ProductID": "619",
    "ProductNumber": "ILT",
    "ProductVerNumber": "1.0",
    "ProducerCode": "86201",
    "OwnerId": "15",
    "CustomerNumber": customerNumber,
    "RoleID": "5",
    "RoleName": "Agent",
    "RoleType": "User",
    "EventName": "Pay_Issue",
    "CardNumber": "5555555555554444",
    "CVV": "123",
    "ExpiryMonth": "11",
    "ExpiryYear": "2018",
    "PayerName": "John Doe",
    "PayerAddress1": "399 Park st",
    "PayerCity": "Atlanta",
    "PayerState": "GA",
    "PayerCountry": "US",
    "PayerZipcode": "30301",
    "PayerEmail": "test@solartis.net",
    "PayerPhone": "4045555512",
    "PaymentMethod": "Credit Card",
    "CardType": "MasterCard"
  }
};



    var post_options = {
        host:  'travelapihk.solartis.net',       
        path: '/DroolsV4_2/DroolsService/FireEventV2',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
			'Token': 'FK8KA9to4/LHKyC28Rsv0wR9i5j3dnrwGQRILW/8MkzAuWoimT7wulJVg3cS+2dW9GeGoqnrLT3ZN44dzwztduSs7X/MgcZvxiqxWRpCzolF8RMcGIsESQs7AvCtLKn7+Pi5HjyBGO/2LwQrVBFGX1sp9faSYo8bbtX89ENdEREse4y3Z1niXChJtel6E5IxhB12xYX8R+5jZevfvFIHMZdk6lkxyHedo2UipPyjN+0mdf87C6sQG8h1r6hKb04LEmXZ1BU3jF61VNK/GgaduY0lMmPL81e6nEBkcH0KIlXTUMLZLozOdpnetxAq8wLxtseNSFd530pMt9CYTG99SFRnH8sd+BgM0Rez5x1HXtJsxmmSocsu7aM6X7h4tRI09ja6eS3YMndyPUCaAIX4r08rFmfeJE/yhxYdN9OrrhKegiqZ0Z5sPWeMUdYjij7ERCWiYO/sCHW7A2SCkiheEh1e/+iRPwub5Etbe6/jv0QHhMUvhbV+fxBIwMZ+h/TpdXaLdBpz+LcK6o/vVDiC7BiJ+X1o/O6u9Bmft39DqDNBPRtZCVXFbjPc6tSBtCqZda6debd6ih5Q7LFl2i3rpMQNYWbPB5hFVVTalEXW8lomy7ibLpvGe50CpdYqy2uiTuDEV2nQK2443AFbAUZkMkSImQ2OLrfqscPDhCdD6wJN3d9rGqIh12WiBMlsHlrYrfN2cawRumUC96m1/sMIK6GPUyTndDmrV0xIXWepGqyW+Q76nzG+KT2qKJ/TT3J4OruCnE4ELmCGfaAD6J6w4ajfyw0ctYsjrnfufI5R4B/gco9z18dSe5OXowbwGT55td9YyEXuURYw4ubWb2LxHFRpYSQ3f5fYn0XsvtG5cghuuteDKqd8xbs93+cv+0aTYdPesM+MuKf+6HYItv+4uR5No8N/ar8RkYgBDxofe2yfxb8+Mrg51+uddbuTXIjJQOdhulWKv+0IR0S8sBeteQ==',
			'EventName': 'Pay_Issue'            
        }
    };

    var post_req = https.request(post_options, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk =>  {
            returnData += chunk;
        });
        res.on('end', () => {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"New Jersey","population":9000000}

            var PolicyNumber = JSON.parse(returnData).PolicyBatch.Policies[0].PolicyNumber;

            callback(PolicyNumber);

        });
    });
    post_req.write(JSON.stringify(post_data));
    post_req.end();

}


function httpsPostCreateCustomer(callback) {

    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey

	
	
	var post_data = {
  "ServiceRequestDetail": {
    "ServiceRequestVersion": "1.0",
    "ServiceResponseVersion": "1.0",
    "OwnerId": "15",
    "ResponseType": "JSON",
    "RegionCode": "US",
    "Token": "FK8KA9to4/LHKyC28Rsv0wR9i5j3dnrwGQRILW/8MkzAuWoimT7wulJVg3cS+2dW9GeGoqnrLT3ZN44dzwztduSs7X/MgcZvxiqxWRpCzolF8RMcGIsESQs7AvCtLKn7+Pi5HjyBGO/2LwQrVBFGX1sp9faSYo8bbtX89ENdEREse4y3Z1niXChJtel6E5IxhB12xYX8R+5jZevfvFIHMZdk6lkxyHedo2UipPyjN+0mdf87C6sQG8h1r6hKb04LEmXZ1BU3jF61VNK/GgaduY0lMmPL81e6nEBkcH0KIlXTUMLZLozOdpnetxAq8wLxtseNSFd530pMt9CYTG99SFRnH8sd+BgM0Rez5x1HXtJsxmmSocsu7aM6X7h4tRI09ja6eS3YMndyPUCaAIX4r08rFmfeJE/yhxYdN9OrrhKegiqZ0Z5sPWeMUdYjij7ERCWiYO/sCHW7A2SCkiheEh1e/+iRPwub5Etbe6/jv0QHhMUvhbV+fxBIwMZ+h/TpdXaLdBpz+LcK6o/vVDiC7BiJ+X1o/O6u9Bmft39DqDNBPRtZCVXFbjPc6tSBtCqZda6debd6ih5Q7LFl2i3rpMQNYWbPB5hFVVTalEXW8lomy7ibLpvGe50CpdYqy2uiTuDEV2nQK2443AFbAUZkMkSImQ2OLrfqscPDhCdD6wJN3d9rGqIh12WiBMlsHlrYrfN2cawRumUC96m1/sMIK6GPUyTndDmrV0xIXWepGqyW+Q76nzG+KT2qKJ/TT3J4OruCnE4ELmCGfaAD6J6w4ajfyw0ctYsjrnfufI5R4B/gco9z18dSe5OXowbwGT55td9YyEXuURYw4ubWb2LxHFRpYSQ3f5fYn0XsvtG5cghuuteDKqd8xbs93+cv+0aTYdPesM+MuKf+6HYItv+4uR5No8N/ar8RkYgBDxofe2yfxb8+Mrg51+uddbuTXIjJQOdhulWKv+0IR0S8sBeteQ==",
    "UserName": "travelagent",
    "LanguageCode": "en"
  },
  "CustomerInformation": {
    "ProductVerID": "706",
    "ProductID": "619",
    "ProductNumber": "ILT",
    "ProductVerNumber": "1.0",
    "ProducerCode": "86201",
    "OwnerId": "15",
    "PlanName": "Air Ticket Protector",
    "PlanCode": "1",
    "PlanType": "Single Trip",
    "DepartureDate": "11/01/2020",
    "ReturnDate": "11/25/2020",
    "DepositDate": "05/31/2017",
    "DestinationCountry": "France",
    "PolicyEffectiveDate": "11/01/2020",
    "StateCode": "GA",
    "StateName": "Georgia",
    "QuoteType": "New Business",
    "EventName": "CreateCustomer",
    "TravelerList": [
      {
        "TravelerDOB": "02/14/1990",
        "TravelCost": "2500",
        "FirstName": "John",
        "LastName": "Doe",
        "AddressLine1": "399 park avenue",
        "City": "Atlanta",
        "State": "Georgia",
        "StateCode": "GA",
        "Country": "United States",
        "Zipcode": "30301",
        "Phone": "4045555512",
        "Email": "test@solartis.net",
        "TravelerIndex": "1"
      }
    ]
  }
};



    var post_options = {
        host:  'travelapihk.solartis.net',       
        path: '/DroolsV4_2/DroolsService/FireEventV2',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
			'Token': 'FK8KA9to4/LHKyC28Rsv0wR9i5j3dnrwGQRILW/8MkzAuWoimT7wulJVg3cS+2dW9GeGoqnrLT3ZN44dzwztduSs7X/MgcZvxiqxWRpCzolF8RMcGIsESQs7AvCtLKn7+Pi5HjyBGO/2LwQrVBFGX1sp9faSYo8bbtX89ENdEREse4y3Z1niXChJtel6E5IxhB12xYX8R+5jZevfvFIHMZdk6lkxyHedo2UipPyjN+0mdf87C6sQG8h1r6hKb04LEmXZ1BU3jF61VNK/GgaduY0lMmPL81e6nEBkcH0KIlXTUMLZLozOdpnetxAq8wLxtseNSFd530pMt9CYTG99SFRnH8sd+BgM0Rez5x1HXtJsxmmSocsu7aM6X7h4tRI09ja6eS3YMndyPUCaAIX4r08rFmfeJE/yhxYdN9OrrhKegiqZ0Z5sPWeMUdYjij7ERCWiYO/sCHW7A2SCkiheEh1e/+iRPwub5Etbe6/jv0QHhMUvhbV+fxBIwMZ+h/TpdXaLdBpz+LcK6o/vVDiC7BiJ+X1o/O6u9Bmft39DqDNBPRtZCVXFbjPc6tSBtCqZda6debd6ih5Q7LFl2i3rpMQNYWbPB5hFVVTalEXW8lomy7ibLpvGe50CpdYqy2uiTuDEV2nQK2443AFbAUZkMkSImQ2OLrfqscPDhCdD6wJN3d9rGqIh12WiBMlsHlrYrfN2cawRumUC96m1/sMIK6GPUyTndDmrV0xIXWepGqyW+Q76nzG+KT2qKJ/TT3J4OruCnE4ELmCGfaAD6J6w4ajfyw0ctYsjrnfufI5R4B/gco9z18dSe5OXowbwGT55td9YyEXuURYw4ubWb2LxHFRpYSQ3f5fYn0XsvtG5cghuuteDKqd8xbs93+cv+0aTYdPesM+MuKf+6HYItv+4uR5No8N/ar8RkYgBDxofe2yfxb8+Mrg51+uddbuTXIjJQOdhulWKv+0IR0S8sBeteQ==',
			'EventName': 'CreateCustomer'            
        }
    };

    var post_req = https.request(post_options, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk =>  {
            returnData += chunk;
        });
        res.on('end', () => {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"New Jersey","population":9000000}

            var CustomerReferenceNumber = JSON.parse(returnData).CustomerInformation.CustomerReferenceNumber;

            callback(CustomerReferenceNumber);

        });
    });
    post_req.write(JSON.stringify(post_data));
    post_req.end();

}

function httpsPost(myData, callback) {

    // GET is a web service request that is fully defined by a URL string
    // Try GET in your browser:
    // https://cp6gckjt97.execute-api.us-east-1.amazonaws.com/prod/stateresource?usstate=New%20Jersey

	
	  		

    var post_data1 = {"usstate": myData};
	
	var post_data = {
  "ServiceRequestDetail": {
    "ServiceRequestVersion": "1.0",
    "ServiceResponseVersion": "1.0",
    "OwnerId": "15",
    "ResponseType": "JSON",
    "RegionCode": "US",
    "Token": "FK8KA9to4/LHKyC28Rsv0wR9i5j3dnrwGQRILW/8MkzAuWoimT7wulJVg3cS+2dW9GeGoqnrLT3ZN44dzwztduSs7X/MgcZvxiqxWRpCzolF8RMcGIsESQs7AvCtLKn7+Pi5HjyBGO/2LwQrVBFGX1sp9faSYo8bbtX89ENdEREse4y3Z1niXChJtel6E5IxhB12xYX8R+5jZevfvFIHMZdk6lkxyHedo2UipPyjN+0mdf87C6sQG8h1r6hKb04LEmXZ1BU3jF61VNK/GgaduY0lMmPL81e6nEBkcH0KIlXTUMLZLozOdpnetxAq8wLxtseNSFd530pMt9CYTG99SFRnH8sd+BgM0Rez5x1HXtJsxmmSocsu7aM6X7h4tRI09ja6eS3YMndyPUCaAIX4r08rFmfeJE/yhxYdN9OrrhKegiqZ0Z5sPWeMUdYjij7ERCWiYO/sCHW7A2SCkiheEh1e/+iRPwub5Etbe6/jv0QHhMUvhbV+fxBIwMZ+h/TpdXaLdBpz+LcK6o/vVDiC7BiJ+X1o/O6u9Bmft39DqDNBPRtZCVXFbjPc6tSBtCqZda6debd6ih5Q7LFl2i3rpMQNYWbPB5hFVVTalEXW8lomy7ibLpvGe50CpdYqy2uiTuDEV2nQK2443AFbAUZkMkSImQ2OLrfqscPDhCdD6wJN3d9rGqIh12WiBMlsHlrYrfN2cawRumUC96m1/sMIK6GPUyTndDmrV0xIXWepGqyW+Q76nzG+KT2qKJ/TT3J4OruCnE4ELmCGfaAD6J6w4ajfyw0ctYsjrnfufI5R4B/gco9z18dSe5OXowbwGT55td9YyEXuURYw4ubWb2LxHFRpYSQ3f5fYn0XsvtG5cghuuteDKqd8xbs93+cv+0aTYdPesM+MuKf+6HYItv+4uR5No8N/ar8RkYgBDxofe2yfxb8+Mrg51+uddbuTXIjJQOdhulWKv+0IR0S8sBeteQ==",
    "UserName": "travelagent",
    "LanguageCode": "en"
  },
  "QuoteInformation": {
    "ProductID": "619",
    "ProductVerID": "706",
    "ProductNumber": "ILT",
    "ProductVerNumber": "1.0",
    "ProducerCode": "86201",
    "OwnerId": "15",
    "PlanName": "Air Ticket Protector",
    "PlanCode": "1",
    "DepartureDate": "06/25/2017",
    "ReturnDate": "06/31/2017",
    "DepositDate": "06/03/2017",
    "DestinationCountry": "France",
    "PolicyEffectiveDate": "06/25/2017",
    "RentalStartDate": "06/25/2017",
    "RentalEndDate": "06/31/2017",
    "RentalLimit": "35000",
    "NumberOfRentalCars": "1",
    "TripCancellationCoverage": "With Trip Cancellation",
    "StateCode": "GA",
    "QuoteType": "New Business",
    "EventName": "InvokeRatingV2",
    "TravelerList": [
      {
        "TravelerDOB": "02/14/1990",
        "TravelCost": myData
      }
    ]
  }
};



    var post_options = {
        host:  'travelapihk.solartis.net',       
        path: '/DroolsV4_2/DroolsService/FireEventV2',
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
			'Token': 'FK8KA9to4/LHKyC28Rsv0wR9i5j3dnrwGQRILW/8MkzAuWoimT7wulJVg3cS+2dW9GeGoqnrLT3ZN44dzwztduSs7X/MgcZvxiqxWRpCzolF8RMcGIsESQs7AvCtLKn7+Pi5HjyBGO/2LwQrVBFGX1sp9faSYo8bbtX89ENdEREse4y3Z1niXChJtel6E5IxhB12xYX8R+5jZevfvFIHMZdk6lkxyHedo2UipPyjN+0mdf87C6sQG8h1r6hKb04LEmXZ1BU3jF61VNK/GgaduY0lMmPL81e6nEBkcH0KIlXTUMLZLozOdpnetxAq8wLxtseNSFd530pMt9CYTG99SFRnH8sd+BgM0Rez5x1HXtJsxmmSocsu7aM6X7h4tRI09ja6eS3YMndyPUCaAIX4r08rFmfeJE/yhxYdN9OrrhKegiqZ0Z5sPWeMUdYjij7ERCWiYO/sCHW7A2SCkiheEh1e/+iRPwub5Etbe6/jv0QHhMUvhbV+fxBIwMZ+h/TpdXaLdBpz+LcK6o/vVDiC7BiJ+X1o/O6u9Bmft39DqDNBPRtZCVXFbjPc6tSBtCqZda6debd6ih5Q7LFl2i3rpMQNYWbPB5hFVVTalEXW8lomy7ibLpvGe50CpdYqy2uiTuDEV2nQK2443AFbAUZkMkSImQ2OLrfqscPDhCdD6wJN3d9rGqIh12WiBMlsHlrYrfN2cawRumUC96m1/sMIK6GPUyTndDmrV0xIXWepGqyW+Q76nzG+KT2qKJ/TT3J4OruCnE4ELmCGfaAD6J6w4ajfyw0ctYsjrnfufI5R4B/gco9z18dSe5OXowbwGT55td9YyEXuURYw4ubWb2LxHFRpYSQ3f5fYn0XsvtG5cghuuteDKqd8xbs93+cv+0aTYdPesM+MuKf+6HYItv+4uR5No8N/ar8RkYgBDxofe2yfxb8+Mrg51+uddbuTXIjJQOdhulWKv+0IR0S8sBeteQ==',
			'EventName': 'InvokeRatingV2'            
        }
    };

    var post_req = https.request(post_options, res => {
        res.setEncoding('utf8');
        var returnData = "";
        res.on('data', chunk =>  {
            returnData += chunk;
        });
        res.on('end', () => {
            // this particular API returns a JSON structure:
            // returnData: {"usstate":"New Jersey","population":9000000}

            var population = JSON.parse(returnData).PremiumInformation.TotalBasePremium.split(".")[0];

            callback(population);

        });
    });
    post_req.write(JSON.stringify(post_data));
    post_req.end();

}

function getSchedule1()
{  

    var response = "";                        
                                
                                for (var i = 0; i < vaccineSchedules.two.length; i++) {
              var item = vaccineSchedules.two[i];
                                                  
               response += item + "\n" ;
          }
                                  response += "                   Expected Date : 31st-May-2018                Do you want to set reminder ?" ; 
   
   /*
    var text = "";

    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
                */
    return response;
}


function getSchedule()
{  

    var response = "";                        
                                
                                for (var i = 0; i < vaccineSchedules.two.length; i++) {
              var item = vaccineSchedules.two[i];
                                                  
               response += "<break time='1s'/>" + (i+1) + " <break time='1s'/>" + ": "+ item + "\n" ;
          }
                                  response += "  and its recommended to take within " + " two " + " months. Do you want to set reminder ? " ; 
   
   /*
    var text = "";

    for (var key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
                */
    return response;
}

function compareSlots(slots, value)
{
    for (let slot in slots)
    {
        if (slots[slot].value != undefined)
        {
                                                this.attributes["kidNickName"] = slots[slot].value.toString();
            if (slots[slot].value.toString().toLowerCase() == value.toString().toLowerCase())
            {
                return true;
            }
        }
    }
    return false;
}

function getRandom(min, max)
{
    return Math.floor(Math.random() * (max-min+1)+min);
}

function getRandomSymbolSpeech(symbol)
{
    return "<say-as interpret-as='spell-out'>" + symbol + "</say-as>";
}

function getYesNo(slots)
{
    let propertyArray = Object.getOwnPropertyNames(data[0]);
    let value;

    for (let slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (let property in propertyArray)
            {
                let item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getItem(slots)
{
    let propertyArray = Object.getOwnPropertyNames(data[0]);
    let value;

    for (let slot in slots)
    {
        if (slots[slot].value !== undefined)
        {
            value = slots[slot].value;
            for (let property in propertyArray)
            {
                let item = data.filter(x => x[propertyArray[property]].toString().toLowerCase() === slots[slot].value.toString().toLowerCase());
                if (item.length > 0)
                {
                    return item[0];
                }
            }
        }
    }
    return value;
}

function getSpeechCon(type)
{
    let speechCon = "";
    if (type) return "<say-as interpret-as='interjection'>" + speechConsCorrect[getRandom(0, speechConsCorrect.length-1)] + "! </say-as><break strength='strong'/>";
    else return "<say-as interpret-as='interjection'>" + speechConsWrong[getRandom(0, speechConsWrong.length-1)] + " </say-as><break strength='strong'/>";
}

function formatCasing(key)
{
    key = key.split(/(?=[A-Z])/).join(" ");
    return key;
}

function getTextDescription(item)
{
    let text = "";

    for (let key in item)
    {
        text += formatCasing(key) + ": " + item[key] + "\n";
    }
    return text;
}

exports.handler = (event, context) => {
    const alexa = Alexa.handler(event, context);
    alexa.appId = APP_ID;
                
                alexa.dynamoDBTableName = 'RecipeSkillTable'; // creates new table for session.attributes
      if (alexa.dynamoDBTableName == 'RecipeSkillTable' ){
        persistenceEnabled=true;
      } else {
        persistenceEnabled=false;
      }
                
    alexa.registerHandlers(handlers, startHandlers, quizHandlers);
    alexa.execute();
};

//==============================================================================
//===================== Echo Show Helper Functions  ============================
//==============================================================================


function supportsDisplay() {
  var hasDisplay =
    this.event.context &&
    this.event.context.System &&
    this.event.context.System.device &&
    this.event.context.System.device.supportedInterfaces &&
    this.event.context.System.device.supportedInterfaces.Display

  return hasDisplay;
}

function isSimulator() {
  var isSimulator = !this.event.context; //simulator doesn't send context
  return false;
}


function renderTemplate (content) {
   console.log("renderTemplate" + content.templateToken);
   //learn about the various templates
   //https://developer.amazon.com/public/solutions/alexa/alexa-skills-kit/docs/display-interface-reference#display-template-reference
   //
   switch(content.templateToken) {
       case "WelcomeScreenView":
         //Send the response to Alexa
         this.context.succeed(response);
         break;
       case "FinalScoreView":
        //  "hasDisplaySpeechOutput" : response + " " + EXIT_SKILL_MESSAGE,
        //  "bodyTemplateContent" : getFinalScore(this.attributes["quizscore"], this.attributes["counter"]),
        //  "templateToken" : "FinalScoreView",
        //  "askOrTell": ":tell",
        //  "hint":"start a quiz",
        //  "sessionAttributes" : this.attributes
        //  "backgroundImageUrl"
        var response = {
          "version": "1.0",
          "response": {
            "directives": [
              {
                "type": "Display.RenderTemplate",
                "backButton": "HIDDEN",
                "template": {
                  "type": "BodyTemplate6",
                  "title": content.bodyTemplateTitle,
                  "token": content.templateToken,
                  "textContent": {
                    "primaryText": {
                      "type": "RichText",
                      "text": "<font size = '7'>"+content.bodyTemplateContent+"</font>"
                    }
                  }
                }
              },{
                  "type": "Hint",
                  "hint": {
                    "type": "PlainText",
                    "text": content.hint
                  }
                }
            ],
            "outputSpeech": {
              "type": "SSML",
              "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
            },
            "reprompt": {
              "outputSpeech": {
                "type": "SSML",
                "ssml": ""
              }
            },
            "shouldEndSession": content.askOrTell== ":tell",

          },
          "sessionAttributes": content.sessionAttributes

        }

        if(content.backgroundImageUrl) {
          //when we have images, create a sources object

          let sources = [
            {
              "size": "SMALL",
              "url": content.backgroundImageUrl
            },
            {
              "size": "LARGE",
              "url": content.backgroundImageUrl
            }
          ];
          //add the image sources object to the response
          response["response"]["directives"][0]["template"]["backgroundImage"]={};
          response["response"]["directives"][0]["template"]["backgroundImage"]["sources"]=sources;
        }



         //Send the response to Alexa
         this.context.succeed(response);
         break;

       case "ItemDetailsView":
           var response = {
             "version": "1.0",
             "response": {
               "directives": [
                 {
                   "type": "Display.RenderTemplate",
                   "template": {
                     "type": "BodyTemplate3",
                     "title": content.bodyTemplateTitle,
                     "token": content.templateToken,
                     "textContent": {
                       "primaryText": {
                         "type": "RichText",
                         "text": "<font size = '3'>"+content.bodyTemplateContent+"</font>"
                       }
                     },
                     "backButton": "HIDDEN"
                   }
                 }
               ],
               "outputSpeech": {
                 "type": "SSML",
                 "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
               },
               "reprompt": {
                 "outputSpeech": {
                   "type": "SSML",
                   "ssml": "<speak>"+content.hasDisplayRepromptText+"</speak>"
                 }
               },
               "shouldEndSession": content.askOrTell== ":tell",
               "card": {
                 "type": "Simple",
                 "title": content.simpleCardTitle,
                 "content": content.simpleCardContent
               }
             },
             "sessionAttributes": content.sessionAttributes

         }

          if(content.imageSmallUrl && content.imageLargeUrl) {
            //when we have images, create a sources object
            //TODO switch template to one without picture?
            let sources = [
              {
                "size": "SMALL",
                "url": content.imageSmallUrl
              },
              {
                "size": "LARGE",
                "url": content.imageLargeUrl
              }
            ];
            //add the image sources object to the response
            response["response"]["directives"][0]["template"]["image"]={};
            response["response"]["directives"][0]["template"]["image"]["sources"]=sources;
          }
          //Send the response to Alexa
          console.log("ready to respond (ItemDetailsView): "+JSON.stringify(response));
           this.context.succeed(response);
           break;
       case "MultipleChoiceListView":
       console.log ("listItems "+JSON.stringify(content.listItems));
           var response = {
              "version": "1.0",
              "response": {
                "directives": [
                  {
                    "type": "Display.RenderTemplate",
                    "template": {
                      "type": "ListTemplate1",
                      "title": content.listTemplateTitle,
                      "token": content.templateToken,
                      "listItems":content.listItems,
                      "backgroundImage": {
                        "sources": [
                          {
                            "size": "SMALL",
                            "url": content.backgroundImageSmallUrl
                          },
                          {
                            "size": "LARGE",
                            "url": content.backgroundImageLargeUrl
                          }
                        ]
                      },
                      "backButton": "HIDDEN"
                    }
                  }
                ],
                "outputSpeech": {
                  "type": "SSML",
                  "ssml": "<speak>"+content.hasDisplaySpeechOutput+"</speak>"
                },
                "reprompt": {
                  "outputSpeech": {
                    "type": "SSML",
                    "ssml": "<speak>"+content.hasDisplayRepromptText+"</speak>"
                  }
                },
                "shouldEndSession": content.askOrTell== ":tell",
                "card": {
                  "type": "Simple",
                  "title": content.simpleCardTitle,
                  "content": content.simpleCardContent
                }
              },
                "sessionAttributes": content.sessionAttributes

          }

            if(content.backgroundImageLargeUrl) {
              //when we have images, create a sources object
              //TODO switch template to one without picture?
              let sources = [
                {
                  "size": "SMALL",
                  "url": content.backgroundImageLargeUrl
                },
                {
                  "size": "LARGE",
                  "url": content.backgroundImageLargeUrl
                }
              ];
              //add the image sources object to the response
              response["response"]["directives"][0]["template"]["backgroundImage"]={};
              response["response"]["directives"][0]["template"]["backgroundImage"]["sources"]=sources;
            }
            console.log("ready to respond (MultipleChoiceList): "+JSON.stringify(response));
           this.context.succeed(response);
           break;
       default:
          this.response.speak("Thanks for playing, goodbye");
          this.emit(':responseReady');
   }

}