import { Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useEffect, useRef } from 'react';
import { useStores } from '../stores';
import SoundIcon from '@material-ui/icons/VolumeMute';
import MuteIcon from '@material-ui/icons/VolumeOff';
import { toggleBgm, toggleAudio } from '../actions/audio';

const BgmComponent = observer(() => {
    const stores = useStores();
    const SoundButton = useRef(null);

    useEffect(() => {
        setTimeout(() => {
            const button: any = SoundButton.current;
            button.click();
        }, 4000);
    }, []);

    const onToggleBgm = () => {
        toggleBgm({ stores });
    }

    const onToggleAudio = () => {
        toggleAudio({ stores });
    }

    return (
        <div className="sound-button">
            <Button
                ref={SoundButton}
                onClick={onToggleBgm}
                startIcon={
                    stores.audioStore.muteBgm ?
                        <MuteIcon /> :
                        <SoundIcon />
                }
            >
                BGM
            </Button>
            <Button
                onClick={onToggleAudio}
                startIcon={
                    stores.audioStore.muteAudio ?
                        <MuteIcon /> :
                        <SoundIcon />
                }
            >
                人聲
            </Button>
        </div>

    );
});

export default BgmComponent;