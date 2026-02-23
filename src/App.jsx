import { useEffect, useState } from 'react'
import { GuessingGame } from './GuessingGame';
import './App.css'

function App() {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonData, setPokemonData] = useState(null);
  const [pokemonImageUrl, setPokemonImageUrl] = useState(null);

  const fetchPokemonData = async () => {
    const url = 'https://pokeapi.co/api/v2/pokemon?limit=2000';
    try {
      const res = await fetch(url);
      if (!res.ok) {
        throw new Error(`Response status: ${res.status}`);
      }
      const data = await res.json();
      setIsLoading(false);
      return data.results;
    } catch (error) {
      console.error(error.message);
    }
  }

  useEffect(() => {
    async function startFetching() {
      setPokemonData(null);
      const result = await fetchPokemonData();
      if (!ignore) {
        setPokemonData(result);
      }
    }
    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  },[]);

  if (isLoading) {
    return <p>Loading...</p>
  } else {
    return <GuessingGame pokemonData={pokemonData}/>
  }
}

export default App
