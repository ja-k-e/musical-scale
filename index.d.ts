declare type IntervalName = "Augmented" | "Diminished" | "Major" | "Minor";
declare type IntervalType = "aug" | "dim" | "maj" | "min";
declare type Mode = "ionian" | "dorian" | "phrygian" | "lydian" | "mixolydian" | "aeolian" | "locrian" | "melodic" | "harmonic";
declare type ModeVanity = "major" | "minor";
declare type Notation = "C" | "C#" | "D" | "D#" | "E" | "F" | "F#" | "G" | "G#" | "A" | "A#" | "B";
declare type NotationAlternate = "C" | "Db" | "D" | "Eb" | "E" | "F" | "Gb" | "G" | "Ab" | "A" | "Bb" | "B";
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
declare type IntervalNotes = IntervalNote[];
export declare const intervalNotes: (offset: number, octave: number, type: IntervalType) => IntervalNotes;
declare class MusicalScaleNote {
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
    constructor({ octave, step }: {
        octave: number;
        step: number;
    });
}
declare class MusicalScaleInterval {
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
    constructor(step: number, offset: number, type: IntervalType);
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
    constructor(params: MusicalScaleParams);
    update({ root, mode }: MusicalScaleParams): void;
    /**
     * Array of playable notes in the scale.
     */
    get notes(): MusicalScaleNote[];
}
export declare const NOTES_LIBRARY: {
    [k: string]: MusicalScaleNote;
};
export {};
