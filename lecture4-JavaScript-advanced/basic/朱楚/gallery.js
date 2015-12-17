// JavaScript source code

var list = document.getElementsByClassName("gallery-slide");
var clist = document.getElementsByClassName("controller");
var now = 0;
var cid = 0;

function init() {
    for (var i = 0; i < clist.length; i++) {
        clist[i].id = "Controller" + i;
        clist[i].onclick = function () {
            clearTimeout(cid);
            var id = parseInt(this.id[this.id.length - 1]);
            now = id;
            for (var j = 0; j < clist.length; j++) {
                if (j !== id) {
                    list[j].style.animation = "disappear 0s";
                    list[j].style.animationFillMode = "forwards";
                    clist[j].style.opacity = 0.6;
                } else {
                    list[j].style.animation = "appear 0s"
                    list[j].style.animationFillMode = "forwards";
                    clist[j].style.opacity = 0.8;
                }
            }
            cid = setTimeout(play, 4000);
        };
    }
    clist[0].style.opacity = 0.8;
}

function play() {
    list[now].style.animation = "disappear 5s";
    list[now].style.animationFillMode = "forwards";
    var next = ((now + 1) % list.length);
    list[next].style.animation = "appear 5s"
    list[next].style.animationFillMode = "forwards";
    var ctr = document.getElementById("Controller" + now);
    ctr.style.opacity = 0.6;
    var ctr1 = document.getElementById("Controller" + next);
    ctr1.style.opacity = 0.8;
    now = next;
    cid = setTimeout(play, 5000);
}
