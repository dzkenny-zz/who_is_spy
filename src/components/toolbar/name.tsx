import { Dialog, DialogTitle, DialogContent, DialogActions, Button, TextField } from '@material-ui/core';
import { observer } from 'mobx-react';
import EditIcon from '@material-ui/icons/Edit';
import React, { useState } from 'react';
import { useStores } from '../../stores';
import { updateUsername } from '../../actions/app';
import './styles.css';
import { isMobile } from 'react-device-detect';

const NameComponent = observer(() => {
    const stores = useStores();
    const { user } = stores.appStore;

    const [showNameDialog, setShowNameDialog] = useState(false);
    const [username, setUsername] = useState('');

    const onUsernameChange = (event: any) => {
        setUsername(event.target.value);
    }

    const onOpenNameDialog = () => {
        setUsername(user.username);
        setShowNameDialog(true);
    }

    const onCancelDialog = () => {
        setShowNameDialog(false);
    }

    const onSaveUsername = () => {
        setShowNameDialog(false);
        updateUsername({ stores, username });
    }

    return (
        <>
            <div
                className={isMobile ? "mobile-name" : "name"}
                onClick={onOpenNameDialog}
            >
                {user.username}
                <EditIcon className="name-edit-icon" />
            </div>
            <Dialog key="name-dialog" open={showNameDialog}>
                <DialogTitle>更改玩家名稱</DialogTitle>
                <DialogContent>
                    <TextField
                        label={'玩家名稱'}
                        value={username}
                        onChange={onUsernameChange}
                    />
                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelDialog} color="primary">取消</Button>
                    <Button onClick={onSaveUsername} color="primary">確定</Button>
                </DialogActions>
            </Dialog>
        </>
    );
});

export default NameComponent;