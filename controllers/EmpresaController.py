
from flask import Blueprint, Flask, render_template, request
from config.db import bd, ma, app

# from models.UserModel import Users, UsersSchema

ruta_empresa = Blueprint("route_empresa", __name__)

# user_schema = UsersSchema()
# users_schema = UsersSchema(many=True)

# * home
@app.route('/empresa', methods=['GET'])
def empresa_home():
    return render_template("empresa/homeempresa.html")

# * Configuracion
@app.route('/empresa/configuracion', methods=['GET'])
def empresa_config():
    return render_template("empresa/empresa-configuracion.html")

# * Mis modulos
@app.route('/empresa/modulos', methods=['GET'])
def empresa_modulos():
    return render_template("empresa/empresa-mis-modulos.html")

# * Inventario
@app.route('/empresa/inventario', methods=['GET'])
def empresa_inventario():
    return render_template("empresa/empresa-inventario.html")

@app.route('/empresa/inventario/stock', methods=['GET'])
def empresa_inventario_stock():
    return render_template("empresa/empresa-inventario-stock.html")

@app.route('/empresa/inventario/crear', methods=['GET'])
def empresa_inventario_crear():
    return render_template("empresa/empresa-inventario-crear.html")

# * Cotizaciones
@app.route('/empresa/cotizaciones', methods=['GET'])
def empresa_cotizaciones():
    return render_template("empresa/empresa-cotizacion.html")

@app.route('/empresa/cotizaciones/nueva', methods=['GET'])
def empresa_cotizaciones_crear():
    return render_template("empresa/empresa-cotizacion-crear.html")

@app.route('/empresa/cotizaciones/ver', methods=['GET'])
def empresa_cotizaciones_ver():
    return render_template("empresa/empresa-cotizacion-ver.html")

# * Ordenes de compra
@app.route('/empresa/ordenes', methods=['GET'])
def empresa_ordenes():
    return render_template("empresa/empresa-ordenes.html")

@app.route('/empresa/ordenes/nueva', methods=['GET'])
def empresa_ordenes_nueva():
    return render_template("empresa/empresa-ordenes-nueva.html")

@app.route('/empresa/ordenes/ver', methods=['GET'])
def empresa_ordenes_ver():
    return render_template("empresa/empresa-ordenes-ver.html")

# * Provedores
@app.route('/empresa/provedores', methods=['GET'])
def empresa_provedores():
    return render_template("empresa/empresa-provedores.html")

@app.route('/empresa/provedores/crear', methods=['GET'])
def empresa_provedores_crear():
    return render_template("empresa/empresa-provedor-crear.html")

@app.route('/empresa/provedores/ver', methods=['GET'])
def empresa_provedores_ver():
    return render_template("empresa/empresa-provedor-ver.html")

# * Vendedores
@app.route('/empresa/vendedores', methods=['GET'])
def empresa_vendedores():
    return render_template("empresa/empresa-vendedores.html")

@app.route('/empresa/vendedores/crear', methods=['GET'])
def empresa_vendedores_crear():
    return render_template("empresa/empresa-vendedor-crear.html")

# * Informes

@app.route('/empresa/informes', methods=['GET'])
def empresa_informes():
    return render_template("empresa/empresa-informes.html")

