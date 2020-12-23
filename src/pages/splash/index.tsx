import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router';
import { init } from '../../actions/app';
import ChurchImg from '../../assets/images/church.jpg';
import { useStores } from '../../stores';
import './styles.css';

function SplashPage() {
    const history = useHistory();
    const stores = useStores();

    useEffect(() => {
        init({ stores, history });
    }, []);

    return (
        <div className={'container'}>

        </div>
    )
}

export default SplashPage;