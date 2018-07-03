function savePlanet(planetId) {
    var data = {
        name: document.getElementById('editName').value,
        orbitalPeriod: document.getElementById('editOrbitalPeriod').value,
        image: document.getElementById('editImage').value
    };
    var url = "/api/solarsystem/" + planetId;
    axios.put(url, data)
        .then(response => {
            console.log(response);
            window.location.href = "/solarsystem";
        })
        .catch(error => {
            console.log(error);
        });
}

function clearPlanet() {
    window.location.href = "/solarsystem";
}