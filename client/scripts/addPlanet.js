
function addPlanet() {
    var data = {
        name: document.getElementById('starName').value,
        orbitalPeriod: document.getElementById('OrbitalPeriod').value,
    };
    axios.post('/api/solarsystem', data)  //ask .
        .then(response => {
            console.log(response);
            window.location.href = "/solarsystem";
        })
        .catch(error => {
            console.log(error);
        })
}

function cancel(){
    window.location.href= "/solarsystem";
}