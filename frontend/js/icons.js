var i_arrowLong = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 0,50 H 100"/>
	<path vector-effect="non-scaling-stroke" d="M 64.644658,14.64466 100,50 64.644657,85.355339"/>
</svg>
`;

var i_arrowShort = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 50,0 V 100"/>
	<path vector-effect="non-scaling-stroke" d="M 0,50 50,0 100,50"/>
</svg>
`;

var i_verified = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" transform="matrix(1.1682754,0,0,1.1682754,25.420082,25.420082)" d="M -21.758636,21.039488 -11.523258,10.459212 -13.584921,-4.1166193 0.91460463,-6.6600372 7.8141433,-19.663948 21.039489,-13.199009 34.26484,-19.663946 41.164374,-6.6600379 55.663902,-4.1166161 53.602237,10.459211 63.837616,21.039492 53.602237,31.619767 55.6639,46.195599 41.164375,48.739017 34.264836,61.742927 21.03949,55.277988 7.8141395,61.742926 0.91460568,48.739017 -13.584923,46.195596 -11.523257,31.619768 Z"/>
	<path vector-effect="non-scaling-stroke" d="M 71.213205,35.857875 42.928934,64.142146 28.786797,50"/>
</svg>
`;

var i_box = `
<svg viewBox="0 0 100 77.717285" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 0,28.857422 V 48.858398 H 0.03222656 C 16.693711,58.477818 33.354246,68.097667 50.015625,77.717285 66.677106,68.097869 83.339111,58.478017 100,48.858398 V 28.857422"/>
	<path vector-effect="non-scaling-stroke" d="M 50.015865,0 C 33.354371,9.6192922 16.692924,19.238662 0.03152106,28.85811 16.693022,38.477539 33.354469,48.097057 50.015865,57.71668 66.677363,48.097259 83.33881,38.477738 100,28.85811 83.33891,19.238465 66.677463,9.6190952 50.015865,0 Z"/>
	<path vector-effect="non-scaling-stroke" d="m 50.015865,57.71668 0,20"/>
</svg>
`;

/* var i_globe = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 100,50 A 50,50 0 0 1 50,100 50,50 0 0 1 0,50 50,50 0 0 1 50,0 50,50 0 0 1 100,50 Z"/>
	<path vector-effect="non-scaling-stroke" d="m 12.863404,16.581638 c 9.150047,5.013883 22.386093,8.166277 37.111802,8.166277 14.752904,0 28.009579,-3.164432 37.16139,-8.194463"/>
	<path vector-effect="non-scaling-stroke" d="M 0,50 H 100"/>
	<path vector-effect="non-scaling-stroke" d="M 50,0 V 100"/>
	<path vector-effect="non-scaling-stroke" d="M 87.136602,83.418293 C 77.986545,78.404407 64.75051,75.252016 50.024802,75.252015 35.2719,75.252014 22.015214,78.416464 12.863397,83.446472"/>
	<path vector-effect="non-scaling-stroke" d="M 74.747984,50 A 24.747984,50 0 0 1 50,100 24.747984,50 0 0 1 25.252016,50 24.747984,50 0 0 1 50,0 24.747984,50 0 0 1 74.747984,50 Z"/>
</svg>
`; */
var i_globe = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 100,50 A 50,50 0 0 1 50,100 50,50 0 0 1 0,50 50,50 0 0 1 50,0 50,50 0 0 1 100,50 Z"/>
	<path vector-effect="non-scaling-stroke" d="M 0,50 H 100"/>
	<path vector-effect="non-scaling-stroke" d="M 50,0 V 100"/>
	<path vector-effect="non-scaling-stroke" d="M 74.747984,50 A 24.747984,50 0 0 1 50,100 24.747984,50 0 0 1 25.252016,50 24.747984,50 0 0 1 50,0 24.747984,50 0 0 1 74.747984,50 Z"/>
</svg>
`;

var i_bot = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path d="M 18 18 L 18 82.000488 L 82.000488 82.000488 L 82.000488 18 L 18 18 z M 27.999023 67.999512 A 3.999722 4 0 0 1 31.999512 72 A 3.999722 4 0 0 1 27.999023 76.000488 A 3.999722 4 0 0 1 24 72 A 3.999722 4 0 0 1 27.999023 67.999512 z "/>
	<path d="m 36.500366,0 v 7.000488 h -1.750488 v 6.999024 h 7.000488 V 7.000488 H 39.999878 V 0 Z"/>
	<path d="m 48.250244,0 v 7.000488 h -1.750488 v 6.999024 h 7.000488 V 7.000488 H 51.749756 V 0 Z"/>
	<path d="m 60.000122,0 v 7.000488 h -1.750488 v 6.999024 h 7.000488 V 7.000488 H 63.499634 V 0 Z"/>
	<path d="M 24.750488,0 V 7.000488 H 23 v 6.999024 h 7.000488 V 7.000488 H 28.25 V 0 Z"/>
	<path d="m 71.75,0 v 7.000488 h -1.750488 v 6.999024 H 77 V 7.000488 H 75.249512 V 0 Z"/>
	<path d="m 63.499634,100 v -7.000485 h 1.750488 v -6.999024 h -7.000488 v 6.999024 h 1.750488 V 100 Z"/>
	<path d="m 51.749756,100 v -7.000485 h 1.750488 v -6.999024 h -7.000488 v 6.999024 h 1.750488 V 100 Z"/>
	<path d="m 39.999878,100 v -7.000485 h 1.750488 v -6.999024 h -7.000488 v 6.999024 h 1.750488 V 100 Z"/>
	<path d="M 75.249512,100 V 92.999515 H 77 v -6.999024 h -7.000488 v 6.999024 H 71.75 V 100 Z"/>
	<path d="m 28.25,100 v -7.000485 h 1.750488 V 86.000491 H 23 v 6.999024 h 1.750488 V 100 Z"/>
	<path d="m 99.999998,36.500361 h -7.00049 v -1.750488 h -6.99902 v 7.000488 h 6.99902 v -1.750488 h 7.00049 z"/>
	<path d="m 99.999998,48.250239 h -7.00049 v -1.750488 h -6.99902 v 7.000488 h 6.99902 v -1.750488 h 7.00049 z"/>
	<path d="m 99.999998,60.000124 h -7.00049 v -1.750495 h -6.99902 v 7.000495 h 6.99902 v -1.75049 h 7.00049 z"/>
	<path d="m 99.999998,24.750483 h -7.00049 v -1.750487 h -6.99902 v 7.000487 h 6.99902 v -1.750488 h 7.00049 z"/>
	<path d="m 99.999998,71.750004 h -7.00049 v -1.75049 h -6.99902 v 7.00049 h 6.99902 v -1.75049 h 7.00049 z"/>
	<path d="m 2e-6,63.499634 h 7.000485 v 1.75049 h 6.999024 V 58.249629 H 7.000487 v 1.750495 H 2e-6 Z"/>
	<path d="m 2e-6,51.749751 h 7.000485 v 1.750488 h 6.999024 V 46.499751 H 7.000487 v 1.750488 H 2e-6 Z"/>
	<path d="m 2e-6,39.999873 h 7.000485 v 1.750488 h 6.999024 V 34.749873 H 7.000487 v 1.750488 H 2e-6 Z"/>
	<path d="m 2e-6,75.249514 h 7.000485 v 1.75049 h 6.999024 v -7.00049 H 7.000487 v 1.75049 H 2e-6 Z"/>
	<path d="m 2e-6,28.249995 h 7.000485 v 1.750488 h 6.999024 V 22.999996 H 7.000487 v 1.750487 H 2e-6 Z"/>
</svg>
`;

var i_exit = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="m 70,0 h 30 V 100 H 70"/>
	<path vector-effect="non-scaling-stroke" d="M 0,50 H 70 Z"/>
	<path vector-effect="non-scaling-stroke" d="M 35,15 0,50 35,85"/>
</svg>
`;

var i_arrowCircle = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 94.426976,0 V 28.572713 H 65.85426"/>
	<path vector-effect="non-scaling-stroke" d="M 94.426976,28.572713 C 81.279185,5.7990385 52.158753,-2.003757 29.385595,11.144929 6.6136397,24.29351 -1.1879071,53.412695 11.96023,76.184908 25.107474,98.957637 54.2262,106.76089 76.999186,93.614095 84.241316,89.426752 90.252364,83.405213 94.427071,76.155791"/>
</svg>
`;

var i_flag = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 10.5,100 V 0"/>
	<path vector-effect="non-scaling-stroke" d="m 10.5,67.046036 c 5.680336,-4.161433 12.581375,-6.425286 19.681641,-6.454869 7.146646,0.001 14.100412,2.266376 19.817871,6.454869 5.717455,4.188492 12.671217,6.452429 19.817871,6.453476 7.100264,-0.02957 14.002771,-2.292044 19.683105,-6.453476 V 9.9543811 C 83.820152,14.115813 76.917647,16.378284 69.817383,16.407857 62.670736,16.406812 55.716969,14.142874 49.999512,9.9543811 44.282054,5.7658885 37.328287,3.5005584 30.181641,3.4995117 23.081376,3.5290852 16.180337,5.7929499 10.5,9.9543811"/>
</svg>
`;

var i_tilebag = `
<svg viewBox="0 0 82.02623 91.807907" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path id="tilebag-bg" d="m 32.980355,-6e-6 c -1.09687,-5.8e-4 -2.08247,0.29239 -2.8789,1.144531 -0.92139,0.985838 -1.08762,2.460301 -0.80079,4.148437 h -0.0039 c 0,0 -5.32336,-1.290254 -6.50781,1.875 -1.72788,4.6175 4.81469,7.532902 8.91015,12.210938 -1.7149,0 -3.0957,1.380808 -3.0957,3.095703 0,1.684444 1.33339,3.042003 3.00586,3.089843 -5.83738,2.596651 -15.37269,11.509847 -21.3457,21.396828 -5.12111,8.476824 -8.18055,21.099476 -5.95704,29.84375 h -0.00195 c -1.23594,2.352265 -5.81682,5.170385 -3.79883,9.214844 1.8486,3.704915 7.70406,1.740951 14.32618,2.332031 6.62211,0.591082 13.9819,3.455078 26.19921,3.455078 6.90447,0.03107 13.95654,-0.8242 20.00977,-2.662109 l 0.02539,-0.0039 c 10.92893,-2.513124 18.2931,1.460139 20.49023,-3.267579 1.83318,-3.944541 -2.20067,-6.969109 -3.5957,-8.865234 1.02452,-8.056589 0.41702,-19.156639 -6.16211,-30.046875 -5.97313,-9.887184 -15.50835,-18.800373 -21.3457,-21.396828 1.67273,-0.04755 3.00586,-1.405213 3.00586,-3.089843 0,-1.714894 -1.38081,-3.095703 -3.09571,-3.095703 4.09549,-4.678037 10.63805,-7.593438 8.91016,-12.210938 -1.18445,-3.165254 -6.50586,-1.875 -6.50586,-1.875 h -0.0059 c 0.28671,-1.688136 0.12061,-3.162599 -0.80078,-4.148437 -2.5486,-2.726871 -7.02664,0.277343 -10.92969,0.277343 -2.68332,0 -5.63766,-1.420614 -8.05078,-1.421874 z"/>
	<path vector-effect="non-scaling-stroke" d="m 37.270228,25.57068 -2.988272,6.033744"/>
	<path vector-effect="non-scaling-stroke" d="M 31.700043,19.379699 C 27.604552,14.70165 21.061847,11.785446 22.789728,7.1679383 c 1.18445,-3.16527 6.506899,-1.874075 6.506899,-1.874075"/>
	<path vector-effect="non-scaling-stroke" d="m 41.031707,25.57068 h 9.331664 c 1.714902,0 3.095491,-1.380589 3.095491,-3.095491 0,-1.7149 -1.380589,-3.095489 -3.095491,-3.095489 h -9.331664 m 0,6.19098 h -9.331664 c -1.714902,0 -3.095491,-1.380589 -3.095491,-3.095491 0,-1.714901 1.380589,-3.09549 3.095491,-3.09549 h 9.331664"/>
	<path vector-effect="non-scaling-stroke" d="m 49.928344,25.576512 c 5.776774,2.294722 15.718676,11.202015 21.870371,21.384762 6.579123,10.890258 7.187346,21.990105 6.162827,30.04671"/>
	<path vector-effect="non-scaling-stroke" d="m 77.961542,77.007984 c 1.395034,1.896129 5.42859,4.920551 3.59541,8.8651 -2.197152,4.727726 -9.561216,0.753841 -20.490173,3.266969 M 73.449123,82.418867 C 66.884035,88.94173 53.705342,91.864126 41.031707,91.80709 M 4.3057529,76.804103 c -1.235938,2.352269 -5.817305,5.171873 -3.79929,9.21634 1.848596,3.704923 7.702669,1.739123 14.3247931,2.330205 6.622124,0.591082 13.983107,3.456444 26.200451,3.456444"/>
	<path vector-effect="non-scaling-stroke" d="m 44.793186,25.57068 2.988272,6.033744"/>
	<path vector-effect="non-scaling-stroke" d="m 45.436896,19.3797 c 0,0 10.6,-13.8751767 6.524651,-18.2356167 -2.548596,-2.726883 -7.026788,0.276981 -10.92984,0.276981 M 36.626518,19.379699 c 0,0 -10.6,-13.8751757 -6.524651,-18.2356157 2.548596,-2.726883 7.026788,0.27698 10.92984,0.27698"/>
	<path vector-effect="non-scaling-stroke" d="M 32.139394,25.574795 C 26.363259,27.866787 16.41793,36.775985 10.264699,46.961274 3.6855759,57.851532 0.5076869,75.588001 7.5648229,83.147247"/>
	<path vector-effect="non-scaling-stroke" d="m 50.363371,19.3797 c 4.095491,-4.67805 10.638196,-7.594254 8.910315,-12.2117617 -1.18445,-3.165269 -6.506899,-1.874075 -6.506899,-1.874075"/>
	<path vector-effect="non-scaling-stroke" d="M 41.031707,13.030591 V 19.3797"/>
</svg>
`;

var i_shuffle = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="m 85,60 15,15 -15,15"/>
	<path vector-effect="non-scaling-stroke" d="m 85,10 15,15 -15,15"/>
	<path vector-effect="non-scaling-stroke" d="M 0,75 H 33.333333 L 66.666666,25 h 33.333333"/>
	<path vector-effect="non-scaling-stroke" d="M 0,25 H 33.333333 L 66.666666,75 H 100"/>
</svg>
`;

var i_cross = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 0,0 100,100"/>
	<path vector-effect="non-scaling-stroke" d="M 100,0 0,100"/>
</svg>
`;

var i_skip = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 0,0 V 100 L 50,50 Z"/>
	<path vector-effect="non-scaling-stroke" d="M 50,0 V 100 l 50,-50 z"/>
	<path vector-effect="non-scaling-stroke" d="M 100,0 V 100"/>
</svg>
`;

var i_exchange = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 0,75 H 100"/>
	<path vector-effect="non-scaling-stroke" d="M 25,50 0,75 25,100"/>
	<path vector-effect="non-scaling-stroke" d="M 100,25 H 0"/>
	<path vector-effect="non-scaling-stroke" d="M 75,50 100,25 75,0"/>
</svg>
`;

var i_play = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" transform="matrix(1.4908027,0,0,1.4908027,-3.883816,-11.366762)" d="m 65.189772,41.16357 -58.0912174,33.53898 0,-67.0779594 z"/>
</svg>
`;

var i_star = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 50,2.4477542 34.549804,33.754394 0,38.774415 25,63.143554 19.098633,97.552735 50,81.306152 80.901855,97.552735 75,63.143554 100,38.774415 65.450684,33.754394 Z"/>
</svg>
`;

var i_pencil = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 77.373047,0 8.2822266,69.09082 0,100 30.909668,91.718262 100,22.627441 Z"/>
	<path vector-effect="non-scaling-stroke" d="M 30.905611,91.719125 C 27.945914,80.679629 19.323046,72.056761 8.2835504,69.097065"/>
	<path vector-effect="non-scaling-stroke" d="M 63.938965,13.435547 86.564941,36.061524 Z" />
</svg>
`;

var i_rematch = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="M 94.426976,0 V 28.572713 H 65.85426"/>
	<path vector-effect="non-scaling-stroke" d="M 94.426976,28.572713 C 81.279185,5.7990385 52.158753,-2.003757 29.385595,11.144929 6.6136397,24.29351 -1.1879071,53.412695 11.96023,76.184908 25.107474,98.957637 54.2262,106.76089 76.999186,93.614095 84.241316,89.426752 90.252364,83.405213 94.427071,76.155791"/>
	<path vector-effect="non-scaling-stroke" d="m 70.905445,52 -30.31089,17.5 v -35 z"/>
</svg>
`;

var i_download = `
<svg viewBox="0 0 100 100" version="1.1" xmlns="http://www.w3.org/2000/svg">
	<path vector-effect="non-scaling-stroke" d="m 100,70 v 30 H 0 V 70"/>
	<path vector-effect="non-scaling-stroke" d="M 50,70 V 0 Z"/>
	<path vector-effect="non-scaling-stroke" d="M 15,35 50,70 85,35"/>
</svg>
`;



$(`.btn[class*="back-btn"]`).prepend(i_arrowLong);
$(`.btn[class*="continue-btn"]`).append(i_arrowLong);

// Title screen
$(".title-play-btn").append(i_arrowLong);

// Edition screen
$(".edition-icon-info-row").eq(0).prepend(i_verified);
$(".edition-icon-info-row").eq(1).prepend(i_box);
$(".edition-icon-info-row").eq(2).prepend(i_globe);

// Players screen
$(".player-intro-tilebag").prepend(i_tilebag);
$(".player-intro-edit-icon").append(i_pencil);
$(".bot-intro .player-icon").append(i_bot);

// Play screen
$(".bot-score-box .player-icon").append(i_bot);
$(".leave-btn").prepend(i_exit);
$(".restart-btn").prepend(i_arrowCircle);
$(".resign-btn").prepend(i_flag);
$(".shuffle-btn").prepend(i_shuffle);
$(".recall-btn").prepend(i_cross);
$(".skip-btn").prepend(i_skip);
$(".exchange-btn").prepend(i_exchange);
$(".play-btn").prepend(i_play);
$(".tilebag-icon").append(i_tilebag);
$(".tilebag-scroll-text").append(i_arrowLong);
$(".play-history-send-btn").append(i_arrowShort);

// End screen
$(".bot-end .player-icon").append(i_bot);
$(".rematch-btn").prepend(i_arrowCircle);
$(".new-edition-btn").prepend(i_box);
$(".save-results-btn").prepend(i_download);