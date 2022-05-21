import { useState, useEffect } from "react";
import Option from "../components/Option";
import Feedback from "../components/Feedback";
import Footer from "../components/Footer";
import Header from "../components/Header";
import Loader from "../components/Loader";
import Pokemon from "../components/Pokemon";

const Home = () => {
  const [all, setAll] = useState([]);
  const [options, setOptions] = useState([]);
  const [pokemon, setPokemon] = useState(null);
  const [shadow, setShadow] = useState(true);
  const [buttonDisabled, setButtonDisabled] = useState(false);
  const [feedback, setFeedback] = useState({
    show: false,
    txt: "",
    color: "",
  });
  const [loading, setLoading] = useState(true);

  const [decoyOne, setDecoyOne] = useState({});
  const [decoyTwo, setDecoyTwo] = useState({});

  const getAll = () => {
    fetch("./api/all-pokemons")
      .then((res) => res.json())
      .then((data) => setAll(data.results))
      .then(() => setTimeout(() => setLoading(false), 500));
  };

  const getPokemon = (array) => {
    if (array && array.length > 0) {
      setPokemon(array[Math.floor(Math.random() * array.length)]);
    }
  };

  const select = (name) => {
    setShadow(false);
    setButtonDisabled(true);

    if (name === pokemon.name) {
      setFeedback({
        show: true,
        txt: `Correct! It's ${capitalizeFirstLetter(pokemon.name)} (*^_^*)`,
        color: "text-success",
      });
    } else {
      setFeedback({
        show: true,
        txt: `Incorrect! It's ${capitalizeFirstLetter(pokemon.name)} (｡ŏ﹏ŏ)`,
        color: "text-danger",
      });
    }
  };

  const next = () => {
    setLoading(true);
    setShadow(true);
    setButtonDisabled(false);
    setFeedback({
      show: false,
      txt: "",
      color: "",
    });
    getAll();
  };

  function draw(array) {
    if (array.length > 0) {
      let a, b, c, d, e;

      while (a === b || a === c || b === c) {
        a = array[Math.floor(Math.random() * array.length)];
        b = array[Math.floor(Math.random() * array.length)];
        c = array[Math.floor(Math.random() * array.length)];
      }

      return [a, b, c];
    }
  }

  function capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  useEffect(() => {
    getAll();
  }, []);

  useEffect(() => {
    setOptions(draw(all));
  }, [all]);

  useEffect(() => {
    getPokemon(options);
  }, [options]);

  return (
    <>
      <div className="main">
        <Header />
        {loading ? (
          <div className="d-flex justify-content-center">
            <Loader />
          </div>
        ) : (
          <div className="container">
            <div className="pokemon row justify-content-center">
              {pokemon && <Pokemon pokemon={pokemon} shadow={shadow} />}
            </div>
            <div className="options row justify-content-center my-3">
              {options &&
                options.map((e) => {
                  return (
                    <div key={e.name} className="option col-12 col-md-3 d-flex justify-content-center m-1">
                      <button
                        disabled={buttonDisabled}
                        key={e.name}
                        className="btn btn-options"
                        onClick={() => select(e.name)}
                      >
                        <Option key={e.name} pokemon={e} />
                      </button>
                    </div>
                  );
                })}
            </div>
            <div className="next row justify-content-center">
              <div className="col d-flex justify-content-center my-3">
                <button
                  disabled={!buttonDisabled}
                  className="btn btn-next"
                  onClick={next}
                >
                  <span className="fs-5 fw-bold">Next</span>
                </button>
              </div>
              {pokemon && <Feedback feedback={feedback} />}
            </div>
          </div>
        )}
        <Footer />
      </div>
    </>
  );
};

export default Home;
