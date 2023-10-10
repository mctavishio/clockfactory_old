let toneweights = [
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
		// the identity (I only) 14
		{ lowi: 0, bassi: 0, bassV: 0, bassIV: 0, I: 2, II: 0, majIII: 0, miniii: 0, IV: 0, V: 0, VI: 0, majVII: 0, minvii: 0, VIII: 0, lownoise: 0, midnoise: 0, highnoise: 0, noise:0, buzz: 0 },
	];
let scores = {
	toneweights,
	orchestrations: [
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
