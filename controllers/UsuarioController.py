from flask import Blueprint, jsonify, request
from config.db import bd, ma, app, cambiar_uri_bd

from models.RolModel import Rol, RolSchema
from models.UsuarioModel import Usuario, UsuarioSchema
from models.CotizacionModel import Cotizacion, CotizacionSchema
from models.CotizacionProductosModel import CotizacionProductos, CotizacionProductosSchema
from models.FacturaCotizacionModel import FacturaCotizacion, FacturaCotizacionSchema

usuario_schema = UsuarioSchema()
usuarios_schema = UsuarioSchema(many=True)

ruta_usuario = Blueprint('ruta_usuario', __name__)
# ! LOGIN
@ruta_usuario.route('/login', methods=['POST'])
def login():
    # try:
        data = request.json 
        
        if not data["clave"] or not data["usuario"]:
            raise ValueError("Uno o más campos están vacíos")
        
        if not data["rol"]["id"] or not data["rol"]["nombre"]:
            raise ValueError("Uno o más campos en 'rol' están vacíos")
        
        usuario = Usuario.query.filter_by(
            usuario=data["usuario"],
            contraseña=data["clave"],
        ).first() 

        if usuario is None:
            return jsonify({"error": "Usuario no encontrado"}), 404

        rol_usuario = Rol.query.get(usuario.rol_id)
        
        if rol_usuario.rol != data["rol"]["nombre"]:
            return jsonify({"error": "El rol proporcionado no coincide con el rol del usuario"}), 400
        
        usuario_res = usuario_schema.dump(usuario)
        return jsonify({
            "message": "Login correcto",
            "usuario": usuario_res
        })
    
    # except (KeyError, TypeError, ValueError) as e:

    #     error_message = "Error en los datos recibidos: {}".format(str(e))

    #     return jsonify({"error": error_message}), 400 

@ruta_usuario.route('/agregar/cliente', methods=['POST'])
def agregar_cliente():

        # Obtener los datos del cliente desde la solicitud JSON
        datos_cliente = request.json
        
        rol_vendedor = Rol.query.filter_by(rol="cliente").first()
        if not rol_vendedor:
            return jsonify({'error': 'Rol "cliente" no encontrado'}), 404

        # Crear un nuevo objeto de cliente con los datos recibidos
        nuevo_cliente = Usuario(
            rol_id=rol_vendedor.id,  # Asegúrate de definir el rol_id adecuado para el cliente
            nombre=datos_cliente.get('nombre'),
            apellidos='',  # Opcional: puedes definir los apellidos según tu caso
            usuario=datos_cliente.get('usuario'),
            contraseña=datos_cliente.get('contraseña'),
            cedula=datos_cliente.get('nit'),  # Asumo que el campo 'nit' equivale a la cédula
            direccion=datos_cliente.get('direccion'),
            telefono=datos_cliente.get('telefono')
        )

        # Agregar el nuevo cliente a la base de datos
        bd.session.add(nuevo_cliente)
        bd.session.commit()

        return jsonify({'mensaje': 'Cliente agregado exitosamente'}), 200
 
@ruta_usuario.route('/eliminar-cliente/<string:cedula>', methods=['DELETE'])
def eliminar_cliente(cedula):
    try:
        print(f"Solicitud para eliminar cliente con cédula: {cedula}")

        # Buscar el cliente en la base de datos por su cédula
        cliente = Usuario.query.filter_by(cedula=cedula).first()

        # Verificar si el cliente existe
        if cliente:
            # Buscar todas las cotizaciones asociadas al cliente por su ID
            cotizaciones_cliente = Cotizacion.query.filter_by(id_cliente=cliente.id).all()
            
            # Eliminar las cotizaciones asociadas al cliente
            for cotizacion in cotizaciones_cliente:
                bd.session.delete(cotizacion)

            # Eliminar el cliente de la base de datos
            bd.session.delete(cliente)
            bd.session.commit()

            return jsonify({'mensaje': 'Cliente y cotizaciones eliminados correctamente'}), 200
        else:
            return jsonify({'error': 'Cliente no encontrado'}), 404

    except Exception as e:
        return jsonify({'error': str(e)}), 500

   
@ruta_usuario.route('/obtener-cantidad-compras/<string:cedula>')
def obtener_cantidad_compras_cliente(cedula):
    try:
        # Realizar la consulta para obtener la cantidad de compras del cliente con la cédula especificada
        cantidad_compras = Cotizacion.query \
                            .filter(Cotizacion.id_cliente == cedula) \
                            .count()

        # Devolver la cantidad de compras como una respuesta JSON
        return jsonify({'cantidad_compras': cantidad_compras})

    except Exception as e:
        # Manejar cualquier excepción que ocurra durante la consulta
        print(f"Error al obtener la cantidad de compras del cliente {cedula}: {str(e)}")
        return jsonify({'error': f"Error al obtener la cantidad de compras del cliente {cedula}"}), 500

@ruta_usuario.route('/actualizar-cliente/<string:cedula>', methods=['PUT'])
def actualizar_cliente(cedula):
    try:
        data = request.json
        cliente = Usuario.query.filter_by(cedula=cedula).first()
        
        if cliente:
            cliente.nombre = data.get('nombre', cliente.nombre)
            cliente.apellidos = data.get('apellidos', cliente.apellidos)
            cliente.direccion = data.get('direccion', cliente.direccion)
            cliente.telefono = data.get('telefono', cliente.telefono)
            
            bd.session.commit()
            return jsonify({'mensaje': 'Cliente actualizado correctamente'}), 200
        else:
            return jsonify({'error': 'Cliente no encontrado'}), 404
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ruta_usuario.route('/obtener-clientes', methods=['GET'])
def obtener_clientes():
    try:
        # Obtener el rol_id del rol "cliente"
        rol_cliente = Rol.query.filter_by(rol="cliente").first()
        if not rol_cliente:
            return jsonify({'error': 'Rol "cliente" no encontrado'}), 404

        # Filtrar los usuarios cuyo rol_id sea el del rol "cliente"
        clientes = Usuario.query.filter_by(rol_id=rol_cliente.id).all()
        cliente_schema = UsuarioSchema(many=True)
        output = cliente_schema.dump(clientes)
        return jsonify(output), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
  
@ruta_usuario.route('/api/clientes/<int:id>', methods=['GET'])
def obtener_cliente(id):
    cliente = Usuario.query.filter_by(id=id).first()
    if cliente:
        return jsonify(cliente)
    else:
        return jsonify({"error": "Cliente no encontrado"}), 404
    
# ! EMPRESA VENDEDOR
@ruta_usuario.route('/obtener-vendedores', methods=['GET'])
def obtener_vendedores():
    try:
        # Obtener el rol_id del rol "cliente"
        rol_cliente = Rol.query.filter_by(rol="vendedor").first()
        if not rol_cliente:
            return jsonify({'error': 'Rol "vendedor" no encontrado'}), 404

        # Filtrar los usuarios cuyo rol_id sea el del rol "cliente"
        clientes = Usuario.query.filter_by(rol_id=rol_cliente.id).all()
        cliente_schema = UsuarioSchema(many=True)
        output = cliente_schema.dump(clientes)
        return jsonify(output), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# ! EMPRESA VENDEDOR
# ! EMPRESA VENDEDOR
@ruta_usuario.route('/vendedores', methods=['POST'])
def crear_vendedor():
    try:
        # Obtener el ID del rol "vendedor"
        rol_vendedor = Rol.query.filter_by(rol="vendedor").first()
        if not rol_vendedor:
            return jsonify({'error': 'Rol "vendedor" no encontrado'}), 404

        # Obtener los datos del nuevo vendedor del cuerpo de la solicitud
        nombres = request.json.get('nombres')
        apellidos = request.json.get('apellidos')
        cedula = request.json.get('cedula')
        direccion = request.json.get('direccion')
        usuario = request.json.get('usuario')
        contraseña = request.json.get('contraseña')
        telefono = request.json.get('telefono')

        # Crear una nueva instancia de Usuario con los datos recibidos y el ID del rol "vendedor"
        nuevo_vendedor = Usuario(
            rol_id=rol_vendedor.id,
            nombre=nombres,
            apellidos=apellidos,
            usuario=usuario,
            contraseña=contraseña,  
            cedula=cedula,
            direccion=direccion,
            telefono=telefono
        )

        # Agregar el nuevo vendedor a la base de datos
        bd.session.add(nuevo_vendedor)
        bd.session.commit()

        return jsonify({'message': 'Vendedor creado correctamente'}), 201
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
# ! EMPRESA VENDEDOR
@ruta_usuario.route('/vendedores/<int:id>', methods=['PUT'])
def editar_vendedor(id):
    try:
        # Obtener el vendedor por su ID
        vendedor = Usuario.query.get(id)
        if not vendedor:
            return jsonify({'error': 'Vendedor no encontrado'}), 404

        # Actualizar los campos del vendedor
        vendedor.nombre = request.json.get('nombre', vendedor.nombre)
        vendedor.apellidos = request.json.get('apellidos', vendedor.apellidos)
        vendedor.cedula = request.json.get('cedula', vendedor.cedula)
        vendedor.direccion = request.json.get('direccion', vendedor.direccion)
        vendedor.telefono = request.json.get('telefono', vendedor.telefono)
        vendedor.usuario = request.json.get('usuario', vendedor.usuario)

        # Guardar los cambios en la base de datos
        bd.session.commit()

        return jsonify({'message': 'Vendedor actualizado correctamente'}), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500
    
#   ! EMPRESA INFORMES
@ruta_usuario.route('/cliente-informes/<int:id_cliente>', methods=['GET'])
def obtener_informacion_cliente(id_cliente):
    try:
        # Obtener información del cliente
        cliente = Usuario.query.get(id_cliente)
        if not cliente:
            return jsonify({"error": "Cliente no encontrado"}), 404

        cliente_schema = UsuarioSchema()
        cliente_data = cliente_schema.dump(cliente)

        # Obtener todas las cotizaciones del cliente
        cotizaciones = Cotizacion.query.filter_by(id_cliente=id_cliente).all()
        cotizacion_schema = CotizacionSchema(many=True)
        cotizaciones_data = cotizacion_schema.dump(cotizaciones)

        for cotizacion in cotizaciones_data:
            # Obtener productos de la cotización
            productos = CotizacionProductos.query.filter_by(id_cotizacion=cotizacion['id']).all()
            productos_schema = CotizacionProductosSchema(many=True)
            productos_data = productos_schema.dump(productos)
            cotizacion['productos'] = productos_data

            # Obtener factura de la cotización
            factura = FacturaCotizacion.query.filter_by(id_cotizacion=cotizacion['id']).first()
            if factura:
                factura_schema = FacturaCotizacionSchema()
                factura_data = factura_schema.dump(factura)
                cotizacion['factura'] = factura_data
            else:
                cotizacion['factura'] = None

            # Obtener información del vendedor
            vendedor = Usuario.query.get(cotizacion['id_vendedor'])
            if vendedor:
                vendedor_data = cliente_schema.dump(vendedor)
                cotizacion['vendedor'] = vendedor_data
            else:
                cotizacion['vendedor'] = None

        cliente_data['cotizaciones'] = cotizaciones_data

        return jsonify(cliente_data), 200
    except Exception as e:
        return jsonify({"error": str(e)}), 500