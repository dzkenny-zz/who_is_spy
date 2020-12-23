import { observer } from 'mobx-react';
import React, { useEffect } from 'react';
import { Card, CardContent, Typography } from '@material-ui/core';
import './styles.css';
import { useStores } from '../../stores';
import { useHistory } from 'react-router';
import { removeWaitingRoomListener, initWaitingRoomListener } from '../../actions/game';
import PeopleListComponent from './peopleList';
import SettingComponent from './setting';
import ToolbarComponent from '../../components/toolbar';
import LeftPanel from '../gamingRoom/leftPanel';

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

    return (
        <div className="page">
            {refresh}
            <Card className="card">
                <CardContent>
                    <ToolbarComponent title={`遊玩房間 #${id}`} />
                    <div className="waiting-content">
                        <PeopleListComponent />
                        <LeftPanel type={'waiting'}/>
                    </div>
                </CardContent>
            </Card>
        </div>
    )
});

export default WaitingRoomPage;