CREATE DATABASE IF NOT EXISTS ventas_comercio;
USE ventas_comercio;
CREATE TABLE clientes (
id_cliente INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100),
email VARCHAR(100),
telefono VARCHAR(20)
);
CREATE TABLE productos (
id_producto INT AUTO_INCREMENT PRIMARY KEY,
nombre VARCHAR(100),
precio DECIMAL(10,2),
stock INT,
stock_minimo INT DEFAULT 5
);
CREATE TABLE ventas (
id_venta INT AUTO_INCREMENT PRIMARY KEY,
id_cliente INT,
fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
FOREIGN KEY (id_cliente) REFERENCES clientes(id_cliente)
);
CREATE TABLE detalle_venta (
id_detalle INT AUTO_INCREMENT PRIMARY KEY,
id_venta INT,
id_producto INT,
cantidad INT,
precio_unitario DECIMAL(10,2),
FOREIGN KEY (id_venta) REFERENCES ventas(id_venta),
FOREIGN KEY (id_producto) REFERENCES productos(id_producto)
);