//element creation
const head = document.createElement(`header`);
const title = document.createElement('h1');
const des = document.createElement(`section`);
const button = document.createElement(`button`);
const p = document.createElement(`p`);
const i = document.createElement(`i`);
var fixedCountedgrid = 16;

//changing brush color
var brushcolor = `black`;
i.onclick = function () {
	if (brushcolor === `black`) { brushcolor = `blue`; this.style.color = `blue`; return 0; }
	if (brushcolor === `blue`) { brushcolor = `rainbow`; this.style.color = `yellow`;  return 0; }
	if (brushcolor === `rainbow`) { brushcolor = `black`; this.style.color = `black`; return 0; }
}
function gridColor() {
	if (brushcolor === `black`) return `hoverBlack`;
	if (brushcolor === `blue`) return `hoverBlue`;
	if (brushcolor === `rainbow`) return 0;
	return 0;
}

//color functions
function rainbow(element) {
	if (brushcolor !== `rainbow`) { return 0 }
	var x = Math.floor(Math.random() * 256);
	var y = Math.floor(Math.random() * 256);
	var z = Math.floor(Math.random() * 256);
	element.style.backgroundColor = "rgb(" + x + "," + y + "," + z + ")";
	return 0;
} 

//click events
var brush = `click tiles to stop drawing`;
var brushState = `draw`;
window.onclick = function () { brushState = `click`; description(); return 0; };
window.ondblclick = function () { brushState = `draw`; description(); return 0; };

//appending children
document.body.appendChild(head);
head.appendChild(title);
head.appendChild(des);
head.appendChild(button);
head.appendChild(p);
head.insertBefore(i, p);

//attributes and content
head.setAttribute('id', 'header');
i.classList.add(`fas`);
i.classList.add(`fa-pencil-alt`);
i.title = `change brush color`
des.textContent = `  hover over the tiles to change the color and draw stuff ! ${brush}  `;
title.textContent = `Etch A Sketch`;
button.textContent = `ooh click me click me`

//functions
function description() {
	brushState === `click` ? brush = `double-click to start drawing` : brush = `click tiles to stop drawing`;
	des.textContent = `  hover over the tiles to change the color and draw stuff ! ${brush}  `;
	return 0;
}

function setGrids() {
	let gridList = document.querySelectorAll("div");
	gridList.forEach(function (e) {
		e.classList.add('gridstyle');
		e.addEventListener('mouseover', function (element) {
			if (brushState === `draw`) {
				e.classList.add(gridColor());
				rainbow(e);
			}
		});
		e.addEventListener('click', function (element) {
			e.classList.remove(gridColor());
		});
	});
	//clearing button
	button.onclick = function () {
		document.body.removeChild(main);
		grids(fixedCountedgrid);
		this.textContent = `i clear the sketch `;
		return 0;
	};
	return 0;
}

function grids(count) {
	let gridsArr = []
	const main = document.createElement(`main`);
	document.body.appendChild(main);
	main.setAttribute(`id`, `main`);

	for (let i = count * count; i > 0; i--) {
		gridsArr.push(document.createElement(`div`));
	}
	gridsArr.forEach(e => main.appendChild(e));
	setGrids();
	main.style.cssText = `grid-template-columns: repeat(${count},auto); grid-template-rows: repeat(${count},auto);  grid-column-gap:${72 / count}px;
  	grid-row-gap: ${72 / count}px; border:${18 / count}px solid rgb(14, 0, 24);`;
	p.innerHTML = `grid size : ${count} x ${count} `;

	fixedCountedgrid = count;
	return 0;
}

grids(fixedCountedgrid);

//changing grids
p.addEventListener(`click`, function () {
	let input = window.prompt(`please input new grid size `);
	if (!(input > 0) || input > 999) { window.alert(`error the input is out of range`); return 0; }
	document.body.removeChild(main);
	grids(input);
	return 0;
});
