import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Typography, Select, MenuItem, InputLabel, FormControl, Button, FormControlLabel, Switch, TextField } from '@material-ui/core';
import './styles.css';
import { useStores } from '../../stores';
import { useHistory } from 'react-router';
import { quitRoom, updateBlankNumber, updateHost, updateSpyNumber, startGame, updateIsRandom } from '../../actions/game';

const genMenuItems = (key: string) => {
    return [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(index => (
        <MenuItem key={`${key}-${index}`} value={index}>{index}</MenuItem>
    ));
}

const SettingComponent = observer(() => {
    const stores = useStores();
    const history = useHistory();

    const [correct, setCorrect] = useState('');
    const [wrong, setWrong] = useState('');

    const { user } = stores.appStore;
    const { room, refresh } = stores.gameStore;
    const { host, setting } = room;
    const isHost = user.id === host;

    const handleSpyChange = (event: any) => {
        updateSpyNumber({
            stores,
            number: event.target.value
        });
    }

    const handleBlankChange = (event: any) => {
        updateBlankNumber({
            stores,
            number: event.target.value
        });
    }

    const handleIsRandomChange = (event: any) => {
        if (!isHost) {
            return;
        }

        updateIsRandom({
            stores,
            isRandom: event.target.checked
        });
    }

    const onQuit = () => {
        quitRoom({ stores, history });
    }

    const onStart = () => {
        startGame({ stores, correct, wrong });
    }

    const onCorrectChange = (event: any) => {
        setCorrect(event.target.value)
    }

    const onWrongChange = (event: any) => {
        setWrong(event.target.value);
    }

    return (
        <div className="room-content-container">
            {refresh}
            <div className="padding12">
                <Typography gutterBottom variant="h5" component="h2">遊戲設定</Typography>
                <div className="setting-field-content">
                    <FormControl variant="outlined" fullWidth className="setting-field">
                        <InputLabel className="label">臥底人數</InputLabel>
                        <Select
                            disabled={!isHost}
                            value={setting.spy}
                            onChange={handleSpyChange}
                        >
                            {genMenuItems('spy')}
                        </Select>
                    </FormControl>
                    <FormControl variant="outlined" fullWidth className="setting-field">
                        <InputLabel className="label">白板人數</InputLabel>
                        <Select
                            disabled={!isHost}
                            value={setting.blank}
                            onChange={handleBlankChange}
                        >
                            {genMenuItems('blank')}
                        </Select>
                    </FormControl>
                    <FormControl>
                        <FormControlLabel
                            control={
                                <Switch
                                    checked={setting.isRandom}
                                    onChange={handleIsRandomChange}
                                    name="checkedB"
                                    color="primary"
                                />
                            }
                            label="隨機"
                        />
                    </FormControl>
                    {
                        isHost && !setting.isRandom ?
                            <TextField
                                label="普通人"
                                fullWidth
                                value={correct}
                                onChange={onCorrectChange}
                            /> : null
                    }
                    {
                        isHost && !setting.isRandom ?
                            <TextField
                                fullWidth
                                label="臥底"
                                value={wrong}
                                onChange={onWrongChange}
                            /> : null
                    }
                </div>
                <div className="setting-actions">
                    <Button onClick={onQuit}>離開</Button>
                    {
                        isHost ?
                            <Button onClick={onStart}>開始</Button> :
                            null
                    }
                </div>
            </div>
        </div>

    )
});

export default SettingComponent;