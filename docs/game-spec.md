# Game Specification

## Projekttitel

**Einfaches browserbasiertes Point-and-Click-Minispiel mit 3 Screens und Tresor-Codeeingabe**

---

## 1. Ziel des Spiels

Es soll ein sehr simples Spiel sein, das lokal in einem Browser auf einem Laptop läuft.

Das Spiel besteht aus genau drei Hauptseiten bzw. Screens:

1. Startscreen
2. Game-Screen
3. Win-Screen

Zusätzlich gibt es auf dem Game-Screen mehrere modale Fenster, die den Hintergrund blockieren, solange sie geöffnet sind.

Das Spiel ist hauptsächlich auf Deutsch ausgelegt. Über einen Sprachbutton auf dem Startscreen kann zwischen Deutsch und Englisch gewechselt werden.

---

## 2. Technische Rahmenbedingungen des Spiels

* Das Spiel läuft lokal im Browser.
* Das Spiel benötigt kein Backend.
* Das Spiel benötigt keine Datenbank.
* Das Spiel benötigt keine externe Installation.
* Das Spiel benötigt keine API-Aufrufe.
* Alle Bilder und sonstigen Assets sind lokal eingebunden.
* Das Spiel ist für einen Laptop im Browser gedacht.
* Das Layout ist Desktop-first.
* Solange finale Bilder noch nicht existieren, werden Platzhalterbilder oder neutrale Platzhalterflächen verwendet.

---

## 3. Allgemeine Spielstruktur

Das Spiel besteht aus drei Hauptscreens:

* Startscreen
* Game-Screen
* Win-Screen

Zusätzlich gibt es auf dem Game-Screen folgende modale Fenster:

* Item-Modal
* Tresor-Modal
* Menü-Modal

Es darf immer nur ein modales Fenster gleichzeitig geöffnet sein.

Wenn ein Modal geöffnet ist, sind die restlichen Interaktionen im Hintergrund blockiert.

---

## 4. Sprache des Spiels

Das Spiel unterstützt zwei Sprachen:

* Deutsch
* Englisch

Die Standardsprache beim Start des Spiels ist Deutsch.

Auf dem Startscreen befindet sich unten rechts ein Button zur Sprachauswahl.

Der Sprachbutton hat die Form einer Flagge:

* Bei deutscher Sprache wird die Deutschlandflagge angezeigt.
* Bei englischer Sprache wird die Großbritannienflagge angezeigt.

Beim ersten Klick auf die Deutschlandflagge:

* wechselt die Sprache von Deutsch auf Englisch
* die Deutschlandflagge wechselt zur Großbritannienflagge
* alle sichtbaren Texte des Spiels werden auf Englisch angezeigt

Beim erneuten Klick auf die Großbritannienflagge:

* wechselt die Sprache von Englisch zurück auf Deutsch
* die Großbritannienflagge wechselt zur Deutschlandflagge
* alle sichtbaren Texte des Spiels werden wieder auf Deutsch angezeigt

Der Sprachwechsel betrifft alle sichtbaren UI-Texte des Spiels, zum Beispiel:

* Start-Button
* Schließen-Buttons
* Bestätigen-Button
* Fehlermeldungen
* Neustart-Button
* Glückwunsch-Nachricht

Der Sprachbutton ist nur auf dem Startscreen sichtbar.

---

## 5. Screen 1: Startscreen

### 5.1 Inhalt

Der Startscreen enthält:

* ein Hintergrundbild als Platzhalter
* einen sichtbaren Start-Button
* unten rechts einen Button zur Sprachauswahl in Form einer Flagge

### 5.2 Verhalten

Beim Laden des Spiels ist immer zuerst der Startscreen sichtbar.

Der Startscreen startet standardmäßig auf Deutsch.

Ein Klick auf den Start-Button wechselt zum Game-Screen.

Ein Klick auf den Sprachbutton unten rechts wechselt zwischen Deutsch und Englisch.

Der Sprachbutton schaltet immer zwischen zwei Zuständen um:

* Deutsch mit Deutschlandflagge
* Englisch mit Großbritannienflagge

### 5.3 Visuelle Anforderungen

* Das Hintergrundbild füllt den sichtbaren Bereich möglichst vollständig aus.
* Der Start-Button ist klar sichtbar und gut anklickbar.
* Der Start-Button kann mittig oder an einer gut sichtbaren Stelle platziert werden.
* Der Sprachbutton befindet sich unten rechts.
* Der Sprachbutton ist als Flagge dargestellt.
* Der Sprachbutton ist klar sichtbar, aber kleiner und unauffälliger als der Start-Button.
* Die Flagge zeigt immer die aktuell ausgewählte Sprache an.

---

## 6. Screen 2: Game-Screen

### 6.1 Grundaufbau

Der Game-Screen zeigt ein einziges großes Hintergrundbild als zentrale Spielszene.

In dieses Bild sind interaktive Bereiche eingebettet:

* 10 klickbare Items
* 1 anklickbarer Tresor
* 1 Button zum Öffnen eines kleinen Menüs

Das Bild selbst ist die visuelle Grundlage der Szene.

Die klickbaren Items sollen im Bild bereits so gestaltet sein, dass sie im Vergleich zur Umgebung leicht größer oder auffälliger wirken.

Es sollen jedoch keine dauerhaft sichtbaren grafischen Zusatzmarkierungen auf den Items liegen.

Erst beim Hover soll ein Hinweis erscheinen.

### 6.2 Positionierung interaktiver Bereiche

Die 10 Items, der Tresor und der Menü-Button liegen als klickbare Bereiche über dem Hintergrundbild.

Die klickbaren Bereiche sollen sich passend zur Größe des Hintergrundbilds verhalten, damit sie bei unterschiedlichen Laptop-Browsergrößen weiterhin an den richtigen Stellen liegen.

---

## 7. Die 10 klickbaren Items

### 7.1 Anzahl

Es gibt genau 10 klickbare Items auf dem Game-Screen.

### 7.2 Darstellung

* Die Items sind Teil des Hintergrundbilds.
* Es gibt keine dauerhaft sichtbaren Labels.
* Es gibt keine dauerhaft sichtbaren Rahmen.
* Die klickbaren Bereiche selbst sollen unsichtbar oder nahezu unsichtbar sein.

### 7.3 Hover-Verhalten

Wenn der Mauszeiger über einem Item schwebt:

* erscheint ein kleiner visueller Hinweis direkt am Item oder in unmittelbarer Nähe
* dieser Hinweis sieht wie ein kleines Warnsymbol aus
* Beispiel: ein kleines gelbes Warndreieck mit einem Fragezeichen
* der Hinweis zeigt, dass das Item anklickbar ist
* der Hinweis verschwindet wieder, sobald der Cursor das Item verlässt

### 7.4 Klick-Verhalten

Beim Klick auf ein Item:

* öffnet sich ein großes modales Fenster
* das Modal zeigt ein Bild mit einem Hinweis bzw. Clue
* zusätzlich gibt es einen Schließen-Button

### 7.5 Inhalt des Item-Modals

Das große Hinweis-Modal enthält:

* ein großes Platzhalterbild für den Hinweis
* optional eine kleine Bildbeschreibung oder Titelzeile
* einen gut sichtbaren Schließen-Button

Jedes der 10 Items hat ein eigenes Bild bzw. einen eigenen Hinweis.

### 7.6 Verhalten des Item-Modals

Solange das Item-Modal geöffnet ist:

* sind alle Hintergrundinteraktionen gesperrt
* es darf kein anderes Item angeklickt werden
* der Tresor darf nicht angeklickt werden
* das Menü darf nicht angeklickt werden
* Hover-Effekte im Hintergrund sind deaktiviert
* das Modal liegt über einer Overlay-Ebene

### 7.7 Größe des Item-Modals

* Das Modal ist sehr groß.
* Es deckt den Großteil des sichtbaren Bildbereichs ab.
* Es bleibt nur ein kleiner Rand der Spielszenen-Grafik außen herum sichtbar.

### 7.8 Schließen des Item-Modals

Das Modal wird ausschließlich über den Schließen-Button geschlossen.

Danach kehrt der Nutzer zum Game-Screen zurück.

Der Zustand des Game-Screens bleibt bestehen.

---

## 8. Tresor auf dem Game-Screen

### 8.1 Tresor-Interaktion

Auf dem Game-Screen gibt es einen anklickbaren Tresor.

Beim Klick auf den Tresor:

* öffnet sich ein modales Tresor-Fenster
* der Hintergrund wird blockiert

### 8.2 Inhalt des Tresor-Modals

Das Tresor-Modal enthält:

* vier separate Zahlenkästchen
* über jedem Kästchen einen anklickbaren Pfeil nach oben
* unter jedem Kästchen einen anklickbaren Pfeil nach unten
* einen Bestätigen-Button
* einen Schließen-Button

### 8.3 Zahlenlogik

* Es gibt genau 4 Kästchen.
* Alle 4 Kästchen starten immer mit dem Wert `0`.
* Jeder Wert kann nur eine Ziffer von `0` bis `9` enthalten.
* Die Ziffern werden nicht direkt per Tastatureingabe eingegeben.
* Die Ziffern werden durch Klicken auf Pfeile verändert.

### 8.4 Pfeil-Logik

Für jedes einzelne Kästchen gilt:

* Pfeil nach oben erhöht den Wert um `1`.
* Pfeil nach unten verringert den Wert um `1`.

Die Werte sind zyklisch:

* Wenn der aktuelle Wert `9` ist und auf Pfeil nach oben geklickt wird, wird daraus `0`.
* Wenn der aktuelle Wert `0` ist und auf Pfeil nach unten geklickt wird, wird daraus `9`.

### 8.5 Korrekte Kombination

Der korrekte vierstellige Code lautet:

```text
9 1 2 6
```

### 8.6 Bestätigen-Button

Beim Klick auf den Bestätigen-Button werden die vier aktuell sichtbaren Ziffern als Code geprüft.

### 8.7 Verhalten bei falschem Code

Wenn der Code falsch ist:

* erscheint im Tresor-Modal ein kurzer Hinweis, dass der Code nicht korrekt ist
* dieser Hinweis verschwindet automatisch nach kurzer Zeit wieder
* das Tresor-Modal bleibt geöffnet
* die aktuell eingestellten Zahlen bleiben erhalten
* der Nutzer kann direkt weiterprobieren

Die Fehlermeldung ist nur kurz sichtbar.

Empfohlene Dauer der Fehlermeldung:

```text
1,5 Sekunden
```

### 8.8 Verhalten bei richtigem Code

Wenn der Code korrekt ist:

* wird unmittelbar auf den Win-Screen gewechselt

### 8.9 Blockierungslogik

Solange das Tresor-Modal geöffnet ist:

* darf nichts anderes im Hintergrund angeklickt werden
* es darf kein weiteres Modal geöffnet werden
* Hover-Hinweise im Hintergrund sind deaktiviert

### 8.10 Schließen des Tresor-Modals

Das Tresor-Modal hat einen Schließen-Button.

Ein Klick auf diesen Schließen-Button bringt den Nutzer zurück zum Game-Screen.

Ein Klick außerhalb des Tresor-Modals schließt das Modal nicht.

Der Nutzer muss das Tresor-Modal bewusst über den vorgesehenen Button schließen.

---

## 9. Menü auf dem Game-Screen

### 9.1 Zweck

Auf dem Game-Screen gibt es zusätzlich einen Menü-Button.

### 9.2 Klick auf den Menü-Button

Beim Klick auf den Menü-Button:

* öffnet sich ein kleines modales Fenster

### 9.3 Inhalt des Menü-Modals

Das kleine Menü-Modal enthält:

* einen Button „Spiel neustarten“
* einen Schließen-Button, zum Beispiel `X`

Es gibt innerhalb des Spiels keine Option „Spiel beenden“.

Das Spiel kann nur manuell verlassen werden, indem der Browser oder Tab geschlossen wird.

### 9.4 Verhalten des Menü-Modals

Solange das Menü-Modal geöffnet ist:

* sind alle restlichen Interaktionen im Hintergrund gesperrt

### 9.5 Schließen des Menü-Modals

Das Menü-Modal kann auf zwei Arten geschlossen werden:

* Klick auf den Schließen-Button
* Klick außerhalb des Modals auf die Overlay-Fläche

### 9.6 Neustart aus dem Menü

Wenn im Menü auf „Spiel neustarten“ geklickt wird:

* wird das gesamte Spiel vollständig zurückgesetzt
* alle Modals werden geschlossen
* alle Tresor-Ziffern werden wieder auf `0` gesetzt
* eventuelle Fehlermeldungen werden gelöscht
* der Screen wechselt zurück zum Startscreen
* die aktuell ausgewählte Sprache bleibt erhalten

---

## 10. Screen 3: Win-Screen

### 10.1 Wann der Screen erscheint

Der Win-Screen erscheint ausschließlich dann, wenn im Tresor der korrekte Code bestätigt wurde:

```text
9 1 2 6
```

### 10.2 Inhalt

Der Win-Screen enthält:

* ein Hintergrundbild als Platzhalter
* eine gut sichtbare Glückwunsch-Nachricht
* einen Button „Spiel neustarten“

Es gibt auf dem Win-Screen keinen „Spiel beenden“-Button.

### 10.3 Verhalten

Wenn der Nutzer auf „Spiel neustarten“ klickt:

* wird das gesamte Spiel vollständig zurückgesetzt
* der Nutzer landet wieder auf dem Startscreen
* die aktuell ausgewählte Sprache bleibt erhalten

---

## 11. Globale Interaktionsregeln

### 11.1 Nur ein Modal gleichzeitig

Es darf immer nur ein einziges Modal gleichzeitig geöffnet sein.

Das bedeutet:

* Wenn ein Item-Modal offen ist, darf kein Tresor und kein Menü geöffnet werden.
* Wenn das Tresor-Modal offen ist, darf kein Item und kein Menü geöffnet werden.
* Wenn das Menü-Modal offen ist, darf kein Item und kein Tresor geöffnet werden.

### 11.2 Hintergrund sperren

Wenn irgendein Modal geöffnet ist:

* sind alle Interaktionen im Hintergrund deaktiviert
* keine Klicks auf Hotspots
* keine Hover-Indikatoren
* keine Mausinteraktionen außerhalb des jeweils erlaubten Modalbereichs

### 11.3 Rückkehr zum Game-Screen

Wenn ein Modal geschlossen wird:

* kehrt der Nutzer zurück zum Game-Screen

Ausnahme:

* Bei korrektem Tresorcode erfolgt der Wechsel zum Win-Screen.

### 11.4 Kein In-Game-Beenden

Das Spiel enthält keine eingebaute Beenden-Funktion.

Wenn der Nutzer das Spiel verlassen möchte, schließt er manuell den Browser oder den Browser-Tab.

---

## 12. Visuelle Anforderungen

### 12.1 Allgemein

* Die Darstellung ist klar und simpel.
* Das Hintergrundbild jedes Screens prägt den sichtbaren Bereich.
* Buttons und Modals sind gut lesbar und gut anklickbar.
* Das UI ist funktional und nicht überladen.

### 12.2 Startscreen

* Platzhalter-Hintergrundbild
* klar sichtbarer Start-Button
* unten rechts ein Sprachbutton in Flaggenform
* Deutschlandflagge bei deutscher Sprache
* Großbritannienflagge bei englischer Sprache

### 12.3 Game-Screen

* großes Platzhalter-Hintergrundbild
* darüber unsichtbare oder fast unsichtbare Hotspots
* Hover-Hinweise nur bei Mouseover

### 12.4 Item-Modal

* sehr groß
* zentriert
* Bild dominiert den Inhalt
* kleiner Rand zum Hintergrund sichtbar

### 12.5 Tresor-Modal

* mittlere bis große Größe
* vier Ziffernkästchen nebeneinander
* über und unter jedem Kästchen anklickbare Pfeile
* Bestätigen-Button gut sichtbar
* Fehlermeldung klar lesbar, aber temporär

### 12.6 Menü-Modal

* kleiner als die anderen Modals
* funktional
* enthält nur Neustart und Schließen

### 12.7 Win-Screen

* Platzhalter-Hintergrundbild
* sichtbare Glückwunsch-Nachricht
* sichtbarer Neustart-Button

---

## 13. Responsive Verhalten

Das Spiel ist primär für einen Laptop-Browser gedacht, nicht für Mobile.

Anforderungen:

* Auf typischen Laptop-Auflösungen ist alles vollständig bedienbar.
* Inhalte passen sich innerhalb des Browserfensters an.
* Keine Mobile-Optimierung erforderlich.
* Falls das Browserfenster kleiner wird, bleiben modale Inhalte trotzdem sichtbar.
* Scrollen sollte nach Möglichkeit vermieden werden.

---

## 14. User Flow

### 14.1 Standardablauf

1. Spiel startet auf dem Startscreen.
2. Standardsprache ist Deutsch.
3. Nutzer kann auf dem Startscreen unten rechts per Flaggenbutton zwischen Deutsch und Englisch wechseln.
4. Nutzer klickt auf Start.
5. Nutzer kommt auf den Game-Screen.
6. Nutzer kann:

   * über Items hovern und sie öffnen
   * den Tresor öffnen
   * das Menü öffnen
7. Wenn der Nutzer den korrekten Tresorcode `9 1 2 6` eingibt:

   * Wechsel auf den Win-Screen
8. Auf dem Win-Screen kann der Nutzer das Spiel neu starten.
9. Neustart bringt den Nutzer zurück zum Startscreen und setzt das Spiel zurück.
10. Die aktuell ausgewählte Sprache bleibt beim Neustart erhalten.

---

## 15. Reset-Logik

Ein Neustart setzt das Spiel vollständig zurück.

Dabei werden mindestens diese Punkte zurückgesetzt:

* Rückkehr zum Startscreen
* alle offenen Modals werden geschlossen
* alle Tresor-Ziffern werden wieder auf `0` gesetzt
* Fehlermeldungen werden ausgeblendet
* Overlay wird deaktiviert

Die aktuell ausgewählte Sprache bleibt beim Neustart erhalten.

---

## 16. Edge Cases und Spielregeln

### 16.1 Doppelklicks

Wiederholte schnelle Klicks auf ein Item, den Tresor oder das Menü dürfen nicht mehrere Modals gleichzeitig öffnen.

### 16.2 Klicks bei offenem Modal

Bei offenem Modal werden Klicks auf den Hintergrund ignoriert.

Ausnahme:

* Beim Menü-Modal darf ein Klick auf das Overlay das Modal schließen.

### 16.3 Fehlermeldung im Tresor

Wenn die Fehlermeldung bereits sichtbar ist und erneut ein falscher Code bestätigt wird:

* bleibt die Anzeige konsistent
* die Fehlermeldung ist erneut kurz sichtbar

### 16.4 Wechsel zum Win-Screen

Sobald der richtige Code bestätigt wurde:

* wird das Tresor-Modal beendet
* der Win-Screen wird angezeigt

### 16.5 Neustart aus jedem Zustand

Der Neustart funktioniert zuverlässig:

* aus dem Menü-Modal
* vom Win-Screen

### 16.6 Fehlende Bilder

Solange noch keine finalen Bilder vorliegen:

* werden Platzhalterbilder oder neutrale Platzhalterflächen angezeigt
* das Spiel bleibt trotzdem spielbar

---

## 17. Sichtbare Texte

Die sichtbaren Texte des Spiels existieren auf Deutsch und Englisch.

### Deutsche Texte

* `Start`
* `Spiel neustarten`
* `Schließen`
* `Bestätigen`
* `Der Code ist nicht korrekt.`
* `Glückwunsch!`

### Englische Texte

* `Start`
* `Restart game`
* `Close`
* `Confirm`
* `The code is incorrect.`
* `Congratulations!`

Der Sprachbutton selbst wird nicht über Text, sondern über die jeweilige Flagge dargestellt.
