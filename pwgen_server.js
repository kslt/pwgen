const express = require('express');
const crypto = require('crypto');
const app = express();
const PORT = 3002;

app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.set('view engine', 'ejs');

function generatePassword(length, useUpper, useLower, useNumbers, useSymbols) {
    const upper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
    const lower = 'abcdefghijklmnopqrstuvwxyz';
    const numbers = '0123456789';
    const symbols = '!@#$%^&*()_+-=[]{}|;:,.<>?';
    
    let chars = '';
    if (useUpper) chars += upper;
    if (useLower) chars += lower;
    if (useNumbers) chars += numbers;
    if (useSymbols) chars += symbols;

    if (!chars) return '';

    let password = '';
    for (let i = 0; i < length; i++) {
        const randomIndex = crypto.randomInt(0, chars.length);
        password += chars[randomIndex];
    }
    return password;
}

app.get('/', (req, res) => {
    res.render('index', { password: null });
});

app.post('/generate', (req, res) => {
    const length = parseInt(req.body.length) || 12;
    const password = generatePassword(
        length,
        !!req.body.uppercase,
        !!req.body.lowercase,
        !!req.body.numbers,
        !!req.body.symbols
    );
    res.render('index', { password });
});

app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
