window.onload = function () {
    let otsikkokentta = document.getElementById('otsikkokentta');
    let tekstikentta = document.getElementById('tekstikentta');
   /* let otsikko1 = document.getElementById('otsikko1');
    let teksti1 = document.getElementById('teksti1');
    */
    let nappi = document.getElementById('new1');

    nappi.addEventListener('click', function () {
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
        //teksti1.innerHTML = tekstikentta.value;
        otsikkokentta.value = "";
        tekstikentta.value = "";
    })
}


