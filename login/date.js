// Prepare date from index.
var d = new Date();
var day = d.getDate();
var week = d.getDay();
var mounth = d.getMonth();
var year = d.getFullYear();

var weekArr = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
var monthkArr = ['JAN','FEB','MAR','APR','MAY','JUN','JUL','AUG','SEP','OCT','NOV','DEC'];

if(day.toString().length == 1){
    day = "0"+day;
}

$('#week').text(weekArr[week]); // -1 because mounth it starts at index array zero
$('#day').text(day); 
$('#year').text(monthkArr[mounth].toString()+" "+year); 