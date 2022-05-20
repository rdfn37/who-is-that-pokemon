import { useState, useEffect } from "react";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Pokemon from "../components/Pokemon";

const Home = () => {
  const [pokemon, setPokemon] = useState({});
  const [a, setA] = useState({});
  const [b, setB] = useState({});
  const [urlList, setUrlList] = useState([]);
  const [shadow, setShadow] = useState(true);
  const [userAnswer, setUserAnswer] = useState(null);
  const [options, setOptions] = useState([]);
  const [result, setResult] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [loading, setLoading] = useState(true);

  function capitalizeFirstLetter(string) {
    if(string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  const getUrlList = () => {
    fetch("/api/all-pokemons")
      .then((res) => res.json())
      .then((data) => {
        let pokemon, decoyOne, decoyTwo;

        while (
          pokemon === decoyOne ||
          pokemon === decoyTwo ||
          decoyOne === decoyTwo
        ) {
          pokemon =
            data.results[Math.floor(Math.random() * data.results.length)];
          decoyOne =
            data.results[Math.floor(Math.random() * data.results.length)];
          decoyTwo =
            data.results[Math.floor(Math.random() * data.results.length)];
        }
        const urlList = [pokemon.name, decoyOne.name, decoyTwo.name];

        setUrlList(urlList);
      });
  };

  const pick = (answer, correct) => {
    if (answer) {
      if (answer === correct) {
        setShadow(false);
        setResult(true);
        setShowResult(true);
      } else {
        setShadow(false);
        setResult(false);
        setShowResult(true);
      }
    }
  };

  const feedback = () => {
    if (result) {
      return (
        <h2 className="text-center text-success">
          Corret. It&apos;s {capitalizeFirstLetter(pokemon.name)}!
        </h2>
      );
    } else {
      return (
        <h2 className="text-center text-danger">
          Incorrect. It&apos;s {capitalizeFirstLetter(pokemon.name)}!
        </h2>
      );
    }
  };

  const next = () => {
    setLoading(true);
    setPokemon({});
    setOptions(false);
    setShowResult(false);
    setUserAnswer(null);
    setTimeout(() => {
      getUrlList();
      setShadow(true);
      setButtonDisabled(false);
    }, 1000)
  };

  useEffect(() => {
    if (urlList.length === 3) {
      fetch(`/api/pokemon/${urlList[0]}`)
        .then((res) => res.json())
        .then((data) => {
          setPokemon(data);
          setLoading(false);
        });

      fetch(`/api/pokemon/${urlList[1]}`)
        .then((res) => res.json())
        .then((data) => setA(data));

      fetch(`/api/pokemon/${urlList[2]}`)
        .then((res) => res.json())
        .then((data) => setB(data));
    }
  }, [urlList]);

  useEffect(() => {
    getUrlList();
  }, []);

  useEffect(() => {
    pick(userAnswer, pokemon.name);
  }, [userAnswer, pokemon.name]);

  const select = (name) => {
    setUserAnswer(name);
    setButtonDisabled(true);
  };

  useEffect(() => {
    const options = [pokemon, a, b];

    const shuffledOptions = shuffle(options);

    setOptions(shuffledOptions);
  }, [pokemon, a, b]);

  const shuffle = (array) => {
    let currentIndex = array.length,
      randomIndex;

    // While there remain elements to shuffle.
    while (currentIndex != 0) {
      // Pick a remaining element.
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex--;

      // And swap it with the current element.
      [array[currentIndex], array[randomIndex]] = [
        array[randomIndex],
        array[currentIndex],
      ];
    }

    return array;
  };

  return (
    <div className="main">
      <Header />
      <div className="container rounded">
        {!loading && (
          <div>
            <Pokemon urlList={urlList} shadow={shadow} a={a.name} b={b.name} />
            <div className="row my-2">
              {options.length === 3 &&
                options.map((e, index) => {
                  return (
                    <div
                      className="col-4 justify-content-center d-flex"
                        key={index}
                      >
                      <button
                        disabled={buttonDisabled}
                        className="btn btn-options"
                        onClick={() => select(e.name)}
                      >
                        {capitalizeFirstLetter(e.name)}
                      </button>
                    </div>
                  );
                })}
            </div>
            <div className="d-flex justify-content-center">
              <button
                className="btn my-2 btn-next"
                disabled={!buttonDisabled}
                onClick={() => next()}
              >
                Next
              </button>
            </div>
          </div>
        )}
        {loading && (
          <div className="row justify-content-center">
            <Loader/>
          </div>
        )}
        <div>{showResult && feedback()}</div>
      </div>
      {/* <Loader /> */}
      <Footer />
    </div>
  );
};

export default Home;
