import React from "react";
import "./pokeCard.css";
import {Link} from "react-router-dom"

const PokeCard = (info) =>{
    let {name, img, tipos, id} = info

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