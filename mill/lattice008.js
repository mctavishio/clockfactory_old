const fs = require("fs");
const tools = require("./tools.js");
const rawsoundfiledata = require("./rawsoundfiledata.js");
// echo module.exports = [ > soundfiles.js; for file in ?(*.mp3|*.wav); do soxi -D $file | read d ; soxi -c $file | read c ; soxi -r $file | read r ; soxi -t $file | read t ; soxi -p $file | read p ;echo {id:\"${file%.*}\", file:\"$file\", duration:$d, nchannels:$c, rate:$r, type:\"$t\", bitrate:$p}, >> soundfiles.js; done; echo ] >> soundfiles.js;
//const rawsoundfiledata = require("./soundfiles.js");
// const rawsoundfiledata = rawsoundfiles;
const prefix = "lattice008";
const instrument = "clarinet001";
// const toneweights = [{ lowi: 0, bassi: 0, bassV: 1, bassIV: 1, I: 6, II: 5, majIII: 0, miniii: 1, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 3, highnoise: 0, noise:0, buzz: 0 }];
//"noise", { lowi: 0, bassi: 1, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 2, VIII: 0, lownoise: 2, midnoise: 2, highnoise: 2, noise: 4, buzz: 2 })
const toneweights = [
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 0, majIII: 0, miniii: 1, IV: 0, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 0, majIII: 0, miniii: 1, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 6, II: 0, majIII: 0, miniii: 1, IV: 0, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 1, majIII: 0, miniii: 2, IV: 2, V: 2, VI: 0, majVII: 0, minvii: 2, VIII: 1, lownoise: 0, midnoise: 1, highnoise: 1, noise:0, buzz: 0 },
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 1, majIII: 0, miniii: 1, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 1, midnoise: 1, highnoise: 1, noise:0, buzz: 0 },
	{ lowi: 0, bassi: 1, bassV: 1, bassIV: 1, I: 6, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	{ lowi: 0, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 0, IV: 2, V: 2, VI: 0, majVII: 0, minvii: 1, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 0, noise:0, buzz: 0 },
	//harmonics
	// simple 7
	{ lowi: 1, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 0, IV: 6, V: 6, VI: 0, majVII: 0, minvii: 0, VIII: 2, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
	// pentatonic2 8
	{ lowi: 1, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 3, majIII: 0, miniii: 0, IV: 6, V: 6, VI: 6, majVII: 0, minvii: 0, VIII: 2, lownoise: 1, midnoise: 3, highnoise: 0, noise:0, buzz: 0 },
	// pentatonic 9
	{ lowi: 1, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 0, majIII: 0, miniii: 6, IV: 6, V: 6, VI: 0, majVII: 0, minvii: 4, VIII: 2, lownoise: 1, midnoise: 3, highnoise: 0, noise:0, buzz: 0 },
	//harmonic 10 
	{ lowi: 1, bassi: 1, bassV: 3, bassIV: 3, I: 6, II: 5, majIII: 1, miniii: 5, IV: 9, V: 9, VI: 4, majVII: 1, minvii: 4, VIII: 2, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
	//levels of noise
	// noise 11
	{ lowi: 0, bassi: 1, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 2, VIII: 0, lownoise: 2, midnoise: 2, highnoise: 2, noise: 4, buzz: 2 },
	//simplebuzz 12
	{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 0, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 1, VIII: 0, lownoise: 0, midnoise: 1, highnoise: 1, noise: 0, buzz: 8 },
	// buzz 13
	{ lowi: 0, bassi: 1, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 1, V: 1, VI: 0, majVII: 0, minvii: 1, VIII: 2, lownoise: 1, midnoise: 1, highnoise: 0, noise: 1, buzz: 8 },
];

// const rawsoundfileweightseeds = [ ["clarinet1",4,toneweights[6]], ["clarinetnotes_a",2,toneweights[6]], ["clarinetnotes_b",2,toneweights[5]], ["clarinetnotes_c",2,toneweights[5]], ["clarinetnotes_d",2,toneweights[5]], ["clarinetnotes_e",2,toneweights[5]], ["clarinetnotes_f",1,toneweights[5]], ["clarinetnotes_g",1,toneweights[5]], ["clarinetnotes_h",1,toneweights[5]], ["clarinetnotes_i",1,toneweights[5]] ];
//const rawsoundfileweightseeds = [ ["clarinet1",4,toneweights[9]], ["clarinetnotes_a",2,toneweights[9]], ["clarinetnotes_b",2,toneweights[9]], ["clarinetnotes_c",2,toneweights[9]], ["clarinetnotes_d",2,toneweights[9]], ["clarinetnotes_e",2,toneweights[9]], ["clarinetnotes_f",1,toneweights[9]], ["clarinetnotes_g",1,toneweights[9]], ["clarinetnotes_h",1,toneweights[9]], ["clarinetnotes_i",1,toneweights[9]] ];
const rawsoundfileweightseeds = [ ["clarinet1",4,toneweights[9]],["clarinetnotes_a",2,toneweights[9]], ["clarinetnotes_e",2,toneweights[9]], ["clarinetnotes_f",1,toneweights[9]], ["clarinetnotes_g",1,toneweights[9]], ["clarinetnotes_h",1,toneweights[9]], ["clarinetnotes_i",1,toneweights[9]] ];
const rawsoundfiledata_subset = rawsoundfileweightseeds.map(rawsoundfile => {
	return rawsoundfiledata.filter(f => f.id===rawsoundfile[0]);
});
console.log(`rawsoundfildata_subset = ${JSON.stringify(rawsoundfiledata_subset)}`);
// const rawsoundfileweightseeds = [ ["mctbreathing0",1,toneweights[2]], ["mctvox1c",1,toneweights[2]], ["numberstation0",1,toneweights[0]], ["numberstation0b",1,toneweights[0]], ["vox20200118_8_3b",1,toneweights[0]], ["vox20200124_itwas",1,toneweights[0]]];
// const rawsoundfileweightseeds = [ ["weatherradio1_1channel",3,toneweights[3]], ["clarinet1_1channel",1,toneweights[4]], ["bird1_1channel",1,toneweights[4]], ["bird3_1channel",1,toneweights[3]], ["128_c",2,toneweights[3]],["144_d",3,toneweights[3]], ["192_g",2,toneweights[3]], ["288_d",2,toneweights[3]], ["384_g",2,toneweights[3]], ["432_a",2,toneweights[5]], ["64_c",1,toneweights[0]] ];
//const rawsoundfileweightseeds = [ ["128_c",2,toneweights[3]],["144_d",3,toneweights[3]], ["192_g",3,toneweights[3]], ["288_d",3,toneweights[3]], ["384_g",3,toneweights[3]], ["432_a",3,toneweights[5]], ["64_c",1,toneweights[0]] ];
// const rawsoundfileweightseeds = [ ["128_c",2,toneweights[0]],["144_d",3,toneweights[5]], ["192_g",2,toneweights[5]], ["288_d",2,toneweights[5]], ["384_g",2,toneweights[5]], ["432_a",2,toneweights[5]], ["64_c",1,toneweights[0]] ];
// const rawsoundfiles = ["rider1_a", "rider1_b", "therider0_a", "therider0_b", "therider0_c", "therider0_d", "therider0_e", "therider0b_a", "therider0b_b", "therider0b_c", "therider0b_d", "therider0b_e", "therider0b_f", "therider0b_g"];

// const rawsoundfiles = ["magsSessionClips_1"];
// const rawsoundfiles = ["clarinet1", "clarinetnotes_a", "clarinetnotes_b", "clarinetnotes_c", "clarinetnotes_d", "clarinetnotes_e"];

const datetime = new Date();
const timestamp = datetime.getTime();
const datetimestr = datetime.toDateString();
const datetimeISOstr = datetime.toISOString();
const intervals = {
	lowi: basetone => { return basetone/4 },
	bassi: basetone => { return basetone/2 },
	bassIV: basetone => { return basetone*4/6 },
	bassV: basetone => { return basetone*3/2 },
	I: basetone => { return basetone/1 },
	II: basetone => { return basetone*9/8 },
	majIII: basetone => { return basetone*5/4 },
	miniii: basetone => { return basetone*6/5 },
	IV: basetone => { return basetone*4/3 },
	V: basetone => { return basetone*3/2 },
	VI: basetone => { return basetone*5/3 },
	majVII: basetone => { return basetone*15/8 },
	minvii: basetone => { return basetone*9/5 },
	VIII: basetone => { return basetone*2 },
	lownoise: basetone => { return basetone*tools.randominteger(5,9)/10 },
	midnoise: basetone => { return basetone*tools.randominteger(9,11)/10 },
	highnoise: basetone => { return basetone*tools.randominteger(12,18)/10 },
	noise: basetone => { return basetone*tools.randominteger(4,16)/10 },
	buzz: basetone => { return basetone*tools.randominteger(9,12)/10 },
};

const speeds = Object.entries(intervals).reduce( (acc,entry) => {
	acc[entry[0]] = entry[1](1000)/1000;
	return acc;
}, {});
const  baseweights = Object.entries(speeds).reduce( (acc,entry) => {
	acc[entry[0]] = Math.floor(1000/entry[1])/1000;
	return acc;
}, {});

// console.log(`speeds = ${JSON.stringify(speeds)}`);
// console.log(`baseweights = ${JSON.stringify(baseweights)}`);

const soundindexweights = tools.reifyWeightedArray( 
	rawsoundfileweightseeds.map( (w,j) => { return [j, w[1]] } ) );


// reify the instrument
rawsoundfileweights = rawsoundfileweightseeds.map( file => {
	let harmonicweights = file[2];
	// console.log(`harmonicweights = ${JSON.stringify(harmonicweights)}`);
	weights = Object.entries(baseweights).reduce( (acc,entry) => {
		acc[entry[0]] = entry[1]*harmonicweights[entry[0]];
		return acc;
	}, {});
	// console.log(`weights = ${JSON.stringify(weights)}`);
	let notes = tools.reifyWeightedArray( Object.entries(weights).map( w=>{ return [w[0], Math.floor(w[1])] } ) );
	// console.log(`notes = ${notes}`);
	return [file[0],file[1],notes];
});

// console.log(`rawsoundfileweights = ${JSON.stringify(rawsoundfileweights)}`);
// console.log(`soundindexweights = ${JSON.stringify(soundindexweights)}`);

const nthreads = 4;
const ntwists = 1;
const threadlength = 4*60;
// const mcompandstr = `gain -4 sinc -n 29 -b 100 8000 mcompand "0.005,0.1 -47,-40,-34,-34,-17,-33" 100 "0.003,0.05 -47,-40,-34,-34,-17,-33" 400 "0.000625,0.0125 -47,-40,-34,-34,-15,-33" 1600 "0.0001,0.025 -47,-40,-34,-34,-31,-31,-0,-30" 6400 "0,0.025 -38,-31,-28,-28,-0,-25" gain 15 highpass 22 highpass 22 sinc -n 255 -b 16 -17500 gain 8 lowpass -1 17801 norm -2 silence -l 1 0.1 1% -1 2.0 1%`;
const mcompandstr = `gain -12 sinc -n 29 -b 100 8000 mcompand "0.005,0.1 -47,-40,-34,-34,-17,-33" 100 "0.003,0.05 -47,-40,-34,-34,-17,-33" 400 "0.000625,0.0125 -47,-40,-34,-34,-15,-33" 1600 "0.0001,0.025 -47,-40,-34,-34,-31,-31,-0,-30" 6400 "0,0.025 -38,-31,-28,-28,-0,-25" gain 15 highpass 22 highpass 22 sinc -n 255 -b 16 -17500 gain 1 lowpass -1 17801 lowpass 2400`;
// const mcompandstr = `gain -6 sinc -n 29 -b 100 8000 mcompand "0.005,0.1 -47,-40,-34,-34,-17,-33" 100 "0.003,0.05 -47,-40,-34,-34,-17,-33" 400 "0.000625,0.0125 -47,-40,-34,-34,-15,-33" 1600 "0.0001,0.025 -47,-40,-34,-34,-31,-31,-0,-30" 6400 "0,0.025 -38,-31,-28,-28,-0,-25" gain 15 highpass 22 highpass 22 sinc -n 255 -b 16 -17500 gain 6 lowpass -1 17801`;
const reverbstr = `reverb 100 50 50`;

const echos = () => {
	//gain-in gain-out <delay decay>
	let gainin = tools.randominteger(6,8)/10;
	let gainout = tools.randominteger(4,8)/10;
	let delay = [tools.randominteger(80,3800),tools.randominteger(800,6400)];
	let decay = [tools.randominteger(3,6)/10,tools.randominteger(3,6)/10];
	return `${gainin} ${gainout} ${delay[0]} ${decay[0]} ${delay[1]} ${decay[1]}`;
};

const tonepads = () => { return tools.randominteger(0,120)/100 };
// soc cheat cheat: https://gist.github.com/ideoforms/d64143e2bad16b18de6e97b91de494fd
let soxstr = [...Array(ntwists).keys()].reduce( (twiststr,j1) => {
	twiststr = twiststr + [...Array(nthreads).keys()].reduce( (threadstr,j2) => {
		let dur = 0;
		let filestr = "";
		while(dur < threadlength) {
			let rawsoundfile = rawsoundfileweights[soundindexweights[tools.randominteger(0,soundindexweights.length)]];
			console.log(`rawsoundfile = ${rawsoundfile}`);
			let rawsounddur = rawsoundfiledata.filter(f => f.id===rawsoundfile[0])[0].duration;
			let notef = rawsoundfile[2][tools.randominteger(0,rawsoundfile[2].length)];
			let speed = intervals[notef](1);
			let tonepad = tonepads();
			dur = dur + rawsounddur/speed + tonepad;
			// console.log(`rawsoundfile = ${rawsoundfile[0]}, dur = ${dur}, speed = ${speed}`);
			filestr = filestr + ` "|sox ../../fragments/${rawsoundfile[0]}.mp3 -p speed ${speed} pad 0 ${tonepad} norm -4" `;
		}
		//with echo & 
		//with no echo
		threadstr = threadstr + `
	sox ${filestr} ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_${j2.toString().padStart(3, "0")}_echo.mp3 echos ${echos()} norm -2;
	sox ${filestr} ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_${j2.toString().padStart(3, "0")}.mp3 norm -2; `;
		return threadstr;
	},""); 
	twiststr = twiststr +  `
  sox -m ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_*_echo.mp3 ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_all_echo.mp3 ${mcompandstr};
  sox -m ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_*_echo.mp3 ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_all_echo_reverb.mp3 ${reverbstr} ${mcompandstr};
  sox -m ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_*.mp3 ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_all.mp3 ${mcompandstr};
  sox -m ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_*.mp3 ${instrument}_twist_${j1.toString().padStart(3, "0")}_thread_all_reverb.mp3 ${reverbstr} ${mcompandstr}; `;
	return twiststr;
},"");

const threadpads = () => { return tools.randominteger(0,140)/100 };

soxstr = soxstr + [...Array(nthreads).keys()].reduce( (threadstr,j1) => {
	threadstr = threadstr + ` 
  sox -m ${instrument}_twist_*_thread_${j1.toString().padStart(3, "0")}.mp3 ${instrument}_twist_all_thread_${j1.toString().padStart(3, "0")}.mp3 ${mcompandstr};
  sox -m ${instrument}_twist_*_thread_${j1.toString().padStart(3, "0")}.mp3 ${instrument}_twist_all_thread_${j1.toString().padStart(3, "0")}_reverb.mp3 ${reverbstr} ${mcompandstr};
  sox -M "|sox -v 0.5 ${instrument}_twist_000_thread_${j1.toString().padStart(3, "0")}.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 ${instrument}_twist_000_thread_${(nthreads-j1-1).toString().padStart(3, "0")}.mp3 -c1 -p norm -4" ${instrument}_twist_000_thread_${j1.toString().padStart(3, "0")}_${(nthreads-j1-1).toString().padStart(3, "0")}.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${mcompandstr};
  sox -M "|sox -v 0.5 ${instrument}_twist_000_thread_${j1.toString().padStart(3, "0")}.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 ${instrument}_twist_000_thread_${(nthreads-j1-1).toString().padStart(3, "0")}.mp3 -c1 -p norm -4" ${instrument}_twist_000_thread_${j1.toString().padStart(3, "0")}_${(nthreads-j1-1).toString().padStart(3, "0")}_reverb.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${reverbstr} ${mcompandstr};

  sox -m ${instrument}_twist_*_thread_${j1.toString().padStart(3, "0")}_echo.mp3 ${instrument}_twist_all_thread_${j1.toString().padStart(3, "0")}_echo.mp3 ${mcompandstr};
  sox -m ${instrument}_twist_*_thread_${j1.toString().padStart(3, "0")}_echo.mp3 ${instrument}_twist_all_thread_${j1.toString().padStart(3, "0")}_echo_reverb.mp3 ${reverbstr} ${mcompandstr};
  sox -M "|sox -v 0.5 ${instrument}_twist_000_thread_${j1.toString().padStart(3, "0")}_echo.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 ${instrument}_twist_000_thread_${(nthreads-j1-1).toString().padStart(3, "0")}_echo.mp3 -c1 -p norm -4" ${instrument}_twist_000_thread_${j1.toString().padStart(3, "0")}_${(nthreads-j1-1).toString().padStart(3, "0")}_echo.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${mcompandstr};
  sox -M "|sox -v 0.5 ${instrument}_twist_000_thread_${j1.toString().padStart(3, "0")}_echo.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 ${instrument}_twist_000_thread_${(nthreads-j1-1).toString().padStart(3, "0")}_echo.mp3 -c1 -p norm -4" ${instrument}_twist_000_thread_${j1.toString().padStart(3, "0")}_${(nthreads-j1-1).toString().padStart(3, "0")}_echo_reverb.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${reverbstr} ${mcompandstr};`;

	// threadstr = threadstr + [...Array(ntwists).keys()].reduce( (twiststr,j2) => {
	//   twiststr = twiststr + ` 
	// sox -M "|sox  -v 0.5 ${instrument}_twist_${j2.toString().padStart(3, "0")}_thread_${j1.toString().padStart(3, "0")}.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 ${instrument}_twist_${j2.toString().padStart(3, "0")}_thread_${(nthreads-j1-1).toString().padStart(3, "0")}.mp3 -c1 -p norm -4" ${instrument}_twist_${j2.toString().padStart(3, "0")}_thread_${j1.toString().padStart(3, "0")}_${(nthreads-j1).toString().padStart(3, "0")}.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${mcompandstr};
	// sox -M "|sox  -v 0.5 ${instrument}_twist_${j2.toString().padStart(3, "0")}_thread_${j1.toString().padStart(3, "0")}.mp3 -c1 -p pad ${threadpads()} 0 norm -4" "|sox -v 0.5 ${instrument}_twist_${j2.toString().padStart(3, "0")}_thread_${(nthreads-j1-1).toString().padStart(3, "0")}.mp3 -c1 -p norm -4" ${instrument}_twist_${j2.toString().padStart(3, "0")}_thread_${j1.toString().padStart(3, "0")}_${(nthreads-j1).toString().padStart(3, "0")}_reverb.mp3 remix 1v0.7,2v0.3 1v0.3,2v0.7 ${reverbstr} ${mcompandstr};`;
	// return twiststr;
	// }, "");
	return threadstr;
}, "");

fs.writeFileSync("rawsoundfiledata_subset.js", JSON.stringify(rawsoundfiledata_subset,null,"\t"), (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${nextstepsfile} file written successfully\n`);
	}
})
let nextstepsfile = prefix+"_nextsteps_"+timestamp+".sh";
let newdir = `${instrument}_${timestamp}`;
let initialize = `mkdir ${newdir};`;

let nextsteps = initialize;
nextsteps = nextsteps + `
cp ${prefix}.js ${newdir};
cp rawsoundfiledata_subset.js ${newdir}/rawsoundfiledata_subset.js;
cp getsoundfiledata.sh ${newdir}/getsoundfiledata.sh
cp ${nextstepsfile} ${newdir};
cd ${newdir};
`;

nextsteps = nextsteps + soxstr;
nextsteps = nextsteps + `
zsh getsoundfiledata.sh
`;

nextsteps = nextsteps + `
echo cd ${newdir};
echo bash ${nextstepsfile};
echo bash getsoundfiledata.sh;
echo gsutil -m cp -r ${newdir} gs://soundfactory/
`
console.log(`newdir = ${newdir}`);
console.log(`next::: gsutil -m cp -r ${newdir} gs://soundfactory/`);
console.log(`nextstepsfile = ${nextstepsfile}`);


// //sox tornadosiren.mp3 -n spectrogram -m -l -o tornadosiren.png
// //https://upload.wikimedia.org/wikiversity/en/b/b1/Audio.2.SigAnal.1.A.20180213.pdf
// //sox clarinetnotes_e_clarinetnotes_a_thread_pentatonic_000_003.mp3 -n spectrogram
// //open spectrogram.png
// //play clarinetnotes_e_clarinetnotes_a_thread_pentatonic_000_003.mp3 lowpass 2400
// // nextsteps = nextsteps + rawsoundfiles.reduce( (nextstepstr,file) => {
// //     threadp.forEach( (p1,j2) => {    
// //     [...Array(nthreads).keys()].forEach( j3 => {
// //         nextstepstr = nextstepstr + `
// //     sox -m ${file}_thread_${p1.id}_${j3.toString().padStart(3, "0")}.mp3 ${file}_bentthread_${p1.id}_${j3.toString().padStart(3, "0")}.mp3 ${file}_twist_${p1.id}_${j3.toString().padStart(3, "0")}.mp3 gain -4 sinc -n 29 -b 100 8000 mcompand "0.005,0.1 -47,-40,-34,-34,-17,-33" 100 "0.003,0.05 -47,-40,-34,-34,-17,-33" 400 "0.000625,0.0125 -47,-40,-34,-34,-15,-33" 1600 "0.0001,0.025 -47,-40,-34,-34,-31,-31,-0,-30" 6400 "0,0.025 -38,-31,-28,-28,-0,-25" gain 15 highpass 22 highpass 22 sinc -n 255 -b 16 -17500 gain 8 lowpass -1 17801 norm -2 silence -l 1 0.1 1% -1 2.0 1%; `;
// //     });
// //         nextstepstr = nextstepstr + `
// //     sox -m ${file}_bentthread_${p1.id}_*.mp3 ${file}_bentthread_${p1.id}_all.mp3 norm -2; `;
// //     });
// //     return nextstepstr;
// // }, "");



// nextsteps = nextsteps + `
// echo module.exports = [ > outsoundfiles.js; for file in ?(*.mp3|*.wav); do soxi -D $file | read d ; soxi -c $file | read c ; soxi -r $file | read r ; soxi -t $file | read t ; soxi -p $file | read p ;echo {id:\\"$\{file%.*\}\\", file:\\"$file\\", url:\\"https://storage.googleapis.com/soundfactory/${newdir}/$file\\", duration:$d, nchannels:$c, rate:$r, type:\\"$t\\", bitrate:$p}, >> outsoundfiles.js; done; echo ] >> outsoundfiles.js;
// echo cd ${newdir};
// echo bash ${nextstepsfile};
// echo gsutil -m cp -r ${newdir} gs://soundfactory/
// `
// console.log(`newdir = ${newdir}`);
// console.log(`next::: gsutil -m cp -r ${newdir} gs://soundfactory/`);
// console.log(`${nextstepsfile}`);
// // play -M "|sox bell11_harmonictwist_all_fm.mp3 -c1 -p" "|sox -v 1.0 bell11_bendtwist_all_fm.mp3 -c1 -p" remix 1v0.7,2v0.3 1v0.3,2v0.7 norm -2

//   //zip ${newdir}.zip ${newdir};\n
//   //mv ${newdir}.zip ${newdir}/album.zip;\n
//   //run 
//   // echo module.exports = [ > outsoundfiles.js; for file in ?(*.mp3|*.wav); do soxi -D $file | read d ; soxi -c $file | read c ; soxi -r $file | read r ; soxi -t $file | read t ; soxi -p $file | read p ;echo {id:\"${file%.*}\", file:\"$file\", duration:$d, nchannels:$c, rate:$r, type:\"$t\", bitrate:$p}, >> outsoundfiles.js; echo ] >> outsoundfiles.js; done;
//   //add: module.exports = [ ]
//   //replace:
//   //  file:"([a-zA-Z0-9_]*).mp3",
//   //  with
//   //  id: "$1", file:"$1.mp3", url:"https://storage.googleapis.com/soundfactory/${newdir}/$1.mp3",
//   // be sure bucket has public access
//   // gsutil iam ch allUsers:objectViewer gs://soundfactory
//   //  gsutil -m cp -r icedbowedvibes_1641495642737 gs://soundfactory/
//   // play knocking1_knocking1_thread_pentatonic_001_006.mp3 reverb 100 50 50
//   // play bagpipe1_bagpipe1_thread_simplebuzz_001_007.mp3 pitch -7 reverb 100 50 50
//   // play bagpipe1f_bagpipe1e_thread_simple_000_007.mp3 reverb 100 60 40
//   // reverb: usage: [-w|--wet-only] [reverberance (50%) [HF-damping (50%) [room-scale (100%) [stereo-depth (100%) [pre-delay (0ms) [wet-gain (0dB)]]]]]]
//   // bagpipeclick_1642430760765 ::: => play bagpipe1h_bagpipe1h_thread_pentatonic2_000_007.mp3 reverb 100 60 60 60 30
//   // play -m mctvox1c_thread_pentatonic_all.mp3 "|sox mctvox1c_thread_pentatonic_all.mp3 -p speed .9" "|sox mctvox1c_thread_pentatonic_all.mp3 -p pitch -2" reverb 100 50 50
//   // play piano1_piano3a_thread_simple_all.mp3 highpass 60 lowpass 2400
//   // play bagpipegeese_bagpiperadio_thread_noise_001_006.mp3 speed 0.6 reverb 100 50 50
//   // play -m therider0b_f_thread_pentatonic_all.mp3 "|sox therider0b_f_thread_pentatonic_all.mp3 -p reverse"
//   // play -m therider0b_a_thread_pentatonic_all.mp3 "|sox therider0b_c_thread_pentatonic_all.mp3 -p reverse" speed 4.0 reverb 100 50 50
//   // play -m rider1_b_therider0b_d_thread_pentatonic_000_003.mp3 "|sox rider1_b_therider0b_d_thread_pentatonic_000_003.mp3 -p reverse" 
//   // play -m therider0_a_thread_pentatonic_00*.mp3 highpass 500
//   // play -q birdcry_birdcanyon_thread_buzz_all.mp3 lowpass 2400
//   // play -q -m birdcry_birdtheme_thread_pentatonic2_000_003.mp3 birdtheme_birdcanyon_thread_pentatonic2_000_003.mp3
fs.writeFileSync(nextstepsfile, nextsteps, (err) => {
	if (err)
		console.log(err);
	else {
		console.log(`${nextstepsfile} file written successfully\n`);
	}
});
