import React, { useState } from 'react';
import SettingComponent from '../../pages/watingRoom/setting';
import ChatRoom from '../chatRoom';
import InfoComponent from '../../pages/gamingRoom/info';
import GameBoardComponent from '../../pages/gamingRoom/gameBoard';
import PeopleListComponent from '../../pages/watingRoom/peopleList';
import './styles.css';

type LeftPanelType = {
    type: 'waiting' | 'gaming'
}

const MobilePanel = ({ type }: LeftPanelType) => {
    const [tab, setTab] = useState(0);

    return (
        <div className="mobile-panel">
            <div className="info-tabs">
                <div onClick={e => setTab(0)} className={`info-tab ${tab === 0 ? 'selected-tab' : ''}`}>
                    {type === 'waiting' ? '房間' : '遊戲'}
                </div>
                <div onClick={e => setTab(1)} className={`info-tab ${tab === 1 ? 'selected-tab' : ''}`}>
                    資訊
                </div>
                <div onClick={e => setTab(2)} className={`info-tab ${tab === 2 ? 'selected-tab' : ''}`}>
                    聊天
                </div>
            </div>
            {
                tab === 0 ?
                    (
                        type === 'waiting' ?
                            <PeopleListComponent /> :
                            <GameBoardComponent />
                    ) :
                    tab === 1 ?
                        (
                            type === 'waiting' ? <SettingComponent /> : <InfoComponent />
                        ) : <ChatRoom />
            }
        </div>
    )
}

export default MobilePanel;