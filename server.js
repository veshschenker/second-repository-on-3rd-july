const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mustache = require('mustache-express');
const firstModule = require("./firstModule.js");
app.set('view engine', 'html');
app.engine('html', mustache());
app.set('views', __dirname + '/templates');
app.use(express.static('client'));
app.use(bodyParser.json());
const dac = require('./firstModule.js');

app.listen(3000, () => {
    console.log("listening at port 3000");
});

app.get('/solarsystem', async (req, res) => {
    console.log('displaying list of planets');
    var list = await dac.getListOfPlanets();
    var data = {
        solarsystem: list
    }
    res.render('listOfPlanets', data);
});//one

app.get('/solarsystem/add', (req, res) => {
    console.log('Adding a planet');
    res.render('addPlanet');
});

app.get('/solarsystem/edit/:id', async (req, res) => {
    console.log('Editing planet');
    var planetId = req.params.id;
    var info = await dac.getPlanet(planetId);
    if (info) {
        res.render('editPlanet', info);
        return;
    }
    res.sendStatus(404);
});

app.get('/solarsystem/:id', async (req, res) => {
    console.log('Rendering planet by id')
    var planetId = req.params.id;
    var info = await dac.getPlanet(planetId); //planetId is from firstModule.
    if (info) {
        console.log('rendering planets by id ',info);
        res.render('planetById', info);
        return;
    }
    res.sendStatus(404);
});

app.get('/api/solarsystem', async (req, res) => {
    var planets = await dac.getListOfPlanets();
    res.status(200).send(planets);
});

app.get('/api/solarsystem/:id', async (req, res) => {
    var id = req.params.id;
    var planet = await dac.getPlanet(id);
    res.status(200).send(planet);
}); //this was not there before,reason why we added it.

app.post("/api/solarsystem", async (req, res) => {
    var planet = req.body;
    await dac.addPlanet(planet);
    res.sendStatus(201);//why is there no await here.
})

app.delete('/api/solarsystem/:id', async (req, res) => {
    var id = req.params.id;
    console.log(id);
    try {
        await dac.deletePlanet(id);
        res.sendStatus(200);
    }
    catch (e) {
        res.sendStatus(404);
    }
});



app.put('/api/solarsystem/:id', async (req, res) => {
    var id = req.params.id;
    try {
        await dac.updatePlanet(id, req.body);
        res.sendStatus(200);
    }
    catch (e) {
        res.sendStatus(404);
    }
});

