import { extendObservable } from 'mobx';
import * as _ from 'lodash';

export class AudioStore {
    audio: any;

    constructor() {
        extendObservable(this, {
            audio: null,
        });
    }

    setAudio = (audio: any) => {
        this.audio = audio;
    }
}

export default AudioStore;
