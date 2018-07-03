const { Client } = require('pg');
const client = new Client({
    user: 'schenker',
    password: "vreni1980",
    host: '192.168.99.100',
    port: 5432,
    database: "astronomy", 
})

client.connect();
console.log('connected to database');

const planetsArray = [
    { id: 1, name: "Mercury", orbitalPeriod: '88 days', image: "Mercury.jpg" },
    { id: 2, name: "Venus", orbitalPeriod: '225 days', image: "Venus.jpg" },
    { id: 3, name: "Earth", orbitalPeriod: "365 days", image: "Earth.jpg" },
    { id: 4, name: "Mars", orbitalPeriod: "687 days", image: "Mars.jpg" },
    { id: 5, name: "Jupiter", orbitalPeriod: "4,333 days", image: "Jupiter.jpg" },
    { id: 6, name: "Saturn", orbitalPeriod: "10,776 days", image: "Saturn.jpg" },
    { id: 7, name: "Uranus", orbitalPeriod: "30,687 days", image: "Uranus.jpg" },
    { id: 8, name: "Neptune", orbitalPeriod: "60,190 days", image: "Neptune.jpg" }
];

exports.getListOfPlanets = async function () {
    console.log('getting lists of planets');
    const sql = "select * from planets";
    const res = await client.query(sql);
    return res.rows;
};


exports.getPlanet= async function (planetId) {
    console.log('getting planet with id ' + planetId);
    const sql = 'select * from planets where planetId=' + planetId;
    const res = await client.query(sql);
    return res.rows[0]; 
    
}
exports.addPlanet = async function (thePlanet) {
    const outcome = await client.query('SELECT MAX (planetId) AS maxId FROM planets');
    const maxId = outcome.rows[0].maxid || 1; //note the maxid with smallcase i.
    console.log(maxId);
    console.log(outcome, outcome.rows.length);
    const sql = ' INSERT INTO planets(planetId,name,orbitalPeriod,image) VALUES($1,$2,$3,$4) RETURNING *';

    const values = [maxId + 1, thePlanet.name, thePlanet.orbitalPeriod, thePlanet.image];
    const res = await client.query(sql, values);
}

/* exports.addPlanet = function (thePlanet) {
     var maxId = Math.max.apply(Math, planetsArray.map(p => p.id));
     thePlanet.id = maxId + 1;
     planetsArray.push(thePlanet);
 }
*/
exports.deletePlanet = async function (planetId) {
    console.log('deleting planet with id' + planetId);
    const sql = 'delete from planets where planetId=' + planetId;
    await client.query(sql);
}


/*  exports.deletePlanet = function (planetId) {
      var item = planetsArray.find((p) => {
          return p.id == planetId;
      });
      if (!item) {
          throw "planet does not exist";
      };
      const index = planetsArray.indexOf(item);
      planetsArray.splice(index, 1);
  }
*/
exports.updatePlanet = async function (planetId, newPlanet) {
    console.log('updating planet with ' + planetId, newPlanet);//?
    const sql = ' UPDATE planets SET name =$1,orbitalPeriod=$2,image=$3';
    const values = [
        newPlanet.name,
        newPlanet.orbitalPeriod,
        newPlanet.image,
        planetId
    ];
    const res = await client.query(sql,values);
}

/*exports.updatePlanet = function (planetId, newPlanet) {
    var existingItem = planetsArray.find(p => p.id == planetId);
    if (!existingItem) {
        throw "planet not found";
    } else {
        existingItem.name = newPlanet.name;
        existingItem.orbitalPeriod = newPlanet.orbitalPeriod;
        existingItem.image = newPlanet.image;
    }
}
*/