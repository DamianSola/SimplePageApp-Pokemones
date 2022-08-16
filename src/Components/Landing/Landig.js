import React from "react";
import {Link} from "react-router-dom";
import "./Landing.css"

export const Landing = () => {

    return(
        <div className="cont-land">
            <div class="container-landing">
                <h3>SIMPLE PAGE APLICATION</h3>
                <h4>Tema: Pokemones</h4>
                <h5>DAMIÁN SOLÁ</h5>
               
            </div>
            <Link to="/pokemon"><button className="lets-go">LETS GO!</button></Link>
            <h3>Esta app fue desarrollada con:</h3>
                <li className="list">
                    <a className="element">JAVASCRIPT</a>
                    <a className="element">REACT</a>
                    <a className="element">REDUX</a>
                    <a className="element">EXPRESS</a>
                    <a className="element">SEQUELIZE</a>
                    <a className="element">POSTGRESS SQL</a>
                </li>
        </div>
    )
}
