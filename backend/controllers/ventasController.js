const db = require("../db");
exports.crearVenta = async (req, res) => {
  const { id_cliente, productos } = req.body;
  // productos = [{ id_producto, cantidad }]
  if (!id_cliente || !Array.isArray(productos) || productos.length === 0) {
    return res.status(400).json({ error: "Faltan datos" });
  }
  const conn = await db.getConnection();

  try {
    await conn.beginTransaction();
    const [ventaRes] = await conn.query(
      "INSERT INTO ventas (id_cliente) VALUES (?)",
      [id_cliente]
    );
    const id_venta = ventaRes.insertId;
    for (const item of productos) {
      const [[prod]] = await conn.query(
        "SELECT stock, precio FROM productos WHERE id_producto = ?",
        [item.id_producto]
      );
      if (!prod || prod.stock < item.cantidad) {
        throw new Error(`Stock insuficiente para producto ${item.id_producto}`);
      }
      await conn.query(
        `INSERT INTO detalle_venta (id_venta, id_producto, cantidad, precio_unitario) VALUES (?, ?, ?, ?)`,
        [id_venta, item.id_producto, item.cantidad, prod.precio]
      );
      await conn.query(
        `UPDATE productos SET stock = stock - ? WHERE id_producto = ?`,
        [item.cantidad, item.id_producto]
      );
    }
    await conn.commit();
    res.json({ message: "Venta registrada correctamente" });
  } catch (error) {
    await conn.rollback();
    console.error("Error al registrar venta:", error);
    res.status(500).json({ error: error.message });
  } finally {
    conn.release();
  }
};
exports.getAll = async (req, res) => {
  try {
    const [rows] = await db.query(`SELECT v.id_venta, c.nombre AS cliente, v.fecha FROM ventas v JOIN clientes c ON v.id_cliente = c.id_cliente ORDER BY v.id_venta DESC`);
    res.json(rows);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener ventas" });
  }
};
