
from flask import Blueprint, Flask, render_template, request
from config.db import bd, ma, app

# from models.UserModel import Users, UsersSchema

ruta_vendedor = Blueprint("route_vendedor", __name__)

# user_schema = UsersSchema()
# users_schema = UsersSchema(many=True)

@app.route('/vendedor', methods=['GET'])
def home_vendedor():
    return render_template("vendedor/homevendedor.html")

@app.route('/vendedor/productos', methods=['GET'])
def productos_vendedor():
    return render_template("vendedor/productosvendedor.html")

@app.route('/vendedor/cliente', methods=['GET'])
def clientes_vendedor():
    return render_template("vendedor/clientesvendedor.html")

@app.route('/vendedor/cotizaciones', methods=['GET'])
def cotizaciones_vendedor():
    return render_template("vendedor/cotizacionesvendedor.html")

@app.route('/vendedor/informes', methods=['GET'])
def informes_vendedor():
    return render_template("vendedor/informesvendedor.html")

@app.route('/vendedor/hacercotizaciones', methods=['GET'])
def hacercotizaciones_vendedor():
    return render_template("/vendedor/hacercotizacionesvendedor.html")

@app.route('/vendedor/vercotizacion', methods=['GET'])
def empresa_ver_cotizacion():
    return render_template("/vendedor/cotizacion-vendedor-ver.html")
