function deletePlanet(planetId) {
    const url = "/api/solarsystem/" + planetId;
    axios.delete(url)
        .then(response => {
            console.log(response)
            var row = document.getElementById('row-' + planetId);
            row.parentElement.removeChild(row);
        })
        .catch(error => {
            console.log(error);

        })
}

function editPlanet(planetId) {
    window.location.href = "/solarsystem/edit/" + planetId;
}