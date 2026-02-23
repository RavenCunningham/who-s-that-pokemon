import { useState } from "react"
import { useEffect } from "react";

export function PokemonImage({apiUrl}) {
  const [isLoading, setIsLoading] = useState(true);
  const [pokemonImageUrl, setPokemonImageUrl] = useState(null);

  const fetchPokemonImageUrl = async () => {
      try {
        const res = await fetch(apiUrl);
        if (!res.ok) {
          throw new Error(`Response status: ${res.status}`);
        }
        const data = await res.json();
        setIsLoading(false);
        return data.sprites.other["official-artwork"].front_default;
      } catch (error) {
        console.error(error.message);
      }
    }
  
  useEffect(() => {
    async function startFetching() {
      const result = await fetchPokemonImageUrl();
      if (!ignore) {
        setPokemonImageUrl(result);
      }
    }
    let ignore = false;
    startFetching();
    return () => {
      ignore = true;
    }
  },[apiUrl]);

  if (isLoading) {
    return <p>Loading...</p>
  } else {
    return <img src={pokemonImageUrl} alt="a pokemon" />
  }
}