// GET TIME
function startTime() {
  var today = new Date();
  var h = today.getHours();
  var m = today.getMinutes();
  var s = today.getSeconds();
  var D = today.getDate();
  var M = today.getMonth();
  var Y = today.getFullYear();
  m = checkTime(m);
  s = checkTime(s);
  $("#timeNow").html(D + "/" + M + "/" + Y + " | " + h + ":" + m + ":" + s);
  var t = setTimeout(startTime, 500);
}
function checkTime(i) {
  if (i < 10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}


setInterval(function(){
  $("#table-queue").load('/ajax/guest/table-queue')
},10000)

// VOICE
responsiveVoice.setDefaultVoice("Indonesian Male")
//socket
var io = io()
io.on('voice', function(data){
  responsiveVoice.speak(data)
})
