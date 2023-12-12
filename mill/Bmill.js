const fs = require("fs"); 
const input = require("./input.js"); 
console.log(process.argv);
let args = process.argv;

let dt = new Date();
let timestamp = dt.getTime();
let datetime = dt.toDateString();

const outSoundFiles = require("./outSoundFiles.js");
let soundFile = outSoundFiles.filter(f=>f.id==="line_all_thread_all_echo_reverb").length>0 ? outSoundFiles.filter(f=>f.id==="line_all_thread_all_echo")[0] : null;
const nticks =  soundFile ? Math.round(soundFile.duration) : 240;
console.log(`nticks = ${nticks}`);
const fps = 24;
const Bfile = `./B.js`;
const BfilmFile = `./Bfilm.js`;
const pigments = require("./pigments.js").pigments;
const colorsets = require("./pigments.js").colorsets;
const rawcolorsets = require("./pigments.js").rawcolorsets;
const tools = require("./tools.js");
const tween = (p1,p2,t,d) => {
	let dt = (100*t/d)/100;
	let pdt = {};
	Object.keys(p1).forEach(k=> {
		if(isNaN(p1[k])) {
			pdt[k] = p1[k];
		}
		else {
			pdt[k] = (100*p1[k] + 100*(p2[k]-p1[k])*dt)/100;
		}
	});
	return pdt;
};
const drawp = {
	circle: p => { return {cx:p.cx,cy:p.cy,r:p.r,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,"fill-opacity":p.fo,stroke:p.color,fill:p.color } },
	rect: p => { return {x:p.cx,y:p.cy,width:p.w,height:p.h,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":p.so,"fill-opacity":p.fo,stroke:p.color,fill:p.color } },
	vline: p => { return {x1:p.cx,x2:p.cx,y1:0,y2:1,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":1.0,stroke:p.color } },
	hline: p => { return {x1:0,x2:1,y1:p.cy,y2:p.cy,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":1.0,stroke:p.color } },
	line: p => { return {x1:p.x1,x2:p.x2,y1:p.y1,y2:p.y2,"stroke-width":p.sw,"stroke-dashoffset":p.sf,"stroke-dasharray":p.sd,"stroke-opacity":1,stroke:p.color } },
};

//const spice = colorsets.warmb2w; 
const spice = [pigments.warmlightwhite, pigments.warmlightwhite, pigments.warmblack, pigments.warmgray, pigments.yellow]; 
const colors = colorsets.warmbw; 
//const spice = rawcolorsets.filter(cs=>cs.title==="core colors")[0].lists[8];
//const colors = rawcolorsets.filter(cs=>cs.title==="core colors")[0].lists[8];
//const allcolors = [...spice,...colors];
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmgray,pigments.yellow,pigments.warmblack,pigments.warmlightwhite,pigments.warmgray];
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.yellow,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack];
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.yellow,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack];
//const allcolors = [pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack,pigments.warmlightwhite,pigments.warmblack];
const allcolors = input.allcolors(pigments);
const n = input.nx;
const nz = input.nz;

const xgrid = [...new Array(n).keys()].map( j=>j/(n-1) );
const ygrid = [...new Array(n).keys()].map( j=>j/(n-1) );
//const ygrid = [...new Array(n).keys()].map(j=>tools.randominteger(0,100)/100).sort( (a,b) => { return a - b } );
const xygrid = xgrid.map( x=> {
	return ygrid.map( y=> {
		return [x,y];
	});
});
//console.log(`xygrid=${JSON.stringify(xygrid)}`);

let elements = [];
elements[0] = [{tag:"rect", n:0, cx:0, cy:0, color:pigments.warmlightwhite}];
[...new Array(nz).keys()].map(z=>z+1).forEach( z=> {
	//if(z<nz-1) {
	let count=0;
	elements[z] = [...new Array(n).keys()].flatMap( j=> {
		let color1 = allcolors[(z+j)%allcolors.length];
		let color2 = allcolors[(z+j+1)%allcolors.length];
		let cross = [
			{tag:"line", cx:xgrid[j], cy:ygrid[j], role:"hline", n:count, color:color1},
			{tag:"line", cx:xgrid[j], cy:ygrid[j], role:"vline", n:count+1, color:color2}
		];
		count = count+2;
		return cross;
	});
	//}
	//else elements[z] = [];
	[...new Array(n).keys()].forEach( x=> {
		[...new Array(n).keys()].forEach( y=> {
			let color = allcolors[(z+x+y)%allcolors.length];
			elements[z].push({tag:"circle", role:"circle", cx:xgrid[x], cy:ygrid[y], n:count, color}); 
			++count;
		});
	});
});
//console.log(`nelements = ${elements.length}`);
//console.log(`elements = ${JSON.stringify(elements)}`);

let B = {
	nticks: nticks,
	fps: fps,
	elements: elements,
};
let Bfilm = {
	nticks: nticks,
	fps: fps,
	elements: elements.map( z => {
		return z.map( el => {
			let newel = {};
			Object.keys(el).forEach(key=> {
				newel[key]=el[key];
			});
			return newel;
		});
	})
}
const dotween = () => { return tools.randominteger(0,100) < 94 }
const ischange = () => { return tools.randominteger(0,100) > 8 }

/* layer 0
 * rectangle background
 * */
[0].forEach( z => {
	let cx = 0, cy = 0, w = 1.0, h = 1.0, sw = 0.01, sf = 0, sd = 1, so = 0, fo = 1;
	[...new Array(elements[z].length).keys()].forEach( n => { 
		B.elements[z][n].b = [...new Array(nticks).keys()].map( j => {
			return drawp.rect({cx:cx,cy:cy,w:w,h:h,sw,sd,so,fo,color:B.elements[z][n].color});
		});
		Bfilm.elements[z][n].b = [...new Array(nticks).keys()].flatMap( j => {
			return [...new Array(fps).keys()].map( t => {
				return drawp.rect({cx:cx,cy:cy,w:w,h:h,sw,sf,sd,so,fo,color:Bfilm.elements[z][n].color});
			});
		});
	});
});

/* layers 1&above
 * lines
 * */
let xdt = [...new Array(n).keys()].map( j=> [tools.randominteger(2,5),tools.randominteger(2,5)] );

[...new Array(nz).keys()].map(z=>z+1).forEach( z => { 
	B.elements[z].forEach( (el,j) => {
		let so = (el.role==="circle" && z < 3) ? 0 : 1;
		let fo = (el.role==="circle" && z < 3) ? 1 : 0;
		let bframe = [...new Array(nticks).keys()].reduce( (acc,t) => {
			let dx = (t%xdt[el.n%(n)][z-1]+1)/(xdt[el.n%n][z-1]);
			//console.log(`dx=${dx}`);
			let cy = el.cy, cx = el.cx; 
			let sw = el.role==="circle" ? tools.randominteger(6,24)/100 : ( z<nz-2 ? tools.randominteger(8,42)/100 : 4);
			if(z>1) { 
				let sw0 = B.elements[z-1].filter(e=>e.n===j)[0].b[t]["stroke-width"];
				sw = sw0*tools.randominteger(6,9)/10;
			}
			let sf = tools.randominteger(0,100)/100;
			let sd = tools.randominteger(40,80)/100;
			//if(z>1) { sd = B.elements[z-1][j].b[t]["stroke-dasharray"]*tools.randominteger(4,8)/10 }
			let r = tools.randominteger(100/(n*4),100/(n*1.4))/100;
			//if(z>1) { r = B.elements[z-1][j].b[t].r*tools.randominteger(6,8)/10 }
			let bt = [];
			if( t===0 || ischange() || t===nticks-1 ) {
				bt = drawp[el.role]({ 
					cx, cy, r,
					w:1, h:1, so, fo, sw, sf, sd,
					color:el.color,
				});
			}
			else { bt = acc[t-1]; }
			acc.push(bt);
			return acc;
		}, []);

		[...new Array(Math.floor(nticks/3)).keys()].forEach(x=> {
			let t = tools.randominteger(1,nticks-2);
			bframe[t] = tween(bframe[t-1],bframe[t+1],1,2);
		});
		[...new Array(Math.floor(nticks/4)).keys()].forEach(x=> {
			let t = tools.randominteger(1,nticks-3);
			bframe[t] = tween(bframe[t-1],bframe[t+2],1,3);
			bframe[t+1] = tween(bframe[t-1],bframe[t+2],2,3);
		});

		el.b = bframe;
		//console.log(`bframe[0] = ${JSON.stringify(bframe[0])}`);
		//console.log(`bframe[nticks-1] = ${JSON.stringify(bframe[nticks-1])}`);
		Bfilm.elements[z][j].b = [...new Array(nticks).keys()].flatMap( t => { 
			//console.log(`t=${t}`);
			let p1 = bframe[t];
			let p2 = bframe[Math.min((t+1),(nticks-1))];
			//console.log(`el.n=${el.n}, j=${j}, p1=${JSON.stringify(p1)}, p2=${JSON.stringify(p2)}`);
			let istween = dotween();
			if(t===0 || t===nticks-1) {istween = 0}
			else if (t>nticks*0.6) {istween = 1}
			else {
				let tag = t<nticks/2 ? "circle" : "line";
				if(Bfilm.elements[z][j].tag===tag) {istween = 1}
			}
			return [...new Array(fps).keys()].map( f => {
				let step = istween ? tween(p1,p2,f,fps) : bframe[tools.randominteger(0,bframe.length)];
				return step; 
			});
		});
		//console.log(`Bfilm.elements[z][j].b.length =${Bfilm.elements[z][j].b.length}`);
		//console.log(`el.b.length=${el.b.length}`);
		//console.log(`count=${el.b.length}`);
		//console.log(`count=${Bfilm.elements[z][j].b.length}`);
	});
});

let Bstr = `let B =
	${JSON.stringify(B)};
module.exports = B;`

let Bfilmstr = `let B =
	${JSON.stringify(Bfilm)};
module.exports = B;`

fs.writeFileSync(Bfile, Bstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${Bfile} written successfully\n`);
	}
});

fs.writeFileSync(BfilmFile, Bfilmstr, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${BfilmFile} written successfully\n`);
	}
});
