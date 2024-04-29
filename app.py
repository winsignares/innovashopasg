from flask import Flask, render_template, request, json, jsonify, redirect
from config.db import app

from controllers.AuthController import ruta_auth
from controllers.EmpresaController import ruta_empresa
from controllers.ClienteController import ruta_cliente
from controllers.AdministradorController import ruta_admin
from controllers.VendedorController import ruta_vendedor

app.register_blueprint(ruta_auth, url_prefix="/")
app.register_blueprint(ruta_empresa, url_prefix="/")
app.register_blueprint(ruta_cliente, url_prefix="/")
app.register_blueprint(ruta_admin, url_prefix="/")
app.register_blueprint(ruta_vendedor, url_prefix="/")

if __name__ == '__main__':
    app.run(debug=True)