
from flask import Blueprint, Flask, render_template, request
from config.db import bd, ma, app

# from models.UserModel import Users, UsersSchema

ruta_auth = Blueprint("route_auth", __name__)

# user_schema = UsersSchema()
# users_schema = UsersSchema(many=True)

@app.route('/login', methods=['GET'])
def login():
    return render_template("login/login.html")

