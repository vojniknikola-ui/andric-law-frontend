import { put, list } from '@vercel/blob';

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  content: string;
  summary: string;
  imageUrl: string;
  date: string;
  publishedAt: string;
  author: { name: string };
}

const BLOG_DATA: BlogPost[] = [
  {
    id: '1',
    slug: 'advokatska-tarifa-fbih-2025',
    title: 'Nova Advokatska tarifa FBiH 2025',
    content: `# ADVOKATSKA TARIFA FBiH 2025

## TARIFA O NAGRADAMA I NAKNADI TROŠKOVA ZA RAD ADVOKATA FBiH 2025

**"Službene novine Federacije Bosne i Hercegovine", broj 43/2025 od 11.06.2025g.**

**Vrijednost boda iznosi 5,60 KM**

Na osnovu člana 27. Zakona o advokaturi Federacije Bosne i Hercegovine ("Službene novine Federacije BiH", broj 01/2025) i člana 55. Statuta Advokatske komore Federacije Bosne i Hercegovine, Skupština advokatske komore Federacije Bosne i Hercegovine, na sjednici održanoj 31.05.2025. godine, donijela je Tarifu o nagradama i naknadi troškova za rad advokata.

---

## Član 1. - Opće odredbe

Tarifa o nagradama i naknadi troškova za rad advokata određuje visinu nagrade i naknade troškova koji pripadaju advokatu ako pisanim ugovorom između advokata i stranke nije drugačije ugovoreno

---

## I. KRIVIČNI POSTUPAK

### Član 2. - Izrada podnesaka

Advokatu pripada nagrada za izradu podnesaka u tijeku i u vezi s krivičnim postupkom:

a) **krivična prijava** - 150 bodova

b) **prijedlog za ostvarivanje imovinskopravnog zahtjeva** - 100% od nagrade iz člana 15

c) **zahtjev za naknadu štete zbog neopravdane osude** - nagrada iz člana 15

d) **obrazloženi podnesak** prije i u tijeku istrage, nakon potvrđivanja optužnice i u tijeku cijelog kaznenog postupka - 50% nagrade iz člana 4. stav 1

e) **prethodni prigovor na optužnicu** - nagrada iz člana 4. stav 1

f) **prijedlog za odlaganje izvršenja kazne, uslovni otpust, brisanje osude i rehabilitaciju, molba za pomilovanje** - 150 bodova

g) **uvid u sudski tužilački spis** ili pribavljanje dokaza za potrebe obrane - 50% nagrade iz člana 4. stav 1

i) **posjeta u zatvor ili pritvor** - nagrada po utrošenom satu koji se računa od trenutka ulaska u ustanovu, pa do izlaska iz ustanove iz člana 3. stav 1, uvećana za troškove iz člana 40

k) **svi drugi podnesci** (zahtjevi, molbe, obavještenja, izjašnjenja, dopisi i dr.) - 30 bodova

### Član 3. - Sudjelovanje branitelja u istrazi

Za sudjelovanje u istrazi u svojstvu branitelja prilikom ispitivanja osumnjičenog, u svojstvu zastupnika oštećenog ili u svojstvu savjetnika svjedoka, advokatu pripada nagrada kao za odbranu iz člana 4. stav 1, te za svaki naredni započeti sat naknada od **20 bodova**.

Za sudjelovanje u svojstvu branitelja u radnjama dokazivanja u istrazi (pretres stana, prostorija, osoba i dr.) advokatu pripada 50% nagrade iz stava 1.

### Član 4. - Odbrana osumnjičenog odnosno optuženog

Za odbranu optuženog (fizičke ili pravne osobe) pred sucem za prethodni postupak (u fazi istrage), sucem za prethodno saslušanje i na glavnom pretresu pred prvostepenim sudom, te na ročištima povodom prijedloga za određivanje, produženje ili ukidanje pritvora i mjera zabrane, advokatu pripada nagrada u krivičnim postupcima koji se vode:

a) za krivična djela za koja je zapriječena kazna zatvora **do 3 godine** - **120 bodova**

b) za krivična djela za koja je zapriječena kazna zatvora **od 3 do 5 godina** - **180 bodova**

c) za krivična djela za koja je zapriječena kazna zatvora **od 5 do 10 godina** - **240 bodova**

d) za krivična djela za koja **nije propisan gornji prag** zapriječene kazne zatvora - **480 bodova**

Za odbranu optuženog na sjednici drugostepenog suda advokatu pripada nagrada kao za odbranu iz prethodnog stava, ovisno od visine zapriječene kazne.

Za odbranu optuženog na glavnom pretresu pred drugostepenim sudom, pripada nagrada kao za odbranu iz stava 1, ovisno od visine zapriječene kazne.

Kada glavni pretres ili sjednica neprekidno traje duže od jednog dana, advokatu pripada nagrada kao iz stava 1-3.

Za odbranu optuženog na predraspravnom ročištu - statusna konferencija, advokatu pripada **50%** nagrade iz stava 1.

Za sudjelovanje na glavnom pretresu ili sjednici osim nagrade iz stava 1-3, advokatu pripada i nagrada za svaki naredni započeti sat glavnog pretresa ili sjednice od **20 bodova**.

### Član 5. - Više osoba

Kada advokat u krivičnom postupku zastupa ili brani više osoba, pripada mu nagrada za svakog branjenika u iznosu od **100%** u skladu sa odredbama ove tarife.

### Član 6. - Zastupanje oštećenog i pravno savjetovanje svjedoka

Za zastupanje oštećenog na glavnom pretresu ili na sjednici pred prvostepenim ili drugostepenim sudom, advokatu pripada **50%** nagrade iz člana 4.

Za sudjelovanje advokata kao pravnog savjetnika svjedoka na glavnom pretresu ili na sjednici pred prvostepenim ili drugostepenim sudom, advokatu pripada nagrada iz člana 4.

### Član 7. - Odbrana maloljetnika

Za odbranu maloljetnika advokatu pripada nagrada:

a) prije pokretanja i u tijeku pripremnog postupka - **100 bodova**

b) na glavnom pretresu ili sjednici - **150 bodova**

Za sve druge radnje u postupku koji se vodi protiv maloljetnika advokatu pripada nagrada kao za odbranu iz člana 4.

### Član 8. - Pravni lijekovi

Za izradu **žalbe protiv presude** (za optuženog ili oštećenog), advokatu pripada **125%** nagrade iz člana 4 stav 1.

Za izradu **odgovora na žalbu** protiv presude, advokatu pripada **80%** nagrade iz prethodnog stava.

Za izradu žalbe protiv rješenja o određivanju ili produženju pritvora, o primjeni odgojno-popravnih mjera i mjera sigurnosti, o određivanju ili produženju mjera zabrane, advokatu pripada **100%** nagrade iz člana 4. stav 1.

Za izradu pravnih lijekova sa kratkim rokovima za izjavljivanje u trajanju od 24 sata ili 3 dana, kada zadnji dan roka pada na dane vikenda, pored nagrade iz ovog člana advokatu pripada pravo na uvećanje nagrade u iznosu od **25%**.

Za izradu prijedloga za ponavljanje postupka i žalbe protiv rješenja o odbijanju prijedloga za ponavljanje postupka, advokatu pripada nagrada iz člana 4. stav 1.

### Član 9. - Pritvorski predmeti

Ako se osumnjičeni ili optuženi nalazi u pritvoru, nagrada advokata propisana Tarifom se uvećava za **25%** za svaku poduzetu radnju.

Za angažiranje istražitelja ili stručne osobe iz pojedine oblasti, nagrada advokata propisana Tarifom se uvećava za **20%** za svaku poduzetu radnju.

### Član 10. - Rad izvan radnog vremena

Advokatu koji učestvuje u radnji održavanja ročišta za određivanje pritvora ili po potrebi drugih neodložnih radnji propisanih ovom tarifom, iz člana 3. i 4., a koje se odvijaju izvan redovnog radnog vremena suda, odnosno u neradne dane, pored nagrade određene članom 3. i 4. nagrada se uvećava za **25%** za svaku poduzetu radnju.

### Član 11. - Pregovori o krivnji, sporazum o priznanju krivnje

Za iniciranje i sudjelovanje pregovora o krivnji osumnjičenog, advokatu pripada nagrada kao za odbranu iz člana 4. stav 1.

Za sudjelovanje advokata u izjašnjenju o krivnji optuženog, advokatu pripada nagrada od **70%** nagrade predviđene članom 4. stav 1.

Za zaključenje sporazuma o priznanju krivnje, advokatu pripada nagrada za zaključivanje istog **50%** nagrade iz stava 1. ovog člana.

Za odbranu na ročištu za razmatranje sporazuma o priznanju krivnje advokatu pripada nagrada iz člana 4.

### Član 12. - Posebno obimni ili teži krivični predmeti

U posebno obimnim ili težim krivičnim predmetima, advokatu, za cijeli postupak ili za pojedine dijelove postupka, pripada paušalna nagrada, koja ne prelazi dvostruki iznos propisane nagrade.

---

## II. PREKRŠAJNI POSTUPAK

### Član 13.

Za odbranu i zastupanje na glavnom pretresu, te za svaki slijeđi dan nastavljenog glavnog pretresa advokatu pripada nagrada iz člana 15, a osnovica za obračun nagrade se određuje prema maksimalno propisanoj kazni, a ne manje od **100 bodova**, odnosno ne manje od **200 bodova** u postupcima u privrednom poslovanju.

Za izradu žalbe protiv rješenja i zahtjeva za ponavljanje postupka advokatu pripada **125%** nagrade iz stava 1.

Za izradu prijedloga za povrat u prijašnje stanje advokatu pripada **50%** nagrade iz stava 1.

### Član 14.

Kada advokat u prekršajnom postupku zastupa ili brani više osoba, pripada mu nagrada za svakog branjenika u iznosu od **100%** u skladu sa odredbama ove tarife.

Pored nagrade iz člana 13. advokatu pripada i pravo na troškove iz člana 40.

---

## III. PARNIČNI POSTUPAK

### Član 15. - Osnovica za obračun nagrade

Kao osnovica za obračun nagrade u parničnom postupku primjenjuje se slijeća tabela:

| Vrijednost spora | Bodovi |
|-----------------|--------|
| 0,00 - 5.000,00 KM | 80 |
| 5.000,01 - 10.000,00 KM | 120 |
| 10.000,01 - 30.000,00 KM | 240 |
| 30.000,01 - 50.000,00 KM | 360 |
| 50.000,01 - 75.000,00 KM | 480 |
| 75.000,01 - 100.000,00 KM | 600 |
| preko 100.000,00 KM | 600 + 4 boda za svakih započetih 1.000,00 KM (max 3.000 bodova, odnosno 5.000 u privrednim sporovima) |

### Član 16. - Osnovica za komunalne usluge

Kao osnovica za obračun nagrade u parničnom postupku koji se vodi u postupcima naplate komunalnih usluga, isporuke vode, struje, toplotne energije, telekomunikacijskih usluga, usluga odvoza smeća, pričuve i održavanja zgrada, te naplate bilo koje vrste taksi primjenjuje se slijeća tabela:

| Vrijednost spora | Bodovi |
|-----------------|--------|
| 0,00 - 100,00 KM | 30 |
| 100,01 - 500,00 KM | 40 |
| 500,01 - 1.000,00 KM | 50 |
| 1.000,01 - 5.000,00 KM | 70 |
| 5.000,01 - 20.000,00 KM | 100 |
| preko 20.000,01 KM | 120 |

### Član 17. - Primjena osnovice za obračun nagrade

Prilikom obračunavanja pojedinih radnji u postupku, advokatu pripada:

**1. 100% nagrade iz člana 15, odnosno 16:**
- izrada tužbe i protutužbe
- izrada odgovora na tužbu i protutužbu
- zastupanje na pripremnom ročištu po tužbi i po protutužbi
- zastupanje na ročištu za glavnu raspravu po tužbi i po protutužbi
- zastupanje stranke na ročištu za određivanje mjere osiguranja
- izrada žalbe protiv rješenja o mjerama osiguranja

**2. 150% nagrade:**
- izrada žalbe protiv presude
- zastupanje na raspravi pred drugostepenim sudom
- izrada vanrednih pravnih lijekova

**3. 75% nagrade:**
- zastupanje stranke na očevidu
- izrada odgovora na žalbu protiv presude
- izrada prijedloga za određivanje mjere osiguranja

**4. 50% nagrade:**
- izrada obrazloženih podnesaka
- zastupanje stranke na ročištu za zamolbeno izvođenje dokaza
- izrada žalbe protiv rješenja
- za pristup na ročište koje je odgođeno na samom ročištu

**5. 25% nagrade:**
- za izgubljeno vrijeme zbog otkazivanje ročišta u roku kraćem od 24 sata

**6. U neprocjenjivim postupcima:**
- razvod ili poništenje braka
- utvrđivanje ili osporavanje očinstva
- radni odnosi (poništenje otkaza)
- smetanje posjeda

Vrijednost spora se smatra 10.001,00 KM

---

## IV. IZVRŠNI POSTUPAK

### Član 18.

U izvršnom postupku osnovicu za obračun nagrade čini zbroj glavnog potraživanja, dospjelih kamata, troškova parničnog postupka i drugih sporednih potraživanja, te se nagrada određuje na temelju člana 15, odnosno 16.

**100% nagrade:**
- izrada prijedloga za izvršenje i prijedloga za protuizvršenje
- izrada prigovora protiv rješenja o izvršenju
- izrada žalbe protiv rješenja
- zastupanje na bilo kojem ročištu

**50% nagrade:**
- izrada obrazloženog podneska
- izrada odgovora na prigovor i odgovora na žalbu

---

## V. POSTUPAK STEČAJA I LIKVIDACIJE

### Član 19.

Osnovica za obračun visine nagrade za izradu prijedloga za pokretanje stečajnog postupka ukoliko ga pokreće stečajni vjerovnik određuje se prema visini potraživanja vjerovnika u skladu sa odredbom člana 15.

Osnovica za obračun visine nagrade za izradu prijedloga za pokretanje stečajnog postupka ili postupka likvidacije, ukoliko ga pokreće budući stečajni dužnik, određuje se prema visini temeljnog kapitala društva, te advokatu pripada nagrada iz člana 15, ali ne manje od **240 bodova**.

Za zastupanje na ročištima u stečajnom ili likvidacijskom postupku, advokatu pripada nagrada iz stava 1. ovog člana.

Za izradu pravnih lijekova advokatu pripada **125%** nagrade.

---

## VI. VANPARNIČNI POSTUPAK

### Član 20.

Za izradu podnesaka kojima se pokreće postupak te pristup na ročište, advokatu pripada sljedeća nagrada:
- u svim procjenjivim predmetima **50%** nagrade iz člana 15
- u svim neprocjenjivim predmetima nagrada iznosi **100 bodova**

Za izradu obrazloženog podneska, izradu odgovora na pravne lijekove i pristup na ročište na kojem se nije raspravljalo **50%** nagrade iz stava 1.

Za izradu pravnih lijekova advokatu pripada **125%** nagrade iz stava 1.

---

## VII. ZEMLJIŠNOKNJIŽNI POSTUPAK

### Član 21.

Za izradu zemljišnoknjižnih prijedloga na temelju kojih se odlučuje o upisu, brisanju, predbilježbi ili zabilježbi nekog prava, advokatu pripada **80 bodova**.

Za izradu obrazloženog podneska u tijeku postupka advokatu pripada **40 bodova**.

Za izradu pravnih lijekova advokatu pripada **120 bodova**.

Advokat ima pravo na advokatsku nagradu u visini definiranoj članom 35, stav 1. ove Tarife, za utrošeno vrijeme koje je bilo potrebno za sačinjavanje bilo kojeg ugovora, odluke ili isprave koja služi kao pravni osnov upisa, s tim da se maksimalno utrošeno vrijeme ograničava na **8 sati** za svaki ugovor.

---

## VIII. UPRAVNI POSTUPAK

### Član 22.

Za izradu zahtjeva kojim se pokreće upravni postupak, izrada obrazloženog podneska, izrada prijedloga za izvršenje i zastupanje advokatu pripada sljedeća nagrada:
- u procjenjivim predmetima nagrada iz člana 15
- u neprocjenjivim predmetima nagrada iznosi **100 bodova**

Za izradu prigovora ili žalbe i zastupanje pred drugostepenim organom advokatu pripada **125%** nagrade iz stava 1.

Za izradu vanrednih pravnih lijekova advokatu pripada **150%** nagrade iz stava 1.

---

## IX. UPRAVNI SPOR

### Član 23.

Za izradu tužbe, odgovora na tužbu, zahtjeva za odlaganje izvršenja, zahtjeva za zaštitu sloboda i prava, zahtjeva za izvršenje presude i zastupanje na ročištu advokatu pripada sljedeća nagrada:
- u procjenjivim predmetima nagrada iz člana 15
- u neprocjenjivim predmetima nagrada iznosi **200 bodova**

Za izradu pravnih lijekova, zahtjeva za vanredno preispitivanje sudskih odluka i zahtjeva za zaštitu zakonitosti advokatu pripada **125%** nagrade iz stava 1.

Za izradu obrazloženih podnesaka i odgovora na pravne lijekove **50%** nagrade iz stava 1.

---

## X. POSTUPAK ZA UPIS U REGISTAR POSLOVNIH SUBJEKATA

### Član 24.

Za izradu prijave za upis osnivanja ili promjene podataka, te za izradu obrazloženog podneska u tijeku postupka advokatu pripada nagrada od **80 bodova**.

Za izradu žalbe advokatu pripada nagrada od **120 bodova**.

Advokat ima pravo na advokatsku nagradu u visini definisanoj članom 35, stav 1. ove Tarife, za utrošeno vrijeme koje je bilo potrebno za sačinjavanje bilo kojeg ugovora, odluke ili isprave, s tim da se maksimalno utrošeno vrijeme ograničava na **8 sati**.

---

## XI. POSTUPAK PRED USTAVNIM SUDOVIMA

### Član 25.

Za izradu apelacije kojom se pokreće postupak pred ustavnim sudovima, advokatu u svim postupcima pripada **200%** nagrade iz člana 15 u procjenjivim predmetima, a u neprocjenjivim predmetima nagrada iznosi **300 bodova**.

Za izradu ostalih podnesaka u tijeku postupka, advokatu pripada **50%** nagrade iz stava 1.

Za zastupanje i sudjelovanje na raspravi, advokatu pripada nagrada iz stava 1.

---

## XII. POSTUPAK PRED EVROPSKIM SUDOM ZA LJUDSKA PRAVA

### Član 26.

Za izradu zahtjeva kojim se pokreće postupak pred Evropskim sudom za ljudska prava, te zahtjeva za reviziju presude, advokatu pripada **400%** nagrade iz člana 15 u procjenjivim predmetima, a u neprocjenjivim predmetima nagrada iznosi **600 bodova**.

Za izradu ostalih podnesaka u tijeku postupka, advokatu pripada **50%** nagrade iz stava 1.

Za zastupanje i sudjelovanje na raspravi, advokatu pripada nagrada iz stava 1.

---

## XIII. POSTUPAK PRED POSLODAVCEM I DISCIPLINSKI POSTUPCI

### Član 27.

Za pružanje pravne pomoći radniku (izradu obrazloženog podneska, izrada zahtjeva za zaštitu prava) advokatu pripada nagrada od **100 bodova**.

Ako je kod poslodavca propisan disciplinski postupak za odbranu u disciplinskom postupku advokatu pripada nagrada od **120 bodova**.

Za izradu nacrta odluka kada advokat zastupa poslodavca advokatu pripada nagrada od **150 bodova**.

### Član 28.

Za zastupanje ili odbranu u bilo kojem drugom disciplinskom postupku advokatu pripada nagrada iz člana 27.

---

## XIV. POSTUPAK JAVNIH NABAVKI

### Član 29.

Za izradu žalbi u postupcima javnih nabavki advokatu pripada nagrada iz člana 15, s tim da se kao visina spora u tim postupcima uzima vrijednost javne nabavke, odnosno vrijednost pobijanog dijela (LOT-a).

Za izradu svih drugih podnesaka ili poduzimanje svih drugih radnji u postupcima javnih nabavki advokatu pripada **25%** nagrade iz člana 15.

---

## XV. NEPROCJENJIVI PREDMETI

### Član 30.

U neprocjenjivim predmetima, koji nisu obuhvaćeni odredbama Tarife, niti se vrijednost predmeta spora može na drugi način utvrditi, za svaku radnju advokatu pripada sljedeća nagrada:
- u prvostepenim postupcima - **120 bodova**
- u drugostepenim postupcima - **180 bodova**
- u postupcima po vanrednim pravnim lijekovima - **240 bodova**

---

## XVI. OSTALI POSTUPCI

### Član 31.

Za izradu obrazloženih podnesaka (zahtjeva, opomena) i zastupanje u postupcima koji se vode prije sudskog ili upravnog postupka advokatu pripada **50%** nagrade iz člana 15.

---

## XVII. RAZNO

### Član 32. - Izrada isprava, Ugovora, ili Odluka

Za izradu svih ostalih isprava, odluka ili ugovora, koje nisu definisane drugim odredbama ove Tarife, advokat ima pravo na advokatsku nagradu u visini predviđenoj članom 35. stav 1. ove Tarife, za utrošeno vrijeme koje je bilo potrebno za sačinjavanje tih isprava, s tim da se maksimalno utrošeno vrijeme ograničava na **8 sati**.

### Član 33. - Dopisi

Za izradu neobrazloženih dopisa stranci, protivnoj stranci i drugim sudionicima u pravnim poslovima stranke, advokatu pripada nagrada u iznosu od **30 bodova**.

### Član 34. - Pribavljanje klauzula i drugih isprava

Za pribavljanje klauzule pravomoćnosti ili izvršnosti odluka, advokatu pripada nagrada od **15 bodova**.

Za pribavljanje izvoda iz zemljišnih knjiga i registra poslovnih subjekata ili pribavljanje drugih isprava, advokatu pripada nagrada od **30 bodova**.

### Član 35. - Nagrada za utrošeno vrijeme

Advokatu pripada nagrada od **30 bodova** za svakih započetih pola sata u sljedećim slučajevima:

a) za sudjelovanje na konferencijama i sastancima
b) za usmena i pisana pravna mišljenja i savjete
c) za raspravljanje na konferencijama na stranom jeziku nagrada se uvećava za **100%**
d) za izradu ugovora, odluka i isprava

Advokatu pripada nagrada od **10 bodova** za svakih započetih pola sata u sljedećim slučajevima:

a) razmatranje i pregled spisa u svim postupcima
b) za čekanje na raspravu ili za vrijeme vijećanja suda, ali najviše **8 sati dnevno**
c) za sve druge pravne radnje kada odredbama Tarife ili ugovora nije predviđen drugačiji način određivanja nagrade

### Član 36. - Zastupanje više osoba i protiv više osoba

Kada advokat u istom postupku zastupa više osoba ili vodi postupak protiv više osoba, pripada mu pravo na uvećanje osnovnih tarifnih stavki.

U takvom slučaju kao vrijednost spora uzima se zbroj vrijednosti tužbenih zahtjeva svih stranaka koje advokat zastupa, te se broj bodova utvrđen na temelju te vrijednosti spora uvećava za **20%** za drugu i svaku sljedeću osobu, s tim da to povećanje ne može biti veće od **100%** nagrade.

Iznos uvećane nagrade dijeli se na jednake dijelove na svaku od zastupanih osoba.

### Član 37. - Posebna vrsta ugovaranja nagrade

Advokat može slobodno ugovarati visinu nagrade sa strankom neovisno od odredbi Tarife pod uslovom da je ugovor sačinjen u **pisanoj formi** (uključujući prepisku putem elektroničke pošte).

Visina nagrade se može ugovoriti na jedan od sljedećih načina:

1. na temelju broja radnih sati
2. uvećanjem nagrade utvrđene Tarifom u određenom postotku, ali ne više od **100%**
3. određivanjem fiksnog iznosa nagrade za određeni posao
4. određivanjem mjesečnog novčanog iznosa za kontinuirani rad advokata
5. razmjerno uspjehu u postupku, u kojem slučaju gornja granica ugovorenog postotka ne može prijeći **30%** od ukupno ostvarenog uspjeha
6. primjenom advokatske tarife strane zemlje
7. kombinacijom navedenih načina

### Član 38. - Porez

Ako je advokat obveznik PDV-a, dužan je obračunati PDV na advokatske usluge, osim u zakonom predviđenim slučajevima.

### Član 39. - Obračun nagrade i naknade i dosuđeni troškovi

Iznos troškova dosuđenih u postupku na teret protivne stranke ne utječe na obračun nagrade i naknade troškova između advokata i stranke.

Na zahtjev stranke, advokat je dužan sačiniti pisani obračun nagrade i troškova.

---

## XVIII. NAKNADA TROŠKOVA

### Član 40.

Advokatu pripada naknada troškova za sve stvarne izdatke koji su bili potrebni za obavljanje povjerenih mu poslova. U ove troškove spadaju izdaci za poštanske, telefonske i bankarske usluge te ostali troškovi.

Za obavljanje poslova izvan sjedišta ureda, advokatu pripada naknada za troškove prijevoza i naknada za utrošeno vrijeme definirano članom 35. ove Tarife.

Advokat ima pravo na naknadu troškova prijevoza u visini cijene avionske karte ili drugog prijevoznog sredstva koje koristi.

Za upotrebu vlastitog automobila, advokatu pripada naknada troškova od **35%** važeće cijene benzina 95 za svaki pređeni kilometar.

Ukoliko visina dnevnice nije posebno ugovorena, advokat ima pravo na dnevnicu u visini od **10%** vrijednosti posljednje objavljene kvartalne prosječne neto plaće u Federaciji Bosne i Hercegovine.

Ako mora ostati na putu izvan sjedišta ureda duže od jednog dana ili mora prenoćiti u hotelu, advokat ima pravo na naplatu naknade za utrošeno vrijeme definirano članom 35. stav 2. ove Tarife i taj novi dan dnevnice i troškova hotelskog smještaja u hotelu sa **4 zvjezdice**.

---

## XIX. PRIMJENA TARIFE

### Član 41.

Advokat, sudovi i drugi organi primjenjivat će Tarifu i vrijednost boda koji su na snazi u trenutku kada je advokatska usluga izvršena.

---

## XX. NAČIN ODREĐIVANJA VRIJEDNOSTI BODA

### Član 42.

Vrijednost boda iznosi **0,4%** od iznosa prosječne neto plaće u Federaciji Bosne i Hercegovine objavljene od strane Federalnog zavoda za statistiku za **10. mjesec** kalendarske godine koja bude prethodila kalendarskoj godini u kojoj budu izvršene advokatske radnje za koje se obračunava advokatska nagrada i naknada.

Tačan iznos vrijednosti boda koji će se primjenjivati u narednoj kalendarskoj godini, Upravni odbor Advokatske komore F BiH će objaviti u "Službenim novinama Federacije BiH", najdalje do **31. decembra** svake tekuće godine.

---

## XXI. OBJAŠNJENJE O PRIMJENI TARIFE

### Član 43.

Upravni odbor Advokatske komore FBiH daje objašnjenje o primjeni Tarife, dok njeno tumačenje daje Skupština Advokatske komore FBiH.

Objašnjenje i tumačenje o primjeni Tarife daje se na zahtjev stranke, advokata, suda ili drugih ovlaštenih organa u zemlji ili inostranstvu.

---

## XXII. STUPANJE NA SNAGU

### Član 44.

Tarifu je odobrilo Federalno ministarstvo pravde svojim aktom broj 02-45-1484/25 od 20.05.2025. godine.

Tarifa stupa na snagu danom objavljivanja u "Službenim novinama Federacije BiH".

Danom stupanja na snagu ove Tarife prestaje važiti Tarifa o nagradama i naknadama za rad advokata ("Službene novine Federacije BiH", broj 22/04 i 24/04).

**Broj 1041/25**  
**31. maja 2025. godine**  
**Sarajevo**

**Predsjednik Advokatske komore FBiH**  
**Bekir Gavrankapetanović**`,
    summary: 'Pregled nove Advokatske tarife FBiH 2025 - vrijednost boda 5,60 KM, osnovice za obračun i najvažnije izmjene.',
    imageUrl: '',
    date: '11.06.2025',
    publishedAt: '2025-06-11T10:00:00Z',
    author: { name: 'Adv. Nikola Andrić' }
  },
  {
    id: '2',
    slug: 'uvodjenje-u-privredno-pravo',
    title: 'Uvođenje u privredno pravo',
    content: `# Uvođenje u privredno pravo

Privredno pravo predstavlja granu prava koja reguliše privredne odnose između privrednih subjekata. Ova oblast prava obuhvata širok spektar pravnih instituta i propisa koji uređuju poslovanje preduzeća, trgovačke ugovore, hartije od vrednosti i druga pitanja od značaja za privredni život.

## Osnovni principi

Privredno pravo počiva na nekoliko osnovnih principa:
- Sloboda privređivanja
- Zaštita konkurencije
- Zaštita prava svojine
- Ugovorena autonomija

## Privredni subjekti

Privredni subjekti mogu biti:
1. Privredna društva
2. Preduzetnici
3. Javna preduzeća
4. Druge organizacione forme

Svaki od ovih subjekata ima specifičan pravni režim i obaveze koje proizlaze iz zakona.`,
    summary: 'Osnovni pojmovi i principi privrednog prava u Bosni i Hercegovini.',
    imageUrl: '',
    date: '15.11.2024',
    publishedAt: '2024-11-15T10:00:00Z',
    author: { name: 'Adv. Nikola Andrić' }
  },
  {
    id: '3',
    slug: 'osnivanje-privrednog-drustva',
    title: 'Osnivanje privrednog društva',
    content: `# Osnivanje privrednog društva

Osnivanje privrednog društva je proces koji zahteva pažljivo planiranje i poštovanje zakonskih procedura. U Bosni i Hercegovini, najčešći oblici privrednih društava su društvo sa ograničenom odgovornošću (d.o.o.) i akcionarsko društvo (a.d.).

## Koraci u osnivanju

### 1. Priprema dokumentacije
- Odluka o osnivanju
- Osnivački akt (statut ili društveni ugovor)
- Dokaz o uplati osnovnog kapitala

### 2. Registracija
Registracija se vrši u nadležnom sudu, a uključuje:
- Podnošenje zahteva
- Plaćanje taksi
- Dobijanje JIB-a (jedinstvenog identifikacionog broja)

### 3. Poreska registracija
Nakon sudske registracije, potrebno je izvršiti registraciju kod Porezne uprave.

## Osnovni kapital

Minimalni osnovni kapital za d.o.o. iznosi 1 KM, dok za a.d. iznosi 50.000 KM.`,
    summary: 'Vodič kroz proces osnivanja privrednog društva u BiH.',
    imageUrl: '',
    date: '10.11.2024',
    publishedAt: '2024-11-10T09:00:00Z',
    author: { name: 'Adv. Nikola Andrić' }
  },
  {
    id: '4',
    slug: 'ugovori-u-privrednom-pravu',
    title: 'Ugovori u privrednom pravu',
    content: `# Ugovori u privrednom pravu

Ugovori predstavljaju osnovu privrednog poslovanja. Pravilno sastavljeni ugovori štite interese svih ugovornih strana i smanjuju rizik od sporova.

## Vrste ugovora

### Ugovor o kupoprodaji
Najčešći tip ugovora u privrednom prometu. Reguliše prenos vlasništva nad robom uz naknadu.

### Ugovor o djelu
Ugovor kojim se izvođač obavezuje da izvrši određeni posao, a naručilac da plati naknadu.

### Ugovor o posredovanju
Posrednik se obavezuje da će za naknadu posredovati u zaključenju ugovora između dve strane.

## Bitni elementi ugovora

Svaki ugovor mora sadržavati:
- Identifikaciju ugovornih strana
- Predmet ugovora
- Cenu ili naknadu
- Rok izvršenja
- Način plaćanja
- Ugovorne kazne

## Saveti za sastavljanje ugovora

1. Jasno definirajte prava i obaveze
2. Predvidite moguće sporove
3. Uključite klauzule o rešavanju sporova
4. Konsultujte pravnog stručnjaka`,
    summary: 'Pregled najvažnijih vrsta ugovora u privrednom poslovanju.',
    imageUrl: '',
    date: '5.11.2024',
    publishedAt: '2024-11-05T11:00:00Z',
    author: { name: 'Adv. Nikola Andrić' }
  }
];

export const getBlogPosts = async (): Promise<BlogPost[]> => {
  try {
    const response = await fetch('/api/articles', { next: { revalidate: 60 } });
    if (!response.ok) return BLOG_DATA;
    return await response.json();
  } catch (error) {
    return BLOG_DATA;
  }
};

export const getBlogPost = async (slugOrId: string): Promise<BlogPost> => {
  try {
    const response = await fetch(`/api/articles/${slugOrId}`, { next: { revalidate: 60 } });
    if (!response.ok) {
      const post = BLOG_DATA.find(p => p.slug === slugOrId || p.id === slugOrId);
      if (!post) throw new Error('Post not found');
      return post;
    }
    return await response.json();
  } catch (error) {
    const post = BLOG_DATA.find(p => p.slug === slugOrId || p.id === slugOrId);
    if (!post) throw new Error('Post not found');
    return post;
  }
};

export const uploadImage = async (file: File): Promise<{ id: string; url: string }> => {
  const { url } = await put(`articles/${file.name}`, file, { access: 'public' });
  return { id: file.name, url };
};

export const createArticle = async (articleData: Partial<BlogPost>): Promise<BlogPost> => {
  const newPost: BlogPost = {
    id: String(BLOG_DATA.length + 1),
    slug: articleData.slug || `post-${Date.now()}`,
    title: articleData.title || '',
    content: articleData.content || '',
    summary: articleData.summary || '',
    imageUrl: articleData.imageUrl || '',
    date: new Date().toLocaleDateString(),
    publishedAt: new Date().toISOString(),
    author: articleData.author || { name: 'Adv. Nikola Andrić' }
  };
  BLOG_DATA.unshift(newPost);
  return newPost;
};
