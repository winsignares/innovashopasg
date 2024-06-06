
from flask import Blueprint, Flask, render_template, request
from config.db import bd, ma, app

# from models.UserModel import Users, UsersSchema

ruta_cliente = Blueprint("route_cliente", __name__)

# user_schema = UsersSchema()
# users_schema = UsersSchema(many=True)

# * home
@app.route('/cliente', methods=['GET'])
def cliente_home():
    return render_template("cliente/cliente-home.html")

# * facturas
@app.route('/cliente/facturas', methods=['GET'])
def cliente_facturas():
    return render_template("cliente/cliente-facturas.html")

# * cotizaciones
@app.route('/cliente/cotizaciones', methods=['GET'])
def cliente_cotizaciones():
    return render_template("cliente/cliente-cotizaciones.html")
