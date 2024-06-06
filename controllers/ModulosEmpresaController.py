from flask import Blueprint, jsonify
from models.ModulosEmpresaModel import ModulosEmpresa, ModulosEmpresaSchema

modulos_empresa_schema = ModulosEmpresaSchema()
modulos_empresas_schema = ModulosEmpresaSchema(many=True)

ruta_modulos_empresa = Blueprint('ruta_modulos_empresa', __name__)

# Ruta para obtener los módulos asociados a una empresa por su ID de empresa
@ruta_modulos_empresa.route('/modulos_empresa/<int:id_empresa>', methods=['GET'])
def obtener_modulos_empresa(id_empresa):
    modulos_empresa = ModulosEmpresa.query.filter_by(id_empresa=id_empresa).all()
    resultado = modulos_empresas_schema.dump(modulos_empresa)
    return jsonify(resultado)
