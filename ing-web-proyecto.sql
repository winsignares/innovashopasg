-- phpMyAdmin SQL Dump
-- version 5.2.1
-- https://www.phpmyadmin.net/
--
-- Servidor: 127.0.0.1
-- Tiempo de generación: 07-06-2024 a las 00:53:34
-- Versión del servidor: 10.4.32-MariaDB
-- Versión de PHP: 8.2.12

SET SQL_MODE = "NO_AUTO_VALUE_ON_ZERO";
START TRANSACTION;
SET time_zone = "+00:00";


/*!40101 SET @OLD_CHARACTER_SET_CLIENT=@@CHARACTER_SET_CLIENT */;
/*!40101 SET @OLD_CHARACTER_SET_RESULTS=@@CHARACTER_SET_RESULTS */;
/*!40101 SET @OLD_COLLATION_CONNECTION=@@COLLATION_CONNECTION */;
/*!40101 SET NAMES utf8mb4 */;

--
-- Base de datos: `ing-web-proyecto`
--

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizaciones`
--

CREATE TABLE `cotizaciones` (
  `id` int(11) NOT NULL,
  `id_vendedor` int(11) DEFAULT NULL,
  `id_cliente` int(11) DEFAULT NULL,
  `detalles` varchar(200) DEFAULT NULL,
  `valor_total` float DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cotizaciones`
--

INSERT INTO `cotizaciones` (`id`, `id_vendedor`, `id_cliente`, `detalles`, `valor_total`, `fecha`, `estado`) VALUES
(1, 4, 3, 'dwadwad', 30000, '2024-06-05', 1),
(5, 4, 3, '', 60033, '2024-06-03', 1),
(6, 4, 3, '', 385777, '2024-06-03', 1),
(7, 4, 3, '', 30005, '2024-06-03', 0),
(8, 4, 1, '', 610000, '2024-06-03', 0),
(9, 4, NULL, '', 611110000, '2024-06-03', 1),
(12, 4, 3, '', 3885000, '2024-06-03', 1),
(13, 4, 3, '', 14440900, '2024-06-03', 0),
(14, 2, 3, '', 4440890, '2024-06-04', 1),
(15, 4, 6, '', 22, '2024-06-04', 0),
(16, 4, 6, '', 110033, '2024-06-04', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `cotizacion_productos`
--

CREATE TABLE `cotizacion_productos` (
  `id` int(11) NOT NULL,
  `id_cotizacion` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  `precio_unitario` float DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `descuento` float DEFAULT NULL,
  `iva` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `cotizacion_productos`
--

INSERT INTO `cotizacion_productos` (`id`, `id_cotizacion`, `id_producto`, `id_proveedor`, `precio_unitario`, `cantidad`, `descuento`, `iva`) VALUES
(1, 1, 2, 1, 5000, 122, 0, 19),
(2, 1, 1, 1, 5000, 122, 12, 19),
(3, 5, 1, 1, 5000, 12, 0, 0),
(4, 5, 2, 1, 1, 33, 0, 0),
(5, 6, 1, 1, 5000, 77, 0, 0),
(6, 6, 2, 1, 1, 777, 0, 0),
(7, 7, 1, 1, 5000, 6, 0, 0),
(8, 7, 2, 1, 1, 5, 0, 0),
(9, 8, 1, 1, 5000, 122, 0, 0),
(10, 9, 1, 1, 5000, 122222, 0, 0),
(11, 12, 1, 1, 5000, 777, 0, 0),
(12, 13, 1, 1, 5000, 888, 0, 0),
(13, 13, 2, 1, 1, 888, 0, 0),
(14, 14, 1, 1, 5000, 888, 0, 0),
(15, 14, 2, 1, 1, 888, 0, 0),
(16, 15, 2, 1, 1, 22, 0, 0),
(17, 16, 1, 1, 5000, 33, 0, 0),
(18, 16, 2, 1, 1, 33, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `empresas`
--

CREATE TABLE `empresas` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `nit` int(11) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `url_asociada` varchar(50) DEFAULT NULL,
  `porcentaje_ganancia` int(11) DEFAULT NULL,
  `iva_establecido` int(11) DEFAULT NULL,
  `descuento_general` int(11) DEFAULT NULL,
  `vigencia_licencia_fin` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `empresas`
--

INSERT INTO `empresas` (`id`, `nombre`, `nit`, `correo`, `url_asociada`, `porcentaje_ganancia`, `iva_establecido`, `descuento_general`, `vigencia_licencia_fin`) VALUES
(1, 'Sheylita', 213132, 'shey@gmail', 'dawdwa', 55555, 19, 3, '2024-06-11');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_cotizacion`
--

CREATE TABLE `factura_cotizacion` (
  `id` int(11) NOT NULL,
  `id_cotizacion` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_cotizacion`
--

INSERT INTO `factura_cotizacion` (`id`, `id_cotizacion`, `fecha`, `estado`) VALUES
(1, 5, '2024-06-03', 1),
(2, 6, '2024-06-03', 1),
(3, 7, '2024-06-03', 0),
(4, 8, '2024-06-03', 0),
(5, 9, '2024-06-03', 1),
(6, 12, '2024-06-03', 1),
(7, 13, '2024-06-03', 0),
(8, 14, '2024-06-04', 1),
(9, 15, '2024-06-04', 0),
(10, 16, '2024-06-04', 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `factura_orden_compra`
--

CREATE TABLE `factura_orden_compra` (
  `id` int(11) NOT NULL,
  `id_orden_compra` int(11) DEFAULT NULL,
  `fecha` date DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `factura_orden_compra`
--

INSERT INTO `factura_orden_compra` (`id`, `id_orden_compra`, `fecha`, `estado`) VALUES
(1, 9, '2024-06-04', 1),
(2, 10, '2024-06-04', 1),
(3, 11, '2024-06-04', 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `inventario_proveedor`
--

CREATE TABLE `inventario_proveedor` (
  `id` int(11) NOT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `inventario_proveedor`
--

INSERT INTO `inventario_proveedor` (`id`, `id_proveedor`, `id_producto`, `cantidad`) VALUES
(1, 1, 1, 5000),
(2, 1, 2, 21219),
(3, 1, 3, 21220),
(4, 1, 4, 221213),
(5, 1, 5, 21),
(6, 2, 6, 233),
(7, 1, 7, 213213),
(8, 1, 8, 1),
(9, 2, 9, 221),
(10, 2, 10, 3500);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulos`
--

CREATE TABLE `modulos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modulos`
--

INSERT INTO `modulos` (`id`, `nombre`, `descripcion`) VALUES
(1, 'Cotizaciones', 'es cotirzar'),
(2, 'Ordenes de compra', 'dwadwa');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `modulosempresas`
--

CREATE TABLE `modulosempresas` (
  `id` int(11) NOT NULL,
  `id_modulo` int(11) DEFAULT NULL,
  `id_empresa` int(11) DEFAULT NULL,
  `fecha_fin` varchar(20) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `modulosempresas`
--

INSERT INTO `modulosempresas` (`id`, `id_modulo`, `id_empresa`, `fecha_fin`) VALUES
(1, 1, 1, '15/3/2028'),
(2, 2, 1, '15/7/2024');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_compra`
--

CREATE TABLE `orden_compra` (
  `id` int(11) NOT NULL,
  `fecha` date DEFAULT NULL,
  `id_usuario_emisor` int(11) DEFAULT NULL,
  `estado` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden_compra`
--

INSERT INTO `orden_compra` (`id`, `fecha`, `id_usuario_emisor`, `estado`) VALUES
(1, '2024-06-11', 4, 1),
(7, '2024-06-03', 4, 1),
(8, '2024-06-03', 4, 1),
(9, '2024-06-04', 2, 1),
(10, '2024-06-04', 2, 1),
(11, '2024-06-04', 2, 1);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `orden_compra_productos`
--

CREATE TABLE `orden_compra_productos` (
  `id` int(11) NOT NULL,
  `id_orden_compra` int(11) DEFAULT NULL,
  `id_producto` int(11) DEFAULT NULL,
  `id_proveedor` int(11) DEFAULT NULL,
  `precio_unitario` float DEFAULT NULL,
  `cantidad` int(11) DEFAULT NULL,
  `descuento` float DEFAULT NULL,
  `iva` float DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `orden_compra_productos`
--

INSERT INTO `orden_compra_productos` (`id`, `id_orden_compra`, `id_producto`, `id_proveedor`, `precio_unitario`, `cantidad`, `descuento`, `iva`) VALUES
(1, 1, 1, 1, 5000, 122, 0, 0),
(2, 7, 1, 1, 5000, 12, 0, 0),
(3, 7, 2, 1, 0, 34, 0, 0),
(4, 8, 2, 1, 0, 10, 0, 0),
(5, 8, 3, 1, 0, 1, 0, 19),
(6, 9, 1, 1, 5000, 5000, 0, 0),
(7, 9, 2, 1, 1, 900, 0, 0),
(8, 10, 1, 1, 5000, 1700, 0, 0),
(9, 11, 2, 1, 1, 900, 0, 0);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos`
--

CREATE TABLE `productos` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `descripcion` varchar(200) DEFAULT NULL,
  `codigo` int(11) DEFAULT NULL,
  `precio_unitario` float DEFAULT NULL,
  `stock_actual` int(11) DEFAULT NULL,
  `stock_minimo` int(11) DEFAULT NULL,
  `img` varchar(200) DEFAULT NULL,
  `descuento` float DEFAULT NULL,
  `iva` float DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos`
--

INSERT INTO `productos` (`id`, `nombre`, `descripcion`, `codigo`, `precio_unitario`, `stock_actual`, `stock_minimo`, `img`, `descuento`, `iva`, `estado`) VALUES
(1, 'Producto 1', 'aaaaaaaaaaaaaaa', 2147483647, 5000, 36, 3, '', 0, 0, '0'),
(2, 'sheylita', '', 2147483647, 1, 1, 22, '', 0, 0, '0'),
(3, 'TTTT', '', 2147483647, 23, 5, 12, '', 0, 19, '0'),
(4, 'TTTTT', '', 2147483647, 5000, 221213, 212, '', 0, 19, '0'),
(5, 'GGG', '', 123123, 15000, 21, 2, '', 0, 0, '0'),
(6, 'IMG', '', 2147483647, 0, 233, 4, '', 0, 0, '0'),
(7, 'IMG2', '', 2123123, 0, 213213, 22, 'static\\imgs\\uploads\\784135.jpg', 0, 0, '0'),
(8, 'Sheylita', '', 111111, 0, 1, 1, 'static\\imgs\\uploads\\WIN_20230905_11_49_17_Pro.jpg', 0, 0, '0'),
(9, 'FOTOOO', '', 2312312, 21221, 221, 22, 'static\\imgs\\uploads\\75750b3db794e22aa81d6617e180a6ca.png', 0, 0, '0'),
(10, 'Proveeedor 2222', '', 2147483647, 0, 3500, 60, 'static\\imgs\\uploads\\ca99175308a36e722ce8d3dad485f72c.png', 0, 19, '0');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `productos_alternos`
--

CREATE TABLE `productos_alternos` (
  `id` int(11) NOT NULL,
  `id_producto_principal` int(11) DEFAULT NULL,
  `id_producto_alterno` int(11) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `productos_alternos`
--

INSERT INTO `productos_alternos` (`id`, `id_producto_principal`, `id_producto_alterno`) VALUES
(1, 6, 5);

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `proveedores`
--

CREATE TABLE `proveedores` (
  `id` int(11) NOT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `nit` varchar(50) DEFAULT NULL,
  `correo` varchar(50) DEFAULT NULL,
  `estado` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `proveedores`
--

INSERT INTO `proveedores` (`id`, `nombre`, `nit`, `correo`, `estado`) VALUES
(1, 'Provedor 11', '1242142', 'dwad', 'suspendido'),
(2, 'Provedor 2', '412323', 'wdwad', 'activo'),
(3, 'Provedor 3', '22313', 'dwdwd', 'inactivo');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `roles`
--

CREATE TABLE `roles` (
  `id` int(11) NOT NULL,
  `rol` varchar(50) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `roles`
--

INSERT INTO `roles` (`id`, `rol`) VALUES
(1, 'administrador'),
(2, 'empresa'),
(3, 'vendedor'),
(4, 'cliente');

-- --------------------------------------------------------

--
-- Estructura de tabla para la tabla `usuarios`
--

CREATE TABLE `usuarios` (
  `id` int(11) NOT NULL,
  `rol_id` int(11) DEFAULT NULL,
  `nombre` varchar(50) DEFAULT NULL,
  `apellidos` varchar(50) DEFAULT NULL,
  `usuario` varchar(50) DEFAULT NULL,
  `contraseña` varchar(50) DEFAULT NULL,
  `cedula` varchar(50) DEFAULT NULL,
  `direccion` varchar(100) DEFAULT NULL,
  `telefono` varchar(15) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_general_ci;

--
-- Volcado de datos para la tabla `usuarios`
--

INSERT INTO `usuarios` (`id`, `rol_id`, `nombre`, `apellidos`, `usuario`, `contraseña`, `cedula`, `direccion`, `telefono`) VALUES
(1, 1, 'admin', 'admin', 'admin', 'admin', '214142', 'admin', '321432'),
(2, 2, 'empresa', 'empresa', 'empresa', 'empresa', '21421421', 'empresa', '214214'),
(3, 4, 'cliente', 'cliente', 'cliente', 'cliente', '124124', 'cliente', '21421'),
(4, 3, 'vendedor', 'vendedor', 'vendedor', 'vendedor', '12345', 'vendedor', '33333'),
(5, 3, 'Shey', 'sjeu', 'shey', 'shey', '1231232', 'dwadwad', '132132'),
(6, 4, 'Cliente pollit', '', 'clientep', 'clientep', '2132132', 'dwadwad', '213213');

--
-- Índices para tablas volcadas
--

--
-- Indices de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_vendedor` (`id_vendedor`),
  ADD KEY `id_cliente` (`id_cliente`);

--
-- Indices de la tabla `cotizacion_productos`
--
ALTER TABLE `cotizacion_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cotizacion` (`id_cotizacion`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `empresas`
--
ALTER TABLE `empresas`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `factura_cotizacion`
--
ALTER TABLE `factura_cotizacion`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_cotizacion` (`id_cotizacion`);

--
-- Indices de la tabla `factura_orden_compra`
--
ALTER TABLE `factura_orden_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_orden_compra` (`id_orden_compra`);

--
-- Indices de la tabla `inventario_proveedor`
--
ALTER TABLE `inventario_proveedor`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_proveedor` (`id_proveedor`),
  ADD KEY `id_producto` (`id_producto`);

--
-- Indices de la tabla `modulos`
--
ALTER TABLE `modulos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `modulosempresas`
--
ALTER TABLE `modulosempresas`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_modulo` (`id_modulo`),
  ADD KEY `id_empresa` (`id_empresa`);

--
-- Indices de la tabla `orden_compra`
--
ALTER TABLE `orden_compra`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_usuario_emisor` (`id_usuario_emisor`);

--
-- Indices de la tabla `orden_compra_productos`
--
ALTER TABLE `orden_compra_productos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_orden_compra` (`id_orden_compra`),
  ADD KEY `id_producto` (`id_producto`),
  ADD KEY `id_proveedor` (`id_proveedor`);

--
-- Indices de la tabla `productos`
--
ALTER TABLE `productos`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `productos_alternos`
--
ALTER TABLE `productos_alternos`
  ADD PRIMARY KEY (`id`),
  ADD KEY `id_producto_principal` (`id_producto_principal`),
  ADD KEY `id_producto_alterno` (`id_producto_alterno`);

--
-- Indices de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `roles`
--
ALTER TABLE `roles`
  ADD PRIMARY KEY (`id`);

--
-- Indices de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD PRIMARY KEY (`id`),
  ADD KEY `rol_id` (`rol_id`);

--
-- AUTO_INCREMENT de las tablas volcadas
--

--
-- AUTO_INCREMENT de la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=17;

--
-- AUTO_INCREMENT de la tabla `cotizacion_productos`
--
ALTER TABLE `cotizacion_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=19;

--
-- AUTO_INCREMENT de la tabla `empresas`
--
ALTER TABLE `empresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `factura_cotizacion`
--
ALTER TABLE `factura_cotizacion`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `factura_orden_compra`
--
ALTER TABLE `factura_orden_compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `inventario_proveedor`
--
ALTER TABLE `inventario_proveedor`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=16;

--
-- AUTO_INCREMENT de la tabla `modulos`
--
ALTER TABLE `modulos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `modulosempresas`
--
ALTER TABLE `modulosempresas`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=3;

--
-- AUTO_INCREMENT de la tabla `orden_compra`
--
ALTER TABLE `orden_compra`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=12;

--
-- AUTO_INCREMENT de la tabla `orden_compra_productos`
--
ALTER TABLE `orden_compra_productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=10;

--
-- AUTO_INCREMENT de la tabla `productos`
--
ALTER TABLE `productos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=11;

--
-- AUTO_INCREMENT de la tabla `productos_alternos`
--
ALTER TABLE `productos_alternos`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=2;

--
-- AUTO_INCREMENT de la tabla `proveedores`
--
ALTER TABLE `proveedores`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=4;

--
-- AUTO_INCREMENT de la tabla `roles`
--
ALTER TABLE `roles`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=5;

--
-- AUTO_INCREMENT de la tabla `usuarios`
--
ALTER TABLE `usuarios`
  MODIFY `id` int(11) NOT NULL AUTO_INCREMENT, AUTO_INCREMENT=7;

--
-- Restricciones para tablas volcadas
--

--
-- Filtros para la tabla `cotizaciones`
--
ALTER TABLE `cotizaciones`
  ADD CONSTRAINT `cotizaciones_ibfk_1` FOREIGN KEY (`id_vendedor`) REFERENCES `usuarios` (`id`),
  ADD CONSTRAINT `cotizaciones_ibfk_2` FOREIGN KEY (`id_cliente`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `cotizacion_productos`
--
ALTER TABLE `cotizacion_productos`
  ADD CONSTRAINT `cotizacion_productos_ibfk_1` FOREIGN KEY (`id_cotizacion`) REFERENCES `cotizaciones` (`id`),
  ADD CONSTRAINT `cotizacion_productos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `cotizacion_productos_ibfk_3` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`);

--
-- Filtros para la tabla `factura_cotizacion`
--
ALTER TABLE `factura_cotizacion`
  ADD CONSTRAINT `factura_cotizacion_ibfk_1` FOREIGN KEY (`id_cotizacion`) REFERENCES `cotizaciones` (`id`);

--
-- Filtros para la tabla `factura_orden_compra`
--
ALTER TABLE `factura_orden_compra`
  ADD CONSTRAINT `factura_orden_compra_ibfk_1` FOREIGN KEY (`id_orden_compra`) REFERENCES `orden_compra` (`id`);

--
-- Filtros para la tabla `inventario_proveedor`
--
ALTER TABLE `inventario_proveedor`
  ADD CONSTRAINT `inventario_proveedor_ibfk_1` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`),
  ADD CONSTRAINT `inventario_proveedor_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `modulosempresas`
--
ALTER TABLE `modulosempresas`
  ADD CONSTRAINT `modulosempresas_ibfk_1` FOREIGN KEY (`id_modulo`) REFERENCES `modulos` (`id`),
  ADD CONSTRAINT `modulosempresas_ibfk_2` FOREIGN KEY (`id_empresa`) REFERENCES `empresas` (`id`);

--
-- Filtros para la tabla `orden_compra`
--
ALTER TABLE `orden_compra`
  ADD CONSTRAINT `orden_compra_ibfk_1` FOREIGN KEY (`id_usuario_emisor`) REFERENCES `usuarios` (`id`);

--
-- Filtros para la tabla `orden_compra_productos`
--
ALTER TABLE `orden_compra_productos`
  ADD CONSTRAINT `orden_compra_productos_ibfk_1` FOREIGN KEY (`id_orden_compra`) REFERENCES `orden_compra` (`id`),
  ADD CONSTRAINT `orden_compra_productos_ibfk_2` FOREIGN KEY (`id_producto`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `orden_compra_productos_ibfk_3` FOREIGN KEY (`id_proveedor`) REFERENCES `proveedores` (`id`);

--
-- Filtros para la tabla `productos_alternos`
--
ALTER TABLE `productos_alternos`
  ADD CONSTRAINT `productos_alternos_ibfk_1` FOREIGN KEY (`id_producto_principal`) REFERENCES `productos` (`id`),
  ADD CONSTRAINT `productos_alternos_ibfk_2` FOREIGN KEY (`id_producto_alterno`) REFERENCES `productos` (`id`);

--
-- Filtros para la tabla `usuarios`
--
ALTER TABLE `usuarios`
  ADD CONSTRAINT `usuarios_ibfk_1` FOREIGN KEY (`rol_id`) REFERENCES `roles` (`id`);
COMMIT;

/*!40101 SET CHARACTER_SET_CLIENT=@OLD_CHARACTER_SET_CLIENT */;
/*!40101 SET CHARACTER_SET_RESULTS=@OLD_CHARACTER_SET_RESULTS */;
/*!40101 SET COLLATION_CONNECTION=@OLD_COLLATION_CONNECTION */;
