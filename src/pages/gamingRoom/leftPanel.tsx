import React, { useState } from 'react';
import SettingComponent from '../watingRoom/setting';
import ChatRoom from './chatRoom';
import InfoComponent from './info';

type LeftPanelType = {
    type: 'waiting' | 'gaming'
}

const LeftPanel = ({ type }: LeftPanelType) => {
    const [tab, setTab] = useState(0);

    return (
        <div className="gaming-info-content">
            <div className="info-tabs">
                <div onClick={e => setTab(0)} className={`info-tab ${tab === 0 ? 'selected-tab' : ''}`}>
                    資訊
                </div>
                <div onClick={e => setTab(1)} className={`info-tab ${tab === 1 ? 'selected-tab' : ''}`}>
                    私訊
                </div>
            </div>
            {
                tab === 0 ? 
                    (
                    type === 'waiting' ? <SettingComponent /> : <InfoComponent />) :
                    <ChatRoom />
            }
        </div>
    )
}

export default LeftPanel;