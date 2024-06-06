from datetime import datetime
from flask import Blueprint, jsonify, request
from config.db import bd
from models.OrdenCompraModel import OrdenCompra, OrdenCompraSchema

from models.ProductoModel import Producto
from models.OrdenCompraProductosModel import OrdenCompraProductos
from models.UsuarioModel import Usuario, UsuarioSchema
from models.ProvedorModel import Proveedor
from models.InventarioProvedorModel import InventarioProveedor
from models.FacturaOrdenCompraModel import FacturaOrdenCompra

orden_compra_schema = OrdenCompraSchema()
ordenes_compra_schema = OrdenCompraSchema(many=True)

usuario_schema = UsuarioSchema()

ruta_orden_compra = Blueprint('ruta_orden_compra', __name__)

# Ruta para obtener todas las órdenes de compra
@ruta_orden_compra.route('/ordenes_compra', methods=['GET'])
def obtener_ordenes_compra():
    todas_las_ordenes_compra = OrdenCompra.query.all()
    resultado = ordenes_compra_schema.dump(todas_las_ordenes_compra)
    return jsonify(resultado)

@ruta_orden_compra.route('/ordenes', methods=['POST'])
def crear_orden_compra():
    # try:
        # Obtener los datos del JSON enviado en la solicitud
        data = request.json
        
        # Crear una nueva instancia de OrdenCompra
        nueva_orden = OrdenCompra(
            id_usuario_emisor=data['id_usuario_emisor'],
            fecha=data['fecha'],
            estado=1  # Estado predeterminado para una nueva orden
        )
        
        # Agregar la nueva orden a la base de datos
        bd.session.add(nueva_orden)
        bd.session.commit()

        # Obtener la ID de la nueva orden
        id_nueva_orden = nueva_orden.id

        # Guardar los productos asociados a la orden de compra
        for producto in data['productos']:
            # Buscar el producto en la base de datos
            producto_bd = Producto.query.get(producto['id'])

            # Obtener el precio unitario, descuento e IVA del producto
            precio_unitario = producto_bd.precio_unitario
            descuento = producto_bd.descuento
            iva = producto_bd.iva

            # Obtener el proveedor asociado al producto
            inventario_proveedor = InventarioProveedor.query.filter_by(id_producto=producto['id']).first()
            id_proveedor = inventario_proveedor.id_proveedor if inventario_proveedor else None

            # Convertir la cantidad del producto a un entero
            cantidad_producto = int(producto['cantidad'])

            # Crear una nueva relación de OrdenCompraProductos
            nueva_relacion = OrdenCompraProductos(
                id_orden_compra=id_nueva_orden,
                id_producto=producto['id'],
                id_proveedor=id_proveedor,
                cantidad=cantidad_producto,
                precio_unitario=precio_unitario,
                descuento=descuento,
                iva=iva
            )
            bd.session.add(nueva_relacion)

            # Actualizar el inventario del proveedor correspondiente
            if inventario_proveedor:
                inventario_proveedor.cantidad -= cantidad_producto
                
                # Actualizar el stock actual del producto
                producto_bd.stock_actual += cantidad_producto
            
                bd.session.commit()
        
        # Confirmar los cambios en la base de datos
        bd.session.commit()
        
        # Crear y guardar la factura de la orden de compra
        nueva_factura_orden_compra = FacturaOrdenCompra(
            id_orden_compra=id_nueva_orden,
            fecha=datetime.utcnow().date(),  # Usar la fecha actual
            estado=1  # Estado en 1
        )
        bd.session.add(nueva_factura_orden_compra)
        bd.session.commit()

        return jsonify({"message": "Orden de compra creada exitosamente."}), 201
    # except Exception as e:
    #     return jsonify({'error': str(e)}), 500

@ruta_orden_compra.route('/ordenes_compra_con_productos', methods=['GET'])
def obtener_ordenes_compra_con_productos():
    try:
        # Obtener todas las órdenes de compra
        todas_las_ordenes_compra = OrdenCompra.query.all()
        resultado = []

        for orden in todas_las_ordenes_compra:
            # Serializar la orden de compra
            orden_dict = orden_compra_schema.dump(orden)

            # Obtener los productos asociados a la orden de compra
            productos_asociados = OrdenCompraProductos.query.filter_by(id_orden_compra=orden.id).all()
            productos_list = []

            for ocp in productos_asociados:
                producto = Producto.query.get(ocp.id_producto)
                if producto:
                    producto_info = {
                        'id': producto.id,
                        'nombre': producto.nombre,
                        'descripcion': producto.descripcion,
                        'codigo': producto.codigo,
                        'precio_unitario': producto.precio_unitario,
                        'stock_actual': producto.stock_actual,
                        'stock_minimo': producto.stock_minimo,
                        'img': producto.img,
                        'descuento': producto.descuento,
                        'iva': producto.iva,
                        'estado': producto.estado,
                        'cantidad': ocp.cantidad,
                        'precio_unitario': ocp.precio_unitario,
                        'descuento': ocp.descuento,
                        'iva': ocp.iva
                    }
                    productos_list.append(producto_info)
            
            # Agregar la lista de productos al diccionario de la orden
            orden_dict['productos'] = productos_list
            resultado.append(orden_dict)

        return jsonify(resultado), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500

@ruta_orden_compra.route('/ordenes_compra/<int:id>', methods=['GET'])
def obtener_orden_compra_con_productos(id):
    try:
        # Obtener la orden de compra por ID
        orden = OrdenCompra.query.get(id)
        if not orden:
            return jsonify({'error': 'Orden de compra no encontrada'}), 404

        # Serializar la orden de compra
        orden_dict = orden_compra_schema.dump(orden)

        # Obtener los productos asociados a la orden de compra
        productos_asociados = OrdenCompraProductos.query.filter_by(id_orden_compra=orden.id).all()
        productos_list = []

        for ocp in productos_asociados:
            producto = Producto.query.get(ocp.id_producto)
            if producto:
                producto_info = {
                    'id': producto.id,
                    'nombre': producto.nombre,
                    'descripcion': producto.descripcion,
                    'codigo': producto.codigo,
                    'precio_unitario': producto.precio_unitario,
                    'stock_actual': producto.stock_actual,
                    'stock_minimo': producto.stock_minimo,
                    'img': producto.img,
                    'descuento': producto.descuento,
                    'iva': producto.iva,
                    'estado': producto.estado,
                    'cantidad': ocp.cantidad,
                    'precio_unitario': ocp.precio_unitario,
                    'descuento': ocp.descuento,
                    'iva': ocp.iva
                }
                productos_list.append(producto_info)

        # Agregar la lista de productos al diccionario de la orden
        orden_dict['productos'] = productos_list

        # Obtener el usuario emisor
        usuario_emisor = Usuario.query.get(orden.id_usuario_emisor)
        if usuario_emisor:
            orden_dict['usuario_emisor'] = usuario_schema.dump(usuario_emisor)
        else:
            orden_dict['usuario_emisor'] = None

        return jsonify(orden_dict), 200
    except Exception as e:
        return jsonify({'error': str(e)}), 500