let idlaskuri1 = 0;
let idlaskuri2 = 0;
let idlaskuri3 = 0;
let idlaskuri4 = 0;

window.onload = function () {
    //Laitetaan kuuntelijat kaikille riveille.
    for (let i = 1; i <= 4; i++) {
        let nappi = document.getElementById('new' + i);
        let otsikkokentta = document.getElementById('otsikkokentta' + i);
        let tekstikentta = document.getElementById('tekstikentta' + i);
        if (i === 1) {
            otsikkokentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '1', 'first');
                }
            })

            tekstikentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '1', 'first');
                }
            })

            nappi.addEventListener('click', function () {
                add(i, '1', 'first');
            });
        } else if (i === 2) {
            otsikkokentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '2', 'second');
                }
            })

            tekstikentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '2', 'second');
                }
            })

            nappi.addEventListener('click', function () {
                add(i, '2', 'second');
            });
        } else if (i === 3) {
            otsikkokentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '3', 'third');
                }
            })

            tekstikentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '3', 'third');
                }
            })

            nappi.addEventListener('click', function () {
                add(i, '3', 'third');
            });
        } else if (i === 4) {
            otsikkokentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '4', 'fourth');
                }
            })

            tekstikentta.addEventListener('keyup', function (event) {
                if (event.keyCode === 13) {
                    add(i, '4', 'fourth');
                }
            })

            nappi.addEventListener('click', function () {
                add(i, '4', 'fourth');
            });
        }
    }

    function add(row, idlaskuri, divid) {
        let laskuri;

        let otsikkokentta = document.getElementById('otsikkokentta' + row);
        let tekstikentta = document.getElementById('tekstikentta' + row);
        //Katsotaan onko joku kenttä tyhjä.
        if (otsikkokentta.value === "" || tekstikentta.value === "") {
            return false;
        } else {
            if (idlaskuri === '1') {
                idlaskuri1++;
                laskuri = idlaskuri1;
                console.log(laskuri);
            } else if (idlaskuri === '2') {
                idlaskuri2++;
                laskuri = idlaskuri2;
            } else if (idlaskuri === '3') {
                idlaskuri3++;
                laskuri = idlaskuri3;
            } else if (idlaskuri === '4') {
                idlaskuri4++;
                laskuri = idlaskuri4;
            }
            //Elementtien lisäys dom-puuhun.
            let divi = document.createElement('div');
            divi.setAttribute('id', 'diviotsikko' + row + laskuri)
            let divi2 = document.createElement('div');
            divi2.setAttribute('id', 'diviteksti' + row + laskuri)
            document.getElementById(divid).append(divi, divi2);
            divi.setAttribute('class', 'notehead');
            divi2.setAttribute('class', 'note-text');
            let p = document.createElement('p');
            p.setAttribute('id', 'teksti' + row + laskuri)
            p.innerHTML = tekstikentta.value;
            divi2.appendChild(p);
            let h2 = document.createElement('h2');
            h2.setAttribute('id', 'otsikko' + row + laskuri);
            divi.appendChild(h2);
            h2.innerHTML = otsikkokentta.value;

            //Muistiinpanon poisto ja muokkaus.
            let poista = document.createElement('div');
            poista.setAttribute('class', 'mdivb');
            poista.innerHTML = '<div id="mdiv"> <div class="mdiv"> <div class="md"></div></div></div>';
            divi.appendChild(poista);
            poista.addEventListener('click', function () {
                if (idlaskuri === '1') {
                    idlaskuri1--;
                } else if (idlaskuri === '2') {
                    idlaskuri2--;
                } else if (idlaskuri === '3') {
                    idlaskuri3--;
                } else if (idlaskuri === '4') {
                    idlaskuri4--;
                }
                divi.remove();
                divi2.remove();
            })
            let muokkaus = document.createElement('button');
            muokkaus.setAttribute('id', 'muokkaa' + row + laskuri);
            muokkaus.innerText += 'muokkaa';
            divi2.appendChild(muokkaus);
            muokkaus.addEventListener('click', function() {
                edit(h2.id, p.id, divi.id, divi2.id, muokkaus.id);
            });
            //Laitetaan lopuksi kentät tyhjiksi.
            otsikkokentta.value = "";
            tekstikentta.value = "";
        }
    }

    function edit(otsikkoid, tekstiid, otsikondiviid, tekstindiviid, muokkausnappiid) {
        let otsikko = document.getElementById(otsikkoid);
        let teksti = document.getElementById(tekstiid);
        let ogmuokkaus = document.getElementById(muokkausnappiid);
        ogmuokkaus.style.display = 'none';

        let otsikondivi = document.getElementById(otsikondiviid);
        let tekstindivi = document.getElementById(tekstindiviid);

        let uusiotsikko = document.createElement('input');
        let uusiteksti = document.createElement('input');

        otsikko.style.display = 'none';
        teksti.style.display = 'none';
        otsikondivi.appendChild(uusiotsikko);
        tekstindivi.appendChild(uusiteksti);

        let valmis = document.createElement('button');
        valmis.innerText += 'valmis';
        tekstindivi.appendChild(valmis);

        uusiotsikko.value += otsikko.innerText;
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
            otsikko.innerText = uusiotsikko.value;
            teksti.innerText = uusiteksti.value;

            uusiotsikko.remove();
            uusiteksti.remove();
            otsikko.style.display = 'block';
            teksti.style.display = 'block';

            valmis.remove();
            ogmuokkaus.style.display = 'block';
        }
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
    let maara;
    //Tarkistetaan onko rivillä yhtään muistiinpanoa
    try {
        document.getElementById('diviotsikko' + row + 1).value;
    } catch (e) {
        alert("Rivillä ei ole yhtään muistiinpanoja!");
        return false;
    }

    if (row === 1) {
        maara = idlaskuri1;
    } else if (row === 2) {
        maara = idlaskuri2;
    } else if (row === 3) {
        maara = idlaskuri3;
    } else if (row === 4) {
        maara = idlaskuri4;
    }

    for (let i = 1; i <= maara; i++) {
        console.log(row + "," + i + "," + maara);
        document.getElementById('diviotsikko' + row + i).remove();
        document.getElementById('diviteksti' + row + i).remove();
    }
}

