import React from "react";
import Search from "../Search/Search";
import {Link} from "react-router-dom";
import FiltersTypes from "../Filters/FiltersTypes";
import "./NavBar.css"

const NavBar = () => {



    return(
        <div>
            <div>
            <Link className="logo" to="/">
                <img 
                src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Pok%C3%A9_Ball_icon.svg/640px-Pok%C3%A9_Ball_icon.svg.png"
                width="50" height="50" alt="" 
                />
            </Link>
            <Search/>
            </div>
            <div className="botones">
            <Link className="new-pokes" to="/pokemon/create/newpokemon">create pokemon</Link>
            <FiltersTypes/>
            </div>
            
        </div>
    )
}

export default NavBar;