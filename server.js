import express from 'express';
import { fileURLToPath } from 'url';
import path from 'path';

const PORT = process.env.PORT || 5000;

const app = express();
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename)
app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname,'dist')));

app.get('*', (req,res) => {
res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT);
