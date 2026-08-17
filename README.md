# Hinnasto — animoitu taksin takaikkunanäyttö

Yhden tiedoston HTML-hinnasto iPadille. Toimii **täysin ilman verkkoyhteyttä**,
kuluttaa vähän akkua ja pitää hinnat luettavina koko ajan — mutta liikkuu,
välkkyy ja yllättää sen verran, että se erottuu festarikansan silmissä.

Sisältö on sama kuin painetussa hinnastossa: esimerkkimatka, aloitusmaksu,
minimihinta, kilometrihinta, kiinteä hinta ja yrittäjätiedot.

## Tiedostot

| Tiedosto | Mitä tekee |
|---|---|
| `index.html` | Koko näyttö: hinnasto, animaatiot ja logiikka. Ei ulkoisia riippuvuuksia. |
| `manifest.json`, `icon.svg` | Kotivalikkoon asennusta varten (kokoruututila). |
| `sw.js` | Service worker, joka tallentaa sivun offline-käyttöön https-osoitteesta. |

## Käyttö iPadilla

### Vaihtoehto A — kotivalikkoon asennettuna (suositus)

Tämä on varmin tapa: näyttö aukeaa kokoruutuna ilman Safarin palkkeja ja
toimii sen jälkeen ilman verkkoa.

1. Julkaise repo GitHub Pagesissa: **Settings → Pages → Branch: main → Save**.
   Osoitteeksi tulee `https://markus-j.github.io/hinnasto/`.
2. Avaa osoite iPadin Safarissa **kerran verkon kanssa** (esim. kotona).
   Service worker tallentaa sivun laitteelle.
3. Jaa-painike → **Lisää Koti-valikkoon**.
4. Käynnistä kuvakkeesta. Festareilla se toimii ilman nettiä.

### Vaihtoehto B — pelkkä tiedosto

Kopioi `index.html` iPadin Tiedostot-sovellukseen (AirDrop, iCloud, sähköposti)
ja avaa se. Sivu toimii sellaisenaan offline, mutta aukeaa Safarin sisään eikä
kokoruututilaan.

### Asetukset ennen keikkaa

* **Asetukset → Näyttö ja kirkkaus → Automaattilukitus → Ei koskaan**
  (muuten näyttö sammuu kesken parhaan biitin).
* **Asetukset → Käyttöapu → Ohjattu käyttö** päälle, ja käynnistä se
  kolmoisklikkauksella — silloin näyttö ei vahingossa vaihdu muuhun sovellukseen.
* Kirkkaus n. 70 % riittää yleensä ikkunanäyttöön ja säästää akkua.
* iPad kannattaa pitää laturissa, jos autossa on USB-virta.

## Menotilat — napauta ruutua

Napautus vaihtaa tilaa, valinta muistetaan seuraavallakin käynnistyksellä:

| Tila | Mitä tapahtuu | Akku |
|---|---|---|
| **HYPE** | Täysi meno: yllätys 7–15 s välein. | ~ |
| **RAUHA** | Hitaampi syke, yllätys 25–50 s välein. | vähemmän |
| **STILL** | Kaikki animaatiot pois, pelkkä hinnasto. | vähiten |

## Värit

Säädös: *"Hinnasto tulee ilmoittaa joko mustalla pohjalla keltaisella värillä
tai keltaisella pohjalla mustalla värillä."*

Itse hinnasto — teksti, palkit ja tausta — on aina joko keltaista mustalla tai
mustaa keltaisella. Käytössä on vain kaksi väriä, `#000000` ja `#FFF75E`,
muuttujina `--dark` ja `--bright`. **Flip**-efekti vaihtaa nämä keskenään,
jolloin näyttö siirtyy säädöksen ensimmäisestä sallitusta muodosta toiseen;
kontrasti pysyy samana. Hinnaston omia värejä ei muuteta miksikään muuksi
(aiempi neonefekti on poistettu kokonaan).

Koristeet saavat olla värillisiä: lentävät emojit, konfetti ja taksi eivät ole
osa hinnastoa vaan liikkuvat sen kaistoilla. Kun muokkaat itse hinnastoa,
käytä aina `var(--dark)`- ja `var(--bright)`-arvoja.

## Kädenpuristuskuvake

Rivin "Kiinteä hinta sovitaan etukäteen" kuvake on **Traficomin virallinen
kädenpuristus** ([kuvapankki.traficom.fi](https://kuvapankki.traficom.fi/fi/search?gallery=236324)),
upotettuna suoraan `index.html`-tiedostoon (`#ico-sovittu`).

Kuvake piirretään `currentColor`-värillä, joten yksi ja sama polku riittää
molempiin sallittuihin muotoihin: se on keltainen mustalla pohjalla ja
kääntyy mustaksi keltaisella pohjalla flip-efektin aikana. Erillistä mustaa
tiedostoa (galleria 236325) ei siis tarvita.

## Staattiset osat

Otsikko **Hinnasto** ja esimerkkimatkan hinta **39,00 €** eivät liiku eivätkä
sykähtele — niillä ei ole omaa animaatiota lainkaan.

## Mainoslakana

Hintarivien oikealla puolella näkyy **yksi lakana kerrallaan**: teksti on
esillä noin 6 sekuntia, katoaa kokonaan noin 2,5 sekunniksi, ja sitten tulee
näkyviin seuraava teksti (RAUHA-tilassa 12 s / 5 s). Ilme vaihtelee täytetyn
ja ääriviivalaatan välillä. Tekstit ovat `index.html`-tiedoston
`BANNERS`-muuttujassa:

    BLOCKFEST 2026 · GO TAMPERE · BLOCKFEST TAMPERE
    BLOCKFEST = LEGIT · MÄKKÄRIN KAUTTA KÄMPILLE

Listaan voi lisätä tekstejä vapaasti — pitkä teksti rivittyy ja pienenee
automaattisesti lakanan kokoiseksi.

## Efektit

Kaikki yllätykset arvotaan satunnaisesti eivätkä ne koskaan peitä hintoja:

* **Lentävät kuviot** — värillisiä emojeja (🔥💸🎧👑🏆) ja keltaisia
  siluetteja (salama, tähti, kruunu, nuotti, kuulokkeet, mankka, euro, taksi)
  otsikkopalkin tai ekvalisaattorin poikki.
* **Leimat** — "MENOKS!", "SKRRT!", "KYYTIIN!" ponnahtavat alareunaan.
* **Flip** — musta ja keltainen vaihtavat paikkaa. Kontrasti pysyy samana.
* **Strobo** — sama vaihto nopeasti tahdissa.
* **Scratch** — koko kyltti nytkähtää kuin levy soittimella.
* **Boom** — reunat välähtävät ja kyltti pomppaa bassoiskusta.
* **Konfetti** värillisinä lastuina ja **taksi**, joka ajaa ekvalisaattorin poikki.

Efektejä voi kokeilla Safarin konsolista: `__fx.confetti()`, `__fx.flip()` jne.

## Miten akku pysyy kasassa

* Animoidaan **vain** `transform`- ja `opacity`-ominaisuuksia, jotka näytönohjain
  hoitaa ilman uudelleenpiirtoa. Ei canvasia, ei `requestAnimationFrame`-silmukkaa,
  ei animoituja varjoja tai sumennuksia.
* Jatkuvia animaatioita on 26, ja ne kaikki ovat kevyitä siirtoja.
  Yllätykset luodaan hetkeksi ja poistetaan DOM:sta heti perään.
* Musta tausta on OLED-näytöllä selvästi halvempi kuin vaalea.
* Kun näyttö menee taustalle tai lukkoon, **kaikki animaatiot pysähtyvät**
  automaattisesti (`visibilitychange`).
* **STILL**-tila pysäyttää kaiken, jos akku alkaa loppua kesken illan.

## Sisällön muuttaminen

Hinnat ja yhteystiedot ovat `index.html`-tiedoston lopussa selkokielisenä
HTML:nä (`.hero`, `.rows`, `.legal`), mainostekstit `BANNERS`-listassa. Muuta luku, tallenna, valmista.
Tekstikoot skaalautuvat itsestään: käynnistyksessä ajettava `fit()` kutistaa
liian pitkän rivin niin, että se mahtuu aina näytölle — myös pystyasennossa
ja eri kokoisilla iPadeilla.
