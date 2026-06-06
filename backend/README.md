Ecco il README.md del backend formattato e pronto da copiare e incollare direttamente nel tuo file:

 Backend — Spring Boot + MySQL + JWT
 Prerequisiti
Requisito	Versione	Come verificare
Java JDK	17+	java -version
Maven	3.8+	mvn -version
MySQL Server	8.0+	mysql --version
VSCode	-	Estensione Extension Pack for Java consigliata

🚀 Avvio Rapido
1. Crea la cartella del progetto e copia tutti i file
Assicurati di rispettare la struttura delle cartelle mostrata sopra.

2. Installa le dipendenze
cd backendmvn clean install
⚠️ Se non hai Maven: installa Maven o usa il Maven Wrapper.
Per generare il wrapper: mvn wrapper:wrapper (richiede Maven una volta sola).

3. Configura il database
Apri src/main/resources/application.properties e modifica:

# Cambia username e password del tuo MySQL locale
spring.datasource.username=root
spring.datasource.password=la_tua_password

# Cambia il nome dello schema se vuoi
spring.datasource.url=jdbc:mysql://localhost:3306/app_template?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC


✅ Non serve creare lo schema manualmente! createDatabaseIfNotExist=true lo crea automaticamente.
✅ Non servono creare le tabelle! ddl-auto=update le crea/aggiorna da solo.

4. Avvia il backend
bash
mvn spring-boot:run

Il server parte su http://localhost:8080

5. Verifica che funzioni
Apri il browser su: http://localhost:8080/api/auth/login
Dovresti vedere un errore 405 (Method Not Allowed) → significa che il server è attivo!

| Metodo | Endpoint | Autenticazione | Descrizione |
|--------|----------|----------------|-------------|
| POST | `/api/auth/register` | ❌ No | Registra un nuovo utente |
| POST | `/api/auth/login` | ❌ No | Login, ricevi JWT |
| GET | `/api/auth/me` | ✅ Sì | Dati utente corrente |
| POST | `/api/contacts` | ❌ No | Invia un messaggio di contatto |
| GET | `/api/contacts` | ✅ Sì | Lista di tutti i messaggi |

# Registrazione
curl -X POST http://localhost:8080/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"username":"mario","email":"mario@test.com","password":"123456"}'

# Login
curl -X POST http://localhost:8080/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"username":"mario","password":"123456"}'

# Invia contatto (pubblico)
curl -X POST http://localhost:8080/api/contacts \
  -H "Content-Type: application/json" \
  -d '{"name":"Mario","email":"mario@test.com","subject":"Ciao","message":"Test messaggio"}'

# Lista contatti (protetto — usa il token ricevuto dal login)
curl http://localhost:8080/api/contacts \
  -H "Authorization: Bearer IL_TUO_TOKEN_QUI"

✏️ COME MODIFICARE PER IL TUO CONTESTO
🔄 Cambiare nome dello schema database
In application.properties:
spring.datasource.url=jdbc:mysql://localhost:3306/IL_TUO_SCHEMA?createDatabaseIfNotExist=true&useSSL=false&serverTimezone=UTC

➕ Aggiungere una nuova entità (es. "Product")
Step 1 — Crea il Model in model/Product.java:

@Entity
@Table(name = "products")
public class Product {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(nullable = false)
    private String name;

    private String description;
    private Double price;

    @Column(name = "created_at", updatable = false)
    private java.time.LocalDateTime createdAt;

    @PrePersist
    protected void onCreate() { this.createdAt = java.time.LocalDateTime.now(); }

    // Costruttore vuoto + Getters/Setters
}

Step 2 — Crea il Repository in repository/ProductRepository.java:

public interface ProductRepository extends JpaRepository<Product, Long> {
    // Aggiungi query personalizzate qui se serve
}

Step 3 — Crea il DTO in dto/ProductRequest.java:

public class ProductRequest {
    @NotBlank(message = "Nome obbligatorio")
    private String name;
    private String description;
    private Double price;
    // Getters/Setters
}

Step 4 — Crea il Service in service/ProductService.java:

@Service
public class ProductService {
    private final ProductRepository productRepository;

    public ProductService(ProductRepository productRepository) {
        this.productRepository = productRepository;
    }

    public Product saveProduct(ProductRequest request) {
        Product product = new Product();
        product.setName(request.getName());
        product.setDescription(request.getDescription());
        product.setPrice(request.getPrice());
        return productRepository.save(product);
    }

    public List<Product> getAllProducts() {
        return productRepository.findAll();
    }
}

Step 5 — Crea il Controller in controller/ProductController.java:

@RestController
@RequestMapping("/api/products")
public class ProductController {
    private final ProductService productService;

    public ProductController(ProductService productService) {
        this.productService = productService;
    }

    @PostMapping
    public ResponseEntity<GenericResponse> createProduct(@Valid @RequestBody ProductRequest request) {
        productService.saveProduct(request);
        return ResponseEntity.ok(GenericResponse.ok("Prodotto creato!"));
    }

    @GetMapping
    public ResponseEntity<List<Product>> getAllProducts() {
        return ResponseEntity.ok(productService.getAllProducts());
    }
}

Step 6 — Decidi se è pubblico o protetto in SecurityConfig.java:

// Per renderlo pubblico:
.requestMatchers("/api/products/**").permitAll()

// Per proteggerlo: NON aggiungere nulla, finirà in .anyRequest().authenticated()

✅ La tabella si crea automaticamente al prossimo avvio! Nessun SQL manuale.

🔐 Cambiare il segreto JWT
In application.properties:
app.jwt.secret=LaTuaChiaveSegretaMoltoLungaPerIlJWTCheDeveEssereAlmeno256Bit2024!
app.jwt.expiration-ms=86400000

🌐 Cambiare le origini CORS
In SecurityConfig.java → corsConfigurationSource():

config.setAllowedOrigins(List.of("http://localhost:5173", "http://localhost:3000", "https://tuodominio.com"));

🔑 Cambiare password MySQL
In application.properties:
spring.datasource.username=root
spring.datasource.password=la_tua_password

🛠️ Comandi Utili
bash

# Compila senza avviare
mvn clean compile

# Compila e avvia
mvn spring-boot:run

# Crea il JAR eseguibile
mvn clean package
java -jar target/backend-0.0.1-SNAPSHOT.jar

# Reset completo del database (ATTENZIONE: cancella tutti i dati!)
# Cambia in application.properties:
#   spring.jpa.hibernate.ddl-auto=create
# Poi riavvia. Dopo il primo avvio rimetti "update"

❗ Risoluzione Problemi

| Problema | Soluzione |
|----------|-----------|
| `Access denied for user` | Controlla username/password MySQL in application.properties |
| `Unknown database` | Assicurati che `createDatabaseIfNotExist=true` sia nella URL |
| `Port 8080 already in use` | Cambia `server.port=8081` in application.properties |
| `Communications link failure` | Verifica che MySQL sia avviato: `mysql -u root -p` |
| Errori JWT `Secret key too short` | Il secret deve essere almeno 32 caratteri |
| `Cannot resolve symbol` in VSCode | Ctrl+Shift+P → "Java: Clean Java Language Server Workspace" |
```

🚨 TROUBLESHOOTING E ERRORI COMUNI (Guida per l'esame)
Errore / Sintomo	Causa	Soluzione
The goal you specified requires a project to execute but there is no POM	Non sei nella cartella giusta	Fai cd backend prima di lanciare comandi Maven
release version 17 not supported	Java installato è vecchio (es. 8 o 11)	Installa Java 17+. Su Ubuntu: sudo apt install openjdk-17-jdk e imposta come default con sudo update-alternatives --config java
class X is public, should be declared in a file named X.java	Il nome del file fisico è diverso dal nome della classe al suo interno	Rinomina il file esattamente come la classe (es. ContanctRequest.java -> ContactRequest.java)
Communications link failure / Connection refused	MySQL è spento, o la password in application.properties è sbagliata	1. Avvia MySQL (sudo systemctl start mysql) 2. Controlla user/pass in application.properties 3. Se usi WSL e MySQL è su Windows, leggi la sezione WSL sotto
PasswordEncoder bean not found	Hai rimosso la sicurezza ma il Service richiede ancora il PasswordEncoder	Assicurati di avere il Bean public PasswordEncoder passwordEncoder() dentro il tuo SecurityConfig.java
package com.template.backend does not exist / cannot find symbol	Hai rinominato le cartelle ma non gli import nel codice Java	Usa il "Replace in Files" di VSCode per sostituire tutti i com.template.backend con com.esame.backend
Whitelabel Error Page (404) sull'URL root localhost:8080/	Stai visitando la root, ma le API stanno su /api/...	Vai su localhost:8080/api/contacts o altri endpoint validi
Problema WSL: Backend su Linux, DB su Windows	WSL2 non vede il localhost di Windows	Trova l'IP di Windows con cat /etc/resolv.conf | grep nameserver e mettilo in spring.datasource.url=jdbc:mysql://QUI_L_IP:3306/...
🐧 Nota importante su WSL (Windows Subsystem for Linux)
Se sviluppi su WSL ma hai MySQL installato su Windows, il localhost di WSL non è il localhost di Windows.Soluzione migliore: Installa MySQL direttamente dentro WSL digitando sudo apt install mysql-server, poi avvialo con sudo /etc/init.d/mysql start. Lascia l'URL del backend come localhost:3306.