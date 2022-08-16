const { Router, } = require('express');
const express = require('express');
const {getPokeByApi,searchName,pokeDataBase,getPokeById,saveTypesPokemon} = require("./functions")
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const logger = require('morgan')


const router = Router();
router.use(express.json())

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.get("/pokemon", async (req,res,next) => {
    let {name} = req.query;
    if(name){
        try{
            const poke = await searchName(name)
            // console.log(poke,"holaaaaaaaaa")
            if(poke !== null) res.json(poke)
            else res.json({msg: "el  pokemon no existe"})
        }catch(err){
            res.send({mensage:"el pokemon no existe"})
        }
    }else{
        const allPokemons = await getPokeByApi()
        res.send(allPokemons)
    }
})

router.get("/pokemon/:id", async (req,res,next) => {
    let {id} = req.params;
    try{
        if(id) {
            const pokeId = await getPokeById(id);
            if(pokeId) res.json(pokeId)
            else res.status(404).json({error:"el id no existe"})
        }
    }catch(error){
        console.log(error)
        next(error)
    }
})

router.post("/pokemons", async (req,res,next) => {
    let info = req.body;
    if(info){
        try{
            const newPoke = await pokeDataBase(info)
            res.send(newPoke)
        }catch(error){
            console.log(error)
            next(error)
        }
    }
})

router.get("/type", async (req,res,next) => {
    try{
        const type = await saveTypesPokemon()
        res.json(type)
    }catch(error){
        next(error)
    }
})

module.exports = router;
