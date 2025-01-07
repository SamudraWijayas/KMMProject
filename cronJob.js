// import cron from 'node-cron';
// import { updateJenjangAutomatis } from './controller/Generus';  // Sesuaikan jalur import jika perlu

// // Menjadwalkan pembaruan setiap tanggal 1 Mei jam 00:00
// cron.schedule('0 0 1 5 *', () => {
//   console.log('Menjalankan pembaruan jenjang otomatis...');
//   updateJenjangAutomatis();
// });

import cron from 'node-cron';
import GenerusModel from './model/GenerusModel.js';

// Menjadwalkan pembaruan jenjang otomatis setiap 18 Desember, jam 15:00
cron.schedule('47 17 18 12 *', async () => {
  try {
    console.log('Menjalankan pembaruan jenjang otomatis pada 18 Desember, jam 15:00...');
    await GenerusModel.updateJenjangAutomatis();  // Panggil fungsi yang mengatur pembaruan jenjang
  } catch (error) {
    console.error('Terjadi kesalahan saat menjalankan pembaruan jenjang otomatis:', error);
  }
});
