import React, {useState, useEffect, useRef} from 'react'
import './thumbnail.css'
import { useSelector, useDispatch } from 'react-redux'


export default function TwitchShowStream(props) {


    return (
        <div className="thumbnail-content fade-in-image ">
            {props.children}
        </div>
    )
}
