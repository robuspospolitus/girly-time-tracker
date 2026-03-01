// cleanup.js
const fs = require('fs');
const path = require('path');

exports.default = async function(context) {
  const localesDir = path.join(context.appOutDir, 'locales');
  
  if (fs.existsSync(localesDir)) {
    const files = fs.readdirSync(localesDir);
    files.forEach(file => {
      if (!file.includes('pl.pak') && !file.includes('en-US.pak') && !file.includes('en-GB.pak')) {
        fs.unlinkSync(path.join(localesDir, file));
      }
    });
    console.log('cleanup: usunięto zbędne pakiety językowe.');
  }
};