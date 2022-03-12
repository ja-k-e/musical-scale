var MEMO_ROOT_OFFSET = {};
var OCTAVES = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// prettier-ignore
var OCTAVE_STEP_FREQUENCIES = {
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
var STEPS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// prettier-ignore
export var STEP_NOTATIONS = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
// prettier-ignore
export var STEP_NOTATION_ALTERNATES = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];
// prettier-ignore
export var CHORD_TYPES = ["maj", "min", "maj7", "min7", "dom7", "aug", "dim"];
var buildNoteId = function (notation, octave) {
    return "".concat(notation).concat(octave);
};
/**
 * Turns an array of notes into the chords unique id.
 * @param notes
 * @returns key for the chord.
 */
export var chordKeyFromNotes = function (notes) {
    return notes
        .map(function (_a) {
        var notation = _a.notation;
        return notation;
    })
        .sort()
        .join("-");
};
/**
 * Builds a chord for a step and ChordType
 * @param step
 * @param type
 * @returns Chord
 */
export var chordFromStepAndType = function (step, type) {
    var typeLabel = {
        maj: "",
        min: "m",
        min7: "m7",
        maj7: "M7",
        aug: "+",
        dim: "°",
        dom7: "7",
    }[type];
    var chordFromNotes = function (notes) {
        var label = notes[0].notation + typeLabel;
        var notation = notes[0].notation;
        var key = chordKeyFromNotes(notes);
        return { key: key, label: label, notation: notation, type: type, notes: notes };
    };
    if (type === "maj7") {
        var notes = intervalNotes(step, 0, "maj");
        var indexMin = STEP_NOTATIONS.indexOf(notes[1].notation);
        var min = intervalNotes(indexMin, notes[1].octave, "min");
        return chordFromNotes(notes.concat(min[2]));
    }
    else if (type === "min7") {
        var notes = intervalNotes(step, 0, "min");
        var indexMin = STEP_NOTATIONS.indexOf(notes[1].notation);
        var min = intervalNotes(indexMin, notes[1].octave, "min");
        return chordFromNotes(notes.concat(min[2]));
    }
    else if (type === "dom7") {
        var notes = intervalNotes(step, 0, "maj");
        var indexMin = STEP_NOTATIONS.indexOf(notes[1].notation);
        var dim = intervalNotes(indexMin, notes[1].octave, "dim");
        return chordFromNotes(notes.concat(dim[2]));
    }
    return chordFromNotes(intervalNotes(step, 0, type));
};
var intervalNumeralFromType = function (step, type) {
    var notation = ["i", "ii", "iii", "iv", "v", "vi", "vii"][step];
    switch (type) {
        case "maj":
            return notation.toUpperCase();
        case "min":
            return notation;
        case "aug":
            return "".concat(notation.toUpperCase(), "+");
        case "dim":
            return "".concat(notation, "\u00B0");
    }
};
var intervalNameFromType = function (type) {
    switch (type) {
        case "maj":
            return "Major";
        case "min":
            return "Minor";
        case "aug":
            return "Augmented";
        case "dim":
            return "Diminished";
    }
};
export var intervalNotes = function (offset, octave, type) {
    // get the steps for this chord type
    var steps = {
        maj: [0, 4, 7],
        min: [0, 3, 7],
        dim: [0, 3, 6],
        aug: [0, 4, 8],
    }[type];
    var notes = [];
    var roots = STEP_NOTATIONS;
    for (var i = 0; i < steps.length; i++) {
        var step = steps[i];
        var idx = (offset + step) % roots.length;
        // relative octave to base
        var relative = offset + step > roots.length - 1 ? octave + 1 : octave;
        // define the note
        notes.push({ notation: roots[idx], octave: relative });
    }
    return notes;
};
var intervalsFromMode = function (mode) {
    switch (mode) {
        case "melodic":
            return ["min", "min", "aug", "maj", "maj", "dim", "dim"];
        case "harmonic":
            return ["min", "dim", "aug", "min", "maj", "maj", "dim"];
    }
};
var intervalsFromOffset = function (offset) {
    // this is ionian, each mode bumps up one offset.
    var base = [
        "maj",
        "min",
        "min",
        "maj",
        "maj",
        "min",
        "dim",
    ];
    var triads = [];
    for (var i = 0; i < base.length; i++) {
        triads.push(base[(i + offset) % base.length]);
    }
    return triads;
};
var modeDataFromMode = function (mode) {
    switch (mode) {
        case "major":
        case "ionian":
            return {
                name: "Ionian",
                steps: stepsFromIncrement([2, 2, 1, 2, 2, 2, 1]),
                intervals: intervalsFromOffset(0),
            };
        case "dorian":
            return {
                name: "Dorian",
                steps: stepsFromIncrement([2, 1, 2, 2, 2, 1, 2]),
                intervals: intervalsFromOffset(1),
            };
        case "phrygian":
            return {
                name: "Phrygian",
                steps: stepsFromIncrement([1, 2, 2, 2, 1, 2, 2]),
                intervals: intervalsFromOffset(2),
            };
        case "lydian":
            return {
                name: "Lydian",
                steps: stepsFromIncrement([2, 2, 2, 1, 2, 2, 1]),
                intervals: intervalsFromOffset(3),
            };
        case "mixolydian":
            return {
                name: "Mixolydian",
                steps: stepsFromIncrement([2, 2, 1, 2, 2, 1, 2]),
                intervals: intervalsFromOffset(4),
            };
        case "minor":
        case "aeolian":
            return {
                name: "Aeolian",
                steps: stepsFromIncrement([2, 1, 2, 2, 1, 2, 2]),
                intervals: intervalsFromOffset(5),
            };
        case "locrian":
            return {
                name: "Locrian",
                steps: stepsFromIncrement([1, 2, 2, 1, 2, 2, 2]),
                intervals: intervalsFromOffset(6),
            };
        case "melodic":
            return {
                name: "Melodic Minor",
                steps: stepsFromIncrement([2, 1, 2, 2, 2, 2, 1]),
                intervals: intervalsFromMode("melodic"),
            };
        case "harmonic":
            return {
                name: "Harmonic Minor",
                steps: stepsFromIncrement([2, 1, 2, 2, 1, 3, 1]),
                intervals: intervalsFromMode("harmonic"),
            };
    }
};
var rootOffset = function (root) {
    var memoized = MEMO_ROOT_OFFSET[root];
    if (memoized) {
        return memoized;
    }
    var idx = STEP_NOTATIONS.indexOf(root);
    var value = idx === -1
        ? STEP_NOTATION_ALTERNATES.indexOf(root)
        : idx;
    MEMO_ROOT_OFFSET[root] = value;
    return value;
};
var stepsFromIncrement = function (increments) {
    var steps = [0];
    var step = 0;
    for (var i = 0; i < increments.length - 1; i++) {
        step += increments[i];
        steps.push(step);
    }
    return steps;
};
var MusicalScaleNote = /** @class */ (function () {
    function MusicalScaleNote(_a) {
        var octave = _a.octave, step = _a.step;
        var notation = STEP_NOTATIONS[step];
        var alternate = STEP_NOTATION_ALTERNATES[step];
        this.frequency = OCTAVE_STEP_FREQUENCIES[octave][step];
        this.id = buildNoteId(notation, octave);
        this.index = step + octave * 12;
        this.notation = notation;
        this.notationAlternate =
            alternate === this.notation ? undefined : alternate;
        this.octave = octave;
        this.octaveIndex = step;
    }
    return MusicalScaleNote;
}());
var MusicalScaleInterval = /** @class */ (function () {
    function MusicalScaleInterval(step, offset, type) {
        var index = offset % STEP_NOTATIONS.length;
        var octave = offset > STEP_NOTATIONS.length - 1 ? 1 : 0;
        var notation = STEP_NOTATIONS[index];
        var alternate = STEP_NOTATION_ALTERNATES[index];
        this.label = "".concat(notation, " ").concat(type);
        this.notation = notation;
        this.notationAlternate = alternate === notation ? undefined : alternate;
        this.notes = intervalNotes(index, octave, type);
        this.octave = octave;
        this.step = step;
        this.meta = {
            name: intervalNameFromType(type),
            numeral: intervalNumeralFromType(step, type),
            type: type,
        };
    }
    return MusicalScaleInterval;
}());
var MusicalScale = /** @class */ (function () {
    function MusicalScale(params) {
        this.root = params.root;
        this.mode = params.mode;
        this.label = "";
        this.intervals = [];
        this.noteIds = [];
        this.update(params);
    }
    MusicalScale.prototype.update = function (_a) {
        var _this = this;
        var root = _a.root, mode = _a.mode;
        this.mode = mode;
        this.root = root;
        var _b = modeDataFromMode(mode), name = _b.name, steps = _b.steps, intervals = _b.intervals;
        this.label = "".concat(root, " ").concat(name);
        this.intervals = steps.map(function (step, index) {
            return new MusicalScaleInterval(index, rootOffset(_this.root) + step, intervals[index]);
        });
        this.noteIds = [];
        var lastOctave = OCTAVES[OCTAVES.length - 1];
        OCTAVES.forEach(function (mainOctave) {
            _this.intervals.forEach(function (_a) {
                var notation = _a.notation, octave = _a.octave;
                var relOctave = octave + mainOctave;
                if (relOctave <= lastOctave) {
                    _this.noteIds.push(buildNoteId(notation, relOctave));
                }
            });
        });
    };
    Object.defineProperty(MusicalScale.prototype, "notes", {
        /**
         * Array of playable notes in the scale.
         */
        get: function () {
            return this.noteIds.map(function (noteId) { return NOTES_LIBRARY[noteId]; });
        },
        enumerable: false,
        configurable: true
    });
    return MusicalScale;
}());
export default MusicalScale;
export var NOTES_LIBRARY = OCTAVES.reduce(function (library, octave) {
    STEPS.forEach(function (step) {
        var note = new MusicalScaleNote({ octave: octave, step: step });
        library[note.id] = note;
    });
    return library;
}, {});
