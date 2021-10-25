import React from 'react'
import { useSelector } from "react-redux";



const log = useSelector(state => state.secretResponse)

console.log(log)

export default function TwitchData() {
    return (
        <div>

        </div>
    )
}
