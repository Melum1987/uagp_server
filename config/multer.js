const multer = require('multer');
const path = require('path');

// Настройка хранилища для файлов
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    if (file.fieldname === 'img') {
      cb(null, 'uploads/images/'); // Папка для изображений
    } else if (file.fieldname === 'audio') {
      cb(null, 'uploads/audio/'); // Папка для аудио
    }
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    cb(null, uniqueSuffix + path.extname(file.originalname)); // Уникальное имя файла
  },
});

// Фильтр для проверки типа файла
const fileFilter = (req, file, cb) => {
  if (file.fieldname === 'img') {
    if (file.mimetype.startsWith('image/')) {
      cb(null, true);
    } else {
      cb(new Error('Only images are allowed!'), false);
    }
  } else if (file.fieldname === 'audio') {
    if (file.mimetype.startsWith('audio/')) {
      cb(null, true);
    } else {
      cb(new Error('Only audio files are allowed!'), false);
    }
  }
};

// Настройка multer
const upload = multer({
  storage: storage,
  fileFilter: fileFilter,
  limits: {
    fileSize: 1024 * 1024 * 10, // Максимальный размер файла (10 MB)
  },
});

module.exports = upload;