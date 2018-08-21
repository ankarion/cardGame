// JavaScript source code
function applySpell(caster, target){
	/*
		caster - maybe a "player" or <div class="card class">
		target - should be a <div class="card class">
	*/
	if (caster=="player")
		caster = document.getElementById(caster);
	var spell = document.getElementById(caster.getAttribute("spell"));
	if (spell){
		changeHP(target,getAttrVal(getHP(spell)));
		changeMP(caster,getAttrVal(getMP(spell)));
	}
	caster.setAttribute("spell", null);
};

function castSpell(caster, spell){
	/*
		function saves spell, represents start of casting it
		caster - maybe a "player" or <div class="card class">
		spell - should be a <div class="card spell">
	*/
	if (caster=="player")
		caster = document.getElementById(caster);
	caster.setAttribute("spell", spell.getAttribute("id"));
	animate(caster,"cast");
};