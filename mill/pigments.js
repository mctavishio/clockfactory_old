
const pigments = {
	red: "#8F0000", /*panatone:"7621 C" rgb(rgb(143,0,0)), cmyk(0,100,100,44), hsl(0,100%,28%)*/
	yellow: "#ffcc00",/*rgb(255,204,0), hsl(48,100%,50%), cmyk(0,20,100,0) */
	blue: "#006699", /*rgb(0,102,153), hsl(200,100%,30%), cmyk(100,33,0,40) */
	bluegreen: "#006969", /*rgb(0,105,105), hsl(180,100%,20.6%), cmyk(100,0,0,59) */
	black: "#000000",
	warmblack: "#191918",/*panatone "Black 6 C" rgb(25,25,24), hsl(60,2%,9.6%), cmyk(0,0,4,90)*/
	gray: "#484848",
	lightgray: "#888888",
	warmgray: "#4b4b44",
	warmlightgray: "#656560",
	white: "#ffffff",
	warmwhite: "#fcfbe3", /* rgb(252,251,227),hsl(57.6,80.6%,93.9%),cmyk(0,0,10,1)*/
	warmlightwhite: "#fdfdf3", /* panatone sort of "P 1-9 C"rgb(253,253,243),hsl(60,71.4%,97.3%),cmyk(0,0,4,1)*/
	warmlightwhiteveil: "rgba(253,253,243,0.8)",
	richblack: "#010203",
	richgray1: "#2a2a2b",
	richgray2: "#4f4f50",
	richgray3: "#777878",
	richgray4: "#a2a3a3",
	richgray5: "#d0d0d0",
	richgray6: "#ffffff",
	philippurple1: "#1A0D73",
	philippurple2: "#59518C",
	philippurple3: "#131159",
	philipgreen1: "#3E5915",
	philipgreen2: "#708C32",
};

const colorsets = {
	warmbw: [pigments.warmlightwhite, pigments.warmblack],
	warmbwgred: [pigments.red, pigments.warmlightwhite, pigments.warmgray,pigments.warmblack],
	warmbwred: [pigments.red, pigments.warmlightwhite, pigments.warmblack],
	warmbwyellow: [pigments.yellow, pigments.warmlightwhite, pigments.warmblack],
	warmbwb: [pigments.blue, pigments.warmlightwhite, pigments.warmblack],
	philip1: ["#1A0D73","#59518C","#3F665C","#3E5915","#131159","#708C32","#5C4B4A", "#6D9E98", "#6D1626", "#DFE1E6"],
	philip2: ["#1C17A6","#0A3EA6","#0B6BBF","#6A732C","#734002","#CE8F3C"] ,
	philip3: ["#1A0D73","#59518C","#3E5915","#131159","#708C32","#5C4B4A", "#6D9E98", "#6D1626", "#DFE1E6"],
};

module.exports = {pigments,colorsets};
