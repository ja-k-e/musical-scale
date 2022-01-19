var Note = /** @class */ (function () {
    function Note(_a) {
        var frequency = _a.frequency, octave = _a.octave, step = _a.step;
        this.frequency = frequency;
        this.octave = octave;
        this.step = step;
        this.notation = Note.STEP_NOTATIONS[step];
        this.notationAlternate = Note.STEP_NOTATION_ALTERNATES[step];
    }
    Object.defineProperty(Note, "STEP_NOTATIONS", {
        get: function () {
            return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Note, "STEP_NOTATION_ALTERNATES", {
        get: function () {
            var und = undefined;
            return [und, "Db", und, "Eb", und, und, "Gb", und, "Ab", und, "Bb", "Cb"];
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Note.prototype, "id", {
        get: function () {
            return "".concat(this.notation).concat(this.octave);
        },
        enumerable: false,
        configurable: true
    });
    return Note;
}());
// prettier-ignore
var LIB_NOTES = [
    "C0", "C#0", "D0", "D#0", "E0", "F0", "F#0", "G0", "G#0", "A0", "A#0", "B0",
    "C1", "C#1", "D1", "D#1", "E1", "F1", "F#1", "G1", "G#1", "A1", "A#1", "B1",
    "C2", "C#2", "D2", "D#2", "E2", "F2", "F#2", "G2", "G#2", "A2", "A#2", "B2",
    "C3", "C#3", "D3", "D#3", "E3", "F3", "F#3", "G3", "G#3", "A3", "A#3", "B3",
    "C4", "C#4", "D4", "D#4", "E4", "F4", "F#4", "G4", "G#4", "A4", "A#4", "B4",
    "C5", "C#5", "D5", "D#5", "E5", "F5", "F#5", "G5", "G#5", "A5", "A#5", "B5",
    "C6", "C#6", "D6", "D#6", "E6", "F6", "F#6", "G6", "G#6", "A6", "A#6", "B6",
    "C7", "C#7", "D7", "D#7", "E7", "F7", "F#7", "G7", "G#7", "A7", "A#7", "B7",
    "C8", "C#8", "D8", "D#8", "E8", "F8", "F#8", "G8", "G#8", "A8", "A#8", "B8",
];
// prettier-ignore
var LIB_HZ = [
    16.352, 17.324, 18.354, 19.445, 20.602, 21.827, 23.125, 24.5, 25.957, 27.5, 29.135, 30.868,
    32.703, 34.648, 36.708, 38.891, 41.203, 43.654, 46.249, 48.999, 51.913, 55, 58.27, 61.735,
    65.406, 69.296, 73.416, 77.782, 82.407, 87.307, 92.499, 97.999, 103.826, 110, 116.541, 123.471,
    130.813, 138.591, 146.832, 155.563, 164.814, 174.614, 184.997, 195.998, 207.652, 220, 233.082, 246.942,
    261.626, 277.183, 293.665, 311.127, 329.628, 349.228, 369.994, 391.995, 415.305, 440, 466.164, 493.883,
    523.251, 554.365, 587.33, 622.254, 659.255, 698.456, 739.989, 783.991, 830.609, 880, 932.328, 987.767,
    1046.502, 1108.731, 1174.659, 1244.508, 1318.51, 1396.913, 1479.978, 1567.982, 1661.219, 1760, 1864.655, 1975.533,
    2093.005, 2217.461, 2349.318, 2489.016, 2637.02, 2793.826, 2959.955, 3135.963, 3322.438, 3520, 3729.31, 3951.066,
    4186.01, 4434.92, 4698.63, 4978.03, 5274.04, 5587.65, 5919.91, 6271.93, 6644.88, 7040.00, 7458.62, 7902.13
];
// prettier-ignore
export var LIB_OCTAVE_NOTE_FREQ = {
    0: { 0: 16.352, 1: 17.324, 2: 18.354, 3: 19.445, 4: 20.602, 5: 21.827, 6: 23.125, 7: 24.5, 8: 25.957, 9: 27.5, 10: 29.135, 11: 30.868, },
    1: { 0: 32.703, 1: 34.648, 2: 36.708, 3: 38.891, 4: 41.203, 5: 43.654, 6: 46.249, 7: 48.999, 8: 51.913, 9: 55, 10: 58.27, 11: 61.735, },
    2: { 0: 65.406, 1: 69.296, 2: 73.416, 3: 77.782, 4: 82.407, 5: 87.307, 6: 92.499, 7: 97.999, 8: 103.826, 9: 110, 10: 116.541, 11: 123.471, },
    3: { 0: 130.813, 1: 138.591, 2: 146.832, 3: 155.563, 4: 164.814, 5: 174.614, 6: 184.997, 7: 195.998, 8: 207.652, 9: 220, 10: 233.082, 11: 246.942, },
    4: { 0: 261.626, 1: 277.183, 2: 293.665, 3: 311.127, 4: 329.628, 5: 349.228, 6: 369.994, 7: 391.995, 8: 415.305, 9: 440, 10: 466.164, 11: 493.883, },
    5: { 0: 523.251, 1: 554.365, 2: 587.33, 3: 622.254, 4: 659.255, 5: 698.456, 6: 739.989, 7: 783.991, 8: 830.609, 9: 880, 10: 932.328, 11: 987.767, },
    6: { 0: 1046.502, 1: 1108.731, 2: 1174.659, 3: 1244.508, 4: 1318.51, 5: 1396.913, 6: 1479.978, 7: 1567.982, 8: 1661.219, 9: 1760, 10: 1864.655, 11: 1975.533, },
    7: { 0: 2093.005, 1: 2217.461, 2: 2349.318, 3: 2489.016, 4: 2637.02, 5: 2793.826, 6: 2959.955, 7: 3135.963, 8: 3322.438, 9: 3520, 10: 3729.31, 11: 3951.066, },
    8: { 0: 4186.01, 1: 4434.92, 2: 4698.63, 3: 4978.03, 4: 5274.04, 5: 5587.65, 6: 5919.91, 7: 6271.93, 8: 6644.88, 9: 7040, 10: 7458.62, 11: 7902.13, },
};
var NOTES = {};
var MusicalScale = /** @class */ (function () {
    function MusicalScale(params, progression, onUpdate) {
        if (params === void 0) { params = { key: "C", mode: "major" }; }
        this.library = this.loadLibrary();
        this.onUpdate = onUpdate;
        this.progression = progression;
        this.updateScale(params);
    }
    MusicalScale.prototype.updateScale = function (params) {
        if (this.errors(params)) {
            return;
        }
        this.loadScale(params);
        localStorage.setItem("musical-scale", JSON.stringify(params));
        if (this.onUpdate) {
            this.onUpdate(this);
        }
    };
    MusicalScale.prototype.loadScale = function (params) {
        // clean up the key param
        this.key = this.paramKey(params.key);
        // set the mode
        this.mode = params.mode;
        this.notes = [];
        this.noteNames = [];
        this.scale = this.library.scales[this.paramMode(this.mode)];
        this.chordIndexes = {};
        // notes to cycle through
        var keys = this.library.keys;
        // starting index for key loop
        var offset = keys.indexOf(this.key);
        for (var s = 0; s < this.progression.length; s++) {
            var index = this.progression[s];
            var step = this.scale.steps[index];
            var idx = (offset + step) % keys.length;
            // relative octave. 0 = same bb root, 1 = next ocave up
            var octave = offset + step > keys.length - 1 ? 1 : 0;
            // generate the relative triads
            var triad = this.generateTriad(index, idx, octave, this.scale.triads[index]);
            // save the reference to the chord
            var chordKey = triad.notes
                .map(function (_a) {
                var note = _a.note;
                return note;
            })
                .sort()
                .join("");
            this.chordIndexes[chordKey] = this.notes.length;
            // define the note
            var note = {
                name: "".concat(keys[idx]).concat(triad.type),
                step: index,
                note: keys[idx],
                octave: octave,
                triad: triad,
            };
            this.noteNames.push(keys[idx]);
            // add the note
            this.notes.push(note);
        }
    };
    // create a chord of notes based on chord type
    MusicalScale.prototype.generateTriad = function (s, offset, octave, t) {
        // get the steps for this chord type
        var steps = this.library.triads[t];
        // instantiate the chord
        var chord = {
            type: t,
            interval: this.intervalFromType(s, t),
            notes: [],
        };
        // load the notes
        var keys = this.library.keys;
        for (var i = 0; i < steps.length; i++) {
            var step = steps[i];
            var idx = (offset + step) % keys.length;
            // relative octave to base
            var relative = offset + step > keys.length - 1 ? octave + 1 : octave;
            // define the note
            chord.notes.push({ note: keys[idx], octave: relative });
        }
        return chord;
    };
    // proper interval notation from the step and type
    MusicalScale.prototype.intervalFromType = function (step, type) {
        var steps = "i ii iii iv v vi vii".split(" ");
        var s = steps[step];
        switch (type) {
            case "maj":
                return s.toUpperCase();
            case "min":
                return s;
            case "aug":
                return s.toUpperCase() + "+";
            case "dim":
                return s + "°";
        }
        return s;
    };
    MusicalScale.prototype.errors = function (params) {
        if (this.library.keys.indexOf(params.key) === -1) {
            if (Object.keys(this.library.flatSharp).indexOf(params.key) === -1) {
                console.error("".concat(params.key, " is an invalid key. ").concat(this.library.keys.join(", ")));
                return true;
            }
        }
        else if (this.library.modes.indexOf(params.mode) === -1) {
            console.error("".concat(params.mode, " is an invalid mode. ").concat(this.library.modes.join(", ")));
            return true;
        }
        else {
            return false;
        }
    };
    MusicalScale.prototype.loadLibrary = function () {
        return {
            keys: "C C# D D# E F F# G G# A A# B".split(" "),
            scales: {
                ion: {
                    name: "Ionian",
                    steps: this.generateSteps("W W H W W W H"),
                    dominance: [3, 0, 1, 0, 2, 0, 1],
                    triads: this.generateTriads(0),
                },
                dor: {
                    name: "Dorian",
                    steps: this.generateSteps("W H W W W H W"),
                    dominance: [3, 0, 1, 0, 2, 2, 1],
                    triads: this.generateTriads(1),
                },
                phr: {
                    name: "Phrygian",
                    steps: this.generateSteps("H W W W H W W"),
                    dominance: [3, 2, 1, 0, 2, 0, 1],
                    triads: this.generateTriads(2),
                },
                lyd: {
                    name: "Lydian",
                    steps: this.generateSteps("W W W H W W H"),
                    dominance: [3, 0, 1, 2, 2, 0, 1],
                    triads: this.generateTriads(3),
                },
                mix: {
                    name: "Mixolydian",
                    steps: this.generateSteps("W W H W W H W"),
                    dominance: [3, 0, 1, 0, 2, 0, 2],
                    triads: this.generateTriads(4),
                },
                aeo: {
                    name: "Aeolian",
                    steps: this.generateSteps("W H W W H W W"),
                    dominance: [3, 0, 1, 0, 2, 0, 1],
                    triads: this.generateTriads(5),
                },
                loc: {
                    name: "Locrian",
                    steps: this.generateSteps("H W W H W W W"),
                    dominance: [3, 0, 1, 0, 3, 0, 0],
                    triads: this.generateTriads(6),
                },
                mel: {
                    name: "Melodic Minor",
                    steps: this.generateSteps("W H W W W W H"),
                    dominance: [3, 0, 1, 0, 3, 0, 0],
                    triads: "min min aug maj maj dim dim".split(" "),
                },
                har: {
                    name: "Harmonic Minor",
                    steps: this.generateSteps("W H W W H WH H"),
                    dominance: [3, 0, 1, 0, 3, 0, 0],
                    triads: "min dim aug min maj maj dim".split(" "),
                },
            },
            modes: [
                "ionian",
                "dorian",
                "phrygian",
                "lydian",
                "mixolydian",
                "aeolian",
                "locrian",
                "major",
                "minor",
                "melodic",
                "harmonic",
            ],
            flatSharp: {
                Cb: "B",
                Db: "C#",
                Eb: "D#",
                Fb: "E",
                Gb: "F#",
                Ab: "G#",
                Bb: "A#",
            },
            triads: {
                maj: [0, 4, 7],
                min: [0, 3, 7],
                dim: [0, 3, 6],
                aug: [0, 4, 8],
            },
        };
    };
    MusicalScale.prototype.paramMode = function (mode) {
        return {
            minor: "aeo",
            major: "ion",
            ionian: "ion",
            dorian: "dor",
            phrygian: "phr",
            lydian: "lyd",
            mixolydian: "mix",
            aeolian: "aeo",
            locrian: "loc",
            melodic: "mel",
            harmonic: "har",
        }[mode];
    };
    MusicalScale.prototype.paramKey = function (key) {
        if (this.library.flatSharp[key]) {
            return this.library.flatSharp[key];
        }
        return key;
    };
    MusicalScale.prototype.generateTriads = function (offset) {
        // this is ionian, each mode bumps up one offset.
        var base = "maj min min maj maj min dim".split(" ");
        var triads = [];
        for (var i = 0; i < base.length; i++) {
            triads.push(base[(i + offset) % base.length]);
        }
        return triads;
    };
    MusicalScale.prototype.generateSteps = function (stepsString) {
        var arr = stepsString.split(" ");
        var steps = [0];
        var step = 0;
        for (var i = 0; i < arr.length - 1; i++) {
            var inc = 0;
            switch (arr[i]) {
                case "W":
                    inc = 2;
                    break;
                case "H":
                    inc = 1;
                    break;
                case "WH":
                    inc = 3;
                    break;
            }
            step += inc;
            steps.push(step);
        }
        return steps;
    };
    MusicalScale.frequencyFromNote = function (note, octave) {
        return LIB_NOTE_FREQ["".concat(note).concat(octave)] || 0;
    };
    MusicalScale.noteFromFrequency = function (freq, notes) {
        if (NOTE_FROM_FREQ[freq]) {
            return NOTE_FROM_FREQ[freq];
        }
        var index = 0;
        while ((LIB_HZ[index + 1] < freq && index < LIB_HZ.length) ||
            !notes.includes(LIB_NOTES[index].replace(/\d/, ""))) {
            index++;
        }
        var noteString = LIB_NOTES[index];
        var note = noteString.replace(/\d/, "");
        var octave = parseInt(noteString.charAt(noteString.length - 1));
        NOTE_FROM_FREQ[freq] = { note: note, octave: octave };
        return { note: note, octave: octave };
    };
    return MusicalScale;
}());
export default MusicalScale;
