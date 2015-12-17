//更新时间
document.getElementById("time").innerHTML = Date();
function change_time() {
    document.getElementById("time").innerHTML = Date();
}
setInterval("change_time()", 1000);

//评论区
var sum = 1;
var comment = document.getElementById('comment-submit');
comment.onclick = function() {
	sum++;
	document.getElementById('sum').innerHTML = sum;
	var li = document.createElement("li");
	var p = document.createElement("p");
	var comments = document.getElementById("content").value;
	var content = document.createTextNode(comments);
	p.appendChild(content);
	li.appendChild(p);
	document.getElementById("comments").appendChild(li);
	document.getElementById("content").value = "";
}

//图片切换
function picture(name, opacity) {
	this.name = name,
	this.switch = "button",
	this.opacity = opacity
};
var pictures = new Array(3)
pictures[0] = new picture("picture1", 1);
pictures[0].switch = "button1";
pictures[1] = new picture("picture2", 0);
pictures[1].switch = "button2";
pictures[2] = new picture("picture3", 0);
pictures[2].switch = "button3";
for (var i = 0; i < 3; i++)
    document.getElementById(pictures[i].name).style.opacity = pictures[i].opacity;

var now = 0;
var next = 0;
var click = false;
var fade = function(){
	pictures[now].opacity -= 0.05;
	document.getElementById(pictures[now].name).style.opacity = pictures[now].opacity;
	pictures[next].opacity += 0.05;
	document.getElementById(pictures[next].name).style.opacity = pictures[next].opacity;
	if (pictures[now].opacity > 0 && pictures[next].opacity < 1) setTimeout("fade()", 50);
}
var turn = function() {
  	if (click === false) {
  		now = next;
    	next = (now+1)%3;
    } else {
    	click = false;
    }
	document.getElementById(pictures[now].name).style.opacity = 1;
	document.getElementById(pictures[next].name).style.opacity = 0;
	pictures[now].opacity = 1;
	pictures[next].opacity = 0;
    fade();
    document.getElementById(pictures[now].switch).style.background = "gray";
    document.getElementById(pictures[next].switch).style.background = "white";
}

var interval = setInterval("turn()", 5000);

document.getElementById("button1").onclick = function(){
    if (next !== 0) {
    	clearInterval(interval);
	    now = next;
	    next = 0;
	    click = true;
	    turn();
	    interval = setInterval("turn()", 5000);
	}
}
document.getElementById("button2").onclick = function(){
    if (next !== 1) {
    	clearInterval(interval);
        now = next;
        next = 1;
        click = true;
        turn();
        interval = setInterval("turn()", 5000);
    }
}
document.getElementById("button3").onclick = function(){
    if (next !== 2) {
    	clearInterval(interval);
	    now = next;
	    next = 2;
	    click = true;
	    turn();
	    interval = setInterval("turn()", 5000);
	}
}