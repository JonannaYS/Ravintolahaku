var lista = document.getElementById("tulos");
    function haunTulokset(tulos) {
        poistaTaulu();
        var table = document.createElement("table");
        var tBody = document.createElement("tbody");
        tBody.setAttribute("id", "tulokset");
        var tHead = document.createElement("thead");
        var otsikkoRivi = document.createElement("tr");
        var otsikko1 = document.createElement("th");
        otsikko1.appendChild(document.createTextNode("Tyyli"));
        var otsikko2 = document.createElement("th");
        otsikko2.appendChild(document.createTextNode("Nimi"));
        var otsikko3 = document.createElement("th");
        otsikko3.appendChild(document.createTextNode("Kaupunginosa"));
        otsikkoRivi.appendChild(otsikko1);
        otsikkoRivi.appendChild(otsikko2);
        otsikkoRivi.appendChild(otsikko3);
        tHead.appendChild(otsikkoRivi);
        table.appendChild(tHead);
        table.appendChild(tBody);

        for (var i = 0; i< tulos.length; i++) {
            var ravintola = tulos[i];
            var tulosRivi = document.createElement("tr");
            var tieto1 = document.createElement("td");
            tieto1.appendChild(document.createTextNode(ravintola.cuisine));
            var tieto2 = document.createElement("td");
            tieto2.appendChild(document.createTextNode(ravintola.name));
            var tieto3 = document.createElement("td");
            tieto3.appendChild(document.createTextNode(ravintola.borough));
            tulosRivi.appendChild(tieto1);
            tulosRivi.appendChild(tieto2);
            tulosRivi.appendChild(tieto3);
            tBody.appendChild(tulosRivi);
            lista.appendChild(table);

        }

    }

function haeKaikki() {
    var pyynto = new XMLHttpRequest();
    pyynto.onreadystatechange = function () {
        if (pyynto.readyState === 4 && pyynto.status === 200) {
            var tulos = JSON.parse(pyynto.responseText);

            console.dir(tulos);
            haunTulokset(tulos);
            return lista;
        }
    };
    pyynto.open('GET', 'http://localhost:3000/users/', true);
    pyynto.send();
}

function haeNimella(kaupunginosa) {
    var pyynto = new XMLHttpRequest();
    pyynto.onreadystatechange = function () {
        if (pyynto.readyState === 4 && pyynto.status === 200) {
            var tulos = JSON.parse(pyynto.responseText);
            var ravintolat = tulos.filter(function(ravintola) {
                return ravintola.borough === kaupunginosa;
            });
            console.dir(ravintolat);
            haunTulokset(ravintolat);
            return lista;
        }
    };
    pyynto.open('GET', 'http://localhost:3000/users/', true);
    pyynto.send();
}

function haeTyylilla(cuisine) {
    var pyynto = new XMLHttpRequest();
    pyynto.onreadystatechange = function () {
        if (pyynto.readyState === 4 && pyynto.status === 200) {
            var tulos = JSON.parse(pyynto.responseText);
            var ravintolat = tulos.filter(function (ravintola) {
                return ravintola.cuisine === cuisine;
            });
            console.dir(ravintolat);
            haunTulokset(ravintolat);
            return lista;
        }
    };
    pyynto.open('GET', 'http://localhost:3000/users/', true);
    pyynto.send();
}



function poistaTaulu() {
    while (lista.firstChild) {
        lista.removeChild(lista.firstChild);
    }
}