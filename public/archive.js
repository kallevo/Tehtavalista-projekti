/**
 * Http-pyynto.
 * @type {XMLHttpRequest}
 */
let gethttprequest = new XMLHttpRequest();
/**
 * Json tiedosto.
 */
let json;
/**
 * Avataan tiedosto
 */
gethttprequest.open("GET", "/getarkisto", true);
/**
 * Asetetaan RequestHeader.
 */
gethttprequest.setRequestHeader("Content-Type", "application/json");
gethttprequest.onreadystatechange = function() {
    /**
     * Jos httprequest on valmius tilassa ja servun status on 200(OK),
     * niin tiedot haetaan tietokannasta.
     */
    if (gethttprequest.readyState === 4 && gethttprequest.status === 200) {
        json = JSON.parse(gethttprequest.responseText);
        if (json.numOfRows > 0) {
            for (let i in json.rows) {

                let teksti = json.rows[i].teksti;
                let otsikko = json.rows[i].otsikko;
                /**
                 * Elementtien lisays dom-puuhun.
                 * @type {HTMLDivElement} elementit
                 */
                //Elementtien lisäys dom-puuhun.
                /**
                 * Luodaan container.
                 * @type {HTMLDivElement} container
                 */
                let notecontainer = document.createElement('div');
                /**
                 * Otsikko lisataan.
                 * @type {HTMLDivElement} otsikko
                 */
                let divi = document.createElement('div');
                /**
                 * Kuvaus lisataan.
                 * @type {HTMLDivElement} kuvaus
                 */
                let divi2 = document.createElement('div');
                document.getElementById("archivememos").append(notecontainer);
                notecontainer.append(divi,divi2);
                /**
                 * Asetetaan containerin attribuutti
                 */
                notecontainer.setAttribute('class', 'notecontainer');
                /**
                 * Asetetaan otsikon attribuutti
                 */
                divi.setAttribute('class', 'notehead');
                /**
                 * Asetetaan kuvauksen attribuutti
                 */
                divi2.setAttribute('class', 'note-text');
                /**
                 * Kuvauksen teksti.
                 * @type {HTMLParagraphElement} kuvaus
                 */
                let p = document.createElement('p');
                p.innerHTML = teksti;
                p.innerHTML += "<br><br>Kategoria: " + json.rows[i].kategoria;
                divi2.appendChild(p);
                /**
                 * Otsikon teksti.
                 * @type {HTMLHeadingElement} otsikko
                 */
                let h2 = document.createElement('h2');
                h2.innerHTML = otsikko;
                divi.appendChild(h2);
                /**
                 * Jos tehtava on tehty, se merkitaan erivariseksi.
                 */
                if (json.rows[i].valmis === "true") {
                    divi.style.background = "rgb(90,220,100)";
                    h2.innerHTML += " (tehty)";
                }
            }
        } else {
            alert("Tietoja ei löytynyt tietokannasta.")
        }
    }
}
/**
 * Lahetetaan getteri.
 */
gethttprequest.send();
