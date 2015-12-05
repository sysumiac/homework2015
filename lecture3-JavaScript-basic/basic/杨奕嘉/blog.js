function add_comments() {
    var comments = document.getElementsByTagName("textarea")[0].value;
    if (comments.length < 4) {
        alert("输入内容长度少于 4 个字符");
        return;
    }
    document.getElementsByTagName("textarea")[0].value = null;
    var counts = parseInt(document.getElementById("comments-counts").innerHTML) + 1;
    document.getElementById("comments-counts").innerHTML = counts;
    var node = document.getElementById("comments-example").cloneNode(true);
    node.firstChild.nextSibling.innerText = comments;
    document.getElementById("comments-items").appendChild(node);
}

function check(i) {
    if (i < 10) {
        i = "0" + i;
    }
    return i;
}

function times() {
    var now = new Date();
    var year = now.getFullYear();
    var month = check(now.getMonth());
    var date = check(now.getDate());
    var hour = check(now.getHours());
    var minute = check(now.getMinutes());
    var second = check(now.getSeconds());
    document.getElementById("time").innerHTML = year + "-" + month + "-" + date + " " + hour + ":"+ minute + ":" + second;
}
setInterval("times();", 1000);