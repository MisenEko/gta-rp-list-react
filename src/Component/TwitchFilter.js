import React, {useState} from 'react'
import { useSelector, useDispatch } from 'react-redux'


export default function TwitchFilter(props) {

    const dispatch = useDispatch()

 


    //if(props.gtaData.data){console.log(props.gtaData.data[0].id)}

    const filter21JC = () => {
        const filteredData = props.gtaData.filter(data => data.title.toLowerCase().match((/21\s?jump\s?click/g)))
        dispatch({
            type: 'FILTEREDDATA',
            payload: filteredData
        })


    }    
    
    const filterFaily = () => {
        const filteredData = props.gtaData.filter(data => data.title.toLowerCase().match((/faily\s?v/g)))
        dispatch({
            type: 'FILTEREDDATA',
            payload: filteredData
        })


    }



    return (
        <div>
            <button
            onClick={filter21JC}>21 Jump Click</button>
            <button
            onClick={filterFaily}>Faily V</button>
        </div>
    )
}
