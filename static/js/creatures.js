function getAttr(obj, attr){
	return (obj.getElementsByClassName(attr)[0]);
}

function getAttrVal(attr){
	return parseFloat(getAttr(attr,"val").innerHTML);
}

function getStats(card){
	return getAttr(card, "stats");
}

function getHP(card){
	var stat = getStats(card);
	return getAttr(stat,"HP");
}

function getMP(card){
	var stat = getStats(card);
	return getAttr(stat,"MP");
}

function changeHP(card, val){
	var hp = getAttr(getHP(card),"val");
	hp.innerHTML = parseFloat(hp.innerHTML) + val;
}

function changeMP(card, val){
	var mp = getAttr(getMP(card),"val");
	mp.innerHTML = parseFloat(mp.innerHTML) + val;
}

function animate(card, action){
	var imgDiv = getAttr(card,"image");
	var animation = imgDiv.getAttribute("animation:"+action);
	if (animation){
		console.log("animate");
	}
}