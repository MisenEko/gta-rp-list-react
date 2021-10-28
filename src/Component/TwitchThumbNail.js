import React, {useState, useEffect, useRef} from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {v4 as uuidv4} from 'uuid'

export default function TwitchShowStream() {

    const {streamData} = useSelector(state => ({
        ...state.TwitchData
    }))

    return (
        <>
            {streamData.data && streamData.data.map( item => {
                return (
                    <img key ={uuidv4()} src={`https://static-cdn.jtvnw.net/previews-ttv/live_user_${item.user_login}-440x248.jpg`} />
                )
            })} 
        </>
    )
}
