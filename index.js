const express = require('express');
     const sql = require('mssql');
     const app = express();

     // Configuration de la connexion à Azure SQL (à remplir plus tard)
     const dbConfig = {
         user: 'adminuser',
         password: 'MonMotDePasse123!',
         server: 'newapp.database.windows.net',
         database: 'newappdb',
         options: {
             encrypt: true,
             trustServerCertificate: false
         }
     };

     app.get('/', async (req, res) => {
         try {
             let pool = await sql.connect(dbConfig);
             let result = await pool.request().query('SELECT * FROM Messages');
             res.send(`Bienvenue dans la nouvelle application avec base de données ! Données : ${JSON.stringify(result.recordset)}`);
         } catch (err) {
             res.send(`Erreur de connexion : ${err.message}`);
         }
     });

     const port = process.env.PORT || 3000;
     app.listen(port, () => {
         console.log(`Serveur en cours d'exécution sur le port ${port}`);
     });