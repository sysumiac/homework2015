function addcomment() {
    var commentcontent = document.getElementById("saysomething");
    if (commentcontent.value.length < 4) {
        alert("不听话，发不了评论了吧23333333333");
        return;
    }
        //rewrite the content in order that the conment will not exceed the range of comment area when displayed
    var contentstr = commentcontent.value;
    contentstr = replaceHTMLmark(contentstr);
    var previousindex = 0;
    var content = '';
    for (i in contentstr) {
        if (contentstr[i] == '\n') {
            content = content.concat(contentstr.substring(previousindex, i), "<br/>");
            previousindex = parseInt(i) + 1;
        }
    }
    content = content.concat(contentstr.substring(previousindex));
    var counter = document.getElementById("comments-list").children[0].children[0];
    var commentlist = document.getElementById("comment_ul");

        //copy a node of li
    var newcomment = commentlist.children[0].cloneNode(true);


        //set its content
    newcomment.children[0].innerHTML = content;

    
        //empty the inputbox
    commentcontent.value = "";
        //append the new comment to the comment list
    commentlist.insertBefore(newcomment, commentlist.lastChild);
        //increment the total number of comments
    counter.innerHTML = parseInt(counter.innerHTML) + 1;
        //scoll the screen to the new comment
    document.body.scrollTop = newcomment.offsetTop + newcomment.clientHeight - document.documentElement.clientHeight + 10;
}

function replaceHTMLmark(s) {
    s = s.replace(/</g, "&lt;");
    s = s.replace(/>/g, "&gt;");
    s = s.replace(/"/g, "&quot;");
    s = s.replace(/'/g, "&apos;");
    return s;
}

    //allow a number n ranging from 1 to 9 to display in the form "0n"
function numformat(int) {
    if (int > 9) return int;
    else return "0" + int;
}
    //call the function every second
setInterval(function () {
    var now = new Date();
    var p = document.getElementById("showdate_p");
    p.innerHTML = now.getFullYear() + "-" + numformat(now.getMonth() + 1) + "-" + numformat(now.getDate()) + " " + numformat(now.getHours()) + ":" + numformat(now.getMinutes()) + ":" + numformat(now.getSeconds());
}, 60);
