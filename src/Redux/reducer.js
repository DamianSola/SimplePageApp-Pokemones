

const intialState = {
    allPokemons: [],
    allPokemons2: [],
    pokeInfo: {},
    tipos: [],
    loading: true
}

function formula(data){
    let number1 = data.map(e => e.force)
    if(number1[0] > 99){
      number1.map(e => e-100)
    } 
    number1 = number1.sort()
    number1 = number1.filter((item,index)=>{
        return number1.indexOf(item) === index;
    })
    let ordenadosMin = []
    for(let i = 0; i<number1.length; i++){
      let f1 = data.filter(e => e.force === number1[i])
    ordenadosMin = ordenadosMin.concat(f1)
    }
     return ordenadosMin
   } 



 
const rootReducer = (state= intialState, action) =>{
    switch(action.type){
        case "GET_ALL_POKEMON":
            return{
                ...state,
                allPokemons: action.payload,
                allPokemons2: action.payload,
                loading: false
            }
        case "GET_POKE_BY_ID":
            return{
                ...state,
                pokeInfo: action.payload,
                loading: false
            }
        case "GET_POKEMON_BY_NAME":
            return{
                ...state,
                allPokemons: [action.payload],
            }
        case "GET_TYPES": 
            return{
                ...state,
                tipos: action.payload
            }
        case "FILTER_TIPOS":
            let pokes = state.allPokemons2
            let filtByTypes = pokes.filter(e => e.tipos.includes(action.payload))
            console.log(filtByTypes)
            return{
                ...state,
                allPokemons: filtByTypes
            }
        case "FILTER_NEW_POKES":
            let allpokes  = state.allPokemons2
            let newPokes = allpokes.filter(e => e.id.length > 5)
            return {
                ...state,
                allPokemons: newPokes
            }
        case "ALL_POKES":
            return{
                ...state,
                allPokemons: state.allPokemons2
            }
        case "ORDER_ALF":
            let inOrderPokes = state.allPokemons2
            let letras = inOrderPokes.map(e => e.name[0])
            letras = letras.sort()
            letras = letras.filter((item,index)=>{
                return letras.indexOf(item) === index;
            })
            let ordenados = []
            for(let i = 0; i<letras.length; i++){
              let l = inOrderPokes.filter(e => e.name[0] === letras[i])
            ordenados = ordenados.concat(l)
            }
            return{
                ...state,
                allPokemons: ordenados
            }
        case "ORDER_ALF_REVERSE":
            let reversePokes = state.allPokemons2
            let letras1 = reversePokes.map(e => e.name[0])
            letras1 = letras1.sort()
            letras1 = letras1.filter((item,index)=>{
                return letras1.indexOf(item) === index;
            })
            let reveses = []
            for(let i = 0; i<letras1.length; i++){
              let zz = reversePokes.filter(e => e.name[0] === letras1[i])
              reveses = reveses.concat(zz)
            }
            return{
                ...state,
                allPokemons: reveses.reverse()
            }
        case "ORDER_MAX_FORCE":
            let minOrderPokes1 = state.allPokemons2
            let men1001 = minOrderPokes1.filter(e => e.force < 100)
            let mas1001 = minOrderPokes1.filter(e => e.force > 99)
            let array11 = formula(mas1001) 
            let array21 = formula(men1001)
            let ordenadosMax = array21.concat(array11)
            return{
                ...state,
                allPokemons: ordenadosMax.reverse()
            }
        case "ORDER_MIN_FORCE":
            let minOrderPokes = state.allPokemons2
            let men100 = minOrderPokes.filter(e => e.force < 100)
            let mas100 = minOrderPokes.filter(e => e.force > 99)
            let array1 = formula(mas100) 
            let array2 = formula(men100)
            let ordenadosMin = array2.concat(array1)
            return{
                ...state,
                allPokemons: ordenadosMin
            }
        case "REMOVE_POKE_DETAIL":
            return{
                ...state,
                pokeInfo: {},
                loading: true
            }
        default: return state;
    }
}

export default rootReducer;