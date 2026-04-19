# 🌮 Restaurante Mexicano - App de Pedidos

Aplicación móvil para restaurant mexicano desarrollada en React Native con Expo.

## 📱 Características

- **Sistema de pedidos** con 10 comidas y 5 bebidas mexicanas
- **Carrito de compras** con cantidad seleccionable
- **Seguimiento de pedido** en tiempo real con animación
- **Historial de compras** por usuario
- **Ofertas especiales** con precios dinámicos
- **3 roles de usuario**: Admin, Cliente, Cocina

## 🛠️ Tecnologías

- React Native (Expo)
- AsyncStorage (persistencia local)
- React Navigation Stack

## 👥 Usuarios

| Usuario | Contraseña | Rol |
|--------|----------|-----|
| admin | 123456 | Admin (puede ver todos los pedidos) |
| cliente | cliente123 | Cliente (solo sus pedidos) |
| cocina | cocina123 | Cocina (gestiona pedidos) |

## 📋 Pantallas

1. **Login** - Autenticación con validaciones
2. **Menú Principal** - Opciones de navegación
3. **Seleccionar Comida** - 10 foods + 5 drinks con precios
4. **Resumen del Pedido** - Carrito y total
5. **Seguimiento** - Estado del pedido en tiempo real
6. **Historial** - Pedidos anteriores
7. **Ofertas** - Promociones del día

## 💰 Precios del Menú

### Comidas
| Plato | Precio |
|-------|--------|
| Tacos de Carne | $55 |
| Burrito Grande | $75 |
| Enchiladas Verdes | $85 |
| Quesadillas | $50 |
| Tamales | $45 |
| Gorditas | $48 |
| Chiles Rellenos | $90 |
| Pozole | $70 |
| Mole Poblano | $95 |
| Chilaquiles | $60 |

### Bebidas
| Bebida | Precio |
|-------|--------|
| Horchata | $30 |
| Jamaica | $25 |
| Atole | $28 |
| Agua de Tamarindo | $25 |
| Cerveza Nacional | $45 |

## 🚀 Ejecutar

```bash
# Instalar dependencias
npm install

# Iniciar desarrollo
npm start

# Ejecutar en Android
npm run android
```

## 📂 Estructura

```
src/
├── components/
│   ├── screens/
│   │   ├── context/      # AuthContext
│   │   ├── data/       # productsData
│   │   └── navigation/
│   ├── FoodCard.js
│   ├── DrinkCard.js
│   └── Header.js
└── App.js
```

## 📝 Notas

- Auto-refresh cada 10 segundos para clientes en seguimiento
- Admin/Cocina pueden cambiar estado del pedido
- Los precios de ofertas se calculan automáticamente desde MENU_PRICES

## 📄 Licencia

MIT