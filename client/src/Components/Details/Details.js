import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import {getPokeById, removePokeDetail}  from "../../Redux/actions";
import { useParams,Link } from 'react-router-dom';
import Loading from "../Loading/Loading"
import "./Details.css"


const Details = () => {

    const {id} = useParams()
    const {pokeInfo,loading} = useSelector(state => state)
    const dispatch = useDispatch()
    // console.log(id)

    useEffect(()=>{
        dispatch(removePokeDetail())
        dispatch(getPokeById(id))
    },[])
    console.log(pokeInfo.tipos)

    return(
        <div>
            {pokeInfo && <div className="container-details">
            <Link className="back" to='/pokemon'>back</Link>

            <h3>{pokeInfo.name}</h3>
            {loading && <Loading/>}
            <img id="img-detail" src={pokeInfo.img}/>
            <br/>
            {pokeInfo.tipos && pokeInfo.tipos.map(e => <a className="tiposs" key={e.id?e.id:e}>{e.name?e.name+" ":e+" "}</a>)}
            <div className="cont-det-2">
            <p>life: {pokeInfo.life}</p>
            <p>force: {pokeInfo.force}</p>
            </div>
            <div className="cont-det-2">
            <p>defense: {pokeInfo.defense}</p>
            <p>speed: {pokeInfo.speed}</p>
            </div>
            <div className="cont-det-2">
            <p>weight: {pokeInfo.weight}</p>
            <p>weight: {pokeInfo.height}</p>
            </div>
            </div>}
        </div>
    )
}

export default Details;