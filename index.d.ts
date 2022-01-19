declare type NoteID = string;
declare type NoteStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
declare type NoteOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
declare type NoteFrequency = number;
declare type NoteNotation = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";
declare type NoteNotationAlternate = "Db" | "Eb" | "Gb" | "Ab" | "Bb" | "Cb" | undefined;
declare type ScaleMode = "ionian" | "dorian" | "phrygian" | "lydian" | "mixolydian" | "aeolian" | "locrian" | "melodic" | "harmonic";
interface ScaleConfig {
    key: ScaleMode;
    name: string;
    steps: NoteStep[];
    triads: ScaleIntervalTypeID[];
}
declare type ScaleModeVanity = "major" | "minor";
declare type ScaleIntervalTypeID = "aug" | "dim" | "maj" | "min";
declare type ScaleRoot = NoteNotation | Exclude<NoteNotationAlternate, undefined>;
declare class Notes {
    private closest;
    notes: {
        [k: NoteID]: Note;
    };
    constructor();
    find(id: NoteID): Note;
    closestToFrequency(frequency: NoteFrequency): Note;
    static get OCTAVES(): NoteOctave[];
    static get OCTAVE_STEP_FREQUENCIES(): {
        [K in NoteOctave]: {
            [K in NoteStep]: NoteFrequency;
        };
    };
    static get NOTE_IDS(): NoteID[];
    static get NOTE_FREQUENCIES(): NoteFrequency[];
    static get STEPS(): NoteStep[];
    static get STEP_NOTATIONS(): NoteNotation[];
    static get STEP_NOTATION_ALTERNATES(): NoteNotationAlternate[];
    static idFromNote(notation: NoteNotation, octave: NoteOctave): string;
}
declare class Note {
    frequency: NoteFrequency;
    notation: NoteNotation;
    notationAlternate: NoteNotationAlternate;
    octave: NoteOctave;
    step: NoteStep;
    constructor({ octave, step }: {
        octave: NoteOctave;
        step: NoteStep;
    });
    get id(): string;
}
interface MusicalScaleParams {
    root: ScaleRoot;
    mode: ScaleMode | ScaleModeVanity;
}
declare type RelativeOctave = 0 | 1;
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
    notes: {
        note: ScaleRoot;
        octave: RelativeOctave;
    }[];
}
export default class MusicalScale {
    root: ScaleRoot;
    mode: ScaleMode | ScaleModeVanity;
    notes: Notes;
    intervals: Interval[];
    constructor(params: MusicalScaleParams);
    get rootOffset(): number;
    update({ root, mode }: MusicalScaleParams): void;
    static intervalFromType(step: number, type: ScaleIntervalTypeID): string;
    static buildTriad(relativeStep: number, offset: number, octave: RelativeOctave, triadId: ScaleIntervalTypeID): Triad;
    static modeConfig(mode: ScaleMode | ScaleModeVanity): ScaleConfig;
    static get ROOTS(): ScaleRoot[];
    static get ROOT_ALTERNATES(): (ScaleRoot | undefined)[];
    static stepsFromIncrement(increments: number[]): NoteStep[];
    static triadsFromOffset(offset: number, alt?: "melodic" | "harmonic"): ScaleIntervalTypeID[];
    static triadStepsFromTriad(id: ScaleIntervalTypeID): number[];
}
export {};
