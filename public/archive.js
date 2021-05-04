let gethttprequest = new XMLHttpRequest();
let json;

gethttprequest.open("GET", "/getarkisto", true);
gethttprequest.setRequestHeader("Content-Type", "application/json");
gethttprequest.onreadystatechange = function() {
    if (gethttprequest.readyState === 4 && gethttprequest.status === 200) {
        json = JSON.parse(gethttprequest.responseText);

        if (json.numOfRows > 0) {
            for (let i in json.rows) {
                let teksti = json.rows[i].teksti;
                let otsikko = json.rows[i].otsikko;
                //Elementtien lisäys dom-puuhun.
                let divi = document.createElement('div');
                let divi2 = document.createElement('div');
                document.getElementById("archivememos").append(divi,divi2);
                divi.setAttribute('class', 'notehead');
                divi2.setAttribute('class', 'note-text');

                let p = document.createElement('p');
                p.innerHTML = teksti;
                p.innerHTML += "<br>rivi: " + json.rows[i].rivi;
                divi2.appendChild(p);

                let h2 = document.createElement('h2');
                h2.innerHTML = otsikko;
                divi.appendChild(h2);
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
gethttprequest.send();
