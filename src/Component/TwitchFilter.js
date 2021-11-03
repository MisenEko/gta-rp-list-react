import React, {useSelector ,useState} from 'react'
import './twitchfilter.css'
import { getAllStreams } from '../redux/reducers/TwitchData'
import {useDispatch } from 'react-redux'
import {v4 as uuidv4} from 'uuid'


export default function TwitchFilter(props) {

    const serveurList = [
        {   nom : 'Altica',
            regex : (/altica+/g)
        },

        {   nom : "21 Jump Click",
            regex : (/21\s?jump\s?click/g)
        },

        {   nom : "Faily V",
            regex : (/faily\s?v/g)
        },
        {   nom : "Manzibar",
            regex : (/manzibar+/g)
        },
        {   nom : "test sans serveur",
            regex : (/unserveur\s?v/g)
        }
    ]

    const dispatch = useDispatch()    

    const noFilter = () => {
        dispatch({type: 'TWITCHDATA', payload: []})
        dispatch(getAllStreams(props.twitchKey))
        dispatch({
            type: 'FILTEREDDATA',
            payload: ['del']
        })
    }

    const streamFilter = (nameRegex) => {
        console.log(serveurList[0].regex)
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

            {serveurList.map((item) => {
               return(  <div className="button" id="button-4" key={uuidv4()}  onClick={() => {streamFilter(item.regex)}}>
                            <div id="underline" key={uuidv4()}></div>
                            {item.nom}
                        </div>)
                
            })}

        </div>
    )
}

    /** Keeping it in case of  */
         {/*<div className="button" id="button-4"onClick={() => {streamFilter((/21\s?jump\s?click/g))}}>
                <div id="underline"></div>
                21 Jump Click
            </div>
            <div className="button" id="button-4" onClick={() => {streamFilter((/faily\s?v/g))}}>
                <div id="underline"></div>
                Faily V
            </div>
            <div className="button" id="button-4" onClick={() => {streamFilter((/altica+/g))}}>
                <div id="underline"></div>
                Altica 
            </div>
            <div className="button" id="button-4" onClick={() => {streamFilter((/manzibar+/g))}}>
                <div id="underline"></div>
                Manzibar
            </div>
            <div className="button" id="button-4" onClick={() => {streamFilter((/unserveur\s?v/g))}}>
                <div id="underline"></div>
                test sans serveur 
            </div>*/}
