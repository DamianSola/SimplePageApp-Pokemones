import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { getPokeByName } from "../../Redux/actions";
import "./Search.css"

const Search = () => {

    let [input, setInput] = useState("")

    const handleOnChange = (e) => {
        setInput(e.target.value)
    }

    const dispatch = useDispatch()

    const handleOnClick = (e) => {
        e.preventDefault()
        dispatch(getPokeByName(input))
        setInput("")
    }


    return(
        <div>
            <input className="input-search" type="text" placeholder="pokemons..." 
            onChange={handleOnChange}
            value={input}/>
            <button className="search"  type="submit" onClick={handleOnClick} >search</button>
            {/* <input type="submit"/> */}
        </div>
    )
}

export default Search;
