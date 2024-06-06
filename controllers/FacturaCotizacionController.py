from flask import Blueprint, jsonify, request
from models.FacturaCotizacionModel import FacturaCotizacion, FacturaCotizacionSchema
from models.ProductoModel import Producto,ProductoSchema
from models.CotizacionProductosModel import CotizacionProductosSchema,CotizacionProductos
from models.CotizacionModel import Cotizacion,CotizacionSchema
from models.UsuarioModel  import Usuario,UsuarioSchema

factura_cotizacion_schema = FacturaCotizacionSchema()
facturas_cotizacion_schema = FacturaCotizacionSchema(many=True)

ruta_factura_cotizacion = Blueprint('ruta_factura_cotizacion', __name__)

# Ruta para obtener todas las facturas de cotización
@ruta_factura_cotizacion.route('/facturas_cotizacion', methods=['GET'])
def obtener_facturas_cotizacion():
    todas_las_facturas_cotizacion = FacturaCotizacion.query.all()
    resultado = facturas_cotizacion_schema.dump(todas_las_facturas_cotizacion)
    return jsonify(resultado)

@ruta_factura_cotizacion.route('/facturas-cotizaciones', methods=['GET'])
def obtener_facturas_cotizaciones():
    try:
        # Consulta las facturas cotizaciones desde la base de datos
        facturas_cotizaciones = []
        cotizaciones = Cotizacion.query.all()
        for cotizacion in cotizaciones:
            factura_cotizacion = FacturaCotizacion.query.filter_by(id_cotizacion=cotizacion.id).first()
            if factura_cotizacion:
                factura_cotizacion_serializada = {
                    'id': factura_cotizacion.id,
                    'cliente': cotizacion.id_cliente,  # Aquí asumimos que 'id_cliente' es el ID del cliente
                    'vendedor': cotizacion.id_vendedor,  # Aquí asumimos que 'id_vendedor' es el ID del vendedor
                    'fecha': factura_cotizacion.fecha.isoformat(),
                    'valor': cotizacion.valor_total,  # Aquí asumimos que 'valor_total' es el valor total de la cotización
                    'estado': factura_cotizacion.estado
                }
                facturas_cotizaciones.append(factura_cotizacion_serializada)

        # Devuelve las facturas cotizaciones serializadas como respuesta JSON
        return jsonify(facturas_cotizaciones)
    except Exception as e:
        return jsonify({'mensaje': 'Error al obtener las facturas cotizaciones', 'error': str(e)}), 500

@ruta_factura_cotizacion.route('/cotizaciones-pendientes/<int:id>', methods=['GET'])
def obtener_cotizaciones_pendientes(id):
    try:
        cliente_id = id

        cotizaciones_pendientes = []
        cotizaciones = Cotizacion.query.filter_by(id_cliente=cliente_id, estado=0).all()
        
        for cotizacion in cotizaciones:
            vendedor = Usuario.query.get(cotizacion.id_vendedor)
            cantidad_productos = CotizacionProductos.query.filter_by(id_cotizacion=cotizacion.id).count()
            cotizacion_serializada = {
                'codigo': cotizacion.id,
                'vendedor': vendedor.nombre if vendedor else 'N/A',
                'cantidad_productos': cantidad_productos,
                'valor_total': cotizacion.valor_total,
                'fecha': cotizacion.fecha.strftime("%Y-%m-%d"),
                'id': cotizacion.id
            }
            cotizaciones_pendientes.append(cotizacion_serializada)
        
        return jsonify(cotizaciones_pendientes)
    except Exception as e:
        return jsonify({'mensaje': 'Error al obtener las cotizaciones pendientes', 'error': str(e)}), 500

@ruta_factura_cotizacion.route('/facturas-cliente/<int:id>', methods=['GET'])
def obtener_facturas_cliente(id):
    try:
        cliente_id = id

        facturas_cliente = []
        cotizaciones = Cotizacion.query.filter_by(id_cliente=cliente_id, estado=1).all()
        
        for cotizacion in cotizaciones:
            factura_cotizacion = FacturaCotizacion.query.filter_by(id_cotizacion=cotizacion.id).first()
            if factura_cotizacion:
                vendedor = Usuario.query.get(cotizacion.id_vendedor)
                cantidad_productos = CotizacionProductos.query.filter_by(id_cotizacion=cotizacion.id).count()
                factura_cotizacion_serializada = {
                    'codigo': cotizacion.id,
                    'vendedor': vendedor.nombre if vendedor else 'N/A',
                    'cantidad_productos': cantidad_productos,
                    'valor_total': cotizacion.valor_total,
                    'fecha': factura_cotizacion.fecha.strftime("%Y-%m-%d"),
                    'id': factura_cotizacion.id
                }
                facturas_cliente.append(factura_cotizacion_serializada)
        
        return jsonify(facturas_cliente)
    except Exception as e:
        return jsonify({'mensaje': 'Error al obtener las facturas del cliente', 'error': str(e)}), 500
@ruta_factura_cotizacion.route('/informe', methods=['GET'])
def obtener_productos():
    try:
        # Consulta todos los productos desde la base de datos
        productos = Producto.query.all()

        # Itera sobre cada producto y obtén las veces compradas y el estado más reciente
        productos_serializados = []
        for producto in productos:
            # Contar las veces compradas del producto
            veces_compradas = CotizacionProductos.query.filter_by(id_producto=producto.id).count()
            
            # Obtener el estado más reciente de la cotización asociada al producto
            ultima_cotizacion = Cotizacion.query \
            .filter_by(id_cliente=producto.id) \
            .order_by(Cotizacion.fecha.desc()) \
            .first()
            estado_producto = ultima_cotizacion.estado if ultima_cotizacion else "Sin cotizaciones"

            # Serializar el producto con la información recopilada
            producto_serializado = producto.to_dict()
            producto_serializado['veces_compradas'] = veces_compradas
            producto_serializado['estado'] = estado_producto
            productos_serializados.append(producto_serializado)

        return jsonify(productos_serializados)
    except Exception as e:
        return jsonify({'mensaje': 'Error al obtener los productos', 'error': str(e)}), 500
    
    