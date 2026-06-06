🚀 Template Full-Stack: React (Vite + TS) + Spring Boot + MySQL
Guida completa all'uso, configurazione e risoluzione problemi per il tuo progetto d'esame.

📋 Prerequisiti WSL / Ubuntu / Windows
Prima di iniziare, assicurati di avere questi strumenti installati e configurati:

Requisito	Versione	Come verificare	Note per WSL
Java JDK	17+	java -version	Su WSL: sudo apt install openjdk-17-jdk
Maven	3.8+	mvn -version	Su WSL: sudo apt install maven
Node.js	18+	node -v	Su WSL: usa NVM o sudo apt install nodejs
npm	9+	npm -v	Su WSL: installato con Node.js
MySQL Server	8.0+	mysql --version	Consigliato su WSL: sudo apt install mysql-server
⚡ AVVIO RAPIDO (I comandi da lanciare all'esame)
1. Avvia il Database (MySQL)
Se usi MySQL su WSL/Linux, avvia il servizio:

sudo /etc/init.d/mysql start# Oppure: sudo systemctl start mysql
2. Avvia il Backend (Spring Boot)
Apri un terminale nella cartella backend:

cd backend
mvn spring-boot:run

✅ Se vedi Started BackendApplication in X.XX seconds, il backend è OK e le tabelle si stanno creando in automatico su MySQL!

3. Avvia il Frontend (React + Vite)
Apri un nuovo terminale nella cartella frontend:

cd frontend
npm install # (Solo la prima volta o se cancelli node_modules)
npm run dev

🗄️ Configurazione MySQL
Il progetto è configurato per creare automaticamente lo schema e le tabelle.
Il file di configurazione è: backend/src/main/resources/application.properties.

# Cambia questi valori in base alla tua installazione di MySQL!
spring.datasource.url=jdbc:mysql://localhost:3306/app_template?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=LA_TUA_PASSWORD_QUI

⚠️ Nota su WSL: Se il backend è su WSL e MySQL è su Windows, localhost non funziona. Trova l'IP di Windows con cat /etc/resolv.conf | grep nameserver e sostituiscilo nell'URL (es. jdbc:mysql://172.24.80.1:3306/...). Meglio ancora: installa MySQL direttamente dentro WSL.

Comandi utili MySQL da terminale:

mysql -u root -p               # Accedi a MySQL
SHOW DATABASES;                # Vedi se lo schema 'app_template' è stato creato
USE app_template;              # Seleziona il DB
SHOW TABLES;                   # Vedi le tabelle (users, contacts, products)
SELECT * FROM users;           # Vedi gli utenti registrati dal frontend

🔗 Come comunicano Frontend e Backend
Il Backend espone le API sulla porta 8080 (es. http://localhost:8080/api/products).
Il Frontend chiama le API tramite il file frontend/src/api/api.ts.
Il file api.ts contiene la variabile API_BASE_URL che punta a http://localhost:8080.
Il blocco CORS (Importante!)
Per motivi di sicurezza, il browser blocca le richieste tra porte diverse. Nel backend, il file SecurityConfig.java permette al frontend di comunicare:

config.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));

Se cambi porta al frontend (es. passa alla 3000), devi aggiungerla qui.

✏️ COME AGGIUNGERE UNA NUOVA ENTITÀ (es. "Ordini") ALL'ESAME
Se durante l'esame ti chiedono di aggiungere una nuova entità, segui questo percorso esatto:

Lato Backend (Spring Boot)
Crea il Model: backend/model/Order.java (Aggiungi @Entity, @Table, i campi e Getters/Setters).
Crea il Repository: backend/repository/OrderRepository.java (Estendi JpaRepository<Order, Long>).
Crea il DTO: backend/dto/OrderRequest.java (I dati che arrivano dal frontend).
Crea il Service: backend/service/OrderService.java (Logica di salvataggio e recupero).
Crea il Controller: backend/controller/OrderController.java (Esponi gli endpoint @GetMapping e @PostMapping su /api/orders).
Riavvia il backend: Spring Boot creerà la tabella orders in MySQL in automatico!

Lato Frontend (React + TS)
1 Aggiungi il Tipo: In frontend/src/types.ts aggiungi le interfacce Order e OrderFormData.
2 Aggiungi l'API: In frontend/src/api/api.ts aggiungi orderAPI con i metodi create e getAll.
3 Crea la Pagina: In frontend/src/pages/OrdersPage.tsx usa orderAPI.getAll() per prendere i dati e stamparli nel JSX.
4 Aggiungi la Rotta: In frontend/src/router.tsx aggiungi la route /orders.
5 Aggiungi il Link: In frontend/src/components/Header.tsx aggiungi il link alla nuova pagina.

🚨 TROUBLESHOOTING E ERRORI COMUNI (Salva-Esame)
ERRORI MAVEN / BACKEND

| Errore | Causa | Soluzione |
|--------|-------|-----------|
| `The goal you specified requires a project to execute but there is no POM` | Sei nella cartella sbagliata | Fai `cd backend` prima di lanciare comandi Maven |
| `release version 17 not supported` | Versione di Java sbagliata (hai la 8 o 11) | Installa Java 17. Su Ubuntu: `sudo apt install openjdk-17-jdk` e impostala come default |
| `class X is public, should be declared in a file named X.java` | Il nome del file è diverso dal nome della classe interna | Rinomina il file in modo che combaci esattamente (es. `ContanctRequest` -> `ContactRequest`) |
| `Communications link failure` / `Connection refused` | MySQL è spento, o user/pass in `application.properties` sono sbagliate | 1. Avvia MySQL 2. Controlla user/pass nel file properties 3. Se sei su WSL leggi la sezione MySQL sopra |
| `PasswordEncoder bean not found` | Hai rimosso la sicurezza ma il Service richiede ancora il PasswordEncoder | Assicurati che in `SecurityConfig.java` ci sia il Bean `public PasswordEncoder passwordEncoder()` |
| `package com.esame.backend does not exist` / `cannot find symbol` | Hai rinominato le cartelle ma non gli `import` nel codice | Su VSCode: `Ctrl+Shift+H` e sostituisci tutti i `com.template.backend` con `com.esame.backend` |
| `Whitelabel Error Page (404)` su `localhost:8080/` | Stai visitando la root, ma le API stanno su `/api/...` | Testa `localhost:8080/api/contacts` o `/api/products` |

ERRORI FRONTEND / REACT

| Errore | Causa | Soluzione |
|--------|-------|-----------|
| `CORS policy: No 'Access-Control-Allow-Origin' header` | Il backend blocca la richiesta del frontend | 1. Assicurati di navigare su `http://localhost:5173` e NON `127.0.0.1` 2. Aggiungi l'URL del frontend in `SecurityConfig.java` nel backend |
| `Cannot read properties of undefined (reading 'length')` | React prova a mappare un array che è `undefined` | Nella funzione `loadData`, assicurati di fare: `setData(Array.isArray(data) ? data : [])` |
| `Property 'data' does not exist on type` | Stai usando `response.data` ma l'API (fetch) restituisce già i dati puri | Rimuovi `.data`. Fai `const data = await api.getAll()` e usa `data` direttamente |
| Pagina Bianca / Moduli non trovati | Dipendenze non installate | Lancia `npm install` nella cartella frontend |
| Errori TypeScript rossi in VSCode | Server TS bloccato | `Ctrl+Shift+P` -> "TypeScript: Restart TS Server" |

📁 Struttura del Progetto
PROGETTO_ROOT/
├── backend/                     # Spring Boot API
│   ├── src/main/java/com/esame/backend/
│   │   ├── config/              # SecurityConfig (CORS e Permessi)
│   │   ├── controller/          # Endpoints API (Auth, Contact, Product)
│   │   ├── dto/                 # Dati in entrata (Request)
│   │   ├── model/               # Entità Database (@Entity)
│   │   ├── repository/          # Interfacce per il Database
│   │   └── service/             # Logica di Business
│   ├── src/main/resources/
│   │   └── application.properties # CONFIGURAZIONE DB E PORTA
│   └── pom.xml                  # Dipendenze Java
│
└── frontend/                    # React + Vite + TypeScript
    ├── src/
    │   ├── api/api.ts           # CONFIGURAZIONE URL BACKEND
    │   ├── components/          # Componenti UI (Header, Cards, Layout)
    │   ├── context/             # Gestione Stato Login (AuthContext)
    │   ├── pages/               # Pagine dell'app (Home, Dashboard, Auth)
    │   ├── types.ts             # Tutti i modelli dati TypeScript
    │   └── router.tsx           # Tutte le rotte dell'applicazione
    └── package.json             # Dipendenze Node