import React from 'react'
import './banner.css'
import banner from '../Img/img/banner.png'

export default function Banner(props) {
    return (
        <div className="banner">
            <img src={banner} /> '
            {props.serverBanner}
        </div>
    )
}
