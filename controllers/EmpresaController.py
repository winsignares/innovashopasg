from flask import Blueprint, jsonify, request
from config.db import bd, crear_base_de_datos_y_tablas

from models.EmpresaModel import Empresa, EmpresaSchema
from models.ModulosEmpresaModel import ModulosEmpresa, ModulosEmpresaSchema
from models.ModuloModel import Modulo, ModuloSchema

empresa_schema = EmpresaSchema()
empresas_schema = EmpresaSchema(many=True)

modulos_empresa_schema = ModulosEmpresaSchema(many=True)

modulo_schema = ModuloSchema()
modulos_empresa_schema = ModulosEmpresaSchema(many=True)

ruta_empresa = Blueprint('ruta_empresa', __name__)

# ! ----------------- EMPRESA -----------------
# * GET ALL
@ruta_empresa.route('/empresas', methods=['GET'])
def obtener_empresas():
    todas_las_empresas = Empresa.query.all()
    resultado = empresas_schema.dump(todas_las_empresas)
    return jsonify(resultado)

@ruta_empresa.route('/empresas-info', methods=['GET'])
def obtener_empresas_info():
    empresa = Empresa.query.first()
    resultado = empresa_schema.dump(empresa)
    return jsonify(resultado)

# * GET BY ID
@ruta_empresa.route('/empresas/<int:id>', methods=['GET'])
def obtener_empresa_por_id(id):
    empresa = Empresa.query.get(id)
    if empresa is None:
        return jsonify({'message': 'Empresa no encontrada'}), 404
    return empresa_schema.jsonify(empresa)

# * CREATE
@ruta_empresa.route('/empresas/create', methods=['POST'])
def crear_empresa():
    nombre = request.json.get('nombre')
    nit = request.json.get('nit')
    correo = request.json.get('correo')
    url_asociada = request.json.get('url_asociada', '')  # Campo opcional, por defecto vacío
    porcentaje_ganancia = request.json.get('porcentaje_ganancia', 0)  # Valor por defecto
    iva_establecido = request.json.get('iva_establecido', 0)  # Valor por defecto
    descuento_general = request.json.get('descuento_general', 0)  # Valor por defecto
    vigencia_licencia_fin = request.json.get('vigencia_licencia_fin', '')  # Campo opcional, por defecto vacío

    nueva_empresa = Empresa(
        nombre=nombre,
        nit=nit,
        correo=correo,
        url_asociada=url_asociada,
        porcentaje_ganancia=porcentaje_ganancia,
        iva_establecido=iva_establecido,
        descuento_general=descuento_general,
        vigencia_licencia_fin=vigencia_licencia_fin
    )
    
    print(nueva_empresa)

    bd.session.add(nueva_empresa)
    bd.session.commit()
    
    crear_base_de_datos_y_tablas(nombre)

    # Crear las tablas necesarias en la nueva base de datos para la empresa
    bd.create_all()

    return empresa_schema.jsonify(nueva_empresa)

# * UPDATE
@ruta_empresa.route('/empresas/<int:id>', methods=['PUT'])
def actualizar_empresa(id):
    empresa = Empresa.query.get(id)
    
    if not empresa:
        return jsonify({"error": "Empresa no encontrada"}), 404

    # Actualizar los campos de la empresa con los datos del request
    empresa.nombre = request.json.get('nombre', empresa.nombre)
    empresa.nit = request.json.get('nit', empresa.nit)
    empresa.correo = request.json.get('correo', empresa.correo)
    empresa.url_asociada = request.json.get('url_asociada', empresa.url_asociada)
    empresa.porcentaje_ganancia = request.json.get('porcentaje_ganancia', empresa.porcentaje_ganancia)
    empresa.iva_establecido = request.json.get('iva_establecido', empresa.iva_establecido)
    empresa.descuento_general = request.json.get('descuento_general', empresa.descuento_general)
    empresa.vigencia_licencia_fin = request.json.get('vigencia_licencia_fin', empresa.vigencia_licencia_fin)
    
    bd.session.commit()

    return empresa_schema.jsonify(empresa)

# * DELETE
@ruta_empresa.route('/empresas/<int:id>', methods=['DELETE'])
def eliminar_empresa(id):
    # Buscar la empresa por su ID
    empresa = Empresa.query.get(id)
    
    # Verificar si la empresa existe
    if not empresa:
        return jsonify({"error": "Empresa no encontrada"}), 404

    try:
        # Eliminar la empresa de la base de datos
        bd.session.delete(empresa)
        bd.session.commit()
        return jsonify({"message": "Empresa eliminada correctamente"}), 200
    except Exception as e:
        # En caso de error, hacer rollback de la transacción
        bd.session.rollback()
        return jsonify({"error": str(e)}), 500

# ! ----------------- MODULOS -----------------
@ruta_empresa.route('/empresas/<int:id>/modulos', methods=['GET'])
def obtener_modulos_empresa(id):
    # Obtener todos los módulos
    todos_los_modulos = Modulo.query.all()
    modulos_serializados = modulo_schema.dump(todos_los_modulos, many=True)

    # Buscar los módulos asociados a la empresa con el ID dado
    modulos_empresa = ModulosEmpresa.query.filter_by(id_empresa=id).all()

    # Lista para almacenar los datos serializados de los módulos de la empresa
    modulos_empresa_serializados = []

    # Iterar sobre los módulos asociados y obtener la información detallada de cada módulo
    for modulo_empresa in modulos_empresa:
        modulo = Modulo.query.get(modulo_empresa.id_modulo)
        if modulo:
            # Serializar la información del módulo
            modulo_serializado = modulo_schema.dump(modulo)
            # Agregar la información del módulo a los datos de la empresa
            empresa_con_modulo = {
                'id_empresa': modulo_empresa.id_empresa,
                'id_modulo': modulo.id,
                'fecha_fin': modulo_empresa.fecha_fin,
                'modulo': modulo_serializado
            }
            # Agregar los datos de la empresa con el módulo anidado a la lista
            modulos_empresa_serializados.append(empresa_con_modulo)

    # Estructura final con todos los módulos y los módulos específicos de la empresa
    respuesta = {
        'todos_los_modulos': modulos_serializados,
        'modulos_empresa': modulos_empresa_serializados
    }

    # Retornar los datos serializados en formato JSON
    return jsonify(respuesta)

@ruta_empresa.route('/empresas/modulos/extend', methods=['PUT'])
def extender_modulos_empresa():
    # Obtener los datos del JSON enviado
    datos = request.json
    if not datos:
        return jsonify({"message": "No se proporcionaron datos"}), 400

    # Validar y procesar los datos
    if "duration" not in datos:
        return jsonify({"message": "Falta la duración en los datos"}), 400
    duration = int(datos["duration"])
    id_modulo = datos.get("id_modulo")
    id_empresa = datos.get("id_empresa")

    # Extender la fecha de finalización de los módulos de la empresa en la base de datos
    modulos_empresa = ModulosEmpresa.query.filter_by(id_modulo=id_modulo, id_empresa=id_empresa).all()
    if not modulos_empresa:
        return jsonify({"message": "No se encontraron módulos para la empresa"}), 404

    for modulo_empresa in modulos_empresa:
        # Procesar la fecha fin actual y agregar la duración
        fecha_fin_actual = modulo_empresa.fecha_fin
        # Suponemos que la fecha fin actual está en formato "dd/mm/aaaa"
        # y que la duración es en meses.
        dia, mes, anio = map(int, fecha_fin_actual.split('/'))
        # Aquí agregamos la duración en meses
        nuevo_mes = mes + duration
        # Manejamos el desbordamiento del año
        anios_extra = nuevo_mes // 12
        nuevo_anio = anio + anios_extra
        nuevo_mes = nuevo_mes % 12
        # Actualizamos la fecha fin extendida
        fecha_fin_extendida = f"{dia}/{nuevo_mes}/{nuevo_anio}"
        modulo_empresa.fecha_fin = fecha_fin_extendida
        bd.session.commit()

    # Devolver una respuesta adecuada
    return jsonify({"message": "Fecha de finalización de módulos extendida exitosamente"}), 200
