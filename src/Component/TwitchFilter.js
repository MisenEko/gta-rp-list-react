import React, {useState} from 'react'
import './twitchfilter.css'
//import { getAllStreams } from '../redux/reducers/TwitchData'
import {useDispatch } from 'react-redux'


export default function TwitchFilter(props) {

    const dispatch = useDispatch()

    /*const {oAuthKey,refresh} = useSelector(state => ({
        ...state.TwitchKey       
    })) */
    

    const noFilter = () => {
        //dispatch(getAllStreams(oAuthKey.access_token))
        dispatch({
            type: 'FILTEREDDATA',
            payload: ['del']
        })
    }

    const streamFilter = (nameRegex) => {
        const filteredData = props.gtaData.filter(data => data.title.toLowerCase().match(nameRegex))
        dispatch({
            type: 'FILTEREDDATA',
            payload: filteredData
        })
    }

    return (
        <div className="filter-content">

             <div className="button" id="button-4" onClick={noFilter}>
                <div id="underline"></div>
                Reset Filter
            </div>
            <div className="button" id="button-4"onClick={() => {streamFilter((/21\s?jump\s?click/g))}}>
                <div id="underline"></div>
                21 Jump Click
            </div>
            <div className="button" id="button-4" onClick={() => {streamFilter((/faily\s?v/g))}}>
                <div id="underline"></div>
                Faily V
            </div>
            <div className="button" id="button-4" onClick={() => {streamFilter((/unserveur\s?v/g))}}>
                <div id="underline"></div>
                serveur
            </div>

        </div>
    )
}
