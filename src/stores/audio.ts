import { extendObservable } from 'mobx';
import * as _ from 'lodash';

export class AudioStore {
    audio: any;
    bgm: any;
    muteBgm: boolean = true;
    muteAudio: boolean = false;

    constructor() {
        extendObservable(this, {
            audio: null,
            bgm: null,
            muteBgm: true,
            muteAudio: false
        });
    }

    setAudio = (audio: any) => {
        this.audio = audio;
    }

    setBgm = (bgm: any) => {
        this.bgm = bgm;
    }

    setMuteBgm = (muteBgm: boolean) => {
        this.muteBgm = muteBgm;
    }

    setMuteAudio = (muteAudio: boolean) => {
        this.muteAudio = muteAudio;
    }
}

export default AudioStore;
