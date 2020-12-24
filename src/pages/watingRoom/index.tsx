import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Card, CardContent } from '@material-ui/core';
import './styles.css';
import { useStores } from '../../stores';
import { useHistory } from 'react-router';
import { removeWaitingRoomListener, initWaitingRoomListener } from '../../actions/game';
import PeopleListComponent from './peopleList';
import ToolbarComponent from '../../components/toolbar';
import LeftPanel from '../../components/leftPanel';
import { isMobile } from 'react-device-detect';
import MobilePanel from '../../components/mobilePanel';

const WaitingRoomPage = observer(() => {
    const stores = useStores();
    const history = useHistory();

    const { room, refresh } = stores.gameStore;
    const { host, id } = room;

    useEffect(() => {
        initWaitingRoomListener({ stores, history });

        return () => {
            removeWaitingRoomListener({ stores })
        };
    }, []);

    if (isMobile) {
        return (
            <div className="page">
                {refresh}
                <Card className="mobile-card">
                    <ToolbarComponent title={`#${id}`} />
                    <div className="mobile-waiting-content">
                        <MobilePanel type={'waiting'} />
                    </div>
                </Card>
            </div>
        );
    }
    else {
        return (
            <div className="page">
                {refresh}
                <Card className="card">
                    <CardContent>
                        <ToolbarComponent title={`遊玩房間 #${id}`} />
                        <div className="waiting-content">
                            <PeopleListComponent />
                            <LeftPanel type={'waiting'} />
                        </div>
                    </CardContent>
                </Card>
            </div>
        );
    }


});

export default WaitingRoomPage;