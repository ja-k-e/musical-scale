declare type NoteStep = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11;
declare type NoteOctave = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
export declare const LIB_OCTAVE_NOTE_FREQ: {
    [K in NoteOctave]: {
        [K in NoteStep]: number;
    };
};
export default class MusicalScale {
    constructor(params: {
        key: string;
        mode: string;
    } | undefined, progression: any, onUpdate: any);
    updateScale(params: any): void;
    loadScale(params: any): void;
    generateTriad(s: any, offset: any, octave: any, t: any): {
        type: any;
        interval: string;
        notes: never[];
    };
    intervalFromType(step: any, type: any): string;
    errors(params: any): boolean | undefined;
    loadLibrary(): {
        keys: string[];
        scales: {
            ion: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
            dor: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
            phr: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
            lyd: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
            mix: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
            aeo: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
            loc: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
            mel: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
            har: {
                name: string;
                steps: number[];
                dominance: number[];
                triads: string[];
            };
        };
        modes: string[];
        flatSharp: {
            Cb: string;
            Db: string;
            Eb: string;
            Fb: string;
            Gb: string;
            Ab: string;
            Bb: string;
        };
        triads: {
            maj: number[];
            min: number[];
            dim: number[];
            aug: number[];
        };
    };
    paramMode(mode: any): any;
    paramKey(key: any): any;
    generateTriads(offset: any): string[];
    generateSteps(stepsString: any): number[];
    static frequencyFromNote(note: any, octave: any): any;
    static noteFromFrequency(freq: any, notes: any): any;
}
export {};
