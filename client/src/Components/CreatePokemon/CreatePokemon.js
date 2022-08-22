import React, { useEffect, useState } from "react";
import "./CreatePokemon.css";
import {Link} from "react-router-dom"
import { useDispatch, useSelector } from "react-redux";
import { createPokemon, getTipos } from "../../Redux/actions";




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
        console.log(input)
        if(!input.name) errors.name = "este campo es obligatorio"
        if(typeof input.life !== "number") errors.life = "debe poner un numero"
        if(typeof input.life === "number") errors.life = ""
        if(typeof input.force !== "number") errors.force = "debe poner un numero"
        if(typeof input.force === "number") errors.force = ""
        if(typeof input.speed !== "number") errors.speed = "debe poner un numero"
        if(typeof input.speed === "number") errors.speed = ""
        if(typeof input.defense !== "number") errors.defense = "debe poner un numero"
        if(typeof input.defense === "number") errors.defense = ""
        if(typeof input.heigth !== "number") errors.heigth = "debe poner un numero"
        if(typeof input.heigth === "number") errors.heigth = ""
        if(typeof input.weigth !== "number") errors.weigth = "debe poner un numero"
        if(typeof input.weigth === "number") errors.weigth = ""
        // if(input.img.includes("pgn" || "jpg")) errors.heigth = "la direccion de imagen no es valida"
        return errors
    }

    // const [type, setTypes] = useState([])

    const [error, setError] = useState({})
    console.log(error)

    const {tipos} = useSelector(state => state)
    // const tiposName = tipos
    // console.log(input.tipos)
    const dispatch = useDispatch()
    // console.log(tipos)

    // console.log(input)

    const handleOnChange = (e) =>{
        let {name, value} = e.target
        console.log(name)
        console.log(e.target.name)
        setInput({
            ...input,
            [e.target.name]: e.target.value
        })
        setError(validation({
            [name]:value
        }))
        // if(e.target.name === "name"){
        //     setError(validation({
        //         [e.target.name]:e.target.value
        //     }))
        // }
    }

    useEffect(()=>{
        if(tipos.length === 0) dispatch(getTipos())
    },[dispatch])
    
    const handleSelector = (e) => {
        let {name,value} = e.target;
        // console.log(value)
        // console.log(tipos)
        // if(type.some(e => e.id === value)){
        //     console.log("holllalaal")
        //     setTypes(type.filter(e => e.id !== value))
        // }else{
        //     setTypes([
        //         ...type,
        //         tiposName[value-1]
        //     ])
        //     console.log(type)
        // }
        
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

    const handleOnSubmit = (e) =>{
        e.preventDefault()
        console.log(Object.keys(error))
        // if(error) {
        //     dispatch(createPokemon(input))
        //     alert("el pokemon se creo")
        // }
        // else alert("no se creo un nuevo pokemon")
        // setInput({
        //     name:"",
        //     img:"",
        //     heigth:"",
        //     weigth:"",
        //     life:"",
        //     force:"",
        //     speed:"",
        //     defense:"",
        //     tipos:[]
        // })
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
        </div>
    )
}

export default CreatePokemon;