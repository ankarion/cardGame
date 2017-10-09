var app = angular.module('cards', []);

app.factory("Effect", function() {
	function Effect(name, description, attribute, effect){
		this.name = name;
		this.description = description;
		this.attribute = attribute;
		this.effect = effect;
	}
	
	Effect.prototype = {
		constructor: Effect
	}
	return Effect;
});

app.factory("Creature", function(){
	function Creature(name,lvl,sign,fraction){
		this.name = name;
		this.lvl = typeof lvl != 'undefined'?lvl:2;
		this.sign = typeof sign != 'undefined'?sign:"spades";
		this.fraction = typeof fraction != 'undefined'?fraction:"heroes";
		//TODO: make it dependent on sign
		this.HP = 200;
		this.maxHP = this.HP;
		
		this.avatar = "media/"+this.fraction+"/"+this.lvl+"_of_"+this.sign+".png";
	}
	
	Creature.prototype = {
		constructor: Creature
	}
	return Creature;
});

app.factory("Card", function(){
	function Card(name,effect_name, strength){
		this.name = name;
		if(effect_name=="heal")
			this.avatar = "media/cards/heal.png";
		if(effect_name=="damage")
			this.avatar = "media/cards/damage.png";
		this.strength = strength;
		this.effect_name = effect_name;
	}
	
	Card.prototype = {
		constructor: Card
	}
	return Card;
});

app.controller('tableCtrl', function($scope, Creature, Card, Effect) {	
	// enum for all possible effects
	$scope.effects = {
		'heal': new Effect('heal', "heals a target", "HP", 1),
		'damage': new Effect('damage', "damages a target", "HP", -1),
	};
	
	// Generate a list of enemies
	// TODO: make it randomly generated
	$scope.creatures = {
		'enemies' : {
			'1':new Creature("Altron", 2),
			'2':new Creature("Ares", 2, "hearts")
		},
		'heroes' : {
			'1': new Creature("Aragorn", 2, "diamonds"),
			'2': new Creature("Bilbo", 2, "clubs")
		}
	};
	
	$scope.fractionEnemies = {
		'heroes':'enemies',
		'enemies':'heroes',
	};
	
	$scope.spellbook = {
		"player": [
			new Card("heal", 'heal', 50),
			new Card("hit", 'damage', 80)
		],
		"units": [
			new Card("heal", 'heal',30),
			new Card("hit", "damage", 40)
		]
	};
	
	$scope.handTopId = 0;
	//Units' AI
	function act(hero_id, fraction){
		var enemies = document.getElementById($scope.fractionEnemies[fraction]);
		var targetId = Math.floor(Math.random() * enemies.getElementsByTagName('span').length);
		
		var me = document.getElementById(hero_id);
		if(me!=undefined){
			if ((enemies.getElementsByTagName('span').length>0)){
				var target = enemies.getElementsByTagName('span')[targetId];
				if(target.children.HP != undefined){
					//TODO: add a gif to target.children.avatar
					//TODO: add a gif to me.children.avatar
					target.children.HP.children.progress.value -= 10;
					//If we've just killed the target
					if (target.children.HP.children.progress.value==0){
						target.remove();
						generator = generateCreatures();
					}
					setTimeout(function(){
						//TODO: remove a gif to target.children.avatar
						}, 300);
				}
			}
			else{
				clearInterval($scope.actions);
			}
		}
	}
	
	function* generateCreatures(){
		while (true){
			for (fraction in $scope.creatures)
				for (creature in $scope.creatures[fraction])
					yield {fraction:fraction,creature:creature};
			}
		return (undefined);
	}
	
	let generator = generateCreatures();
	$scope.actions = setInterval(function() {
		let nextCreature = generator.next().value;
		var fraction = nextCreature.fraction;
		var creature = nextCreature.creature;
		act(fraction+$scope.creatures[fraction][creature].name,fraction);
	},400);	
	
});