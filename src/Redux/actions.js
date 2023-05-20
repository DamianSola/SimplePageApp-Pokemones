import axios from "axios";
const url = "https://pokemonapi-i0tn.onrender.com/"


const getAllPokemons = () => {
    return (dispatch) => {
        return axios(url+"pokemon")
        .then((res) => {
            dispatch({
                type: "GET_ALL_POKEMON",
                payload: res.data
            })
        })
    }
}

const getPokeById = (id) => {
    return (dispatch) => {
        return axios(`${url}pokemon/${id}`)
        .then((res) => {
            dispatch({
                type: "GET_POKE_BY_ID",
                payload: res.data
            })
        })
    }
}

const getPokeByName = (name) =>{
    return (dispatch) => {
        return axios.get(`${url}pokemon?name=${name}`)
        .then((res) => {
            dispatch({
                type: "GET_POKEMON_BY_NAME",
                payload: res.data
            })
        })
    }
}

const getTipos  = () => {
    return (dispatch) => {
        return axios.get(url+"type")
        .then((res => {
            dispatch({
                type: "GET_TYPES",
                payload: res.data
            })
        }))
    }
}

const fiterTipos = (type) => {
    return{
        type: "FILTER_TIPOS",
        payload: type
    }
}
const filterNewPoke = () => {
    return{
        type: "FILTER_NEW_POKES"
    }
}

const createPokemon = (info) => {
    return () => {
        axios.post(url+"pokemons",info)
    }
} 

const allPokes = () => {
    return{
        type:"ALL_POKES"
    }
}

const orderAlf = (data) => {
    if(data){
        return{
            type:"ORDER_ALF"
        }
    }else{
        return{
            type: "ORDER_ALF_REVERSE"
        }
    }
}

const orderForce = (data) => {
    if(data){
        return{
            type:"ORDER_MAX_FORCE"
        }
    }else{
        return{
            type:"ORDER_MIN_FORCE"
        }
    }
}

const removePokeDetail = () => {
    return{
        type: "REMOVE_POKE_DETAIL"
    }
}

export {
    getAllPokemons,
    getPokeById,
    getPokeByName,
    getTipos,
    fiterTipos,
    filterNewPoke,
    createPokemon,
    allPokes,
    orderAlf,
    orderForce,
    removePokeDetail
};