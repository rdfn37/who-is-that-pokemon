import Image from "next/image";
import { useState } from "react";
import { useEffect } from "react";
import Loader from "./Loader";
import styles from "./styles/pokemon.module.css";

const Pokemon = (props) => {
  const [pokemon, setPokemon] = useState(null);
  // const [feedback, setFeedback] = useState(null);

  const getPokemon = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setPokemon(data));
  };

  useEffect(() => {
    getPokemon(props.pokemon.url);
  }, [props]);

  return (
    <>
      {pokemon && <Image className={`${props.shadow ? "pokeshadow" : null}`} alt="" src={pokemon["sprites"]["other"]["official-artwork"]["front_default"]} height={200} width={200} />}
    </>
  );
};

// const Pokemon = (props) => {
//   const [pokemon, setPokemon] = useState(null);

//   const getPokemon = (url) => {
//     if (url) {
//       fetch(`/api/pokemon/${url}`)
//         .then((res) => res.json())
//         .then((data) => setPokemon(data));
//     }
//   };

//   useEffect(() => {
//     if (props) {
//       getPokemon(props.urlList[0]);
//     }
//   }, [props]);

//   return (
//     <>
//       {pokemon && (
//         <div className="d-flex justify-content-center">
//           <Image
//             className={`${props.shadow ? "pokeshadow" : null}`}
//             src={
//               pokemon["sprites"]["other"]["official-artwork"]["front_default"]
//             }
//             width={200}
//             height={200}
//             alt=""
//           />
//         </div>
//       )}
//     </>
//   );
// };

export default Pokemon;
