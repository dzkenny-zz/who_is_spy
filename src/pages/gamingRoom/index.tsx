import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Card, CardContent, Typography, Button, Dialog, DialogTitle, DialogContent, DialogActions } from '@material-ui/core';
import './styles.css';
import { useStores } from '../../stores';
import { useHistory } from 'react-router';
import { backWaitingRoom, initGamingRoomListener, removeGamingRoomListener } from '../../actions/game';
import * as _ from 'lodash';
import InfoComponent from './info';
import GameBoardComponent from './gameBoard';
import ToolbarComponent from '../../components/toolbar';

const GamingRoomPage = observer(() => {
    const stores = useStores();
    const history = useHistory();

    const { room, refresh, winner } = stores.gameStore;
    const { id } = room;

    const onBack = () => {
        backWaitingRoom({
            stores, history
        });
    }

    useEffect(() => {
        initGamingRoomListener({ stores, history });

        return removeGamingRoomListener({ stores });
    }, []);

    return (
        <div className="page">
            {refresh}
            <Card className="gaming-card">
                <CardContent>
                    <ToolbarComponent title={`遊玩房間 #${id}`} />
                    <div className="waiting-content">
                        <GameBoardComponent />
                        <InfoComponent />
                    </div>
                </CardContent>
            </Card>
            <Dialog open={!!winner}>
                <DialogTitle>遊戲完結</DialogTitle>
                <DialogContent>
                    <Typography className="title" gutterBottom variant="body1" component="h2">
                        {winner === 'spy' ? '臥底' : winner === 'blank' ? '白板' : '普通人' } 勝!
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onBack} color="primary">返回</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
});

export default GamingRoomPage;