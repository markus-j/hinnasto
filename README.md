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

## Efektit

Kaikki yllätykset arvotaan satunnaisesti eivätkä ne koskaan peitä hintoja:

* **Tarrat** — 🔥💸🎧👑⚡ lentävät otsikkopalkin tai ekvalisaattorin poikki.
* **Leimat** — "MENOKS!", "SKRRT!", "KYYTIIN!" ponnahtavat alareunaan.
* **Flip** — mustan ja keltaisen vaihto ristiin. Kontrasti pysyy täysin samana.
* **Neon** — keltainen vaihtuu hetkeksi syaaniin, pinkkiin tai vihreään.
* **Scratch** — koko kyltti nytkähtää kuin levy soittimella.
* **Boom** — reunat välähtävät ja kyltti pomppaa bassoiskusta.
* **Konfetti**, **taksi**, **valonheitin** ja **kiiltopyyhkäisy** otsikon yli.

Efektejä voi kokeilla Safarin konsolista: `__fx.confetti()`, `__fx.flip()` jne.

## Miten akku pysyy kasassa

* Animoidaan **vain** `transform`- ja `opacity`-ominaisuuksia, jotka näytönohjain
  hoitaa ilman uudelleenpiirtoa. Ei canvasia, ei `requestAnimationFrame`-silmukkaa,
  ei animoituja varjoja tai sumennuksia.
* Jatkuvia animaatioita on ~29, ja ne kaikki ovat kevyitä siirtoja.
  Yllätykset luodaan hetkeksi ja poistetaan DOM:sta heti perään.
* Musta tausta on OLED-näytöllä selvästi halvempi kuin vaalea.
* Kun näyttö menee taustalle tai lukkoon, **kaikki animaatiot pysähtyvät**
  automaattisesti (`visibilitychange`).
* **STILL**-tila pysäyttää kaiken, jos akku alkaa loppua kesken illan.

## Sisällön muuttaminen

Hinnat ja yhteystiedot ovat `index.html`-tiedoston lopussa selkokielisenä
HTML:nä (`.hero`, `.rows`, `.legal`). Muuta luku, tallenna, valmista.
Tekstikoot skaalautuvat itsestään: käynnistyksessä ajettava `fit()` kutistaa
liian pitkän rivin niin, että se mahtuu aina näytölle — myös pystyasennossa
ja eri kokoisilla iPadeilla.
