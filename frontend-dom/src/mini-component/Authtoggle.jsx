import React, { useContext } from 'react';
import { Contextprovider } from '../NewContext/NewContext';
import Auth from './Auth';
import User from './User';

const Authtoggle = () => {
    const { Userdata, loading } = useContext(Contextprovider);
    const hasToken = !!localStorage.getItem("accesstoken");

    if (loading) return <div className="animate-pulse">...</div>;

    const user = Array.isArray(Userdata) ? Userdata[0] : Userdata;

    const isAuthenticated = hasToken && user && (user.islogged || user._id);

    return (
        <div className="flex items-center">
            {isAuthenticated ? <User /> : <Auth />}
        </div>
    );
};

export default Authtoggle;