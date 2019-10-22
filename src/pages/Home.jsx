import React, { useState, useEffect } from 'react';
import withLogin from '../auth/withLogin';
import { api } from '../lib/api';

function Home() {

    const init = async () => {
        try {
            const res = await api.init();
            console.log(res);
        } catch (err) {
            console.log(err);
        }

    }

    useEffect(() => {
        init();
    }, []);
    return (
        <div>
            Home
        </div>
    );
}

export default withLogin(Home);
