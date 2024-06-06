
from flask import Blueprint, Flask, render_template, request
from config.db import bd, ma, app

# from models.UserModel import Users, UsersSchema

ruta_admin = Blueprint("route_admin", __name__)

# user_schema = UsersSchema()
# users_schema = UsersSchema(many=True)


@app.route('/administrador/', methods=['GET'])
def administrador():
    return render_template("administrador/administrador-home.html")

@app.route('/administrador/empresas', methods=['GET'])
def empresas():
    return render_template("administrador/empresas.html")

@app.route('/administrador/administrador', methods=['GET'])
def administrador_administrador():
    return render_template("administrador/administrador.html")

@app.route('/administrador/crearempresa', methods=['GET'])
def crearempresa():
    return render_template("administrador/crearempresa.html")

@app.route('/administrador/eliminarempresa', methods=['GET'])
def eliminarempresa():
    return render_template("administrador/eliminarempresa.html")

@app.route('/administrador/modulos/<int:id>', methods=['GET'])
def modulos(id):
    return render_template("administrador/modulos.html", id=id)
