const express = require('express');
const fs = require('fs');
const path = require('path');

const PORT = 80;
const DATA_DIR = 'data';
const PUBLIC_DIR = 'public';

const app = express();

// Middleware pour servir les fichiers statiques depuis le dossier public
app.use(express.static(path.join(__dirname, PUBLIC_DIR)));

// Endpoint pour gérer les requêtes POST et sauvegarder les données dans des fichiers JSON
app.post('/data/:fileName', (req, res) => {
    let requestData = '';
    req.on('data', (chunk) => {
        requestData += chunk.toString();
    });

    req.on('end', () => {
        const jsonData = JSON.parse(requestData);
        const fileName = req.params.fileName + '.json';
        const filePath = path.join(__dirname, DATA_DIR, fileName);

        fs.writeFile(filePath, JSON.stringify(jsonData, null, 4), (err) => {
            if (err) {
                console.error(err);
                res.status(500).send('Erreur interne du serveur');
            } else {
                console.log('Données enregistrées dans :', filePath);
                res.status(200).send('Données enregistrées avec succès');
            }
        });
    });
});

// Lancement du serveur
app.listen(PORT, () => {
    console.log(`Serveur en écoute sur le port ${PORT}`);
});
