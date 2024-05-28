import express from 'express';
import routes from './routes/entorno';

const app = express();

app.use(express.json());
app.use('/api', routes);
app.get('/', (req, res) => {
  res.send('¡Bienvenido a la aplicación!');
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Servidor escuchando en el puerto http://localhost:${PORT}`);
});
