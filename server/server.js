
  const express = require('express');
  const fs = require('fs');
  const cors = require('cors');
  const app = express();
  const path = require('path');

  app.use(cors()); // pozwala na połączenie z frontendu (React)
  app.use(express.json());

  const userDataPath = process.argv[2]; // <-- ścieżka od Electron
  const dataPath = path.join(userDataPath, 'data.json');

  // Jeśli nie istnieje plik, utwórz go
  if (!fs.existsSync(dataPath)) {
    fs.writeFileSync(dataPath, '[]', 'utf-8');
  }

  // GET - odczytaj JSON
  app.get('/api/data', (req, res) => {
      try {
        const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
        res.json(data);
      } catch (err) {
        console.error('Błąd GET /api/data:', err);
        res.status(500).json({ error: 'Błąd serwera' });
      }
  });

  // PUT - zamień dane w JSON
  app.put('/api/data', (req, res) => {
      fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
      res.json({ status: 'OK', newData: req.body });
  });

  // POST - dodaj dane do JSON
  app.post('/api/data', (req, res) => {
    try {
      const current = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      current.push(req.body);
      fs.writeFileSync(dataPath, JSON.stringify(current, null, 2));
      res.json(current);
    } catch (err) {
      console.error('Błąd w POST:', err);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  });

  // DELETE - usuń dane z JSON
  app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id;
    console.log('🔍 Otrzymane ID do usunięcia:', id);

    try {
      let data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      console.log('Przed usunięciem:', data);

      const newData = data.filter(item => item.id !== id);
      console.log('Po usunięciu:', newData);

      fs.writeFileSync(dataPath, JSON.stringify(newData, null, 2));
      res.json(newData);
    } catch (err) {
      console.error('Błąd podczas usuwania:', err);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  });

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Serwer działa na http://localhost:${PORT}`);
  });