import { Dialog, DialogTitle, DialogContent, DialogActions, Button } from '@material-ui/core';
import { observer } from 'mobx-react';
import React, { useState } from 'react';
import { useStores } from '../../stores';
import Avatar from '../../components/avatar';
import './styles.css';
import { Avatars } from '../../models/avatar';
import { updateAvatar } from '../../actions/app';
import { isMobile } from 'react-device-detect';

const AvatarComponent = observer(() => {
    const stores = useStores();
    const { user } = stores.appStore;

    const [showDialog, setShowDialog] = useState(false)
    const [avatar, setAvatar] = useState('');

    const onAvatarChange = (image: string) => {
        setAvatar(image);
    }

    const onOpenDialog = () => {
        setAvatar(user.avatar || '');
        setShowDialog(true);
    }

    const onCancelDialog = () => {
        setShowDialog(false);
    }

    const onSaveAvatar = () => {
        setShowDialog(false);
        updateAvatar({ stores, avatar });
    }

    return (
        <>
            <Avatar image={user.avatar} onClick={onOpenDialog} />
            <Dialog open={showDialog}>
                <DialogTitle>選擇頭像</DialogTitle>
                <DialogContent>
                    <div className={isMobile ? "mobile-avatars-selection" : "avatars-selection"}>
                        {
                            Avatars.map((a, index) => (
                                <div
                                    key={`avatar-${index}`}
                                    className={`avatar-container ${a.id === avatar ? 'selected-avatar' : 'not-selected-avatar'} ${isMobile ? 'mobile-avatar' : ''}`}
                                    onClick={() => onAvatarChange(a.id)}
                                >

                                    <Avatar image={a.id} />
                                </div>
                            ))
                        }
                    </div>

                </DialogContent>
                <DialogActions>
                    <Button onClick={onCancelDialog} color="primary">取消</Button>
                    <Button onClick={onSaveAvatar} color="primary">確定</Button>
                </DialogActions>
            </Dialog>
        </>

    );
});

export default AvatarComponent;