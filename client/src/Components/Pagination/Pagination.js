import React from "react";
import "./Pagination.css"


const Pagination = (info) =>{
    const {page, pokesPerPage,totalPokes} = info;
    const numPage = []

    if(totalPokes <= Math.ceil(totalPokes/pokesPerPage)){
        return (<div></div>)
    }else {
        for(let i=0; i<= Math.ceil(totalPokes/pokesPerPage); i++ ){
            numPage.push(i)
        }
        return(
        <nav>
            <ul>
                {numPage.map((arg) => {
                    if(arg !== 0){
                        return <button className="number" key={arg} onClick={() => page(arg)}>{arg}</button>
                    }
                })}
            </ul>
        </nav>
        )
    }


}

export default Pagination;
