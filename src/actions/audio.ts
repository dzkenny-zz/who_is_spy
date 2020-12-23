import { Avatars } from "../models/avatar";
import { Stores } from "../stores";
import * as _ from 'lodash';

type PlayAudio = {
    stores: Stores,
    soundId: string
}

type PlayBgm =  {
    stores: Stores
}

type PauseSound = {
    stores: Stores
}

type ToggleSound = {
    stores: Stores
}

export const playAudio = ({ stores, soundId }: PlayAudio) => {
    const { audio, setAudio, muteAudio } = stores.audioStore;

    if (muteAudio) {
        return;
    }

    if (audio) {
        audio.pause();
    }

    try {
        const avatar = Avatars.find(avatar => avatar.id === soundId);
        const sound = require(`../assets/sound/characters/${avatar?.sound}`).default;
        const newAudio = new Audio(sound);
        newAudio.play();

        setAudio(newAudio);
    } catch (error) {
        // do nothing
    }
}

export const playBgm = ({ stores }: PlayBgm) => {
    const { bgm, setBgm, setMuteBgm } = stores.audioStore;

    if (bgm) {
        bgm.pause();
    }

    try {
        const sound = require(`../assets/sound/bgm/${_.random(5)}.mp3`).default;
        const newAudio = new Audio(sound);
        newAudio.volume = 0.2;
        newAudio.play();

        setBgm(newAudio);
    } catch (error) {
        // do nothing
    }

    setMuteBgm(false);
}

export const pauseBgm = ({ stores }: PauseSound) => {
    const { bgm, setBgm, audio, setAudio, setMuteBgm } = stores.audioStore;
    if (bgm) {
        bgm.pause();
        setBgm(null);
    }

    if (audio) {
        audio.pause();
        setAudio(null);
    }

    setMuteBgm(true);
}

export const toggleBgm = ({ stores }: ToggleSound) => {
    const { muteBgm } = stores.audioStore;
    if (muteBgm) {
        playBgm({ stores });
    }
    else {
        pauseBgm({ stores });
    }
}

export const toggleAudio = ({ stores }: ToggleSound) => {
    const { muteAudio, setMuteAudio, audio } = stores.audioStore;
    if (muteAudio && audio) {
        audio.pause();
    }

    setMuteAudio(!muteAudio);
}