import React from 'react';
import { useStores } from '../../stores';
import './styles.css';
import AvatarComponent from './avatar';
import NameComponent from './name';
const SpyImg = require('../../assets/images/spy.png').default;

type ToolBar = {
    title: string
}

const ToolbarComponent = ({ title }: ToolBar) => {
    const stores = useStores();
    const { user } = stores.appStore;

    return (
        <div className="toolbar">
            <img src={SpyImg} className="logo" />
            <div className="title">{title}</div>
            <AvatarComponent />
            <NameComponent />
        </div>
    );
};

export default ToolbarComponent;