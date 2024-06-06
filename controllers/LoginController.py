from flask import Blueprint, jsonify, request
from config.db import bd, ma, app, cambiar_uri_bd

from models.UsuarioModel import Usuario, UsuarioSchema
from models.RolModel import Rol, RolSchema

usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)

ruta_login_empresa = Blueprint('ruta_login_empresa', __name__)
   
@ruta_login_empresa.route('/login-empresa', methods=['POST'])
def login_empresa():
    data = request.json 
    
    # Obtener datos del JSON
    usuario = data["usuario"]
    clave = data["clave"]
    rol_nombre = data["rol"]["nombre"]
    empresa_nombre = data["empresa"]["nombre"]

    # Validar que todos los campos necesarios estén presentes
    if not usuario or not clave or not rol_nombre or not empresa_nombre:
        raise ValueError("Faltan uno o más campos en la solicitud")

    # Cambiar la URI de la base de datos según la empresa
    cambiar_uri_bd(empresa_nombre)

    # Realizar la consulta a la base de datos de la empresa
    usuario = Usuario.query.filter_by(
        usuario=usuario,
        contraseña=clave,
    ).first()

    if usuario is None:
        return jsonify({"error": "Usuario no encontrado"}), 404

    rol_usuario = Rol.query.get(usuario.rol_id)
    
    if rol_usuario.rol != rol_nombre:
        return jsonify({"error": "El rol proporcionado no coincide con el rol del usuario"}), 400
    
    return jsonify({
        "message": "Login correcto"
    })
