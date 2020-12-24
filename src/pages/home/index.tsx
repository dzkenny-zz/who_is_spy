import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { Button, Card, CardContent, Dialog, DialogActions, DialogContent, DialogTitle, TextField, Typography } from '@material-ui/core';
import './styles.css';
import { useStores } from '../../stores';
import { useHistory } from 'react-router';
import { createGameRoom, joinGameRoom } from '../../actions/game';
import ToolbarComponent from '../../components/toolbar';
import { isMobile } from 'react-device-detect';

const RoomImg = require('../../assets/images/room.png').default;
const JoinImg = require('../../assets/images/join.png').default;

const HomePage = observer(() => {
    const stores = useStores();
    const history = useHistory();

    const [showJoinDialog, setShowJoinDialog] = useState(false);
    const [joinRoomId, setJoinRoomId] = useState('');

    const onCreateRoom = () => {
        createGameRoom({ stores, history });
    }

    const onShowJoinDialog = () => {
        setShowJoinDialog(true);
    }

    const onCancelJoin = () => {
        setShowJoinDialog(false);
        setJoinRoomId('');
    }

    const onJoinRoom = () => {
        joinGameRoom({ stores, history, roomId: joinRoomId });
    }

    const onJoinRoomIdChange = (event: any) => {
        setJoinRoomId(event.target.value)
    }

    const onKeyDown = (e: any) => {
        if (e.key === 'Enter') {
            onJoinRoom();
          }
    }

    return (
        <div className="page">
            <Card className={isMobile ? "mobile-card" : "card"}>
                <CardContent>
                    <ToolbarComponent title={isMobile ? "" : "歡迎遊玩誰是臥底"} />
                    <div className={isMobile ? "mobile-content" : "content"}>
                        <div
                            className={isMobile ? "mobile-button-container" : "button-container"}
                            onClick={onCreateRoom}
                        >
                            <img
                                src={RoomImg}
                                className={isMobile ? "mobile-button-img" : "button-img"}
                            />
                            <Typography className="button-text" variant="h5" component="h2">創建房間</Typography>
                        </div>
                        <div
                            className={isMobile ? "mobile-button-container" : "button-container"}
                            onClick={onShowJoinDialog}
                        >
                            <img
                                src={JoinImg}
                                className={isMobile ? "mobile-button-img" : "button-img"}
                            />
                            <Typography className="button-text" variant="h5" component="h2">參與房間</Typography>
                        </div>
                    </div>
                </CardContent>
            </Card>
            <Dialog open={showJoinDialog}>
                <DialogTitle>請輸入房間編號</DialogTitle>
                <DialogContent>
                    <TextField
                        title="房間編號"
                        value={joinRoomId}
                        onChange={onJoinRoomIdChange}
                        onKeyDown={onKeyDown}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelJoin} color="primary">取消</Button>
                    <Button onClick={onJoinRoom} color="primary">參與</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
});

export default HomePage;