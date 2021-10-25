import React, {useState, useEffect} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {getOauthKey} from '../redux/reducers/TwitchKey'

export default function TwitchMain() {

    const {oAuthKey} = useSelector(state => ({
        ...state.TwitchKey
    }))

    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(getOauthKey())
    }, [])

    console.log(oAuthKey)


    return (
        <div>
            
        </div>
    )
}
