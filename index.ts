type IntervalName = "Augmented" | "Diminished" | "Major" | "Minor";
type IntervalType = "aug" | "dim" | "maj" | "min";
// prettier-ignore
type Mode = "ionian" | "dorian" | "phrygian" | "lydian" | "mixolydian" | "aeolian" | "locrian" | "melodic" | "harmonic";
type ModeVanity = "major" | "minor";
// prettier-ignore
type Notation = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";
// prettier-ignore
type NotationAlternate = "C" | "Db" | "D" | "Eb" | "E" | "F" | "Gb" | "G" | "Ab" | "A" | "Bb" | "B";

interface MusicalScaleParams {
  /**
   * The root of the scale. Can be alternative format (flat instead of sharp).
   */
  root: Notation | NotationAlternate;
  /**
   * The scale mode, can provide vanity modes (major, minor).
   */
  mode: Mode | ModeVanity;
}

interface IntervalNote {
  /**
   * Notation for the note
   */
  notation: Notation;
  /**
   * Octave relative to the first interval's root octave.
   * 0 | 1 | 2
   */
  octave: number;
}

type IntervalNotes = IntervalNote[];

const MEMO_ROOT_OFFSET: { [K in Notation | NotationAlternate]?: number } = {};

const OCTAVES: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8];
// prettier-ignore
const OCTAVE_STEP_FREQUENCIES: {
  [K in number]: { [K in number]: number }
} ={
    0: { 0: 16.352, 1: 17.324, 2: 18.354, 3: 19.445, 4: 20.602, 5: 21.827, 6: 23.125, 7: 24.5, 8: 25.957, 9: 27.5, 10: 29.135, 11: 30.868, },
    1: { 0: 32.703, 1: 34.648, 2: 36.708, 3: 38.891, 4: 41.203, 5: 43.654, 6: 46.249, 7: 48.999, 8: 51.913, 9: 55, 10: 58.27, 11: 61.735, },
    2: { 0: 65.406, 1: 69.296, 2: 73.416, 3: 77.782, 4: 82.407, 5: 87.307, 6: 92.499, 7: 97.999, 8: 103.826, 9: 110, 10: 116.541, 11: 123.471,  },
    3: { 0: 130.813, 1: 138.591, 2: 146.832, 3: 155.563, 4: 164.814, 5: 174.614, 6: 184.997, 7: 195.998, 8: 207.652, 9: 220, 10: 233.082, 11: 246.942, },
    4: { 0: 261.626, 1: 277.183, 2: 293.665, 3: 311.127, 4: 329.628, 5: 349.228, 6: 369.994, 7: 391.995, 8: 415.305, 9: 440, 10: 466.164, 11: 493.883, },
    5: { 0: 523.251, 1: 554.365, 2: 587.33, 3: 622.254, 4: 659.255, 5: 698.456, 6: 739.989, 7: 783.991, 8: 830.609, 9: 880, 10: 932.328, 11: 987.767, },
    6: { 0: 1046.502, 1: 1108.731, 2: 1174.659, 3: 1244.508, 4: 1318.51, 5: 1396.913, 6: 1479.978, 7: 1567.982, 8: 1661.219, 9: 1760, 10: 1864.655, 11: 1975.533, },
    7: { 0: 2093.005, 1: 2217.461, 2: 2349.318, 3: 2489.016, 4: 2637.02, 5: 2793.826, 6: 2959.955, 7: 3135.963, 8: 3322.438, 9: 3520, 10: 3729.31, 11: 3951.066, },
    8: { 0: 4186.01, 1: 4434.92, 2: 4698.63, 3: 4978.03, 4: 5274.04, 5: 5587.65, 6: 5919.91, 7: 6271.93, 8: 6644.88, 9: 7040, 10: 7458.62, 11: 7902.13, },
}

const STEPS: number[] = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
// prettier-ignore
const STEP_NOTATIONS: Notation[] = ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
// prettier-ignore
const STEP_NOTATION_ALTERNATES: NotationAlternate[] = ["C", "Db", "D", "Eb", "E", "F", "Gb", "G", "Ab", "A", "Bb", "B"];

const buildNoteId = (notation: Notation, octave: number): string => {
  return `${notation}${octave}`;
};

const intervalNumeralFromType = (step: number, type: IntervalType): string => {
  const notation = ["i", "ii", "iii", "iv", "v", "vi", "vii"][step];
  switch (type) {
    case "maj":
      return notation.toUpperCase();
    case "min":
      return notation;
    case "aug":
      return `${notation.toUpperCase()}+`;
    case "dim":
      return `${notation}°`;
  }
};

const intervalNameFromType = (type: IntervalType): IntervalName => {
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

const intervalNotes = (
  offset: number,
  octave: number,
  type: IntervalType
): IntervalNotes => {
  // get the steps for this chord type
  const steps = {
    maj: [0, 4, 7],
    min: [0, 3, 7],
    dim: [0, 3, 6],
    aug: [0, 4, 8],
  }[type];
  const notes = [];
  const roots = STEP_NOTATIONS;
  for (let i = 0; i < steps.length; i++) {
    const step = steps[i];
    const idx = (offset + step) % roots.length;
    // relative octave to base
    const relative = offset + step > roots.length - 1 ? octave + 1 : octave;
    // define the note
    notes.push({ notation: roots[idx], octave: relative });
  }
  return notes;
};

const intervalsFromMode = (mode: "melodic" | "harmonic"): IntervalType[] => {
  switch (mode) {
    case "melodic":
      return ["min", "min", "aug", "maj", "maj", "dim", "dim"];
    case "harmonic":
      return ["min", "dim", "aug", "min", "maj", "maj", "dim"];
  }
};

const intervalsFromOffset = (offset: number): IntervalType[] => {
  // this is ionian, each mode bumps up one offset.
  const base: IntervalType[] = [
    "maj",
    "min",
    "min",
    "maj",
    "maj",
    "min",
    "dim",
  ];
  const triads: IntervalType[] = [];
  for (let i = 0; i < base.length; i++) {
    triads.push(base[(i + offset) % base.length]);
  }
  return triads;
};

const modeDataFromMode = (
  mode: Mode | ModeVanity
): {
  intervals: IntervalType[];
  name: string;
  steps: number[];
} => {
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

const rootOffset = (root: Notation | NotationAlternate): number => {
  const memoized = MEMO_ROOT_OFFSET[root];
  if (memoized) {
    return memoized;
  }
  const idx = STEP_NOTATIONS.indexOf(root as Notation);
  const value =
    idx === -1
      ? STEP_NOTATION_ALTERNATES.indexOf(root as NotationAlternate)
      : idx;
  MEMO_ROOT_OFFSET[root] = value;
  return value;
};

const stepsFromIncrement = (increments: (1 | 2 | 3)[]): number[] => {
  const steps: number[] = [0];
  let step = 0;
  for (let i = 0; i < increments.length - 1; i++) {
    step += increments[i];
    steps.push(step);
  }
  return steps;
};

class MusicalScaleNote {
  /**
   * Frequency hz for this note
   */
  frequency: number;
  /**
   * A unique identifier for this note
   */
  id: string;
  /**
   * Global index of the note on a keyboard (
   * 0 through 107
   */
  index: number;
  /**
   * Primary notation for the note
   */
  notation: Notation;
  /**
   * Optional secondary notation for the note
   */
  notationAlternate?: NotationAlternate;
  /**
   * Global octave number for the note
   * 0 through 8
   */
  octave: number;
  /**
   * Index of the note within the octave
   * 0 through 11
   */
  octaveIndex: number;

  constructor({ octave, step }: { octave: number; step: number }) {
    const notation = STEP_NOTATIONS[step];
    const alternate = STEP_NOTATION_ALTERNATES[step];

    this.frequency = OCTAVE_STEP_FREQUENCIES[octave][step];
    this.id = buildNoteId(notation, octave);
    this.index = step + octave * 12;
    this.notation = notation;
    this.notationAlternate =
      alternate === this.notation ? undefined : alternate;
    this.octave = octave;
    this.octaveIndex = step;
  }
}

export class MusicalScaleInterval {
  /**
   * Common representation of the interval
   */
  label: string;
  /**
   * Metadata
   */
  meta: {
    /**
     * Interval name
     */
    name: IntervalName;
    /**
     * Interval roman numeral syntax
     */
    numeral: string;
    /**
     * Interval type
     */
    type: IntervalType;
  };
  /**
   * Primary identifier of the interval root note
   */
  notation: Notation;
  /**
   * Optional secondary identifier of the interval root note
   */
  notationAlternate?: NotationAlternate;
  /**
   * Interval triad notes
   */
  notes: IntervalNotes;
  /**
   * Octave relative octave to first interval's root note.
   * 0 | 1
   */
  octave: number;
  /**
   * Interval step in the mode
   * 0 through 6
   */
  step: number;

  constructor(step: number, offset: number, type: IntervalType) {
    const index = offset % STEP_NOTATIONS.length;
    const octave = offset > STEP_NOTATIONS.length - 1 ? 1 : 0;
    const notation = STEP_NOTATIONS[index];
    const alternate = STEP_NOTATION_ALTERNATES[index];
    this.label = `${notation} ${type}`;
    this.notation = notation;
    this.notationAlternate = alternate === notation ? undefined : alternate;
    this.notes = intervalNotes(index, octave, type);
    this.octave = octave;
    this.step = step;
    this.meta = {
      name: intervalNameFromType(type),
      numeral: intervalNumeralFromType(step, type),
      type,
    };
  }

  static fromNotation(
    notation: Notation | NotationAlternate,
    type: IntervalType
  ) {
    let step = STEP_NOTATIONS.indexOf(notation as Notation);
    if (step === -1) {
      step = STEP_NOTATION_ALTERNATES.indexOf(notation as NotationAlternate);
    }
    return new MusicalScaleInterval(step, 0, type);
  }
}

export default class MusicalScale {
  /**
   * Array of 7 intervals in the scale
   */
  intervals: MusicalScaleInterval[];
  /**
   * Common label for the scale's key.
   */
  label: string;
  /**
   * Scale's mode. Can be a vanity mode (minor, major)
   */
  mode: Mode | ModeVanity;
  /**
   * Array of playable note ids in the scale
   */
  noteIds: string[];
  /**
   * Notation or alternative notation for the root of the scale.
   */
  root: Notation | NotationAlternate;

  constructor(params: MusicalScaleParams) {
    this.root = params.root;
    this.mode = params.mode;
    this.label = "";
    this.intervals = [];
    this.noteIds = [];
    this.update(params);
  }

  update({ root, mode }: MusicalScaleParams) {
    this.mode = mode;
    this.root = root;
    const { name, steps, intervals } = modeDataFromMode(mode);
    this.label = `${root} ${name}`;

    this.intervals = steps.map(
      (step, index) =>
        new MusicalScaleInterval(
          index,
          rootOffset(this.root) + step,
          intervals[index]
        )
    );

    this.noteIds = [];
    const lastOctave = OCTAVES[OCTAVES.length - 1];
    OCTAVES.forEach((mainOctave) => {
      this.intervals.forEach(({ notation, octave }) => {
        const relOctave = octave + mainOctave;
        if (relOctave <= lastOctave) {
          this.noteIds.push(buildNoteId(notation, relOctave));
        }
      });
    });
  }

  /**
   * Array of playable notes in the scale.
   */
  get notes(): MusicalScaleNote[] {
    return this.noteIds.map((noteId) => NOTES_LIBRARY[noteId]);
  }
}

export const NOTES_LIBRARY = OCTAVES.reduce<{ [k: string]: MusicalScaleNote }>(
  (library, octave) => {
    STEPS.forEach((step) => {
      const note = new MusicalScaleNote({ octave, step });
      library[note.id] = note;
    });
    return library;
  },
  {}
);
