// Normal date class not sufficient to enclose
BigDate = function() {
  if(arguments.length === 6){
    this.centuries = arguments[0];
    this.years = arguments[1];
    this.days = arguments[2];
    this.hours = arguments[3];
    this.minutes = arguments[4];
    this.seconds = arguments[5];
  }else if(arguments.length === 1){
    var time = arguments[0];

    this.centuries = Math.floor(time/3153600000);
    time = time % 3153600000;

    this.years = Math.floor(time/31536000);
    time = time % 31536000;

    this.days = Math.floor(time/86400);
    time = time % 86400;

    this.hours = Math.floor(time/3600);
    time = time % 3600;

    this.minutes = Math.floor(time/60);
    time = time % 60;

    this.seconds = Math.floor(time);
  }else{
    throw "Error: Incorrect number of parameters."
  }
};
BigDate.prototype.getTime = function() {
  return this.centuries*3153600000 + this.years*31536000 + this.days*86400  + this.hours*3600 + this.minutes*60 + this.seconds;
};

function toggleLoadingText() {

}

var dateComplete = new BigDate(75000, 44, 330, 7, 7, 37);

function getCount() {
  var dateNow = new Date();
  var time = new BigDate(dateComplete.getTime() - new BigDate(dateNow.getTime()/1000).getTime());
  delete dateNow;

  if(time < 0){
    document.getElementById("remaining").innerHTML="42";
  }else{
    var output = "&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;";

    if(time.centuries != 0){
      output += time.centuries + " centur" + ((time.centuries != 1) ? "ies" : "y") + ", ";
    }
    if(time.years != 0){
      output += time.years + " year" + ((time.years != 1) ? "s" : "") + ", ";
    }
    if(time.days != 0){
      output += time.days + " day" + ((time.days != 1) ? "s" : "") + ", ";
    }
    if(time.hours != 0){
      output += time.hours + " hour" + ((time.hours != 1) ? "s" : "") + ", ";
    }
    if(time.minutes != 0){
      output += time.minutes + " minute" + ((time.minutes != 1) ? "s" : "") + ", ";
    }
    output += time.seconds + " seconds";
    document.getElementById("remaining").innerHTML = output;

    setTimeout("getCount()", 1000);
  }
}

window.onload = function(){ getCount(); }
