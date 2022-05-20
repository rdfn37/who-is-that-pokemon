export default function handler(req, res) {
    const id = req.query.id

    fetch(`https://pokeapi.co/api/v2/pokemon/${id}`)
        .then(response => response.json())
        .then(data => res.status(200).json(data))
}