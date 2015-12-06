try{
	window.requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame || window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
	
	var gravity = 1;
	var attritionrate = 0.8;
	var arr = new Array();
	
	function pow(x){return x*x;}
	
	function check(b){
		for(i = 0; i < arr.length; i++){
			if(arr[i].squareDis(b) < 1600)return true;
		}
		return false;
	}
	
	function correct(a, b){
		var hyp = Math.sqrt(a.squareDis(b)),
			dis = 40-hyp,
			dx = dis*(a.x-b.x)/2/hyp,
			dy = dis*(a.y-b.y)/2/hyp,
			sin = Math.abs(a.x-b.x)/hyp,
			cos = Math.abs(a.y-b.y)/hyp;
			a.x += dx;
			a.y += dy;
			b.x -= dx;
			b.y -= dy;
			if(a.x == b.y){
				var tmp = a.speedy;
				a.speedy = b.speedy*attritionrate;
				b.speedy = tmp*attritionrate;
			}else{
				var v1 = a.speedy*cos+a.speedx*sin,
					v2 = b.speedy*cos+b.speedx*sin;
				a.speedx += v2*sin-v1*sin;
				a.speedx *= attritionrate;
				a.speedy += v2*cos-v1*cos+gravity;
				a.speedy *= attritionrate;
				b.speedx += v1*sin-v2*sin;
				b.speedx *= attritionrate;
				b.speedy += v1*cos-v2*cos+gravity;
				b.speedy *= attritionrate;
			}
			
	}
	
	var ball = {
		x: 0,
		y: 0,
		speedx: 0,
		speedy: 0,
		initialization: function(){
			do{
				this.x = Math.random()*761;
				this.y = Math.random()*500;
			}while(check(this));
		},
		put: function(x){
			var visibleball = document.createElement("div");
			visibleball.className = "ball";
			visibleball.id = "d"+x;
			visibleball.style.transform = "translate("+Math.floor(this.x)+"px,"+Math.floor(this.y)+"px)";
			document.getElementById("container").appendChild(visibleball);
		},
		wallCrash: function(){
			this.x += this.speedx;
			if(this.x < 0){this.x = 0; this.speedx *= -attritionrate;}
			if(this.x > 760){this.x = 760; this.speedx *= -attritionrate;}
			if(this.y+this.speedy < 660){
				this.y += this.speedy;
				this.speedy += gravity;
			}else{
				if(this.y+gravity >= 660)this.speedy -= gravity;
				this.y = 660;
				this.speedy *= -attritionrate;
			}
		},
		squareDis: function(b){
			return pow(this.x-b.x)+pow(this.y-b.y);
		}
	}
	
	function run(){
		function fall(){
			for(i = 0; i < arr.length; ++i){
				arr[i].wallCrash();
				for(j = 0; j < arr.length; ++j)
					if(i != j && arr[i].squareDis(arr[j]) < 1600)correct(arr[i], arr[j]);
				document.getElementById("d"+(i+1)).style.transform = "translate("+Math.floor(arr[i].x)+"px,"+Math.floor(arr[i].y)+"px)";
			}
			requestAnimationFrame(fall);
		}
		requestAnimationFrame(fall);
	}
	
	run();
	
	function createball(){
		if(arr.length < 60){
			var b = Object.create(ball);
			b.initialization();
			arr.push(b);
			b.put(arr.length);
			document.getElementById("counter").innerHTML = arr.length;
		}else alert("球太多啦!!");
	}
	
	function removeball(){
		if(arr.length > 0){
			var p = document.getElementById("d"+arr.length);
			p.parentNode.removeChild(p);
			arr.pop();
			document.getElementById("counter").innerHTML = arr.length;
		}else alert("没球啦!!");
	}
	
	function clearall(){
		while(arr.length > 0)removeball();
	}
	
	function resetspeed(){
		clearall();
		ball.speedy = parseFloat(prompt("初速度",ball.speedy+""));
		if(ball.speedy == NaN)ball.speedy = 0;
	}
	
	function resetgravity(){
		clearall();
		gravity = parseFloat(prompt("加速度:",gravity+""));
		if(gravity == NaN)gravity = 1;
	}
	
	function resetattritionrate(){
		clearall();
		attritionrate = parseFloat(prompt("碰撞损失:",attritionrate+""));
		if(attritionrate == NaN)attritionrate = 0.8;
	}
}catch(e){alert(e.message);}