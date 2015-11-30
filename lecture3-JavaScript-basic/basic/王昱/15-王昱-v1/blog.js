function getDate(){
	var d = new Date();
	return d.getFullYear()+"-"+d.getMonth()+"-"+d.getDay()+" "+d.getHours()+":"+d.getMinutes()+":"+d.getSeconds();
}

function clock(){
	document.getElementsByClassName("time")[0].innerHTML = getDate();
}

function update(){
	var val = document.getElementById("commentValue");
	if(val.value.length < 4)alert("嗯哼？");else{
		var comment = document.getElementById("cmt");
		var cnt = document.getElementById("counter");
		cnt.innerHTML = parseInt(cnt.innerHTML)+1+"";
		var node = comment.lastChild.cloneNode(true);
		node.firstChild.textContent = val.value;
		comment.appendChild(node);		
		val.value = "";
	}
}