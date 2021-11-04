import React, {useSelector ,useState, useRef} from 'react'
import './twitchfilter.css'
import {getAllStreams} from '../redux/reducers/TwitchData'
import {useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid'


export default function TwitchFilter(props) {

    const dispatch = useDispatch()  

    let streamList = props.streamList
    const initialRender = useRef(false);

    console.log(streamList)
    console.log(props.streamList)
    
    streamList[0].data.push('test')
   // props.gtaData.filter(data => data.title.toLowerCase().match((/21\s?jump\s?click/g)))
    
    /**  button to reset and refresh all streams*/
    const noFilter = () => {
        dispatch({
            type: 'TWITCHDATA',
            payload: []})
        dispatch(getAllStreams(props.twitchKey))
        dispatch({
            type: 'FILTEREDDATA',
            payload: ['del']
        })
    }

    /** create button with server list*/
    const streamFilter = (nameRegex) => {
        const filteredData = props.gtaData.filter(data => data.title.toLowerCase().match(nameRegex))
        dispatch({
            type: 'FILTEREDDATA',
            payload: filteredData
        })
    }

  

    const countFilter = (gtaData) => {

    }

    return (
        <div className="filter-content">
            
            <div className="button" id="button-4" onClick={noFilter}>
                <div id="underline"></div>
                Reset Filter
            </div>   

            {streamList.map((item) => {
               return(  <div className="button" id="button-4" key={uuidv4()}  onClick={() => {streamFilter(item.regex)}}>
                            <div id="underline" key={uuidv4()}></div>
                            {item.nom}
                        </div>)
                
            })}

        </div>
    )
}
