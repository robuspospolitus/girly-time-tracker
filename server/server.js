
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
        res.json(data[0]);
      } catch (err) {
        console.error('Błąd GET /api/data:', err);
        res.status(500).json({ error: 'Błąd serwera' });
      }
  });

  // PUT - zamień dane w JSON
  // app.put('/api/data', (req, res) => {
  //     fs.writeFileSync(dataPath, JSON.stringify(req.body, null, 2));
  //     res.json({ status: 'OK', newData: req.body });
  // });

  // POST - dodaj dane do JSON
  app.post('/api/data/:category', (req, res) => {
    const category = req.params.category;
    
    try {
      const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));
      if (!data[0][category]) {
        data[0][category] = [];
      }
      data[0][category].push(req.body);
      fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
      res.json(data[0][category]);
    } catch (err) {
      console.error('Błąd w POST:', err);
      res.status(500).json({ error: 'Błąd serwera' });
    }
  });

  // DELETE - usuń dane z JSON
  app.delete('/api/data/:category/:id', (req, res) => {
  const { category, id } = req.params;

  try {
    const data = JSON.parse(fs.readFileSync(dataPath, 'utf-8'));

    if (!Array.isArray(data) || typeof data[0] !== 'object') {
      console.error('Incorrect data structure:', data);
      return res.status(500).json({ error: 'Incorrect structure' });
    }
    if (!data[0][category]) {
      return res.status(404).json({ error: 'Category does not exist' });
    }
    const filtered = data[0][category].filter(item => item.id !== id);
    data[0][category] = filtered;
    fs.writeFileSync(dataPath, JSON.stringify(data, null, 2));
    res.json(data[0][category]);
  } catch (err) {
    console.error('Błąd podczas usuwania:', err);
    res.status(500).json({ error: 'Błąd serwera' });
  }
});

  const PORT = 5000;
  app.listen(PORT, () => {
    console.log(`Server works on http://localhost:${PORT}`);
  });