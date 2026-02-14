import React, { useContext } from 'react';
import { Contextprovider } from '../NewContext/NewContext';
import Auth from './Auth';
import User from './User';

const Authtoggle = () => {
    const { Userdata, loading } = useContext(Contextprovider);

    if (loading) return <div className="animate-pulse">...</div>;

    const isAuthenticated = Userdata && (Userdata.islogged || Userdata[0]?.islogged || Userdata._id);

    return (
        <div className="flex items-center">
            {isAuthenticated ? <User /> : <Auth />}
        </div>
    );
};

export default Authtoggle;