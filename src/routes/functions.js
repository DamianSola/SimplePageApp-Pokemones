const axios = require("axios")
const {Pokemon,Tipos} = require("../db")


async function  getPokeByApi () { // PARA TRAER TODOS LO POKEMONES DE LA API
    // const allPoke = []
   
    // let num = 1;
    const allPokeFromDDBB = await Pokemon.findAll({include: Tipos})
    // console.log(allPokeFromDDBB)
    // while(num < 40){
    //     const infoApi = await axios.get(` https://pokeapi.co/api/v2/pokemon/${num}`)
    //     // console.log(infoApi.data) 
    //     allPoke.push({ 
    //         name: infoApi.data.name,
    //         img: infoApi.data.sprites.other.dream_world.front_default,
    //         life: infoApi.data.stats[0].base_stat,
    //         force: infoApi.data.stats[1].base_stat,
    //         defense: infoApi.data.stats[2].base_stat,
    //         speed: infoApi.data.stats[5].base_stat,
    //         tipos: infoApi.data.types.map(e => e.type.name),
    //         weight: infoApi.data.weight,
    //         height: infoApi.data.height,
    //         id: infoApi.data.id
    //     })
    //     num += 1 
    // }

    const pokesApi = await axios.get("https://pokeapi.co/api/v2/pokemon/?offset=0&limit=40")
    const result = pokesApi.data.results.map(e => axios.get(e.url))
    const promesa = await Promise.all(result)
    // console.log(promesa)
    const aux = promesa.map(e => {
        return {
            name: e.data.name,
            img: e.data.sprites.other.dream_world.front_default,
            life: e.data.stats[0].base_stat,
            force: e.data.stats[1].base_stat,
            defense: e.data.stats[2].base_stat,
            speed: e.data.stats[5].base_stat,
            tipos: e.data.types.map(e => e.type.name),
            weight: e.data.weight,
            height: e.data.height,
            id: e.data.id
        }
    })
    let results = allPokeFromDDBB.concat(aux)
    return results
}




async function searchName(name){ // BUSCA UN POKEMON POR SU NOMBRE
    const pokeApi = await Pokemon.findOne({where:{name}, include:Tipos.name})
    if(pokeApi) {
        // pokeApi.tipos = pokeApi.tipos.map(e => e.name)
        // console.log(pokeApi)
        return pokeApi;
    }
    const onePoke = await axios.get(`https://pokeapi.co/api/v2/pokemon/${name}`)
    const pokemon = {
        name: onePoke.data.name,
        img: onePoke.data.sprites.other.dream_world.front_default,
        life: onePoke.data.stats[0].base_stat,
        force: onePoke.data.stats[1].base_stat,
        defense: onePoke.data.stats[2].base_stat,
        speed: onePoke.data.stats[5].base_stat,
        tipos: onePoke.data.types.map(e => e.type.name),
        weight: onePoke.data.weight,
        height: onePoke.data.height,
        id: onePoke.data.id
    }
    return pokemon  
}

async function pokeDataBase(info){ //CREO UN POKEMON Y LO GUARDO EN LA BASE DE DATOS
    let {name,img,force,defense,speed,tipos,weight,height,life} = info;
    if(!name) return "se require el nombre para poder crear un nuevo pokemon"
    let c = await Tipos.count()
    if(c === 0) await saveTypesPokemon()
    console.log(tipos)
    if(tipos.length === 0) tipos = 1
    console.log(tipos)
    const newPke = await Pokemon.create({
        name:name,
        img:img?img:"https://cdn-icons-png.flaticon.com/512/528/528101.png",
        force:force?force:0,
        life:life?life:0,
        defense:defense?defense:0,
        speed:speed?speed:0,
        weight:weight?weight:0,
        height:height?height:0
    })
    await newPke.addTipo(tipos)
    return newPke;
}

async function getPokeById(id){ // LLAMAMOS AL POKEMON POR SU ID
    if(id.length > 4){
        const pokeDb = await Pokemon.findOne({where:{id:id},include: Tipos})
        return pokeDb
    }else{
        const pokeApi = await axios.get(`https://pokeapi.co/api/v2/pokemon/${id}`)
        const pokemon = {
            name: pokeApi.data.name,
            img: pokeApi.data.sprites.other.dream_world.front_default,
            life: pokeApi.data.stats[0].base_stat,
            force: pokeApi.data.stats[1].base_stat,
            defense: pokeApi.data.stats[2].base_stat,
            speed: pokeApi.data.stats[5].base_stat,
            tipos: pokeApi.data.types.map(e => e.type.name),
            weight: pokeApi.data.weight,
            height: pokeApi.data.height,
            id: pokeApi.data.id
        }
        // console.log(pokemon)
        return pokemon
    }
}
async function saveTypesPokemon(){
    let verificate = await Tipos.count()
    if(verificate === 0){
        const typesApi = await axios.get("https://pokeapi.co/api/v2/type")
        const typeDb = await typesApi.data.results.map(async e =>{
            return await Tipos.create({
                name: e.name
            })
        })
        await Promise.all(typeDb) 
    }
    const types = await Tipos.findAll()
    return types
}



module.exports= {getPokeByApi,searchName,pokeDataBase,getPokeById,saveTypesPokemon}