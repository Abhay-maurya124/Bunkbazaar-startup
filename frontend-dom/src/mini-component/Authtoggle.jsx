import React, { useContext, useEffect, useState } from 'react'
import { Contextprovider } from '../NewContext/NewContext'
import Auth from './Auth'
import User from './User'

const Authtoggle = () => {
    const { Userdata } = useContext(Contextprovider)
    const [islogin, setislogin] = useState(false)
    useEffect(() => {
        if (Userdata[0]?.islogged == true) {
            setislogin(true)
        }
    }, [Userdata])
    return (
        <div>
            {islogin ? (
                <div>
                    <User />
                </div>
            ) : (
                <div>
                    <Auth />
                </div>
            )}
        </div>
    )
}
export default Authtoggle