const db = require('../db');
// Obtener todos los productos
exports.getAll = async (req, res) => {
    try {
        const [rows] = await db.query('SELECT * FROM productos');
        res.json(rows);
    } catch (error) {
        console.error('Error al obtener productos:', error);
        res.status(500).json({ error: 'Error al obtener productos' });
    }
};
// Crear nuevo producto
exports.create = async (req, res) => {
    const { nombre, precio, stock, stock_minimo } = req.body;
    if (!nombre || precio == null || stock == null) {
        return res.status(400).json({ error: 'Faltan campos obligatorios' });
    }
    try {
        await db.query(
            'INSERT INTO productos (nombre, precio, stock, stock_minimo) VALUES (?, ?, ?, ?)',
            [nombre, precio, stock, stock_minimo ?? 5]
        );
        res.json({ message: 'Producto creado correctamente' });
    } catch (error) {
        console.error('Error al crear producto:', error);
        res.status(500).json({ error: 'Error al crear producto' });
    }
};