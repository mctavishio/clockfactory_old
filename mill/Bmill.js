const fs = require("fs"); 
console.log(process.argv);
let args = process.argv;

let dt = new Date();
let timestamp = dt.getTime();
let datetime = dt.toDateString();

const outSoundFiles = require("./outSoundFiles.js");
let soundFile = outSoundFiles.filter(f=>f.id==="line_all_thread_all_echo").length>0 ? outSoundFiles.filter(f=>f.id==="line_all_thread_all_echo")[0] : null;
const nticks =  soundFile ? Math.round(soundFile.duration) : 240;
console.log(`nticks = ${nticks}`);
const fps = 24;
const Bfile = `./B.js`;
const BfilmFile = `./Bfilm.js`;
const pigments = require("./pigments.js").pigments;
const colorsets = require("./pigments.js").colorsets;
const rawcolorsets = require("./pigments.js").rawcolorsets;
const tools = require("./tools.js");
const spice = colorsets.warmbwred; 
const colors = colorsets.warmbw; 
//const spice = rawcolorsets.filter(cs=>cs.title==="core colors")[0].lists[8];
//const colors = rawcolorsets.filter(cs=>cs.title==="core colors")[0].lists[8];
const allcolors = [...spice,...colors];
const rmin = .25, rmax = 38;
const swmin = .20, swmax = 38;
const sdmin = .08, sdmax = 10;

const ncircles = 4;
//|const ncircles = 1;
const nvlines = 6;
const nhlines = 6;
const nlayers = 3;

const m = (nvlines+nhlines+ncircles)*nlayers;

const pgrid = [...new Array(nticks).keys()].map( j=> {
	const cx = [...new Array(m).keys()].map( x => {
		return 0.5;
	});
	const cy = [...new Array(m).keys()].map( x => {
		return 0.5;
	});
	const so = [...new Array(m).keys()].map( x => {
	 let so = x%2===0 ? 0.0 : 1.0;
		//if(j<2 || j>nticks-2) {so=0}
		return so;
	});
	const fo = [...new Array(m).keys()].map( x => {
		let fo = so[x]===0 ? 1.0 : 0.0;
		//if(j<2 || j>nticks-2) {fo=0}
		return fo;
	});
	const r = [...new Array(m).keys()].map( z => {
		return tools.randominteger(rmin,rmax)/100;
	}).map(x=>Math.max(x,0.01)).sort( (a,b) => b-a );
	const sw = [...new Array(m).keys()].map( z => {
		return tools.randominteger(swmin,swmax)/100;
	}).map(x=>Math.max(x,0.01)) ;
	//console.log(`sw=${JSON.stringify(sw)}`);
	const sd = [...new Array(m).keys()].map( z => {
		return tools.randominteger(sdmin,sdmax)/100;
	}).map(x=>Math.max(x,0.01));
	return {cx,cy,r,sw,sd,so,fo};
});
let drawp = {
	//circle: p => { return {cx:p.cx,cy:p.cy,r:p.r,"stroke-width":p.sw,"stroke-dasharray":p.sd,"stroke-opacity":p.so,"fill-opacity":p.fo,stroke:p.color,fill:p.color } },
	circle: p => { return {cx:p.cx,cy:p.cy,r:p.r*0.8,"stroke-width":p.sw,"stroke-dasharray":p.sd,"stroke-opacity":1.0,"fill-opacity":0.0,stroke:p.color,fill:p.color } },
	rect: p => { return {x:p.cx,y:p.cy,width:p.w,height:p.h,"stroke-width":p.sw,"stroke-dasharray":p.sd,"stroke-opacity":p.so,"fill-opacity":p.fo,stroke:p.color,fill:p.color } },
	vline: p => { return {x1:p.cx,x2:p.cx,y1:0,y2:1,"stroke-width":p.sw*2,"stroke-dasharray":0.8*p.sd,"stroke-opacity":1.0,stroke:p.color } },
	hline: p => { return {x1:0,x2:1,y1:p.cy,y2:p.cy,"stroke-width":p.sw*2,"stroke-dasharray":0.8*p.sd,"stroke-opacity":1.0,stroke:p.color } },
	//vline: p => { return {x1:p.cx,x2:p.cx,y1:0,y2:1,"stroke-width":p.sw,"stroke-dasharray":p.sd,"stroke-opacity":1,stroke:p.color } },
	//hline: p => { return {x1:0,x2:1,y1:p.cy,y2:p.cy,"stroke-width":p.sw,"stroke-dasharray":p.sd,"stroke-opacity":1,stroke:p.color } },
}
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

let elements = [...new Array(nlayers-1).keys()].reduce( (acc,z) => {
	let zels = [];
	let n = 0;
	[...new Array(nvlines).keys()].filter( j=>j%2===0 ).forEach( j => {
		zels.push({tag:"line", role:"vline", n:n, color:colors[(z+j)%colors.length]});
		++n;
	});
	[...new Array(nhlines).keys()].filter( j=>j%2===0 ).forEach( j => {
		zels.push({tag:"line", role:"hline", n:n, color:colors[(z+j)%colors.length]});
		++n;
	});
	[...new Array(nvlines).keys()].filter( j=>j%2===1 ).forEach( j => {
		zels.push({tag:"line", role:"vline", n:n, color:colors[(z+j)%colors.length]});
		++n;
	});
	[...new Array(nhlines).keys()].filter( j=>j%2===1 ).forEach( j => {
		zels.push({tag:"line", role:"hline", n:n, color:colors[(z+j)%colors.length]});
		++n;
	});
	/*
	[...new Array(ncircles).keys()].forEach( j => {
		zels.push({tag:"circle", role:"circle", n:n, color:colors[(z+j)%colors.length]});
		++n;
	})*/;
	acc.push(zels);
	return acc;
}, [[{tag:"rect"}]]);

elements[nlayers] = [...new Array(ncircles).keys()].map( n => {
	return ({tag:"circle", role:"circle", n:n, color:colors[(nlayers+n)%colors.length]});
});


[0].forEach( j => {
	let colors = spice; 
	let l = tools.randominteger(0,nlayers+1);
	//|let l = tools.randominteger(0,nlayers);
	let color = colors[tools.randominteger(0,colors.length)];
	console.log(color);
	elements[l][tools.randominteger(0,elements[l].length)].color=color;
});


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
	const istweens = [[Math.floor(nticks*0.88),1],[1,0]].flatMap(wx=>{
		return [...new Array(wx[0]).keys()].map( w=>wx[1] );
	});
	const changes = [[6,0],[3,1]].flatMap(wx=>{
		return [...new Array(wx[0]).keys()].map( w=>wx[1] );
	});
	const ischange = [];
	[...new Array(nticks).keys()].forEach(j => {
		ischange[j] = [...new Array(m).keys()].map( x => { 
			return changes[tools.randominteger(0,changes.length)];
		});
	});
	[0,1,nticks-2,nticks-1].forEach( j=> {
		ischange[j] = [...new Array(m).keys()].map( x => { 
			return 1;
		})
	});

	/* layer 0
	 * rectangle background
	 * */
	[0].forEach( layer => {
		let cx = 0, cy = 0, w = 1.0, h = 1.0, sw = 0.01, sd = 1, so = 0, fo = 1;
		let color = pigments.warmlightwhite; 
		//let color = colors[tools.randominteger(0,colors.length)];
		[...new Array(elements[layer].length).keys()].forEach( n => { 
			B.elements[layer][n].b = [...new Array(nticks).keys()].map( j => {
				return drawp.rect({cx:cx,cy:cy,w:w,h:h,sw,sd,so,fo,color});
			});
			Bfilm.elements[layer][n].b = [...new Array(nticks).keys()].flatMap( j => {
				return [...new Array(fps).keys()].map( t => {
					return drawp.rect({cx:cx,cy:cy,w:w,h:h,sw,sd,so,fo,color});
					//	return B.elements[layer][n].b[j]; 
				});
			});
		});
	});

/* layers 1 to z-1
 * */
[...new Array(nlayers).keys()].map( z => z+1).forEach( z => { 
//| [...new Array(nlayers-1).keys()].map( z => z+1).forEach( z => { 
	B.elements[z].forEach( (el,n) => {
		//|let k = z < nlayers-1 ? n*(z-1)+n : n;
		let k = n*(z-1)+n;
		let bframe = [...new Array(nticks).keys()].reduce( (acc,j) => {
			let bt = [];
			if( j===0 || ischange[j][n] || j===nticks-1 ) {
				//let so = (j===0 || j===nticks-1) ? 0 : pgrid[j].so[k];
				//let fo = (j===0 || j===nticks-1) ? 0 : pgrid[j].fo[k];

				if(tools.randominteger(0,400)<2){
					el.color=allcolors[tools.randominteger(0,allcolors.length)]
				}

				let so = pgrid[j].so[k];
				let fo = pgrid[j].fo[k]
				if(el.tag==="line" && j>0 && j<nticks-1) { so=1.0; fo=0.0}
				bt = drawp[el.role]({ 
					cx:pgrid[j].cx[k], cy:pgrid[j].cy[k],
					r:pgrid[j].r[k],w:1,h:1,
					so:so, fo:fo,
					sw:pgrid[j].sw[k], sd:pgrid[j].sd[k],
					color:el.color,
				});
			}
			else { bt = acc[j-1]; }
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
		Bfilm.elements[z][n].b = [...new Array(nticks).keys()].flatMap( j => { 
			//let p2 = j < nticks-1 ? bframe[j+1] : f;
			let p1 = bframe[j];
			let p2 = bframe[Math.min((j+1),(nticks-1))];
			//console.log(`el.n=${el.n}, j=${j}, p2=${JSON.stringify(p2)}`);
			let istween = istweens[tools.randominteger(0,istweens.length)];
			if(j===0 || j===nticks-1) {istween = 0}
			return [...new Array(fps).keys()].map( t => {
				let step = istween ? tween(p1,p2,t,fps) : bframe[tools.randominteger(0,bframe.length)];
				return step; 
			});
		});
		/*
			let introb = [...new Array(fps).keys()].map( t => {
				return Bfilm.elements[z][n].b[tools.randominteger(0,fps)];
			});
			introb.forEach(bt=>{Bfilm.elements[z][n].b.push(bt)});
			*/
		console.log(`Bfilm.elements[z][n].b.length =${Bfilm.elements[z][n].b.length}`);
		console.log(`el.b.length=${el.b.length}`);
		console.log(`count=${el.b.length}`);
		console.log(`count=${Bfilm.elements[z][n].b.length}`);
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
