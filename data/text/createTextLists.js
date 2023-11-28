const fs = require("fs"); 
const tools = require("./tools.js");
const wordsAll = require("./wordsAll.js");
const npoems = 8;
const nstanzas = 2;
const nlines = 4;
const nchars = 80;
const chcounts = wordsAll.map(w=>w.n);
console.log(chcounts);
let rawpoems = [...Array(npoems).keys()].map(p=>{
	let poem = [...Array(nstanzas).keys()].map(s=>{	
		let stanza = [...Array(nlines).keys()].map(l=>{	
			let count = 0;
			let line = [];
			while(count<nchars) {
				console.log(`nchars-count = ${nchars-count}`);
				let chcts = chcounts.filter(c => c <= (nchars-count) );
				let n = chcts[tools.randominteger(0,chcts.length)];
				console.log(n);
				count = count + n + 1;
				let choices = wordsAll.filter(w => w.n===n)[0].words;
				let word = choices[tools.randominteger(0,choices.length)];
				line.push(word+" ");
			}
			return tools.shufflearray(line).join("");
		});
		return stanza;
	});
	return {title:"poem " + p, lists:poem}
});
console.log(`rawpoems = ${JSON.stringify(rawpoems,null,"\t")}`);
fs.writeFileSync("rawPoemsList.js", JSON.stringify(rawpoems,null," "), (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${BfilmFile} written successfully\n`);
	}
});
