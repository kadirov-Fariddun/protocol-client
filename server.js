import {express} from 'express';
import {path} from 'path';

const PORT = process.env.PORT || 5001;

const app = express();

app.use(express.static(__dirname));
app.use(express.static(path.resolve(__dirname,'dist')));

app.get('*', (req,res) => {
res.sendFile(path.join(__dirname, 'dist', 'index.html'));
});

app.listen(PORT);
