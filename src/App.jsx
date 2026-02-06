import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

async function getPokemon() {
  const url = 'https://pokeapi.co/api/v2/pokemon?limit=2000'
  try {
    const res = await fetch(url);
    if (!res.ok) {
      throw new Error(`Response status: ${res.status}`);
    }
    const data = await res.json();
    console.log(data);
    // const imageUrl = data.sprites.other["official-artwork"].front_default;
    // const pokeName= data.forms[0].name
    // console.log(imageUrl);
    // console.log(pokeName);
  } catch (error) {
    console.error(error.message);
  }
}

function App() {
  // const {imageUrl, setImageUrl} = useState(getPokemon());

  useEffect(() => {
    getPokemon();
  },[])

  return (
    <>

    </>
  )
}

export default App
