//Drag and drop:
function allowDrop(ev) {
	ev.preventDefault();
}

function drag(ev) {
	ev.dataTransfer.setData("id", ev.target.id);
	var effect = ev.target.getAttribute("effect")
	ev.dataTransfer.setData("effect", effect);
}

function drop(ev) {
	ev.preventDefault();
	var id = ev.dataTransfer.getData("id");
	var spell = document.getElementById(id);
	
	if(ev.target!=spell){	
		var effect = ev.dataTransfer.getData("effect");
		var changes = parseInt(JSON.parse(effect).effect)*parseInt(spell.getAttribute('strength'));
		//If we dragged span:
		var target = ev.target;
		if (target.parentNode.children.HP!=undefined)
			//Dragged the image
			target = ev.target.parentNode;
		else
			if (ev.target.parentNode.children.progress!=undefined)
				//Drag on progress bar
				target = ev.target.parentNode.parentNode;
		
		target.children.HP.children.progress.value += changes
		//If we've just killed the target
		if (target.children.HP.children.progress.value==0){
			target.remove();
		}
		spell.remove();
	}
}

// Add a card to field
function addCard(hand){
	if(hand!=undefined){
		var world = document.getElementById("world");
		var effects = JSON.parse(world.getAttribute("effects"));
		
		//get random card from spellbook
		var spellbook = JSON.parse(hand.getAttribute("spellbook"));
		var keys = Object.keys(spellbook)
		var card = spellbook[keys[keys.length * Math.random() << 0]];
		
		//get top id
		var id = parseInt(hand.getAttribute('cardTopId'));
		hand.setAttribute('cardTopId', id+1);
		
		//create the card with picked effect
		var newCard = document.createElement('span');
		newCard.setAttribute('id', 'card'+id);
		newCard.setAttribute('draggable', "true");
		newCard.setAttribute('ondragstart',"drag(event)");
		newCard.setAttribute('class', 'card');
		newCard.setAttribute('effect', JSON.stringify(effects[card.effect_name]));
		newCard.setAttribute('strength', card.strength);
		
		//create card name
		var newCardName = document.createElement('div');
		newCardName.setAttribute('class', 'cardName');
		newCardName.innerText = card.name;
		newCard.appendChild(newCardName);
		
		//create card avatar
		var newCardImage = document.createElement('img');
		newCardImage.setAttribute('id','img'+id);
		newCardImage.setAttribute('height',130);
		newCardImage.setAttribute('src',card.avatar);
		newCardImage.setAttribute('draggable',"false");
		newCard.appendChild(newCardImage);
		
		hand.appendChild(newCard);
	}
}


//Hand fill
var x = setInterval(function() {
	//fill hand every 10 seconds
	var hand = document.getElementById("hand");
	if (hand.childElementCount<3){
		addCard(hand);
	}
}, 1000);