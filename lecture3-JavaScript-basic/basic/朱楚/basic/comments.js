// JavaScript source code

function update() {
    var commentContent = document.getElementsByTagName("textarea")[0];
    if (commentContent.value.length < 4) {
        alert("����̫����Ӵ(С��4�ַ�)");
    } else {
        var newComment = document.getElementsByClassName("comment-item")[0].cloneNode(true);
        newComment.childNodes[0].textContent = commentContent.value;
        document.getElementsByClassName("comments")[0].appendChild(newComment);
        var counter = document.getElementById("commentsCounter");
        counter.textContent = parseInt(counter.textContent) + 1;
        commentContent.value = "";
    }
}
