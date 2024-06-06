from flask import Flask
from flask_marshmallow import Marshmallow
from flask_sqlalchemy import SQLAlchemy

import pymysql

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://root@localhost/ing-web-proyecto'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.secret_key = "41E5653FC7AEB894026D6BB7B2DB7F65902B454945FA8FD65A6327047B5277FB"

def cambiar_uri_bd(nombre_empresa):
    app.config['SQLALCHEMY_DATABASE_URI'] = f'mysql+pymysql://root@localhost/{nombre_empresa}'

bd = SQLAlchemy(app)
ma = Marshmallow(app)    
        
def crear_base_de_datos_y_tablas(nombre_empresa):
    # Establece la conexión con MySQL
    connection = pymysql.connect(host='localhost',
                                 user='root',
                                 password='')

    try:
        with connection.cursor() as cursor:
            # Crea la base de datos
            sql_create_db = f"CREATE DATABASE {nombre_empresa};"
            cursor.execute(sql_create_db)
            
            # Selecciona la nueva base de datos
            cursor.execute(f"USE {nombre_empresa};")
            
            # Crea las tablas
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS roles (
                id INT AUTO_INCREMENT PRIMARY KEY,
                rol VARCHAR(50)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS usuarios (
                id INT AUTO_INCREMENT PRIMARY KEY,
                rol_id INT,
                nombre VARCHAR(50),
                apellidos VARCHAR(50),
                usuario VARCHAR(50),
                contraseña VARCHAR(50),
                cedula VARCHAR(50),
                direccion VARCHAR(100),
                telefono VARCHAR(15),
                FOREIGN KEY (rol_id) REFERENCES roles(id)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS proveedores (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50),
                nit VARCHAR(50),
                correo VARCHAR(50),
                estado VARCHAR(50)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS orden_compra (
                id INT AUTO_INCREMENT PRIMARY KEY,
                fecha DATE,
                id_usuario_emisor INT,
                estado INT,
                FOREIGN KEY (id_usuario_emisor) REFERENCES usuarios(id)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                nombre VARCHAR(50),
                descripcion VARCHAR(200),
                codigo INT,
                precio_unitario FLOAT,
                stock_actual INT,
                stock_minimo INT,
                img VARCHAR(200),
                descuento FLOAT,
                iva FLOAT,
                estado VARCHAR(50)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS productos_alternos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_producto_principal INT,
                id_producto_alterno INT,
                FOREIGN KEY (id_producto_principal) REFERENCES productos(id),
                FOREIGN KEY (id_producto_alterno) REFERENCES productos(id)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS cotizaciones (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_vendedor INT,
                id_cliente INT,
                detalles VARCHAR(200),
                valor_total FLOAT,
                fecha DATE,
                estado INT,
                FOREIGN KEY (id_vendedor) REFERENCES usuarios(id),
                FOREIGN KEY (id_cliente) REFERENCES usuarios(id)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS cotizacion_productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_cotizacion INT,
                id_producto INT,
                id_proveedor INT,
                precio_unitario FLOAT,
                cantidad INT,
                descuento FLOAT,
                iva FLOAT,
                FOREIGN KEY (id_cotizacion) REFERENCES cotizaciones(id),
                FOREIGN KEY (id_producto) REFERENCES productos(id),
                FOREIGN KEY (id_proveedor) REFERENCES proveedores(id)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS factura_cotizacion (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_cotizacion INT,
                fecha DATE,
                estado INT,
                FOREIGN KEY (id_cotizacion) REFERENCES cotizaciones(id)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS factura_orden_compra (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_orden_compra INT,
                fecha DATE,
                estado INT,
                FOREIGN KEY (id_orden_compra) REFERENCES orden_compra(id)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS inventario_proveedor (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_proveedor INT,
                id_producto INT,
                cantidad INT,
                FOREIGN KEY (id_proveedor) REFERENCES proveedores(id),
                FOREIGN KEY (id_producto) REFERENCES productos(id)
            )
            """)
            
            cursor.execute("""
            CREATE TABLE IF NOT EXISTS orden_compra_productos (
                id INT AUTO_INCREMENT PRIMARY KEY,
                id_orden_compra INT,
                id_producto INT,
                id_proveedor INT,
                precio_unitario FLOAT,
                cantidad INT,
                descuento FLOAT,
                iva FLOAT,
                FOREIGN KEY (id_orden_compra) REFERENCES orden_compra(id),
                FOREIGN KEY (id_producto) REFERENCES productos(id),
                FOREIGN KEY (id_proveedor) REFERENCES proveedores(id)
            )
            """)
            
            # Realiza el commit para ejecutar las consultas
            connection.commit()
    finally:
        # Cierra la conexión
        connection.close()