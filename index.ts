type NoteID = string;

type NoteStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;

type NoteOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

type NoteFrequency = number;

type NoteNotation =
  | "C"
  | "C#"
  | "D"
  | "D#"
  | "E"
  | "F"
  | "F#"
  | "G"
  | "G#"
  | "A"
  | "A#"
  | "B";

type NoteNotationAlternate =
  | "Db"
  | "Eb"
  | "Gb"
  | "Ab"
  | "Bb"
  | "Cb"
  | undefined;

type ScaleMode =
  | "ionian"
  | "dorian"
  | "phrygian"
  | "lydian"
  | "mixolydian"
  | "aeolian"
  | "locrian"
  | "melodic"
  | "harmonic";

interface ScaleConfig {
  key: ScaleMode;
  name: string;
  steps: NoteStep[];
  triads: ScaleIntervalTypeID[];
}

type ScaleModeVanity = "major" | "minor";

type ScaleIntervalTypeID = "aug" | "dim" | "maj" | "min";

type ScaleRoot = NoteNotation | Exclude<NoteNotationAlternate, undefined>;

const NOTES_CLOSEST_MEMO: { [k: string]: NoteID } = {};

class Notes {
  notes: { [k: NoteID]: Note };

  constructor() {
    this.notes = {};
    Notes.OCTAVES.forEach((octave) => {
      Notes.STEPS.forEach((step) => {
        const note = new Note({ octave, step });
        this.notes[note.id] = note;
      });
    });
  }

  find(id: NoteID): Note {
    return this.notes[id];
  }

  closestToFrequency(frequency: NoteFrequency): Note {
    const key = frequency.toFixed(2);
    if (NOTES_CLOSEST_MEMO[key]) {
      return this.notes[NOTES_CLOSEST_MEMO[key]];
    }
    let index = 0;
    while (
      Notes.NOTE_FREQUENCIES[index + 1] < frequency &&
      index < Notes.NOTE_FREQUENCIES.length
    ) {
      index++;
    }
    if (
      index > 0 &&
      Math.abs(Notes.NOTE_FREQUENCIES[index] - frequency) <
        Math.abs(Notes.NOTE_FREQUENCIES[index - 1] - frequency)
    ) {
      index--;
    }
    return this.notes[index];
  }

  static get OCTAVES(): NoteOctave[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8];
  }

  static get OCTAVE_STEP_FREQUENCIES(): {
    [K in NoteOctave]: { [K in NoteStep]: NoteFrequency };
  } {
    // prettier-ignore
    return {
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
  }

  static get NOTE_IDS(): NoteID[] {
    // prettier-ignore
    return [
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
  }

  static get NOTE_FREQUENCIES(): NoteFrequency[] {
    // prettier-ignore
    return [
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
  }

  static get STEPS(): NoteStep[] {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  }

  static get STEP_NOTATIONS(): NoteNotation[] {
    return ["C", "C#", "D", "D#", "E", "F", "F#", "G", "G#", "A", "A#", "B"];
  }

  static get STEP_NOTATION_ALTERNATES(): NoteNotationAlternate[] {
    const und = undefined;
    return [und, "Db", und, "Eb", und, und, "Gb", und, "Ab", und, "Bb", "Cb"];
  }

  static idFromNote(notation: NoteNotation, octave: NoteOctave): string {
    return `${notation}${octave}`;
  }
}

class Note {
  frequency: NoteFrequency;
  notation: NoteNotation;
  notationAlternate: NoteNotationAlternate;
  octave: NoteOctave;
  step: NoteStep;

  constructor({ octave, step }: { octave: NoteOctave; step: NoteStep }) {
    this.octave = octave;
    this.step = step;
    this.frequency = Notes.OCTAVE_STEP_FREQUENCIES[octave][step];
    this.notation = Notes.STEP_NOTATIONS[step];
    this.notationAlternate = Notes.STEP_NOTATION_ALTERNATES[step];
  }

  get id(): string {
    return Notes.idFromNote(this.notation, this.octave);
  }
}

interface MusicalScaleParams {
  root: ScaleRoot;
  mode: ScaleMode | ScaleModeVanity;
}

type RelativeOctave = 0 | 1;

interface Interval {
  name: string;
  step: number;
  notation: NoteNotation;
  octave: RelativeOctave;
  triad: Triad;
}

interface Triad {
  type: ScaleIntervalTypeID;
  interval: string;
  notes: { note: ScaleRoot; octave: RelativeOctave }[];
}

const notes = new Notes();

export default class MusicalScale {
  root: ScaleRoot;
  mode: ScaleMode | ScaleModeVanity;
  intervals: Interval[];

  constructor(params: MusicalScaleParams) {
    this.root = params.root;
    this.mode = params.mode;
    this.intervals = [];
    this.update(params);
  }

  get rootOffset(): number {
    const idx = MusicalScale.ROOTS.indexOf(this.root);
    if (idx === -1) {
      return MusicalScale.ROOT_ALTERNATES.indexOf(this.root);
    } else {
      return idx;
    }
  }

  update({ root, mode }: MusicalScaleParams) {
    this.root = root;
    this.mode = mode;
    const config = MusicalScale.modeConfig(mode);

    this.intervals = [];

    for (let index = 0; index < 7; index++) {
      const step = config.steps[index];
      const idx = (this.rootOffset + step) % MusicalScale.ROOTS.length;
      // relative octave. 0 = same bb root, 1 = next ocave up
      const octave: RelativeOctave =
        this.rootOffset + step > MusicalScale.ROOTS.length - 1 ? 1 : 0;
      // generate the relative triads
      const triad = MusicalScale.buildTriad(
        index,
        idx,
        octave,
        config.triads[index]
      );
      const notation = Notes.STEP_NOTATIONS[idx];
      this.intervals.push({
        name: `${notation}${triad.type}`,
        step: index,
        notation,
        octave,
        triad,
      });
    }
  }

  static intervalFromType(step: number, type: ScaleIntervalTypeID): string {
    const steps = "i ii iii iv v vi vii".split(" ");
    const s = steps[step];
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
  }

  static buildTriad(
    relativeStep: number,
    offset: number,
    octave: RelativeOctave,
    triadId: ScaleIntervalTypeID
  ): Triad {
    // get the steps for this chord type
    const steps = MusicalScale.triadStepsFromTriad(triadId);
    // instantiate the chord
    const triad: Triad = {
      type: triadId,
      interval: MusicalScale.intervalFromType(relativeStep, triadId),
      notes: [],
    };
    // load the notes
    const roots = MusicalScale.ROOTS;
    for (let i = 0; i < steps.length; i++) {
      const step = steps[i];
      const idx = (offset + step) % roots.length;
      // relative octave to base
      const relative = (
        offset + step > roots.length - 1 ? octave + 1 : octave
      ) as RelativeOctave;
      // define the note
      triad.notes.push({ note: roots[idx], octave: relative });
    }
    return triad;
  }

  static modeConfig(mode: ScaleMode | ScaleModeVanity): ScaleConfig {
    if (mode === "major") {
      mode = "ionian";
    } else if (mode === "minor") {
      mode = "aeolian";
    }
    const scaleConfigs: { [K in ScaleMode]: ScaleConfig } = {
      ionian: {
        key: "ionian",
        name: "Ionian",
        steps: MusicalScale.stepsFromIncrement([2, 2, 1, 2, 2, 2, 1]),
        triads: MusicalScale.triadsFromOffset(0),
      },
      dorian: {
        key: "dorian",
        name: "Dorian",
        steps: MusicalScale.stepsFromIncrement([2, 1, 2, 2, 2, 1, 2]),
        triads: MusicalScale.triadsFromOffset(1),
      },
      phrygian: {
        key: "phrygian",
        name: "Phrygian",
        steps: MusicalScale.stepsFromIncrement([1, 2, 2, 2, 1, 2, 2]),
        triads: MusicalScale.triadsFromOffset(2),
      },
      lydian: {
        key: "lydian",
        name: "Lydian",
        steps: MusicalScale.stepsFromIncrement([2, 2, 2, 1, 2, 2, 1]),
        triads: MusicalScale.triadsFromOffset(3),
      },
      mixolydian: {
        key: "mixolydian",
        name: "Mixolydian",
        steps: MusicalScale.stepsFromIncrement([2, 2, 1, 2, 2, 1, 2]),
        triads: MusicalScale.triadsFromOffset(4),
      },
      aeolian: {
        key: "aeolian",
        name: "Aeolian",
        steps: MusicalScale.stepsFromIncrement([2, 1, 2, 2, 1, 2, 2]),
        triads: MusicalScale.triadsFromOffset(5),
      },
      locrian: {
        key: "locrian",
        name: "Locrian",
        steps: MusicalScale.stepsFromIncrement([1, 2, 2, 1, 2, 2, 2]),
        triads: MusicalScale.triadsFromOffset(6),
      },
      melodic: {
        key: "melodic",
        name: "Melodic Minor",
        steps: MusicalScale.stepsFromIncrement([2, 1, 2, 2, 2, 2, 1]),
        triads: MusicalScale.triadsFromOffset(0, "melodic"),
      },
      harmonic: {
        key: "harmonic",
        name: "Harmonic Minor",
        steps: MusicalScale.stepsFromIncrement([2, 1, 2, 2, 1, 3, 1]),
        triads: MusicalScale.triadsFromOffset(0, "harmonic"),
      },
    };
    return scaleConfigs[mode];
  }

  static get ROOTS(): ScaleRoot[] {
    return Notes.STEP_NOTATIONS;
  }

  static get ROOT_ALTERNATES(): (ScaleRoot | undefined)[] {
    return Notes.STEP_NOTATION_ALTERNATES;
  }

  static stepsFromIncrement(increments: number[]): NoteStep[] {
    const steps: NoteStep[] = [0];
    let step = 0;
    for (let i = 0; i < increments.length - 1; i++) {
      step += increments[i];
      steps.push(step as NoteStep);
    }
    return steps;
  }

  static triadsFromOffset(
    offset: number,
    alt?: "melodic" | "harmonic"
  ): ScaleIntervalTypeID[] {
    if (alt === "melodic") {
      return ["min", "min", "aug", "maj", "maj", "dim", "dim"];
    } else if (alt === "harmonic") {
      return ["min", "dim", "aug", "min", "maj", "maj", "dim"];
    }
    // this is ionian, each mode bumps up one offset.
    const base: ScaleIntervalTypeID[] = [
      "maj",
      "min",
      "min",
      "maj",
      "maj",
      "min",
      "dim",
    ];
    const triads: ScaleIntervalTypeID[] = [];
    for (let i = 0; i < base.length; i++) {
      triads.push(base[(i + offset) % base.length]);
    }
    return triads;
  }

  static triadStepsFromTriad(id: ScaleIntervalTypeID): number[] {
    return {
      maj: [0, 4, 7],
      min: [0, 3, 7],
      dim: [0, 3, 6],
      aug: [0, 4, 8],
    }[id];
  }
}

const scale = new MusicalScale({ mode: "ionian", root: "C" });
console.log(JSON.stringify(scale));
