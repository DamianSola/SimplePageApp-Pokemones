import { useEffect , useState} from "react";
import React from "react-dom";
import { useDispatch, useSelector } from "react-redux";
import {getAllPokemons, getTipos} from "../../Redux/actions"
import Loading from "../Loading/Loading";
import NavBar from "../NavBar/NavBar";
import Pagination from "../Pagination/Pagination";
import PokeCard from "../PokemonCard/pokeCard";
import "./Home.css";


const Home = () => {

    const {allPokemons, loading} = useSelector(state => state)
    console.log(allPokemons)
    const dispatch = useDispatch()

    const [currentPage, setCurrentPage] = useState(1)
    const [pokesPerPage, setPokesPerPage] = useState(12)
    const indexUltpoke = currentPage*pokesPerPage;
    const indexFirstPoke = indexUltpoke-pokesPerPage;
    const currentPokes = allPokemons.slice(indexFirstPoke,indexUltpoke) 

    const page = (numPage) =>{
        setCurrentPage(numPage)
    }

    

    useEffect(()=>{
        dispatch(getAllPokemons());
        dispatch(getTipos())
    },[])


    return(
        <div className="contain">
            <NavBar/>
            <br/>
            <Pagination  
             pokesPerPage= {pokesPerPage}
             totalPokes= {allPokemons.length}
             page = {page} />
        <div className="container-home">
            {currentPokes && currentPokes.map(e => {
                return(
                    <PokeCard
                    name={e.name?e.name:"no existe"}
                    img={e.img?e.img:"https://png.pngitem.com/pimgs/s/20-201700_pokeball-pokeball-vector-hd-png-download.png"}
                    tipos={e.tipos}
                    key={e.id?e.id:"nnn"}
                    id={e.id}
                    />
                    )
                })}
        </div>
        {loading && <Loading/>}
        </div>
    )
}



export default Home;