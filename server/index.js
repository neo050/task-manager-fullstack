
import express  from 'express';
import  cors  from 'cors';
const app  = express();

app.use(cors());
app.get('/api/health', (_, res) => res.json({ status: 'ok' }));

app.listen(3001, () => console.log('API listening on 3001'));
