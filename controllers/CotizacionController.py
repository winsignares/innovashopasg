from flask import Blueprint, jsonify, request
from models.CotizacionModel import Cotizacion, CotizacionSchema
from models.CotizacionProductosModel import CotizacionProductos, CotizacionProductosSchema
from models.ProductoModel import Producto, ProductoSchema
from models.OrdenCompraModel import OrdenCompra, OrdenCompraSchema
from models.OrdenCompraProductosModel import OrdenCompraProductos, OrdenCompraProductosSchema
from models.FacturaCotizacionModel import FacturaCotizacion, FacturaCotizacionSchema
from models.UsuarioModel import Usuario, UsuarioSchema
from datetime import datetime
from config.db import bd,ma

cotizacion_schema = CotizacionSchema()
cotizaciones_schema = CotizacionSchema(many=True)

usuario_schema = UsuarioSchema()
producto_schema = ProductoSchema()

ruta_cotizacion = Blueprint('ruta_cotizacion', __name__)

# Ruta para obtener todas las cotizaciones
@ruta_cotizacion.route('/cotizaciones', methods=['GET'])
def obtener_cotizaciones():
    todas_las_cotizaciones = Cotizacion.query.all()
    resultado = cotizaciones_schema.dump(todas_las_cotizaciones)
    return jsonify(resultado)

@ruta_cotizacion.route('/cotizaciones-completa', methods=['GET'])
def obtener_cotizaciones_completa():
    todas_las_cotizaciones = Cotizacion.query.all()
    resultado = []

    for cotizacion in todas_las_cotizaciones:
        cotizacion_data = cotizacion_schema.dump(cotizacion)

        # Obtener información del vendedor
        vendedor = Usuario.query.get(cotizacion.id_vendedor)
        vendedor_data = usuario_schema.dump(vendedor)

        # Obtener información del cliente
        cliente = Usuario.query.get(cotizacion.id_cliente)
        cliente_data = usuario_schema.dump(cliente)

        cotizacion_data['vendedor'] = vendedor_data
        cotizacion_data['cliente'] = cliente_data

        resultado.append(cotizacion_data)
    
    return jsonify(resultado)

# ! COMPLETA CON PRODUCTOS
@ruta_cotizacion.route('/empresa/cotizaciones/<int:id>', methods=['GET'])
def obtener_cotizacion(id):
    cotizacion = Cotizacion.query.get(id)
    if not cotizacion:
        return jsonify({'message': 'Cotización no encontrada'}), 404
    
    cotizacion_data = cotizacion_schema.dump(cotizacion)

    # Obtener información del vendedor
    vendedor = Usuario.query.get(cotizacion.id_vendedor)
    vendedor_data = usuario_schema.dump(vendedor)

    # Obtener información del cliente
    cliente = Usuario.query.get(cotizacion.id_cliente)
    cliente_data = usuario_schema.dump(cliente)

    # Obtener productos de la cotización
    productos_cotizacion = CotizacionProductos.query.filter_by(id_cotizacion=id).all()
    productos_data = []
    for cotizacion_producto in productos_cotizacion:
        producto = Producto.query.get(cotizacion_producto.id_producto)
        producto_data = producto_schema.dump(producto)
        productos_data.append(producto_data)

    cotizacion_data['vendedor'] = vendedor_data
    cotizacion_data['cliente'] = cliente_data
    cotizacion_data['productos'] = productos_data

    return jsonify(cotizacion_data)

# ! CREAR COTIZACION EMPRESA
@ruta_cotizacion.route('/guardar_cotizacion_empresa', methods=['POST'])
def guardar_cotizacion_empresa():
    data = request.get_json()
    
    id_clt = data['cotizacion']['id_cliente'] or None

    nueva_cotizacion = Cotizacion(
        id_vendedor=data['cotizacion']['id_vendedor'],
        id_cliente=id_clt,
        detalles=data['cotizacion']['detalles'],  # Ajusta esto según tu lógica
        valor_total=data['cotizacion']['valor_total'],  # Ajusta esto según tu lógica
        fecha=datetime.strptime(data['cotizacion']['fecha'], "%Y-%m-%dT%H:%M:%S.%fZ"),  # Formatea la fecha
        estado=data['cotizacion']['estado']
    )

    bd.session.add(nueva_cotizacion)
    bd.session.commit()

    for producto in data['productos']:
        nuevo_producto_cotizacion = CotizacionProductos(
            id_cotizacion=nueva_cotizacion.id,
            id_producto=producto['id_producto'],
            id_proveedor=producto['id_provedor'],
            precio_unitario=producto['precio_unitario'],
            cantidad=producto['cantidad'],
            descuento=producto['descuento'],
            iva=producto['iva']
        )
        bd.session.add(nuevo_producto_cotizacion)

    bd.session.commit()

    nueva_factura_cotizacion = FacturaCotizacion(
        id_cotizacion=nueva_cotizacion.id,
        fecha=nueva_cotizacion.fecha,
        estado=nueva_cotizacion.estado
    )
    bd.session.add(nueva_factura_cotizacion)
    bd.session.commit()

    # Aquí puedes agregar más lógica según sea necesario

    return jsonify({"message": "Cotización guardada exitosamente"}), 201

@ruta_cotizacion.route('/cotizaciones', methods=['GET'])
def get_cotizaciones():
   cotizaciones = Cotizacion.query.all()
   cotizacion_schema = CotizacionSchema(many=True)
   return jsonify(cotizacion_schema.dump(cotizaciones))

@ruta_cotizacion.route('/cotizaciones/<int:id>/productos', methods=['GET'])
def get_cotizacion_productos(id):
    # Obtén todos los productos de la cotización especificada
    cotizacionProductos = CotizacionProductos.query.filter_by(id_cotizacion=id).all()
    cotizacion_productos_schema = CotizacionProductosSchema(many=True)
    cotizacionProductosJSON = cotizacion_productos_schema.dump(cotizacionProductos)

    # Anidar la información del producto
    producto_schema = ProductoSchema()
    for cot_prod in cotizacionProductosJSON:
        producto = Producto.query.get(cot_prod['id_producto'])
        cot_prod['producto'] = producto_schema.dump(producto)
    
    return jsonify(cotizacionProductosJSON)

# Ruta para guardar una nueva cotización
@ruta_cotizacion.route('/guardar_cotizacion', methods=['POST'])
def guardar_cotizacion():
        data = request.get_json()
        nueva_cotizacion = Cotizacion(
            id_vendedor=data.get('id_vendedor'),
            id_cliente=data.get('id_cliente'),
            detalles="",  # Debes ajustar esto según tu lógica
            valor_total=data.get('total'),  # Debes ajustar esto según tu lógica
            fecha=datetime.now(),
            estado=data.get('estado')
        )

        bd.session.add(nueva_cotizacion)
        bd.session.commit()
        
        nueva_factura_cotizacion = FacturaCotizacion(
        id_cotizacion=nueva_cotizacion.id,
        fecha=nueva_cotizacion.fecha,
        estado=nueva_cotizacion.estado
        )
        bd.session.add(nueva_factura_cotizacion)
        bd.session.commit()


       
        cotizacion_schema = CotizacionSchema()
        output = cotizacion_schema.dump(nueva_cotizacion)
        return jsonify(output), 201

# Ruta para guardar un nuevo producto de cotización
@ruta_cotizacion.route('/guardar_producto_cotizacion', methods=['POST'])
def guardar_producto_cotizacion():
        data = request.get_json()
        nuevo_producto_cotizacion = CotizacionProductos(
            id_cotizacion=data.get('id_cotizacion'),
            id_producto=data.get('id_producto'),
            id_proveedor=data.get('id_proveedor'),
            precio_unitario=data.get('precio_unitario'),
            cantidad=data.get('cantidad'),
            descuento=data.get('descuento'),
            iva=data.get('iva')
        )
        bd.session.add(nuevo_producto_cotizacion)
        bd.session.commit()
        producto_cotizacion_schema = CotizacionProductosSchema()
        output = producto_cotizacion_schema.dump(nuevo_producto_cotizacion)
        return jsonify(output), 201