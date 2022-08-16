import React from "react";
import { useDispatch, useSelector } from "react-redux";
import {fiterTipos,filterNewPoke, orderAlf,allPokes,orderForce} from "../../Redux/actions";
import "./Filter.css";


const FilterTypes = () => { 

    const {tipos} = useSelector(state => state)
    const dispatch = useDispatch()
    console.log(tipos)

    const handleOnClick = (e) => {
        console.log(e.target.value)
        dispatch(fiterTipos(e.target.value))
    }
    const handleOnClick2 = () => {
        dispatch(filterNewPoke())
    }

    const allPokesAgain = () => {
        dispatch(allPokes())
    }

    const pokesInOrder = (data) => {
        dispatch(orderAlf(data))
    }

    const pokesInOrderForce = (data) =>{
        dispatch(orderForce(data))
    }



    return(
        <div className="items">
            <select className="types" onChange={handleOnClick}>
                {tipos && tipos.map(e => {
                    return <option value={e.name} key={e.id}>{e.name}</option>
                })}
            </select>
            <button className="types" type="submit" onClick={handleOnClick2}>new pokemons</button>
            <button className="types" onClick={() => pokesInOrder(true)}>a-z</button>
            <button className="types" onClick={() => pokesInOrder(false)}>z-a</button>
            <button className="types" onClick={allPokesAgain}>all pokemons</button>
            <button className="types" onClick={() => pokesInOrderForce(true)}>force +</button>
            <button className="types" onClick={() => pokesInOrderForce(false)}>force -</button>

        </div>
    )
}

export default FilterTypes;