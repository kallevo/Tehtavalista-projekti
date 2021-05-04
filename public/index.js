let idlaskuri1 = 0;
let idlaskuri2 = 0;
let idlaskuri3 = 0;
let idlaskuri4 = 0;

window.onload = function () {
    //Ladataan muistiinpanot tietokannasta
    loadDb();
    //Laitetaan kuuntelijat kaikille riveille.
    for (let i = 1; i <= 4; i++) {
        let nappi = document.getElementById('new' + i);
        let otsikkokentta = document.getElementById('otsikkokentta' + i);
        let kategoriakentta = document.getElementById('kategoriakentta' + i);
        let tekstikentta = document.getElementById('tekstikentta' + i);
        if (i === 1) {
            otsikkokentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '1', 'first', false);
                }
                if (otsikkokentta.length > 30){
                    alert("Max. 30 kirjainta!");
                    return false;
                }
            })
            kategoriakentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '1', 'first', false);
                }
            }),
            tekstikentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '1', 'first', false);
                }
            })

            nappi.addEventListener('click', function () {
                add(i, '1', 'first', false);
            });
        } else if (i === 2) {
            otsikkokentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '2', 'second', false);
                }
            })
            kategoriakentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '2', 'second', false);
                }
            })

            tekstikentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '2', 'second', false);
                }
            })

            nappi.addEventListener('click', function () {
                add(i, '2', 'second', false);
            });
        } else if (i === 3) {
            otsikkokentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '3', 'third', false);
                }
            })
            kategoriakentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '3', 'third', false);
                }
            })

            tekstikentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '3', 'third', false);
                }
            })

            nappi.addEventListener('click', function () {
                add(i, '3', 'third', false);
            });
        } else if (i === 4) {
            otsikkokentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '4', 'fourth', false);
                }
            })
            kategoriakentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '4', 'fourth', false);
                }
            })
            tekstikentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '4', 'fourth', false);
                }
            })

            nappi.addEventListener('click', function () {
                add(i, '4', 'fourth', false);
            });
        }
    }

    function add(row, idlaskuri, divid, tietokannasta, otsikko, kategoria, teksti, valmis) {
        let laskuri;

        let otsikkokentta = document.getElementById('otsikkokentta' + row);
        let kategoriakentta = document.getElementById('kategoriakentta' + row);
        let tekstikentta = document.getElementById('tekstikentta' + row);

        if (tietokannasta) {
            if (idlaskuri === '1') {
                laskuri = idlaskuri1;
                console.log(laskuri);
            } else if (idlaskuri === '2') {
                laskuri = idlaskuri2;
                console.log(laskuri);
            } else if (idlaskuri === '3') {
                laskuri = idlaskuri3;
                console.log(laskuri);
            } else if (idlaskuri === '4') {
                laskuri = idlaskuri4;
                console.log(laskuri);
            }
        } else {
            if (idlaskuri === '1') {
                idlaskuri1++;
                laskuri = idlaskuri1;
                console.log(laskuri);
            } else if (idlaskuri === '2') {
                idlaskuri2++;
                laskuri = idlaskuri2;
                console.log(laskuri);
            } else if (idlaskuri === '3') {
                idlaskuri3++;
                laskuri = idlaskuri3;
                console.log(laskuri);
            } else if (idlaskuri === '4') {
                idlaskuri4++;
                laskuri = idlaskuri4;
                console.log(laskuri);
            }
        }

        if (!tietokannasta) {
            //Katsotaan onko joku kenttä tyhjä.
            if (otsikkokentta.value === "" || tekstikentta.value === "" || kategoriakentta.value === "") {
                return false;
            }
            //Tietokantaan lisääminen XMLHttpRequestin avulla
            let httprequest = new XMLHttpRequest();
            httprequest.open("POST", "/posttaulukko1", true);
            let json;
            httprequest.setRequestHeader("Content-Type", "application/json");
            httprequest.onreadystatechange = function() {
                if (httprequest.readyState !== 4 && httprequest.status !== 200) {
                    alert("Yhteysongelma - tiedot eivät välttämättä välity palvelimelle.");
                }
            }

            json = JSON.stringify({
                id: laskuri,
                rivi: row,
                otsikko: otsikkokentta.value,
                kategoria: kategoriakentta.value,
                teksti: tekstikentta.value,
                edit: "false",
            });
            httprequest.send(json);
        }

            //Elementtien lisäys dom-puuhun.
            let divi = document.createElement('div');
            divi.setAttribute('id', 'diviotsikko' + row + laskuri);
            let divi4 = document.createElement('div');
            divi4.setAttribute('id', 'divikategoria' + row + laskuri);
            let divi2 = document.createElement('div');
            divi2.setAttribute('id', 'diviteksti' + row + laskuri);
            let divi3 = document.createElement('div');
            divi3.setAttribute('id', 'divimenu' + row + laskuri);
            document.getElementById(divid).append(divi, divi4, divi2, divi3);
            divi.setAttribute('class', 'notehead');
            divi4.setAttribute('class', 'note-category');
            divi2.setAttribute('class', 'note-text');
            divi3.setAttribute('class', 'note-menu');

            let p = document.createElement('p');
            p.setAttribute('id', 'teksti' + row + laskuri)
            if (tietokannasta) {
                p.innerHTML = teksti;
                if (valmis) {
                    p.style.textDecoration = "line-through";
                }
            } else {
                p.innerHTML = tekstikentta.value;
            }
            divi2.appendChild(p);
            let c = document.createElement('p')
                c.setAttribute('id','kategoria'+ row + laskuri)
            if (tietokannasta){
                c.innerHTML = kategoria;
            } else {
                c.innerHTML = kategoriakentta.value
            }
            divi4.appendChild(c);
            let h2 = document.createElement('h2');
            h2.setAttribute('id', 'otsikko' + row + laskuri);
            divi.appendChild(h2);
            if (tietokannasta) {
                h2.innerHTML = otsikko;
                if (valmis) {
                    h2.style.textDecoration = "line-through";
                    divi.style.background = "rgb(90,220,100)";
                }
            } else {
                h2.innerHTML = otsikkokentta.value;
            }

            if (valmis === undefined) {
                let pmenu = document.createElement('p');
                pmenu.setAttribute('id', 'menu' + row + laskuri);
                pmenu.setAttribute('class', 'ikonit');
                divi3.setAttribute('class', 'note-menu');
                divi3.appendChild(pmenu);
                pmenu.addEventListener("click", function () {
                    done(laskuri, row);
                    pmenu.remove();
                    document.getElementById("muokkaa" + row + laskuri).remove();
                    p.style.textDecoration = "line-through";
                    h2.style.textDecoration = "line-through";
                    divi.style.background = "rgb(90,220,100)";
                })

            if (tietokannasta) {
                pmenu.innerHTML = "<i class=\"fas fa-check-square\">";
            } else {
                pmenu.innerHTML = "<i class=\"fas fa-check-square\"></i>";
            }
            }


            //Muistiinpanon poisto ja muokkaus.
            let poista = document.createElement('div');
            poista.setAttribute('class', 'mdivb');
            poista.innerHTML = '<i class=\"fas fa-window-close\"></i>';
            poista.addEventListener('click', function () {

                var dc = confirm("Haluatko varmasti poistaa tehtävän?");
                if (dc === true) {
                    //Tehdään poisto tietokannassa.
                    let postrequest = new XMLHttpRequest();
                    postrequest.open("POST", "/postarkisto", true);
                    let json;
                    postrequest.setRequestHeader("Content-Type", "application/json");
                    postrequest.onreadystatechange = function() {
                        if (postrequest.readyState !== 4 && postrequest.status !== 200) {
                            alert("Yhteysongelma - poistaminen tietokannasta ei välttämättä onnistunut.");
                        }
                    }

                    json = JSON.stringify({
                        id: laskuri,
                        rivi: row,
                        otsikko: h2.innerText,

                        teksti: p.innerText,
                        montapoistoa: "false",
                    });
                    postrequest.send(json);
                    divi.remove();
                    divi2.remove();
                    divi3.remove();
                    divi4.remove();
                }


            })

        if (valmis === undefined) {
            let muokkaus = document.createElement('div');
            muokkaus.setAttribute('id', 'muokkaa' + row + laskuri);
            muokkaus.setAttribute('class', 'muokkaus');
            muokkaus.innerHTML += '<i class=\"fas fa-pen-square\"></i>';
            muokkaus.addEventListener('click', function () {
                edit(h2.id, p.id, divi.id, divi2.id, muokkaus.id, laskuri, row);
            });

            divi3.appendChild(muokkaus);

        }
            divi3.appendChild(poista);

            //Laitetaan lopuksi kentät tyhjiksi.
            otsikkokentta.value = "";
            tekstikentta.value = "";
    }

    function edit(otsikkoid, kategoriaid,
                  tekstiid, otsikondiviid, tekstindiviid, muokkausnappiid, idlaskuri, row) {
        let otsikko = document.getElementById(otsikkoid);
        let kategoria = document.getElementById(kategoriaid);
        let teksti = document.getElementById(tekstiid);
        let ogmuokkaus = document.getElementById(muokkausnappiid);
        ogmuokkaus.style.display = 'none';

        let otsikondivi = document.getElementById(otsikondiviid);
        let kategoriandivi = document.getElementById(kategoriaid)
        let tekstindivi = document.getElementById(tekstindiviid);

        let uusiotsikko = document.createElement('input');
        let uusiteksti = document.createElement('input');
        let uusikategoria = document.createElement('input');

        otsikko.style.display = 'none';
        teksti.style.display = 'none';
        kategoria.style.display = 'none';
        otsikondivi.appendChild(uusiotsikko);
        tekstindivi.appendChild(uusiteksti);
        kategoriandivi.appendChild(uusikategoria);

        let valmis = document.createElement('button');
        valmis.innerText += 'valmis';
        tekstindivi.appendChild(valmis);

        uusiotsikko.value += otsikko.innerText;
        uusikategoria.value += kategoria.innerText;
        uusiteksti.value += teksti.innerText;

        uusiotsikko.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                click();
            }
        })

        uusiteksti.addEventListener('keyup', function (event) {
            if (event.keyCode === 13) {
                click();
            }
        })

        valmis.addEventListener('click', click);

        function click() {
            //Muokkaus tietokantaan
            let editrequest = new XMLHttpRequest();
            editrequest.open("POST", "/posttaulukko1", true);
            let json;
            editrequest.setRequestHeader("Content-Type", "application/json");
            editrequest.onreadystatechange = function() {
                if (editrequest.readyState !== 4 && editrequest.status !== 200) {
                    alert("Yhteysongelma - tiedot eivät välttämättä välity palvelimelle.");
                }
            }

            json = JSON.stringify({
                id: idlaskuri,
                rivi: row,
                otsikko: uusiotsikko.value,
                kategoria: uusikategoria.value,
                teksti: uusiteksti.value,
                edit: "true",
            });
            editrequest.send(json);

            otsikko.innerText = uusiotsikko.value;
            kategoria.innerText = uusikategoria.value;
            teksti.innerText = uusiteksti.value;

            uusiotsikko.remove();
            uusiteksti.remove();
            uusikategoria.remove();
            otsikko.style.display = 'block';
            teksti.style.display = 'block';
            kategoria.style.display = 'block';

            valmis.remove();
            ogmuokkaus.style.display = 'inline-block';
        }
    }

    function done(idlaskuri, row) {
        let donerequest = new XMLHttpRequest();
        donerequest.open("POST", "/posttaulukko1", true);
        let json;
        donerequest.setRequestHeader("Content-Type", "application/json");
        donerequest.onreadystatechange = function() {
            if (donerequest.readyState !== 4 && donerequest.status !== 200) {
                alert("Yhteysongelma - tiedot eivät välttämättä välity palvelimelle.");
            }
        }

        json = JSON.stringify({
            id: idlaskuri,
            rivi: row,
            valmis: "true",
        });
        donerequest.send(json);
    }

    function loadDb() {
        let gethttprequest = new XMLHttpRequest();
        gethttprequest.open("GET", "/gettaulukko1", true);
        let json;
        gethttprequest.setRequestHeader("Content-Type", "application/json");
        gethttprequest.onreadystatechange = function() {
            if (gethttprequest.readyState === 4 && gethttprequest.status === 200) {
                json = JSON.parse(gethttprequest.responseText);

                if (json.numOfRows > 0) {
                    for (let i in json.rows) {
                        let idlaskuri;
                        let divid;
                        let valmis;

                        if (json.rows[i].rivi === 1) {
                            idlaskuri = '1';
                            idlaskuri1 = json.rows[i].id;
                            divid = 'first'
                        } else if (json.rows[i].rivi === 2) {
                            idlaskuri = '2';
                            idlaskuri2 = json.rows[i].id;
                            divid = 'second'
                        } else if (json.rows[i].rivi === 3) {
                            idlaskuri = '3';
                            idlaskuri3 = json.rows[i].id;
                            divid = 'third'
                        } else if (json.rows[i].rivi === 4) {
                            idlaskuri = '4';
                            idlaskuri4 = json.rows[i].id;
                            divid = 'fourth'
                        }
                        if (json.rows[i].valmis === "true") {
                            console.log("true");
                            valmis = true;
                        } else if (json.rows[i].valmis === "false") {
                            console.log("false");
                            valmis = false;
                        }
                        add(json.rows[i].rivi, idlaskuri, divid, true, json.rows[i].otsikko, json.rows[i].teksti, valmis);
                        console.log("lisätty");
                    }
                } else {
                    alert("Tietoja ei löytynyt tietokannasta.")
                }
            }
        }
        gethttprequest.send();
    }
}

function hideForm(row) {
    let x = document.getElementById("form-box" + row);
        if (x.style.display === "block") {
            x.style.display = "none";
        } else {
            x.style.display = "block";
        }
    }

function removeAll(row) {

    var dac = confirm("Haluatko varmasti poistaa kaikki tehtävät tästä kategoriasta?");
    if (dac === true) {

        let maara;

        if (row === 1) {
            maara = idlaskuri1;
            //Tarkistetaan onko rivillä yhtään muistiinpanoa
            try {
                document.getElementById('diviotsikko' + row + maara).value;
            } catch (e) {
                alert("Rivillä ei ole yhtään muistiinpanoja!");
                idlaskuri1 = 0;
                return false;
            }
        } else if (row === 2) {
            maara = idlaskuri2;
            //Tarkistetaan onko rivillä yhtään muistiinpanoa
            try {
                document.getElementById('diviotsikko' + row + maara).value;
            } catch (e) {
                alert("Rivillä ei ole yhtään muistiinpanoja!");
                idlaskuri2 = 0;
                return false;
            }
        } else if (row === 3) {
            maara = idlaskuri3;
            //Tarkistetaan onko rivillä yhtään muistiinpanoa
            try {
                document.getElementById('diviotsikko' + row + maara).value;
            } catch (e) {
                alert("Rivillä ei ole yhtään muistiinpanoja!");
                idlaskuri3 = 0;
                return false;
            }
        } else if (row === 4) {
            maara = idlaskuri4;
            //Tarkistetaan onko rivillä yhtään muistiinpanoa
            try {
                document.getElementById('diviotsikko' + row + maara).value;
            } catch (e) {
                alert("Rivillä ei ole yhtään muistiinpanoja!");
                idlaskuri4 = 0;
                return false;
            }
        }

        //Poista kaikki - Tietokannasta poisto
        let postrequest2 = new XMLHttpRequest();
        let json;
        postrequest2.open("POST", "/postarkisto", true);
        postrequest2.setRequestHeader("Content-Type", "application/json");
        postrequest2.onreadystatechange = function() {
            if (postrequest2.readyState !== 4 && postrequest2.status !== 200) {
                alert("Yhteysongelma - poistaminen tietokannasta ei välttämättä onnistunut.");
            }}
        json = JSON.stringify({
            rivi: row,
            montapoistoa: "true",
        });
        postrequest2.send(json);

        //Elementtien poisto
        for (let i = maara; i >= 0; i--) {
            if (document.body.contains(document.getElementById('diviotsikko' + row + i))) {
                console.log(row + "," + i + "," + maara);
                document.getElementById('diviotsikko' + row + i).remove();
                document.getElementById('divikategoria'+ row + i).remove();
                document.getElementById('divimenu' + row + i).remove();
                document.getElementById('diviteksti' + row + i).remove();
            } else {
                break;
            }
        }

    }


}
