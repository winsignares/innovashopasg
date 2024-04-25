from flask import Flask, render_template, request, json, jsonify, redirect

app = Flask(__name__)

# ! LOGIN
@app.route('/login', methods=['GET'])
def login():
    return render_template("login/login.html")

# ! VENDEDOR
@app.route('/vendedor', methods=['GET'])
def home_vendedor():
    return render_template("vendedor/homevendedor.html")
@app.route('/vendedor/productos', methods=['GET'])
def productos_vendedor():
    return render_template("vendedor/productosvendedor.html")
@app.route('/vendedor/cliente', methods=['GET'])
def clientes_vendedor():
    return render_template("vendedor/clientesvendedor.html")
@app.route('/vendedor/cotizaciones', methods=['GET'])
def cotizaciones_vendedor():
    return render_template("vendedor/cotizacionesvendedor.html")
@app.route('/vendedor/informes', methods=['GET'])
def informes_vendedor():
    return render_template("vendedor/informesvendedor.html")
@app.route('/vendedor/hacercotizaciones', methods=['GET'])
def hacercotizaciones_vendedor():
    return render_template("/vendedor/hacercotizacionesvendedor.html")
@app.route('/vendedor/vercotizacion', methods=['GET'])
def empresa_ver_cotizacion():
    return render_template("/vendedor/cotizacion-vendedor-ver.html")

# ! ADMINISTRADOR
@app.route('/administrador/', methods=['GET'])
def administrador():
    return render_template("administrador/administrador-home.html")

@app.route('/administrador/empresas', methods=['GET'])
def empresas():
    return render_template("administrador/empresas.html")

@app.route('/administrador/administrador', methods=['GET'])
def administrador_administrador():
    return render_template("administrador/administrador.html")

@app.route('/administrador/crearempresa', methods=['GET'])
def crearempresa():
    return render_template("administrador/crearempresa.html")

@app.route('/administrador/eliminarempresa', methods=['GET'])
def eliminarempresa():
    return render_template("administrador/eliminarempresa.html")

@app.route('/administrador/modulos', methods=['GET'])
def modulos():
    return render_template("administrador/modulos.html")

# ! CLIENTE
# * home
@app.route('/cliente', methods=['GET'])
def cliente_home():
    return render_template("cliente/cliente-home.html")

# * facturas
@app.route('/cliente/facturas', methods=['GET'])
def cliente_facturas():
    return render_template("cliente/cliente-facturas.html")

# * cotizaciones
@app.route('/cliente/cotizaciones', methods=['GET'])
def cliente_cotizaciones():
    return render_template("cliente/cliente-cotizaciones.html")


# ! EMPRESA
# * home
@app.route('/empresa', methods=['GET'])
def empresa_home():
    return render_template("empresa/homeempresa.html")

# * Configuracion
@app.route('/empresa/configuracion', methods=['GET'])
def empresa_config():
    return render_template("empresa/empresa-configuracion.html")

# * Mis modulos
@app.route('/empresa/modulos', methods=['GET'])
def empresa_modulos():
    return render_template("empresa/empresa-mis-modulos.html")

# * Inventario
@app.route('/empresa/inventario', methods=['GET'])
def empresa_inventario():
    return render_template("empresa/empresa-inventario.html")

@app.route('/empresa/inventario/stock', methods=['GET'])
def empresa_inventario_stock():
    return render_template("empresa/empresa-inventario-stock.html")

@app.route('/empresa/inventario/crear', methods=['GET'])
def empresa_inventario_crear():
    return render_template("empresa/empresa-inventario-crear.html")

# * Cotizaciones
@app.route('/empresa/cotizaciones', methods=['GET'])
def empresa_cotizaciones():
    return render_template("empresa/empresa-cotizacion.html")

@app.route('/empresa/cotizaciones/nueva', methods=['GET'])
def empresa_cotizaciones_crear():
    return render_template("empresa/empresa-cotizacion-crear.html")

@app.route('/empresa/cotizaciones/ver', methods=['GET'])
def empresa_cotizaciones_ver():
    return render_template("empresa/empresa-cotizacion-ver.html")

# * Ordenes de compra
@app.route('/empresa/ordenes', methods=['GET'])
def empresa_ordenes():
    return render_template("empresa/empresa-ordenes.html")

@app.route('/empresa/ordenes/nueva', methods=['GET'])
def empresa_ordenes_nueva():
    return render_template("empresa/empresa-ordenes-nueva.html")

@app.route('/empresa/ordenes/ver', methods=['GET'])
def empresa_ordenes_ver():
    return render_template("empresa/empresa-ordenes-ver.html")

# * Provedores
@app.route('/empresa/provedores', methods=['GET'])
def empresa_provedores():
    return render_template("empresa/empresa-provedores.html")

@app.route('/empresa/provedores/crear', methods=['GET'])
def empresa_provedores_crear():
    return render_template("empresa/empresa-provedor-crear.html")

@app.route('/empresa/provedores/ver', methods=['GET'])
def empresa_provedores_ver():
    return render_template("empresa/empresa-provedor-ver.html")

# * Vendedores
@app.route('/empresa/vendedores', methods=['GET'])
def empresa_vendedores():
    return render_template("empresa/empresa-vendedores.html")

@app.route('/empresa/vendedores/crear', methods=['GET'])
def empresa_vendedores_crear():
    return render_template("empresa/empresa-vendedor-crear.html")

# * Informes

@app.route('/empresa/informes', methods=['GET'])
def empresa_informes():
    return render_template("empresa/empresa-informes.html")


# Manejar rutas no encontradas
@app.errorhandler(404)
def page_not_found(error):
    return redirect('/login')

if __name__ == '__main__':
    app.run(debug=True)