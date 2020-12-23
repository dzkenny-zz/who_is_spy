import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Button, Typography, Dialog, DialogTitle, DialogActions } from '@material-ui/core';
import './styles.css';
import { useStores } from '../../stores';
import * as _ from 'lodash';
import { endGame, quitRoom } from '../../actions/game';
import { useHistory } from 'react-router';

const InfoComponent = observer(() => {
    const stores = useStores();
    const history = useHistory();
    const [showSpyWin, setShowSpyWin] = useState(false);
    const [showBlankWin, setShowBlankWin] = useState(false);
    const [showLeave, setShowLeave] = useState(false);

    const { user } = stores.appStore;
    const { room, refresh } = stores.gameStore;
    const { players, setting } = room;
    const { wrong, correct } = setting;

    const currentPlayerInfo = players.find(player => player.id === user.id);
    const currentIdetify = currentPlayerInfo?.identify;
    const answer = currentIdetify === 'spy' ? wrong : correct;

    const blankNum = setting.blank - _.filter(players, player => player.identify === 'blank' && player.status === 'dead').length;
    const spyNum = setting.spy - _.filter(players, player => player.identify === 'spy' && player.status === 'dead').length;
    const isHost = user.id === room.host;

    const onSpyWin = () => {
        setShowSpyWin(false);
        endGame({ stores, winner: 'spy' });
    }

    const onBlankWin = () => {
        setShowBlankWin(false)
        endGame({ stores, winner: 'blank' });
    }

    const onLeave = () => {
        setShowLeave(false);
        quitRoom({ stores, history });
    }

    return (
        <div className="gaming-info-content">
            {refresh}
            <div className="info-section">
                <Typography className="title" gutterBottom variant="h6" component="h2">
                    {
                        currentIdetify === 'blank' ? '你係白板' :
                            `題目: ${answer}`
                    }
                </Typography>
                <Typography className="title" gutterBottom variant="body1" component="h2">
                    淨餘白板數量: {blankNum}
                </Typography>
                <Typography className="title" gutterBottom variant="body1" component="h2">
                    淨餘臥底數量: {spyNum}
                </Typography>
            </div>
            <div className="action-section">
                {isHost ? <Button onClick={() => setShowSpyWin(true)} color="primary">臥底勝利</Button> : null}
                {isHost ? <Button onClick={() => setShowBlankWin(true)} color="primary">白板勝利</Button> : null}
                <Button onClick={() => setShowLeave(true)} color="primary">離開房間</Button>
            </div>
            <Dialog open={showLeave}>
                <DialogTitle>是否確認離開</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setShowLeave(false)} color="primary">取消</Button>
                    <Button onClick={onLeave} color="primary">確定</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showSpyWin}>
                <DialogTitle>是否確認臥底勝利</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setShowSpyWin(false)} color="primary">取消</Button>
                    <Button onClick={onSpyWin} color="primary">確定</Button>
                </DialogActions>
            </Dialog>
            <Dialog open={showBlankWin}>
                <DialogTitle>是否確認白板勝利</DialogTitle>
                <DialogActions>
                    <Button onClick={() => setShowBlankWin(false)} color="primary">取消</Button>
                    <Button onClick={onBlankWin} color="primary">確定</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
});

export default InfoComponent;