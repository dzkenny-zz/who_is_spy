import React from 'react'
import { Avatar } from '@material-ui/core';
import PersonIcon from '@material-ui/icons/Person';
import { Avatars } from '../../models/avatar';

type AvatarType = {
    image?: string;
    onClick?: () => void;
}

const getImage = (image?: string) => {
    try {
        const avatar = Avatars.find(a => a.id === image);
        if (avatar) {
            return require(`../../assets/images/avatars/${avatar.avatar}`).default;
        }
        return undefined;
    } catch(error) {
        return undefined;
    }
}

const AvatarComponent = ({ image, onClick }: AvatarType) => {
    return (
        <Avatar 
            src={ getImage(image) }
            onClick={onClick} 
            style={{ cursor : onClick ? 'pointer' : '' }}
        >
            { image ? null : <PersonIcon /> }
        </Avatar>
    )
}

export default AvatarComponent;