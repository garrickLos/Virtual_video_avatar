## Kleine uitleg:
Het idee is dat je met je dnd karakter dus een virtuele representative hebt die je kan gebruiken op discord. Hierbij heb je het volgende nodig:
-  Discord
- OBS
- Microsoft paint
- text editor (kan normale notepad zijn, kan ook vscode zijn). VScode is wat ingewikkelder om te installeren, hou het anders bij notepad voor simplisiteit.


## Het opstarten:
Eerst moet je een plaatje hebben. Deze heeft een dedicated folder binnen het project: "Frontend\character_art\Characters". Hier plaats je dus al je karakters plaatjes die je nodig hebt.
Om het karakter goed te laten werken moet je dus een hoofd/mondvlak hebben en een lichaam/body.
Het hoofd/mondvlak is hetgene wat op en neer gaat tijdens het praten en het lichaam/body is wat stationary blijft.


## Programma testen:
open "command prompt" type in: "cd {De locatie van de folder}" <-- plaats achter de cd de locatie van de folder waar je hem hebt geplaatst (mijn locatie is "D:\Github\virtual_camera_character\Frontend" dus ik doe "cd D:\Github\virtual_camera_character\Frontend"). als je daarna nog steeds de oude locatie ziet waar je begint (meestal iets van "C:/Users/{user}" dan moet je even de schrijf nummer doen, voor mij is het d: dus type ik in: "D:" en dan pakt hij de correcte locatie).

Eenmaal in de Frontend folder type in: "npm start". Dit start de applicatie. Hierbij heb ik dus een standaard karakter dat ik zelf wil gaan gebruiken samen met wat settings:
Een knop helemaal boven de settings: Zorgt dat alle settings verdwijnen voor obs
"click to talk": Pakt het geluid van je mic op
"input scale of the character": verander de scale van het karakter (handig voor als hij te groot of te klein is)
"greenscreen color": handig voor obs om de achtergrond te verwijderen met keys
"toggle rotation marker": toggled een marker dat aantoont waar de origin van het hoofd zit. (om de locatie hiervan te veranderen wat wss moet gebeuren moet je een bestand vinden genaamd "style.css" in deze folder: "D:\Github\virtual_camera_character\Frontend\css", hierbij heb je de --origin_x: 511px;
    /* Verplaatst naar links en rechts (de nek)*/
    --origin_y: 165px;
    /* Verplaatst naar boven en beneden (de nek) */
Deze 2 moeten worden aangepast op de nieuwe positie die jij wilt voor je foto, dit kan makkelijk in notepad. Eenmaal aangepast en opgeslagen met ctrl + s moet je in de applicatie ctrl + shift + r doen om het te herladen.
)

"head picture path": De naam van het bestand van het hoofd. Je hoeft alleen de naam van de photo te doen
"body picture path": De naam van het bestand van het lichaam. Zelfde als het hoofd, alleen de naam van de foto

## eigen karakter:
Om een eigen karakter te hebben moet je een paar dingen doen:
Karakter generen/maken
achtergrond van het plaatje verwijderen
hoofdvlak wegsnijden van het lichaam
lichaam en hoofd apart opslaan (zorg ervoor dat ze precies dezelfde afmeting zijn, dus doe alsof het lichaam en het hoofd nog samen zijn maar wel 2 aparte foto's [bekijk andere foto's voor referentie]).
plaats beide afbeeldingen in de "virtual_camera_character\Frontend\character_art\Characters" folder