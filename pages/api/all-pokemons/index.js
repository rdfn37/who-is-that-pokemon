export default function handler(req, res) {
    fetch('https://pokeapi.co/api/v2/pokemon/?limit=898&offset=0')
        .then(response => response.json())
        .then(data => res.status(200).json(data))
}