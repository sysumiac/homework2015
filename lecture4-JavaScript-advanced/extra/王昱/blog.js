function getDate(){
	var d = new Date();
	return d.getFullYear()+"-"+(d.getMonth()+1)+"-"+d.getDate()+" "+(parseInt(d.getHours())<10?0:"")+d.getHours()+":"+(parseInt(d.getMinutes())<10?0:"")+d.getMinutes()+":"+(parseInt(d.getSeconds())<10?0:"")+d.getSeconds();
}

function clock(){
	document.getElementsByClassName("time")[0].innerHTML = getDate();
}

var bj = new Array();//储存已经占用的高度
for(var i = 0; i < 55; ++i)bj[i] = -100;

hexColor = new Array("0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "A", "B", "C", "D", "E", "F");
function RGBtoHEX(R, G, B){
	return("#"+hexColor[Math.floor(R/16)]+hexColor[R%16]+hexColor[Math.floor(G/16)]+hexColor[G%16]+hexColor[Math.floor(B/16)]+hexColor[B%16]);
}

//淡入淡出效果设置
function fadeOut(obj){
	var i = 1;
	return(function(){
		obj.style.opacity = i;
		i -= 0.01;
		if(obj.style.opacity > 0 && ifReset == 0)setTimeout(arguments.callee, 15);
	});
}

function fadeIn(obj){
	var i = 0.01;
	return(function(){
		obj.style.opacity = i;
		i += 0.01;
		if(obj.style.opacity < 1 && ifReset == 0)setTimeout(arguments.callee, 15);
	});
}

function addElememt(height){
	for(var i = 0; i < 55; ++i)
		if(bj[i] == -100){
			bj[i] = height;
			return 0;
		}
}

function deleteElememt(height){
	for(var i = 0; i < 55; ++i)
		if(bj[i] == height){
			bj[i] = -100;
			return 0;
		}
}

function move(obj, height, kind){
	var i = 0;
	return(function(){
		obj.style.transform = "translate(-"+i+"px, "+height+"px)";
		if(kind == "fade")obj.style.opacity = 1-i/(document.body.clientWidth+obj.offsetWidth-100);
		++i;
		if(i == obj.offsetWidth)deleteElememt(height);
		if(i < document.body.clientWidth+obj.offsetWidth || obj.opacity <= 0)setTimeout(arguments.callee, 10);
		else document.body.removeChild(obj);
	});
}

function judge(height, hlimit){
	for(var i = 0; i < 55; ++i)
		if(Math.abs(bj[i]-height) < hlimit)return true;
	return false;
}

function getHeight(obj, hlimit, kind){
	var height = Math.floor(Math.random()*(document.body.clientHeight-hlimit));
	function change(){
		if(judge(height, hlimit)){
			height = Math.floor(Math.random()*(document.body.clientHeight-hlimit));
			setTimeout(change(), 10);
		}else{
			addElememt(height);
			(move(obj, height, kind))();
		}
	}
	change();
	return height;
}

function startMove(obj, kind){
	getHeight(obj, obj.offsetHeight, kind);
}

var picker1 = document.getElementById("picker1"),
	canvas1 = document.getElementById("colorSelect"),
	rect1 = canvas1.getBoundingClientRect(),
	picker2 = document.getElementById("picker2"),
	canvas2 = document.getElementById("colorOpacity"),
	rect2 = canvas2.getBoundingClientRect();

function colorGet(){
	var x = picker2.offsetLeft,
		imageData = canvas2.getContext("2d").getImageData(x*(canvas2.width/rect2.width), 0, 1, 1),
		hex = RGBtoHEX(imageData.data[0], imageData.data[1], imageData.data[2]);
	return hex;
}

document.getElementById("comment-bottom").onclick = function(){
	var val = document.getElementById("commentValue");
	if(val.value.length < 4 || val.value.length > 150)alert("嗯哼？");else{
		var comment = document.getElementById("commemt-area");
		var count = document.getElementById("counter");
		var node = comment.lastChild.cloneNode(true);
		count.innerHTML = parseInt(count.innerHTML)+1+"";
		node.firstChild.textContent = val.value;
		comment.appendChild(node);		
		//弹幕创建
		var bullet = document.createElement("p");
		bullet.textContent = val.value;
		bullet.className = "bullet";
		document.body.appendChild(bullet);
		startMove(bullet, document.getElementById("kindSelect").value);
		bullet.style.right = "-"+bullet.offsetWidth+"px";
		bullet.style.color = colorGet();
		bullet.style.fontSize = document.getElementById("sizeSelect").value;
		val.value = "";
	}
}

setInterval("clock()", 1000);

var pictureNumber = 3;
var ifReset = 0;

//图片下方小圆点创建
for(var i = 1; i <= pictureNumber; ++i){
	var dot = document.createElement("div");
	dot.className = "smallDot";
	dot.id = "d"+i;
	dot.x = i;
	if(i == 1)dot.y = pictureNumber;else dot.y = i-1;
	document.getElementById("linker").appendChild(dot);
}

//颜色选择器绘制
var color = document.getElementById("colorSelect");
var c = color.getContext("2d");
var grd = c.createLinearGradient(0, 0, color.width, 0);
grd.addColorStop(0, '#F00');
grd.addColorStop(1/5, '#FF0');
grd.addColorStop(2/5, '#0F0');
grd.addColorStop(3/5, '#0FF');
grd.addColorStop(4/5, '#00F');
grd.addColorStop(1, '#F0F');
c.fillStyle = grd;
c.fillRect(0, 0, color.width, color.height);

color = document.getElementById("colorOpacity");
c = color.getContext("2d");
grd = c.createLinearGradient(0, 0, color.width, 0);
grd.addColorStop(0, "white");
grd.addColorStop(1, "#F00");
c.fillStyle = grd;
c.fillRect(0, 0, color.width, color.height);

//颜色选择器设置
picker1.onmousedown = function(){
	canvas1.style.cursor = "pointer";
	canvas1.onmousemove = function(){
		var x = event.clientX-document.getElementById("colorPicker1").offsetLeft;
		picker1.style.left = (x<97?x:97)+"px";
		var imageData = canvas1.getContext("2d").getImageData(x*(canvas1.width/rect1.width), 0, 1, 1),
			hex = RGBtoHEX(imageData.data[0], imageData.data[1], imageData.data[2]);
		c.clearRect(0, 0, color.width, color.height);
		grd = c.createLinearGradient(0, 0, color.width, 0);
		grd.addColorStop(0, "white");
		grd.addColorStop(1, hex);
		c.fillStyle = grd;
		c.fillRect(0, 0, color.width, color.height);
		document.getElementById("colorSample").style.backgroundColor = colorGet();
	}
}

picker1.onmouseup = function(){
	canvas1.style.cursor = "default";
	canvas1.onmousemove = null;
}

picker2.onmousedown = function(){
	canvas2.onmousemove = function(){
		var x = event.clientX-document.getElementById("colorPicker2").offsetLeft;
		picker2.style.left = (x<97?x:97)+"px";
		canvas2.style.cursor = "pointer";
		document.getElementById("colorSample").style.backgroundColor = colorGet();
	}
}

picker2.onmouseup = function(){
	canvas2.style.cursor = "default";
	canvas2.onmousemove = null;
}

//图片自动轮换
function play(x, y){
	var i = x;
	var j = y;
	var bj = 0;
	var photo1 = document.getElementById("picture1");
	var photo2 = document.getElementById("picture2");
	return(function(){
		ifReset = 0;
		document.getElementById("d"+i).style.backgroundColor = "#CCC";
		document.getElementById("d"+j).style.backgroundColor = "white";
		photo1.src = "img/slide-"+i+".jpg";
		photo1.style.opacity = 0;
		photo2.src = "img/slide-"+j+".jpg";
		if(bj == 0)photo2.style.opacity = 0;else(fadeOut(photo2))();
		(fadeIn(photo1))();
		bj = 1;
		i = i%pictureNumber+1;
		j = j%pictureNumber+1;
		t = setTimeout(arguments.callee, 4000);
	});
}

for(var i = 1; i <= pictureNumber; ++i){
	var tmp = document.getElementById("d"+i);
	tmp.onclick = function(){
		clearTimeout(t);
		ifReset = 1;
		document.getElementById("picture1").style.opacity = 0;
		document.getElementById("picture2").style.opacity = 0;
		(play(this.x, this.y))();
	}
}

(play(1, pictureNumber))();