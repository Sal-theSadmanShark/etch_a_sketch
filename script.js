//element creation
const head = document.createElement(`header`);
const title = document.createElement('h1');
const des = document.createElement(`section`);
const button = document.createElement(`button`);
const p = document.createElement(`p`);

//click events
var brush = `click tiles to stop drawing`; 
var brushState = `draw`;
window.onclick = function () { brushState=`click`; description(); return 0; };
window.ondblclick = function () { brushState=`draw`; description (); return 0; }; 

//appending children
document.body.appendChild(head);
head.appendChild(title);
head.appendChild(des);
head.appendChild(button);
head.appendChild(p);

//attributes and content
head.setAttribute('id','header');
des.textContent = `  hover over the tiles to change the color and draw stuff ! ${brush}  `;
title.textContent = `Etch A Sketch`;
button.textContent = `ooh click me click me`

//functions
function description () {
	brushState===`click`? brush = `double-click to start drawing` : brush = `click tiles to stop drawing`;
	des.textContent = `  hover over the tiles to change the color and draw stuff ! ${brush}  `;
	return 0;
}

function setGrids () {
 let gridList = document.querySelectorAll("div");
 gridList.forEach(function (e) {
     e.classList.add('gridstyle');
     //console.log(e);
    e.addEventListener('mouseover', function(element) {
    		if (brushState===`draw`) {
    			console.log(element);
    			e.classList.add(`hoverBlack`);
    		}	
    });
    e.addEventListener('click', function(element) {
    			console.log(element);
    			e.classList.remove(`hoverBlack`);
    });
 }); 
 button.onclick = function () { 
 	gridList.forEach( function (e) { e.classList.remove(`hoverBlack`) })
 	this.textContent = `i clear the sketch `;
 	return 0;	
 };
 return 0;
}

function grids (count) {
	let gridsArr = []
	const main = document.createElement(`main`);
	document.body.appendChild(main);
	main.setAttribute(`id`,`main`);

	for (let i = count*count; i > 0; i--) {
		gridsArr.push(document.createElement(`div`));
	}
	gridsArr.forEach(e => main.appendChild(e));
	setGrids();
	main.style.cssText = `grid-template-columns: repeat(${count},auto); grid-template-rows: repeat(${count},auto);  grid-column-gap:${72/count}px;
  	grid-row-gap: ${72 / count}px; border:${18 / count}px solid rgb(14, 0, 24);`;
  	p.innerHTML = `grid size : ${count} x ${count} `;
	
	return 0;
}

grids(16);

//changing grids
p.addEventListener(`click`,function (){
	let input = window.prompt(`please input new grid size `);
	if (!(input>0) || input > 999 ) { window.alert(`error the input is out of range`); return 0;}
	document.body.removeChild(main);
	grids(input);
	return 0;
});
