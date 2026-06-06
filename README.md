# Esame Full-Stack

Template full-stack con:

- Frontend: React + Vite + TypeScript
- Backend: Spring Boot
- Database: MySQL

Guida rapida per avvio, configurazione e troubleshooting, pensata anche per uso durante l'esame.

## Indice

- [Prerequisiti](#prerequisiti)
- [Avvio rapido](#avvio-rapido)
- [Configurazione MySQL](#configurazione-mysql)
- [Comunicazione Frontend-Backend](#comunicazione-frontend-backend)
- [Aggiungere una nuova entità](#aggiungere-una-nuova-entita)
- [Troubleshooting](#troubleshooting)
- [Struttura del progetto](#struttura-del-progetto)

## Prerequisiti

Assicurati di avere questi strumenti installati:

| Requisito | Versione minima | Verifica | Note WSL/Linux |
|---|---|---|---|
| Java JDK | 17+ | `java -version` | `sudo apt install openjdk-17-jdk` |
| Maven | 3.8+ | `mvn -version` | `sudo apt install maven` |
| Node.js | 18+ | `node -v` | Consigliato NVM |
| npm | 9+ | `npm -v` | Incluso con Node.js |
| MySQL Server | 8.0+ | `mysql --version` | `sudo apt install mysql-server` |

## Avvio rapido

### 1) Avvia MySQL

```bash
sudo /etc/init.d/mysql start
# oppure
sudo systemctl start mysql
```

### 2) Avvia il backend

```bash
cd backend
mvn spring-boot:run
```

Se compare un messaggio simile a Started BackendApplication in X.XX seconds, il backend è avviato correttamente.

### 3) Avvia il frontend

```bash
cd frontend
npm install   # solo la prima volta
npm run dev
```

## Configurazione MySQL

File di configurazione:

- `backend/src/main/resources/application.properties`

Esempio configurazione:

```properties
spring.datasource.url=jdbc:mysql://localhost:3306/app_template?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC
spring.datasource.username=root
spring.datasource.password=LA_TUA_PASSWORD_QUI
```

Nota WSL:

- Se backend è su WSL e MySQL è su Windows, `localhost` potrebbe non funzionare.
- Recupera IP host Windows con:

```bash
cat /etc/resolv.conf | grep nameserver
```

- Usa quell'IP nell'URL JDBC, ad esempio `jdbc:mysql://172.24.80.1:3306/...`.
- Soluzione consigliata: installare MySQL direttamente in WSL.

Comandi utili MySQL:

| Comando | A cosa serve |
|---|---|
| `mysql -u root -p` | Apre la shell MySQL autenticandoti come utente root. |
| `SHOW DATABASES;` | Mostra tutti i database disponibili sul server. |
| `USE app_template;` | Seleziona il database `app_template` su cui lavorare. |
| `SHOW TABLES;` | Elenca tutte le tabelle presenti nel database selezionato. |
| `SELECT * FROM users;` | Visualizza tutti i record della tabella `users` per controllo rapido dati. |

## Comunicazione Frontend-Backend

- Backend API su porta `8080` (esempio: `http://localhost:8080/api/products`).
- Frontend Vite normalmente su `5173`.
- Base URL frontend configurata in `frontend/src/api/api.ts`.

### CORS

Nel backend (configurazione sicurezza), assicurati che le origin del frontend siano consentite:

```java
config.setAllowedOrigins(List.of("http://localhost:5173", "http://127.0.0.1:5173"));
```

Se cambi porta frontend (es. `3000`), aggiungi anche quella origin.

## Aggiungere una nuova entità

Esempio: entità Ordini.

### Backend (Spring Boot)

1. Crea model: `backend/src/main/java/com/esame/backend/model/Order.java` (`@Entity`, campi, getter/setter).
2. Crea repository: `backend/src/main/java/com/esame/backend/repository/OrderRepository.java` (estende `JpaRepository<Order, Long>`).
3. Crea DTO request: `backend/src/main/java/com/esame/backend/dto/OrderRequest.java`.
4. Crea service: `backend/src/main/java/com/esame/backend/service/OrderService.java`.
5. Crea controller: `backend/src/main/java/com/esame/backend/controller/OrderController.java` con endpoint `/api/orders`.
6. Riavvia backend per creare automaticamente la tabella su MySQL.

### Frontend (React + TypeScript)

1. Aggiungi tipi in `frontend/src/types.ts` (es. `Order`, `OrderFormData`).
2. Aggiungi API in `frontend/src/api/api.ts` (es. `orderAPI.create`, `orderAPI.getAll`).
3. Crea pagina `frontend/src/pages/OrdersPage.tsx`.
4. Aggiungi route in `frontend/src/router.tsx`.
5. Aggiungi link in header (`frontend/src/components/Header/Header.tsx`).

## Troubleshooting

### Errori Backend / Maven

| Errore | Causa probabile | Soluzione |
|---|---|---|
| `The goal you specified requires a project to execute but there is no POM` | Cartella sbagliata | Esegui prima `cd backend` |
| `release version 17 not supported` | Java non è la 17 | Installa Java 17 e impostala come default |
| `class X is public, should be declared in a file named X.java` | Nome file diverso dal nome classe | Rinomina il file coerentemente |
| `Communications link failure` o `Connection refused` | MySQL spento o credenziali errate | Avvia MySQL e verifica user/password nel file properties |
| `PasswordEncoder bean not found` | Config sicurezza incompleta | Verifica presenza bean `PasswordEncoder` |
| `package com.esame.backend does not exist` o `cannot find symbol` | Import/pacchetti incoerenti | Allinea package e import in tutto il progetto |
| `Whitelabel Error Page (404)` su `localhost:8080/` | Endpoint errato | Prova `/api/contacts` o `/api/products` |

### Errori Frontend / React

| Errore | Causa probabile | Soluzione |
|---|---|---|
| `CORS policy: No 'Access-Control-Allow-Origin' header` | Origin frontend non consentita | Aggiungi URL frontend alla configurazione CORS backend |
| `Cannot read properties of undefined (reading 'length')` | Stato array non inizializzato | Usa fallback: `Array.isArray(data) ? data : []` |
| `Property 'data' does not exist on type` | Uso stile Axios su API fetch | Usa direttamente il valore restituito da `api.getAll()` |
| Pagina bianca / moduli mancanti | Dipendenze non installate | Esegui `npm install` in frontend |
| Errori TypeScript persistenti in editor | TS server bloccato | Riavvia TypeScript server da command palette |

## Struttura del progetto

```text
esame/
|-- backend/
|   |-- pom.xml
|   `-- src/main/java/com/esame/backend/
|       |-- config/
|       |-- controller/
|       |-- dto/
|       |-- model/
|       |-- repository/
|       `-- service/
`-- frontend/
    |-- package.json
    `-- src/
        |-- api/
        |-- components/
        |-- context/
        |-- pages/
        |-- router.tsx
        `-- types.ts
```

---