
function hae() {
    var MongoClient = require('mongodb').MongoClient;
    var url = 'mongodb://localhost:27017/harjoitus';
    MongoClient.connect(url, {useNewUrlParser: true}, (err, db) => {
        if (err != null) {
            console.log("Virhe yhteyden avaamisessa!" + err.message);
            throw err;
        }

        const dbo = db.db();
        console.log("Yhteys Mongoon saatu");
        const kokoelma = dbo.collection('restaurants');
        return lista(kokoelma.find({$and: [{borough: "Queens"}, {cuisine: "Jewish/Kosher"}]}).toArray()
            .then((res) => {
                const nimet = [];
                for (i = 0; i < res.length; i++) {
                    nimet.push(res[i].name);
                }
                return nimet;
            }))
    });
}

function lista(nimet) {
    // poistaTaulu();
    for (var i = 0; i< nimet.length; i++) {
        var rav = nimet[i];
        // var tieto = document.createElement("li");
        // tieto.appendChild(document.createTextNode(rav));
        var nimia= [];
        nimet.push(rav);
        console.log(nimia)
    }
}