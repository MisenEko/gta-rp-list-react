import React, {useEffect ,useState, useSelector} from 'react'
import './twitchfilter.css'
import {getAllStreams} from '../redux/reducers/TwitchData'
import {useDispatch} from 'react-redux'
import {v4 as uuidv4} from 'uuid'
import menu from '../Img/icons/icons8-menu.svg'


export default function TwitchFilter(props) {

    const [toggleMenu, setToggleMenu] = useState(false)
    const [largeur, setLargeur] = useState(window.innerWidth)

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

    useEffect(()=> {
        const changeWidth = () => {
            setLargeur(window.innerWidth)
        }
        window.addEventListener('resize', changeWidth)

        return () => {
            window.removeEventListener('resize', changeWidth)
        }
    },[])

    
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
    const streamFilter = (nameRegex, name) => {        
        const filteredData = props.gtaData.filter(data => data.title.toLowerCase().match(nameRegex))
        const serverName = name
        dispatch({
            type: 'FILTEREDDATA',
            payload: filteredData, 
            namePayload : serverName
        })
    }

    const toogleNav = () => {
        setToggleMenu(!toggleMenu)
    }

  
    return (
        
        <nav  className="filter-content">

            <div className="menu-button" onClick={toogleNav}>
                    
                        <img src={menu} alt=''/>

            </div>

            {(toggleMenu || largeur > 680) && (
            <ul>            
                <li className="button" id="button-4" onClick={noFilter}>
                    <div id={largeur < 680 ? " " : "underline"}></div>
                    Reset Filter
                </li>   

                {serveurList.map((item) => {
                    return(  <li className="button" id="button-4" key={uuidv4()}  onClick={() => {streamFilter(item.regex, item.nom); toogleNav()}}>
                                <div id={largeur < 680 ? " " : "underline"}></div>
                                <div className="button-content">
                                    <div>{item.nom}</div>
                                    <div style={{color: 'red'}}>{item.data.length} {item.data.length <= 1 ? 'live' : 'lives'}</div>
                                </div>
                            </li>)
                    })}
            </ul>
            )}
            
        </nav>
    )
}
