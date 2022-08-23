import React, { useEffect, useState } from "react";
import "./CreatePokemon.css";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getTipos } from "../../Redux/actions";
import Card from "../PokemonCard/pokeCard"




const CreatePokemon = () => {

    const [input, setInput] = useState({
        name:"",
        img:"",
        heigth:"",
        weigth:"",
        life:"",
        force:"",
        speed:"",
        defense:"",
        tipos:[]
    })



    const validation = (input) => {
        let errors = {}
        function isNumeric(val) {
            return /^-?\d+$/.test(val);
        }

        if(input.name.length === 0) errors.name = "este campo es obligatorio"
        if(!isNumeric(input.heigth) || input.heigth.length === 0) errors.heigth = "debe poner un numero";
        if(!isNumeric(input.weigth) || input.weigth.length === 0) errors.weigth = "debe poner un numero";
        if(!isNumeric(input.life) || input.life.length === 0) errors.life = "debe poner un numero";
        if(!isNumeric(input.speed) || input.speed.length === 0) errors.speed = "debe poner un numero";
        if(!isNumeric(input.force) || input.force.length === 0) errors.force = "debe poner un numero";
        if(!isNumeric(input.defense) || input.defense.length === 0) errors.defense = "debe poner un numero";

        return errors
    }


    const [error, setError] = useState({})
    console.log(error)

    const {tipos} = useSelector(state => state)
    const dispatch = useDispatch()


    const handleOnChange = (e) =>{
        let {name, value} = e.target
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validation({
            ...input,
            [name]:value
        }))
    }

    useEffect(()=>{
        if(tipos.length === 0) dispatch(getTipos())
    },[dispatch])
    
    const handleSelector = (e) => {
        let {name,value} = e.target;
     
        
        if(input.tipos.includes(value)){
            setInput({
                ...input,
                tipos: input.tipos.filter(e => e !== value)
            })
        }else{
            setInput({
                ...input,
                tipos: [...input.tipos, value]
            })
        }
    }

    const handleOnSubmit = async (e) =>{
        e.preventDefault()
        if(Object.keys(error).length === 0) {
            dispatch(createPokemon(input))
            alert("el pokemon fue creado")
        }
        else alert("no se creo un nuevo pokemon")
        setInput({
            name:"",
            img:"",
            heigth:"",
            weigth:"",
            life:"",
            force:"",
            speed:"",
            defense:"",
            tipos:[]
        })
    }



    return(
        <div className="container-form">
            <Link to="/pokemon" className="back">back</Link>
            <br/>
            <form onSubmit={(e)=> handleOnSubmit(e)} className="form">
                <div>
                <label>name: </label>
                <input className="inputs" type="text" onChange={(e)=>handleOnChange(e)}  name="name" value={input.name}/>
                {error.name && <a className="error">{error.name}</a>}
                <br/>
                <label>type: </label>
                <select className="select-type" name="tipos" onChange={(e)=>handleSelector(e)} value={input.tipos} multiple>
                    {tipos && tipos.map((e,k) => {
                        return <option key={k} value={e.id}>{e.name}</option>
                    })}
                </select>
                {/* {type && type.map(e => <a key={e.id}>{e.name+", "}</a>)} */}
                </div>
                <div>
                <label>image: </label>
                <input className="inputs" name="img"  onChange={(e)=>handleOnChange(e)} value={input.img} />
                <br/>
                <label>height: </label>
                <input className="inputs" name="heigth"  onChange={(e)=>handleOnChange(e)} value={input.heigth}/>
                {error.heigth && <p className="error">{error.heigth}</p>}
                <label>weigth: </label>
                <input className="inputs" name="weigth"  onChange={(e)=>handleOnChange(e)} value={input.weigth}/>
                {error.weigth && <p className="error">{error.weigth}</p>}

                <br/>
                </div>

                <div>                
                <label>life: </label>
                <input className="inputs" name="life"  onChange={(e)=>handleOnChange(e)}  value={input.life}/>
                {error.life && <p className="error">{error.life}</p>}
                <label>force: </label>
                <input className="inputs" name="force"  onChange={(e)=>handleOnChange(e)}  value={input.force}/>
                {error.force && <p className="error">{error.force}</p>}

                <br/>
                </div>
                <div>
                <label>speed: </label>
                <input className="inputs" name="speed"  onChange={(e)=>handleOnChange(e)} value={input.speed}/>
                {error.speed && <p className="error">{error.speed}</p>}
                <label>defense: </label>
                <input className="inputs" name="defense" onChange={(e)=>handleOnChange(e)} value={input.defense}/>
                {error.defense && <p className="error">{error.defense}</p>}
                <br/>
                <input className="btn-create" type="submit" value="create"/>
                </div>
            </form>
            <div className="cardPoke">
                <Card name= {input.name}  img={input.img} tipos={input.tipos}/>
            </div>
        </div>
    )
}

export default CreatePokemon;