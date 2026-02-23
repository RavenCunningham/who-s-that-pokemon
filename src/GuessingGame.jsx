import { useState } from "react"
import { useEffect } from "react";
import { PokemonImage } from "./PokemonImage";

export function GuessingGame({pokemonData}) {
  const [pokemon, setPokemon] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [score, setScore] = useState(0);
  const [guessInput, setGuessInput] = useState("");

  const increaseScore = () => {
    setScore(score + 1);
  };
  const handleGuessInputChange = e => {
    setGuessInput(e.target.value);
  };
  const handleGuessInputKeyPress = e => {
    if (e.key === "Enter") {
      submitGuess();
    }
  };
  const submitGuess = () => {
    if (guessInput === pokemon.name) {
      console.log("correct guess");
      increaseScore();
    } else {
      console.log(`incorrect guess, correct answer is ${pokemon.name}`);
    }
    getNewPokemon();
    setGuessInput("");
  };

  const handleGuessSubmit = e => {
    submitGuess();
  };

  const getNewPokemon = () => {
    setPokemon(pokemonData[Math.floor(Math.random() * 150)]);
  };

  useEffect(() => {
    if (pokemonData) {
      getNewPokemon();
      setIsLoading(false);
    }
  },[pokemonData])

  if (isLoading) {
    return <p>Loading...</p>
  } else {
    return (
      <>
        <PokemonImage apiUrl={pokemon.url} />
        <br/>
        <input 
          type="text" id="guess-input" value={guessInput} 
          onChange={handleGuessInputChange} 
          onKeyDown={handleGuessInputKeyPress}
        />
        <input type="submit" value="Guess" onClick={handleGuessSubmit}/>
        <br/>
          Score: {score}
      </>
    )
  }
}