window.onload = function () {
    let otsikkokentta = document.getElementById('otsikkokentta');
    let tekstikentta = document.getElementById('tekstikentta');
    let nappi = document.getElementById('new1');

    nappi.addEventListener('click', function () {
        //Katsotaan onko joku kenttä tyhjä.
        if (otsikkokentta.value === ""|| tekstikentta.value === "") {
            return false;
        } else {
            //Elementtien lisäys dom-puuhun.
            let divi = document.createElement('div');
            let divi2 = document.createElement('div');
            document.getElementById('first').append(divi, divi2);
            divi.setAttribute('class', 'notehead');
            divi2.setAttribute('class', 'note-text');
            divi2.setAttribute('id', 'teksti1');
            let h2 = document.createElement('h2');
            h2.setAttribute('id', 'otsikko1');
            divi.appendChild(h2);
            h2.innerHTML = otsikkokentta.value;
            divi2.innerHTML = tekstikentta.value;
            //Muistiinpanon poisto.
            let poista = document.createElement('button');
            poista.setAttribute('class', 'deletebutton');
            poista.innerText += 'Poista';
            divi2.appendChild(poista);
            poista.addEventListener('click', function () {
                divi.remove();
                divi2.remove();
            })
            //Laitetaan lopuksi kentät tyhjiksi.
            otsikkokentta.value = "";
            tekstikentta.value = "";
        }
    })
}


