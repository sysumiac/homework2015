function changeComment() {
	appendComment();
	deleteComment();
}
function addNumber() {
	document.getElementById("count").innerHTML++;
}

function appendComment() {
	var item = document.getElementsByClassName("comment")[0];
	console.log(item.value)
	if (item.value.length <= 4) {
		alert("输入内容需多于4个字符");
	    return false;
	}
	var cln = document.getElementsByClassName("comment-item")[0].cloneNode(true);
	document.getElementsByClassName("comments")[0].appendChild(cln);
	cln.innerHTML = item.value;
	addNumber();
}



function deleteComment() {
	document.getElementsByClassName("comment")[0].value="";
}


var myVar=setInterval(function(){myTimer()},1000);

function myTimer() {
    var d = new Date();
    var year = d.getFullYear();
    var month = d.getMonth() + 1;
    if (month < 10) 
    	month = "0" + month;
    var date = d.getDate();
    if (date < 10) 
    	date = "0" + date;
    var hour = d.getHours();
    if (hour < 10) 
    	hour = "0" + hour;
    var min = d.getMinutes();
    if (min < 10) 
    	min = "0" + min;
    var sec = d.getSeconds();
    if (sec < 10) 
    	sec = "0" + sec;
    document.getElementById("time").innerHTML=year + "-" + month + "-" + date +" " + hour + ':' + min + ':' +sec;
}