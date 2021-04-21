let idlaskuri = 1;

window.onload = function () {
    let otsikkokentta = document.getElementById('otsikkokentta');
    let tekstikentta = document.getElementById('tekstikentta');
    let nappi = document.getElementById('new1');


    tekstikentta.addEventListener('keyup', function (event) {
        if (event.keyCode === 13) {
            add();
        }
    })
    nappi.addEventListener('click', add);

    function add() {
        //Katsotaan onko joku kenttä tyhjä.
        if (otsikkokentta.value === "" || tekstikentta.value === "") {
            return false;
        } else {
            //Elementtien lisäys dom-puuhun.
            let divi = document.createElement('div');
            divi.setAttribute('id', 'diviotsikko1' + idlaskuri)
            let divi2 = document.createElement('div');
            divi2.setAttribute('id', 'diviteksti1' + idlaskuri)
            document.getElementById('first').append(divi, divi2);
            divi.setAttribute('class', 'notehead');
            divi2.setAttribute('class', 'note-text');
            let p = document.createElement('p');
            p.setAttribute('id', 'teksti1' + idlaskuri)
            p.innerHTML = tekstikentta.value;
            divi2.appendChild(p);
            let h2 = document.createElement('h2');
            h2.setAttribute('id', 'otsikko1' + idlaskuri);
            divi.appendChild(h2);
            h2.innerHTML = otsikkokentta.value;

            //Muistiinpanon poisto ja muokkaus.
            let poista = document.createElement('div');
            poista.setAttribute('class', 'mdivb');
            poista.innerHTML = '<div id="mdiv"> <div class="mdiv"> <div class="md"></div></div></div>';
            divi.appendChild(poista);
            poista.addEventListener('click', function () {
                idlaskuri--;
                divi.remove();
                divi2.remove();
            })
            let muokkaus = document.createElement('button');
            muokkaus.setAttribute('id', 'muokkaa1' + idlaskuri);
            muokkaus.innerText += 'muokkaa';
            divi2.appendChild(muokkaus);
            muokkaus.addEventListener('click', function() {
                edit(h2.id, p.id, divi.id, divi2.id, muokkaus.id);
            });
            //Laitetaan lopuksi kentät tyhjiksi.
            otsikkokentta.value = "";
            tekstikentta.value = "";
            idlaskuri++;
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

        valmis.addEventListener('click', function () {
            otsikko.innerText = uusiotsikko.value;
            teksti.innerText = uusiteksti.value;

            uusiotsikko.remove();
            uusiteksti.remove();
            otsikko.style.display = 'block';
            teksti.style.display = 'block';

            valmis.remove();
            ogmuokkaus.style.display = 'block';
        })

    }
}

    function hideForm() {
    var x = document.getElementById("form-box");
    if (x.style.display === "block") {
    x.style.display = "none";
} else {
    x.style.display = "block";
}
}



