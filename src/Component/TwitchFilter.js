import React, {useEffect ,useState, useSelector} from 'react'
import './twitchfilter.css'
import {getAllStreams} from '../redux/reducers/TwitchData'
import {useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid'


export default function TwitchFilter(props) {

    const [serveurList, setServeurList] = useState([
        {   nom : 'Altica',
            regex : (/altica+/g),
            data: []
        },

        {   nom : "21 Jump Click",
            regex : (/21\s?jump\s?click/g),
            data: []
        },

        {   nom : "Faily V",
            regex : (/faily\s?v/g),
            data: []
        },

        {   nom : "Manzibar",
            regex : (/manzibar+/g),
            data: []
        },

        {   nom : "test sans serveur",
            regex : (/unserveur\s?v/g),
            data: []
        }
    ])

    const dispatch = useDispatch()  

    const serveurCount = () => {
        const newServeurlist = [...serveurList]            
        newServeurlist.map(item => item.data = props.gtaData.filter(data => data.title.toLowerCase().match(item.regex)))
        setServeurList(newServeurlist)            
    }



  
    useEffect(() => {
        serveurCount()
    }, [props.gtaData])

    
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

  
    return (
        
        <div className="filter-content">
            
            <div className="button" id="button-4" onClick={noFilter}>
                <div id="underline"></div>
                Reset Filter
            </div>   

            {serveurList.map((item) => {
               return(  <div className="button" id="button-4" key={uuidv4()}  onClick={() => {streamFilter(item.regex)}}>
                            <div id="underline" key={uuidv4()}></div>
                            <div className="button-content">
                                <div>{item.nom}</div>
                                <div style={{color: 'lightsalmon'}}>{item.data.length} lives</div>
                            </div>
                        </div>)
                })}

        </div>
    )
}
