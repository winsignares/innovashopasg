
from flask import Blueprint, Flask, render_template, redirect
from config.db import bd, ma, app

# from models.UserModel import Users, UsersSchema

ruta_auth = Blueprint("route_auth", __name__)

@app.route('/')
def index():
    return redirect('/login')

@app.route('/login', methods=['GET'])
def login():
    return render_template("login/login.html")

