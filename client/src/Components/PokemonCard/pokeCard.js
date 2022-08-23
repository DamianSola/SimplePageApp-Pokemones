import React from "react";
import "./pokeCard.css";
import {Link} from "react-router-dom"
import { useSelector } from "react-redux";

const PokeCard = (info) =>{

    // let types = useSelector(state => state)
    let {name, img, tipos, id} = info
    
    // let ty = types.filter(e => e.id.includes(tipos))
    if(tipos) tipos = tipos.map(e => e.name?e.name:e)



    return(
        <div className="container-card">
            {id?<Link to={`pokemon/${id}`}>
            <img id="img" src={img}/>
            </Link>:<img id="img" src={img}/>}
            <h4>{name}</h4>
            {tipos &&  tipos.map(e => <a key={e}>{e+" "}</a>)}
        </div>
    )
}

export default PokeCard;