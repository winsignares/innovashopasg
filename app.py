from flask import Flask, render_template, request, json, jsonify, redirect
from config.db import app

# ! PLANTILLAS
from controllers.AuthController import ruta_auth
from controllers.PlantillaEmpresaController import ruta_empresa
from controllers.PlantillaClienteController import ruta_cliente
from controllers.PlantillaAdministradorController import ruta_admin
from controllers.PlantillaVendedorController import ruta_vendedor

app.register_blueprint(ruta_auth, url_prefix="/")
app.register_blueprint(ruta_empresa, url_prefix="/")
app.register_blueprint(ruta_cliente, url_prefix="/")
app.register_blueprint(ruta_admin, url_prefix="/")
app.register_blueprint(ruta_vendedor, url_prefix="/")

# ! AUTH (GENERAL)
from controllers.LoginController import ruta_login_empresa  

app.register_blueprint(ruta_login_empresa, url_prefix="/auth")

# ! API (GENERAL)
from controllers.EmpresaController import ruta_empresa  
from controllers.ModuloController import ruta_modulo  
from controllers.ModulosEmpresaController import ruta_modulos_empresa  

app.register_blueprint(ruta_empresa, url_prefix="/general")
app.register_blueprint(ruta_modulo, url_prefix="/general")
app.register_blueprint(ruta_modulos_empresa, url_prefix="/general")

# ! API (EMPRESA ESPECIFICA)
from controllers.RolController import ruta_roles  
from controllers.UsuarioController import ruta_usuario  
from controllers.ProvedorController import ruta_proveedor
from controllers.ProductoController import ruta_producto
from controllers.ProductoAlternoController import ruta_producto_alterno
from controllers.InventarioProvedorController import ruta_inventario_proveedor
from controllers.CotizacionController import ruta_cotizacion
from controllers.FacturaCotizacionController import ruta_factura_cotizacion
from controllers.CotizacionProductosController import ruta_cotizacion_productos
from controllers.OrdenCompraController import ruta_orden_compra
from controllers.OrdenCompraProductosController import ruta_orden_compra_productos
from controllers.FacturaOrdenCompraController import ruta_factura_orden_compra

app.register_blueprint(ruta_roles, url_prefix="/api")
app.register_blueprint(ruta_usuario, url_prefix="/api")
app.register_blueprint(ruta_proveedor, url_prefix="/api")
app.register_blueprint(ruta_producto, url_prefix="/api")
app.register_blueprint(ruta_producto_alterno, url_prefix="/api")
app.register_blueprint(ruta_inventario_proveedor, url_prefix="/api")
app.register_blueprint(ruta_cotizacion, url_prefix="/api")
app.register_blueprint(ruta_factura_cotizacion, url_prefix="/api")
app.register_blueprint(ruta_cotizacion_productos, url_prefix="/api")
app.register_blueprint(ruta_orden_compra, url_prefix="/api")
app.register_blueprint(ruta_orden_compra_productos, url_prefix="/api")
app.register_blueprint(ruta_factura_orden_compra, url_prefix="/api")

if __name__ == '__main__':
    app.run(debug=True)