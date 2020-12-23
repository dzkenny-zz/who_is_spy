import { observer } from 'mobx-react';
import React, { useState } from 'react';
import {
    List, Typography, ListItem, ListItemAvatar, ListItemText, ListItemSecondaryAction, IconButton,
    Dialog, DialogTitle, DialogContent, DialogActions, Button
} from '@material-ui/core';
import KickIcon from '@material-ui/icons/Close';
import AdminIcon from '@material-ui/icons/Star';
import './styles.css';
import { useStores } from '../../stores';
import { kickPlayer, updateHost } from '../../actions/game';
import AvatarComponent from '../../components/avatar';
import { Player } from '../../models/player';

const PeopleListComponent = observer(() => {
    const stores = useStores();
    const [selectedPlayer, setSelectedPlayer] = useState<Player | null>(null);
    const [showKickDialog, setShowKickDialog] = useState(false);

    const { user } = stores.appStore;
    const { room, refresh } = stores.gameStore;
    const { host, players } = room;
    const isHost = user.id === host;

    const onHostChange = (playerId: string) => {
        if (playerId === user.id) {
            return;
        }

        updateHost({ stores, host: playerId });
    }

    const onSelectPlayer = (player: Player) => {
        setSelectedPlayer(player);
        setShowKickDialog(true);
    }

    const onCancelDialog = () => {
        setSelectedPlayer(null);
        setShowKickDialog(false);
    }

    const onKickPlayer = () => {
        setShowKickDialog(false);
        kickPlayer({
            stores,
            playerId: selectedPlayer ? selectedPlayer.id : ''
        })
    }

    return (
        <div className="room-content-container">
            {refresh}
            <Typography className="title" gutterBottom variant="body1" component="h2">玩家人數: {players.length}</Typography>
            <List>
                {
                    players.map((player, index) => (
                        <ListItem key={`player-${index}`}>
                            <ListItemAvatar>
                                <AvatarComponent image={player.avatar} />
                            </ListItemAvatar>
                            <ListItemText primary={player.username} secondary={`${player.id}`} />
                            <ListItemSecondaryAction>
                                {
                                    (isHost && player.id !== host) ? (
                                        <IconButton edge="end" onClick={() => onSelectPlayer(player)}>
                                            <KickIcon style={{ color: player.id === host ? 'yellow' : 'grey' }} />
                                        </IconButton>
                                    ) : null
                                }
                                {
                                    (isHost || player.id === host) ? (
                                        <IconButton edge="end" onClick={() => onHostChange(player.id)}>
                                            <AdminIcon style={{ color: player.id === host ? 'yellow' : 'grey' }} />
                                        </IconButton>
                                    ) : null
                                }
                            </ListItemSecondaryAction>
                        </ListItem>
                    ))
                }
            </List>
            <Dialog open={showKickDialog}>
                <DialogTitle>是否踢除此玩家</DialogTitle>
                <DialogContent>
                    <Typography className="title" gutterBottom variant="body1" component="h2">
                        {selectedPlayer?.username}
                    </Typography>
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelDialog} color="primary">取消</Button>
                    <Button onClick={onKickPlayer} color="primary">確定</Button>
                </DialogActions>
            </Dialog>
        </div>
    )
});

export default PeopleListComponent;