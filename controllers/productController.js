const Product = require('../models/productModel');

// Список допустимых категорий
const ALLOWED_CATEGORIES = ["Tech House", "Deep House", "Progressive House", "Melodic House"];

// Создание товара
exports.createProduct = async (req, res) => {
  try {
    const { name, category, price, bpm, music_key, type } = req.body;

    // Проверка, что music_key передано
    if (!music_key) {
      return res.status(400).json({ error: "music_key is required" });
    }

    // Проверка, что type имеет допустимое значение
    if (type !== "Vocal/Instrumental" && type !== "Instrumental") {
      return res.status(400).json({ error: "Invalid type. Allowed values: 'Vocal/Instrumental', 'Instrumental'" });
    }

    // Проверка, что category имеет допустимое значение
    if (!ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: `Invalid category. Allowed values: ${ALLOWED_CATEGORIES.join(", ")}` });
    }

    const img = req.files['img'][0].path; // Путь к изображению
    const audio = req.files['audio'][0].path; // Путь к аудио

    const product = await Product.create({
      img,
      name,
      category,
      audio,
      price,
      bpm,
      music_key,
      type,
    });

    res.status(201).json({ message: 'Product created successfully', product });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение всех товаров
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.findAll();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение товара по ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;
  try {
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ error: 'Product not found' });
    }
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Получение товаров по music_key
exports.getProductsByMusicKey = async (req, res) => {
  const { music_key } = req.params;
  try {
    const products = await Product.findByMusicKey(music_key);
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Обновление товара
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, category, price, bpm, music_key, type } = req.body;

  try {
    // Проверка, что music_key передано
    if (!music_key) {
      return res.status(400).json({ error: "music_key is required" });
    }

    // Проверка, что type имеет допустимое значение
    if (type && type !== "Vocal/Instrumental" && type !== "Instrumental") {
      return res.status(400).json({ error: "Invalid type. Allowed values: 'Vocal/Instrumental', 'Instrumental'" });
    }

    // Проверка, что category имеет допустимое значение
    if (category && !ALLOWED_CATEGORIES.includes(category)) {
      return res.status(400).json({ error: `Invalid category. Allowed values: ${ALLOWED_CATEGORIES.join(", ")}` });
    }

    const updatedData = {
      name,
      category,
      price,
      bpm,
      music_key,
      type,
    };

    // Если загружены новые файлы, обновляем их пути
    if (req.files && req.files['img']) {
      updatedData.img = req.files['img'][0].path;
    }
    if (req.files && req.files['audio']) {
      updatedData.audio = req.files['audio'][0].path;
    }

    await Product.update(id, updatedData);
    res.status(200).json({ message: 'Product updated successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Удаление товара
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;
  try {
    await Product.delete(id);
    res.status(200).json({ message: 'Product deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};