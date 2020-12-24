import React from 'react';
import { useStores } from '../../stores';
import './styles.css';
import AvatarComponent from './avatar';
import NameComponent from './name';

import { isMobile } from 'react-device-detect';
const SpyImg = require('../../assets/images/spy.png').default;

type ToolBar = {
    title: string
}

const ToolbarComponent = ({ title }: ToolBar) => {
    const stores = useStores();
    const { user } = stores.appStore;

    if (isMobile) {
        return (
            <div className="mobile-toolbar">
                <img src={SpyImg} className="mobile-logo" />
                <div className="mobile-title">{title}</div>
                <AvatarComponent />
                <NameComponent />
            </div>
        )
    }
    else {
        return (
            <div className="toolbar">
                <img src={SpyImg} className="logo" />
                <div className="title">{title}</div>
                <AvatarComponent />
                <NameComponent />
            </div>
        );
    }
};

export default ToolbarComponent;