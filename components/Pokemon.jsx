import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";
import styles from "./styles/pokemon.module.css";

const Pokemon = (props) => {
  const [pokemon, setPokemon] = useState(null);

  const getPokemon = (url) => {
    if (url) {
      fetch(`/api/pokemon/${url}`)
        .then((res) => res.json())
        .then((data) => setPokemon(data));
    }
  };

  useEffect(() => {
    if (props) {
      getPokemon(props.urlList[0]);
    }
  }, [props]);

  return (
    <>
      {pokemon && (
        <div className="d-flex justify-content-center">
          <Image
            className={`${props.shadow ? "pokeshadow" : null}`}
            src={
              pokemon["sprites"]["other"]["official-artwork"]["front_default"]
            }
            width={200}
            height={200}
            alt=""
          />
        </div>
      )}
    </>
  );
};

export default Pokemon;
