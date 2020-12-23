import { Stores } from "../stores";


type PlayBgm = {
    stores: Stores
};

type PlayAudio = {
    stores: Stores,
    uri: string
}

const playAudio = ({ stores, uri }: PlayAudio) => {
    const { audio, setAudio } = stores.audioStore;

    if (audio) {
        audio.pause();
    }

    const newAudio = new Audio(uri);
    newAudio.play();
    
    setAudio(newAudio);
}