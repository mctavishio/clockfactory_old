const soundFiles = require("./rawSoundFiles.js");
const toneweights = [
	//no low no high no noise : minimalist with I II IV V 0
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 2, majIII: 0, miniii: 0, IV: 2, V: 3, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//no low no high no noise : minor chord with forth 1
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 0, majIII: 0, miniii: 1, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//no low no high no noise : tight minor chord 2
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 0, majIII: 0, miniii: 1, IV: 0, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//minor 7th no noise : full minor scale feel 3
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 1, majIII: 0, miniii: 2, IV: 2, V: 2, VI: 0, majVII: 0, minvii: 2, VIII: 1, lownoise: 0, midnoise: 1, highnoise: 1, noise:0, buzz: 0 },
	//minor 7th full noise : full minor scale feel 4
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 1, majIII: 0, miniii: 1, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 1, midnoise: 1, highnoise: 1, noise:0, buzz: 0 },
	//low midnoise I  and below  5
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	// no noise fuller low simple I IV V  6
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 0, IV: 2, V: 2, VI: 0, majVII: 0, minvii: 1, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//harmonics
	// simple 7
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 0, IV: 6, V: 6, VI: 0, majVII: 0, minvii: 0, VIII: 2, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
	// pentatonic2 8
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 3, majIII: 0, miniii: 0, IV: 6, V: 6, VI: 6, majVII: 0, minvii: 0, VIII: 2, lownoise: 1, midnoise: 3, highnoise: 0, noise:0, buzz: 0 },
	// pentatonic 9
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 6, IV: 6, V: 6, VI: 0, majVII: 0, minvii: 4, VIII: 2, lownoise: 1, midnoise: 3, highnoise: 0, noise:0, buzz: 0 },
	//harmonic 10 
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 5, majIII: 1, miniii: 5, IV: 9, V: 9, VI: 4, majVII: 1, minvii: 4, VIII: 2, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
	//levels of noise
	// noise 11
	{ lowi: 0, bassi: 1, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 2, VIII: 0, lownoise: 2, midnoise: 2, highnoise: 2, noise: 4, buzz: 2 },
	//simplebuzz 12
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 0, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 1, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 1, noise: 0, buzz: 8 },
	// buzz 13
	{ lowi: 0, bassi: 1, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 1, VIII: 2, lownoise: 1, midnoise: 1, highnoise: 0, noise: 1, buzz: 8 },
	// the identity (I only) 14
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
];
const vox = soundFiles.filter(f=>f.keywords==="vox").map(f=> {
	return [f.id,1,toneweights[14]]
});  
const pianoall = soundFiles.filter(f=>f.keywords==="piano").map(f=> {
	return [f.id,1,toneweights[7]]
});  
const pianokeys = soundFiles.filter(f=>f.keywords==="piano" && !f.keywords.includes("harp")).map(f=> {
	return [f.id,1,toneweights[9]]
});  
const pianosolo = soundFiles.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,toneweights[9]]
});  
const pianosolonoise = soundFiles.filter(f=>f.id==="piano1").map(f=> {
	return [f.id,1,toneweights[11]]
});  
const magsmonk = soundFiles.filter(f=>f.keywords==="mags|vox|monks").map(f=> {
	return [f.id,1,toneweights[14]]
});  
const magsnotes = soundFiles.filter(f=>f.keywords==="mags|vox|note").map(f=> {
	return [f.id,1,toneweights[14]]
});  
const magsclarinetnotes = soundFiles.filter(f=>{
		return f.keywords==="mags|vox|note" || f.id==="clarinetnotes_d";
	}).map(f=> {
	return [f.id,1,toneweights[2]]
});  
const beats = soundFiles.filter(f=>f.keywords.includes("beat")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const traffick = soundFiles.filter(f=>f.keywords.includes("traffick")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const bagpipebeats = soundFiles.filter(f=> {
	let keywords = "beat|bagpipe".split("|");
	let isIn = keywords.reduce( (acc,k) => {
		acc = !f.keywords.includes(k) ? false : acc;
		return acc;
	},false);
	return isIn || f.id==="typewriter1";
}).map(f=> {
	return [f.id,11,toneweights[4]]
});  
const clarinetnotes = soundFiles.filter(f=>f.keywords.includes("clarinetnotes")).map(f=> {
	return [f.id,1,toneweights[0]]
});  
const stringspluck = soundFiles.filter(f=>f.keywords.includes("strings") && f.keywords.includes("pluck")).map(f=> {
	return [f.id,1,toneweights[0]]
});  
const strings = soundFiles.filter(f=>f.keywords.includes("strings")).map(f=> {
	return [f.id,1,toneweights[0]]
});  
//const bellssparse = soundFiles.filter(f=>f.id.includes("bell6") || f.id.includes("374273__samulis__tubular-bells-c4-tb_hit_c4_v4_rr1") || f.id.includes("375552__samulis__gong-gong_scrape_3")).map(f=> {
const bellssparse = soundFiles.filter(f=>f.id.includes("bell11") || f.id.includes("bell2")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const bells = soundFiles.filter(f=>f.keywords.includes("bell")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const afterring = soundFiles.filter(f=>f.keywords.includes("afterring")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const noise = soundFiles.filter(f=>f.keywords.includes("noise")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const bowedmetal = soundFiles.filter(f=>f.keywords.includes("bowedmetal")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const cry = soundFiles.filter(f=>f.keywords.includes("cry")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const brass = soundFiles.filter(f=>f.keywords.includes("brass")).map(f=> {
	return [f.id,1,toneweights[4]]
});  
const brasslong = soundFiles.filter(f=>f.keywords.includes("brass") && f.keywords.includes("long")).map(f=> {
	return [f.id,1,toneweights[7]]
});  
const brassshort = soundFiles.filter(f=>f.keywords.includes("brass") && f.keywords.includes("short")).map(f=> {
	return [f.id,1,toneweights[7]]
});  
const brasslong_ad = soundFiles.filter(f=>(f.id.includes("_d3_") || f.id.includes("_a2_")) && f.keywords.includes("brass") && f.keywords.includes("long")).map(f=> {
	return [f.id,1,toneweights[0]]
});  
const brassshort_ad = soundFiles.filter(f=>(f.id.includes("_d3_") || f.id.includes("_a2_")) && f.keywords.includes("brass") && f.keywords.includes("short")).map(f=> {
	return [f.id,1,toneweights[0]]
});  
let scores = {
	toneweights,
	orchestrations: [
		[
			{gain:0.3,padmin:0,padmax:200,list:strings},
			{gain:0.3,padmin:0,padmax:100,list:afterring},
		],
		[
			{gain:0.6,padmin:100,padmax:300,nthreads:6,list:bellssparse},
			{gain:0.4,padmin:200,padmax:600,nthreads:1,list:bells},
			{gain:0.4,padmin:200,padmax:600,nthreads:2,list:afterring},
		],
		[
			{gain:0.4,padmin:100,padmax:400,nthreads:3,list:brasslong},
			{gain:0.4,padmin:200,padmax:600,nthreads:1,list:afterring},
		],
		[
			{gain:0.4,padmin:0,padmax:80,list:stringspluck},
			{gain:0.4,padmin:0,padmax:100,list:stringspluck},
			{gain:0.4,padmin:10,padmax:100,nthreads:6,list:stringspluck},
			{gain:0.5,padmin:0,padmax:100,delay:.3,duration:.5,nthreads:6,list:stringspluck},
		],
		[
			{gain:0.4,padmin:0,padmax:200,list:strings},
			{gain:0.4,padmin:0,padmax:100,list:strings},
		],
		[
			{gain:0.5,padmin:0,padmax:100,delay:.3,duration:.5,nthreads:4,list:cry},
			{gain:0.8,padmin:0,padmax:100,delay:.6,duration:.8,nthreads:4,list:cry},
			//{gain:0.4,padmin:0,padmax:400,list:cry},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
			{gain:0.2,padmin:0,padmax:80,list:noise},
		],
		[
			{gain:0.4,padmin:100,padmax:400,nthreads:6,list:bells},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
			{gain:0.3,padmin:0,padmax:60,list:[ ["surf",1,toneweights[9]] ]},
		],
		[
			{gain:0.4,padmin:0,padmax:100,delay:.3,duration:.5,nthreads:8,list:brassshort},
			{gain:0.3,padmin:0,padmax:100,nthreads:4,list:brasslong_ad},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
		],
		[
			{gain:0.4,padmin:0,padmax:100,delay:.20,duration:.40,list:beats},
			{gain:0.4,padmin:0,padmax:100,delay:.50,duration:.60,list:beats},
			{gain:1.2,padmin:0,padmax:60,nthreads:6,list:bagpipebeats},
			//{gain:1.2,padmin:0,padmax:60,list:[ ["t0",1,toneweights[9]] ]},
			{gain:1.2,padmin:0,padmax:60,nthreads:6,list:[ ["thunk",1,toneweights[12]] ]},
		],
		[
			{gain:0.3,padmin:0,padmax:200,list:bowedmetal},
			{gain:0.3,padmin:0,padmax:100,list:afterring},
		],
		[
			{gain:0.5,padmin:0,padmax:100,list:beats},
			{gain:0.5,padmin:0,padmax:80,list:beats},
		],
		[
			{gain:0.4,padmin:0,padmax:400,list:cry},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
			{gain:0.2,padmin:0,padmax:80,list:noise},
		],
		[
			{gain:0.3,padmin:10,padmax:200,list:bowedmetal},
			{gain:0.3,padmin:0,padmax:100,list:afterring},
			{gain:0.3,padmin:0,padmax:60,list:[ ["surf",1,toneweights[9]] ]},
		],
		[
			{gain:0.6,padmin:0,padmax:200,list:magsclarinetnotes},
			{gain:0.4,padmin:0,padmax:100,list:afterring},
		],
		[
			{gain:0.4,padmin:0,padmax:200,list:pianokeys},
			{gain:0.6,padmin:0,padmax:100,list:pianosolo},
			{gain:0.4,padmin:80,padmax:400,list:pianosolonoise},
		],
		[
			{gain:0.4,padmin:0,padmax:100,list:magsmonk},
			{gain:0.5,padmin:0,padmax:80,list:noise},
		],
		[
			{gain:0.5,padmin:0,padmax:100,list:beats},
			{gain:0.5,padmin:0,padmax:80,list:beats},
		],
		[
			{gain:0.4,padmin:80,padmax:200,list:bells},
			{gain:0.4,padmin:200,padmax:900,list:afterring},
		],
		[
			{gain:0.6,padmin:80,padmax:200,list:clarinetnotes},
			{gain:0.3,padmin:20,padmax:100,list:clarinetnotes},
			//{gain:0.3,padmin:20,padmax:100,list:clarinetnotes.push(["icebowedvibes1",4,toneweights[9]])},
		],
		[
			{gain:0.3,padmin:80,padmax:200,list:[ ["vox20200118_8_3b",2,toneweights[14]], ["monksfromouterspacecistern_c",2,toneweights[14]],["mctvox1c",2,toneweights[14]] ]},
			{gain:0.3,padmin:20,padmax:100,list:[ ["vox20200118_8_3b",2,toneweights[14]],["magsSessionClips_2b",2,toneweights[14]], ["magsSessionClips_1",2,toneweights[14]],  ["magsSessionClips_3b",2,toneweights[14]] ]},
			{gain:0.4,padmin:0,padmax:80,list:[ ["mctbreathing0",4,toneweights[13]]  ]},
		],
		[
			{gain:0.4,padmin:80,padmax:200,list:[ ["piano3a",2,toneweights[1]], ["piano3b",2,toneweights[3]] ]},
			{gain:0.4,padmin:20,padmax:200,list:[ ["piano3a",2,toneweights[4]], ["piano3b",2,toneweights[2]] ]},
		],
		[
			{gain:0.3,padmin:0,padmax:100,list:[ ["piano3a",4,toneweights[9]], ["piano3b",2,toneweights[9]], ["piano1",2,toneweights[0]] ]},
			{gain:0.3,padmin:0,padmax:80,list:[ ["thunk",5,toneweights[3]],["knocking1",2,toneweights[13]], ["typewriter1",3,toneweights[9]]  ]},
			{gain:0.4,padmin:0,padmax:80,list:[ ["vox20200118_8_3b",5,toneweights[3]],["mctbreathing0",2,toneweights[13]]  ]},
		],
		[
			{gain:0.4,padmin:0,padmax:100,list:[ ["clarinet1",4,toneweights[14]], ["clarinetnotes_a",2,toneweights[2]], ["clarinetnotes_e",2,toneweights[14]], ["clarinetnotes_f",1,toneweights[14]], ["clarinetnotes_g",1,toneweights[14]], ["clarinetnotes_b",1,toneweights[14]], ["clarinetnotes_i",1,toneweights[14]] ]},
			{gain:0.4,padmin:0,padmax:100,list:[ ["icebowedvibes1",5,toneweights[1]], ["clarinetnotes_a",2,toneweights[4]], ["clarinetnotes_e",2,toneweights[0]] ]},
			{gain:0.2,padmin:0,padmax:80,list:[ ["vox20200118_8_3b",5,toneweights[3]],["mctbreathing0",2,toneweights[13]],["train1",1,toneweights[4]]  ]},
		],
		[
			{gain:0.4,padmin:0,padmax:200,list:[ ["bell6",2,toneweights[4]], ["bell13",4,toneweights[9]],["bell11",4,toneweights[9]] ]},
			{gain:0.3,padmin:100,padmax:400,list:[ ["bell13",4,toneweights[9]],["bell2",3,toneweights[9]],["bird2",1,toneweights[2]],["bird3",1,toneweights[12]],["bird1",2,toneweights[12]] ]},
			{gain:0.3,padmin:0,padmax:80,list:[ ["vox20200118_8_3b",3,toneweights[3]],["mctbreathing0",2,toneweights[13]],["train1",1,toneweights[4]]  ]},
		],
		[
			{gain:0.2,padmin:0,padmax:100,list:[ ["clarinet1",4,toneweights[9]], ["clarinetnotes_a",2,toneweights[9]], ["clarinetnotes_e",2,toneweights[9]], ["clarinetnotes_f",1,toneweights[9]], ["clarinetnotes_g",1,toneweights[9]], ["clarinetnotes_b",1,toneweights[9]], ["clarinetnotes_i",1,toneweights[9]] ]},
			//{gain:0.3,list:[ ["magsSessionClips_3b",1,toneweights[14]], ["magsSessionClips_1",2,toneweights[2]],["mctbreathing0",1,toneweights[2]] ]},
			{gain:0.4,padmin:0,padmax:200,list:[ ["bell13",4,toneweights[9]],["bell11",4,toneweights[9]],["bird2",1,toneweights[2]],["bird3",1,toneweights[12]],["bird1",2,toneweights[12]] ]},
			{gain:0.4,padmin:0,padmax:80,list:[ ["vox20200118_8_3b",2,toneweights[3]],["mctbreathing0",2,toneweights[13]],["train1",1,toneweights[4]]  ]},
		],
	] 
};
module.exports = scores;
