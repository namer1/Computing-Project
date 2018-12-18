var lvls = [{
    // 1st level
    sea: SEA_MORN, // morning image of the sea
    background1: BACKGROUND_MORN, // morning image of wave
    background2: BACKGROUND_MORN2, // morning image of wave
    day: MORN_OBJECTS, // morning sky objects
    wave: WAVE_CRUSH_MORN, // the image of the crushing wave
    shouldLoadWave: false, // tells the game to not load the the crushing wave
    time: 30, // how long the levels is
    waveRandom : 15000, // how much back the crushing wave should appear
    loadShadow : false, // tells the game if to load the shadows
}, {
    // 2nd level
    sea: SEA_NOON, // afternoon image of the sea
    background1: BACKGROUND_NOON, // afternoon image of wave
    background2: BACKGROUND_NOON2, // afternoon image of wave
    day: NOON_OBJECTS, // afternoon sky objects
    wave: WAVE_CRUSH_NOON, // the image of the crushing wave
    shouldLoadWave: true, // tells the game to not load the the crushing wave
    time: 60, // how long the levels is
    waveRandom : 10000, // how much back the crushing wave should appear
    loadShadow : false, // tells the game if to load the shadows
}, {
    // 3rd level
    sea: SEA_NIGHT, // night image of the sea
    background1: BACKGROUND_NIGHT, // night image of wave
    background2: BACKGROUND_NIGHT2, // night image of wave
    day: NIGHT_OBJECTS, // night sky objects
    wave: WAVE_CRUSH_NIGHT, // the image of the crushing wave
    shouldLoadWave: true, // tells the game to not load the the crushing wave
    time: 90, // how long the levels is
    waveRandom : 7500, // how much back the crushing wave should appear
    loadShadow : true, // tells the game if to load the shadows
}]