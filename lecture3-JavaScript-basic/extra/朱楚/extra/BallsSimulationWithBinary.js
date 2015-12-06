// JavaScript source code

var ballList = new Array();
var GRAVITY = 0.8;
var ELASTICITY = 0.8;
var SPEEDLIMIT = 50;

function balls(id) {
    var b = document.createElement("div");
    b.radius = 50;
    b.speedX = 0;
    b.speedY = 0;
    b.id = id;
    b.x = Math.random() * (document.documentElement.clientWidth - 2 * b.radius);
    b.y = Math.random() * (document.documentElement.clientHeight - 600);
    b.groundFlag = 0;
    b.groundV = 0;
    b.speed = function () {
        return Math.sqrt(Math.pow(this.speedX, 2) + Math.pow(this.speedY, 2));
    }
    b.onGround = function() {
        return (this.y + 2 * this.radius >= document.documentElement.clientHeight);
    }
    b.sim = function () {
        if (!this.onGround()) {
            this.speedY += GRAVITY;
        } else {
            this.y = document.documentElement.clientHeight - 2 * this.radius + 1;
        }
        var l = 0;
        var r = 1;
        var m = 0;
        var count = 0;
        while (Math.abs(l - r) > 1e-5) {
            count++;
            if (count > 100) {
                alert(l + ' ' + r + ' ' + m);
            }
            m = (l + r) / 2;
            this.x += this.speedX * m;
            this.y += this.speedY * m;
            if (this.checkOverlap()) {
                r = m;
            } else {
                l = m;
            }
            this.x -= this.speedX * m;
            this.y -= this.speedY * m;
        }
        this.x += this.speedX * m;
        this.y += this.speedY * m;
        if (this.y + 2 * this.radius > document.documentElement.clientHeight)
            this.y = document.documentElement.clientHeight - 2 * this.radius + 1;
        this.style.left = this.x + "px";
        this.style.top = this.y + "px";
        this.checkCollision();
        //alert(this.x + ' ' + this.y + ' ' + this.speedX + ' ' + this.speedY + ' ' + this.groundFlag + ' ' + this.groundV);
    }
    b.bounce = function (obj) {
        var dx = obj.x - this.x;
        var dy = obj.y - this.y;
        if (dx === 0) {
            this.speedY = obj.speedY * ELASTICITY;
        }
        else
        if (dy === 0) {
            this.speedX = obj.speedX * ELASTICITY;
        }
        else {
            var k1 = (dx * this.speedX + dy * this.speedY) / (dx * dx + dy * dy);
            var k2 = (this.speedX - k1 * dx) / dy;
            var _k1 = (dx * obj.speedX + dy * obj.speedY) / (dx * dx + dy * dy);
            var _k2 = (obj.speedX - _k1 * dx) / dy;
            k1 = _k1;
            this.speedX = k1 * dx + k2 * dy;
            this.speedY = k1 * dy - k2 * dx;
        }
    }
    b.walls = function () {
        if (this.onGround()) {
            this.speedY *= -ELASTICITY;
            if (this.groundFlag === 1) {
                if (this.speedY > this.groundV) this.groundV = this.speedY;
                else {
                    this.speedY = this.groundV * ELASTICITY;
                    this.groundV *= ELASTICITY;
                }
            } else {
                this.groundFlag = 1;
                this.groundV = this.speedY;
            }
        }
        if (this.x + 2 * this.radius >= document.documentElement.clientWidth) {
            this.speedX *= -ELASTICITY;
            this.x = document.documentElement.clientWidth - 2 * this.radius;
        }
        if (this.x <= 0) {
            this.speedX *= -ELASTICITY;
            this.x = 0;
        }
        if (this.y < 0) {
            this.speedY *= -ELASTICITY;
            this.y = 0;
        }
    }
    b.distanceTo = function (obj) {
        var x = this.x + this.radius * Math.sqrt(0.5);
        var y = this.y + this.radius * Math.sqrt(0.5);
        var x1 = obj.x + obj.radius * Math.sqrt(0.5);
        var y1 = obj.y + obj.radius * Math.sqrt(0.5);
        var dis = Math.sqrt(Math.pow(x - x1, 2) + Math.pow(y - y1, 2));
        return dis;
    }
    b.smallClone = function () {
        var tmp = {
            x: this.x,
            y: this.y,
            speedX: this.speedX,
            speedY: this.speedY
        }
        return tmp;
    }/*
    b.setSafeLocation = function (obj) {
        var dx = obj.x - this.x;
        var dy = obj.y - this.y;
        var det = this.radius + obj.radius - this.distanceTo(obj);
        var detx = det / 2 * dx / Math.sqrt(dx * dx + dy * dy);
        var dety = det / 2 * dy / Math.sqrt(dx * dx + dy * dy);
        this.x -= detx;
        this.y -= dety;
        obj.x += detx;
        obj.y += dety;
    }*/
    b.checkOverlap = function () {
        for (var i = 0; i < ballList.length; i++) {
            if (ballList[i].id === this.id) continue;
            if (this.distanceTo(ballList[i]) < this.radius + ballList[i].radius - 2) return true;
        }
        return false;
    }
    b.checkCollision = function () {
        for (var i = 0; i < ballList.length; i++) {
            if (ballList[i].id === this.id) continue;
            if (this.distanceTo(ballList[i]) <= this.radius + ballList[i].radius)
                this.collisionWith(ballList[i]);
        }
    }
    b.collisionWith = function (obj) {
        var dis = this.distanceTo(obj);
        if (this.distanceTo(obj) <= this.radius + obj.radius) {
            //this.setSafeLocation(obj);
            var tmp = this.smallClone();
            this.bounce(obj);
            this.groundFlag = obj.groundFlag = 0;
            obj.bounce(tmp);
        }
    }
    b.limit = function () {
        if (this.speedX > SPEEDLIMIT) {
            this.speedX = SPEEDLIMIT;
        } else {
            if (this.speedX < -SPEEDLIMIT) {
                this.speedX = -SPEEDLIMIT;
            }
        }
        if (this.speedY > SPEEDLIMIT) {
            this.speedY = SPEEDLIMIT;
        } else {
            if (this.speedY < -SPEEDLIMIT) {
                this.speedY = -SPEEDLIMIT;
            }
        }
    }
    return b;
}

function addBall() {
    var limit = (document.documentElement.clientWidth / 100) * (document.documentElement.clientHeight / 100) / 3;
    if (ballList.length > limit) {
        alert("ÇòÌ«¶àÀ²£¡µçÄÔÒªÕ¨À²£¡");
        return;
    }
    var ball = balls(ballList.length+1);
    var vx = document.getElementById("vx").value;
    var vy = document.getElementById("vy").value;
    if (!isNaN(vx) && vx !== '') ball.speedX = parseInt(vx);
    if (!isNaN(vy) && vy !== '') ball.speedY = parseInt(vy);
    var xx = document.getElementById("x").value;
    var yy = document.getElementById("y").value;
    if (!isNaN(xx) && xx !== '') ball.x = parseInt(xx);
    if (!isNaN(yy) && yy !== '') ball.y = parseInt(yy);
    ball.className = "ball";
    ball.style.left = ball.x + "px";
    ball.style.top = ball.y + "px";
    var check = false;
    while (!check) {
        check = true;
        for (var i = 0; i < ballList.length; i++) {
            if (ballList[i].distanceTo(ball) < ballList[i].radius + ball.radius) {
                check = false;
                ball.x = Math.random() * (document.documentElement.clientWidth - 2 * ball.radius);
                ball.y = Math.random() * (document.documentElement.clientHeight - 600);
                break;
            }
        }
    }
    document.getElementById("Container").appendChild(ball);
    ballList.push(ball);
}

function deleteTheLast() {
    var container = document.getElementById("Container");
    if (container.childNodes.length > 0) {
        container.removeChild(ballList.pop());
    }
}

function simulate() {
    for (var i = 0; i < ballList.length; i++) {
        ballList[i].sim();
        ballList[i].walls();
        for (var j = 0; j < ballList.length; j++) {
            if (i === j) continue;
            ballList[i].collisionWith(ballList[j]);
        }
        ballList[i].limit();
    }
    window.requestAnimationFrame(simulate);
}

function deleteAll() {
    var container = document.getElementById("Container");
    while (ballList.length > 0) {
        container.removeChild(ballList.pop());
    }
}

function setGravity() {
    var g = parseFloat(prompt("Enter a new G(Now it's " + GRAVITY + " )" + "\nWARNING: It may cause BUUUUUGS!"));
    if (isNaN(g)) return;
    if (g < 0) {
        alert("Are you kidding me?");
    } else {
        GRAVITY = g;
    }
}

function setElasticity() {
    var e = parseFloat(prompt("Enter a new E((Now it's " + ELASTICITY + " )" + "\nWARNING: It may cause BUUUUUGS!"));
    if (isNaN(e)) return;
    if (e < 0) {
        alert("Are you kidding me?");
    } else {
        ELASTICITY = e;
    }
}

function setLimit() {
    var lim = parseFloat(prompt("Enter a new LIMIT((Now it's " + SPEEDLIMIT + " )" + "\nWARNING: It may cause BUUUUUGS!"));
    if (isNaN(lim)) return;
    if (lim < 0) {
        alert("Are you kidding me?");
    } else {
        SPEEDLIMIT = lim;
    }
}