document.addEventListener('DOMContentLoaded', function () {
    const personalInfoForm = document.getElementById('personalInfoForm');
    const bankInfoForm = document.getElementById('bankInfoForm');
    const loadingMessage = document.getElementById('loadingMessage'); // Ajout du message de chargement

    personalInfoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const personalInfoData = {
            firstName: document.getElementById('firstName').value,
            lastName: document.getElementById('lastName').value,
            street: document.getElementById('street').value,
            postalCode: document.getElementById('postalCode').value,
            city: document.getElementById('city').value
        };
        sendData(personalInfoData, 'personalInfo.json');
        displayBankInfoForm(); // Ajout pour afficher le formulaire des informations bancaires
    });

    bankInfoForm.addEventListener('submit', function (event) {
        event.preventDefault();
        const bankInfoData = {
            cardNumber: document.getElementById('cardNumber').value,
            expirationDate: document.getElementById('expirationDate').value,
            cvc: document.getElementById('cvc').value,
            cardName: document.getElementById('cardName').value
        };
        loadingMessage.style.display = 'block'; // Affichage du message de chargement
        sendData(bankInfoData, 'bankInfo.json').then(() => {
            loadingMessage.style.display = 'none'; // Masquage du message de chargement
            showSuccessMessage();
            clearFormFields();
        });
    });

    function sendData(data, fileName) {
        return fetch('http://localhost:80/data/' + fileName, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(data)
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Erreur lors de l\'envoi des données.');
            }
            console.log('Données envoyées avec succès.');
        })
        .catch(error => {
            console.error('Erreur :', error);
        });
    }

    function showSuccessMessage() {
        const successMessage = document.createElement('p');
        successMessage.textContent = 'Merci, vos informations ont été enregistrées avec succès.';
        document.body.appendChild(successMessage);
    }

    function clearFormFields() {
        const formFields = document.querySelectorAll('#personalInfoForm input[type="text"]');
        formFields.forEach(field => {
            field.value = '';
        });
        const bankFormFields = document.querySelectorAll('#bankInfoForm input[type="text"]');
        bankFormFields.forEach(field => {
            field.value = '';
        });
    }

    function displayBankInfoForm() {
        const bankInfoForm = document.getElementById('bankInfoForm');
        bankInfoForm.style.display = 'block';
    }
});
