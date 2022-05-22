import { useState, useEffect } from "react";

const Option = (props) => {
  const [option, setOption] = useState(null);

  function capitalizeFirstLetter(string) {
    if (string) {
      return string.charAt(0).toUpperCase() + string.slice(1);
    }
  }

  const getOption = (url) => {
    fetch(url)
      .then((res) => res.json())
      .then((data) => setOption(data));
  };

  useEffect(() => {
    getOption(props.pokemon.url);
  }, [props]);

  return (
    <>
      <span className="fs-5 fw-bold">{option && capitalizeFirstLetter(option.species.name)}</span>
    </>
  );
};

export default Option;
