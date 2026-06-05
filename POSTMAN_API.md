# Backend Shoe API - Postman Copy Guide

## Base URL

```text
http://localhost:3000/api
```

## Common Headers

```text
Content-Type: application/json
```

For protected endpoints, login first so Postman keeps the `token` and `refreshToken` cookies.

## 1) Users

### Register

```http
POST /api/users/register
```

```json
{
  "email": "user@shoe.local",
  "password": "123456",
  "name": "Nguyen Van A"
}
```

### Login

```http
POST /api/users/login
```

```json
{
  "email": "user@shoe.local",
  "password": "123456"
}
```

### Refresh Token

```http
POST /api/users/refresh-token
```

No body.

### Get Profile

```http
GET /api/users/profile
```

Requires auth cookie.

### Update Profile

```http
PUT /api/users/profile
```

```json
{
  "name": "Updated Name",
  "email": "newemail@shoe.local"
}
```

### Logout

```http
POST /api/users/logout
```

No body.

## 2) Addresses

### Create Address

```http
POST /api/addresses/users/:userId/addresses
```

Example:

```http
POST /api/addresses/users/2/addresses
```

```json
{
  "street": "123 Le Loi",
  "city": "Ho Chi Minh",
  "state": "",
  "postal_code": "700000",
  "country": "Vietnam",
  "is_default": true
}
```

### Get Addresses By User

```http
GET /api/addresses/users/:userId/addresses
```

Example:

```http
GET /api/addresses/users/2/addresses
```

## 3) Brands

### Create Brand

```http
POST /api/brands
```

Use `form-data` in Postman.

| Key | Type | Value |
| --- | --- | --- |
| name | text | Nike |
| description | text | Thuong hieu giay the thao |
| image | file | choose an image file |

### Get All Brands

```http
GET /api/brands
```

### Get Brand By Id

```http
GET /api/brands/:id
```

Example:

```http
GET /api/brands/1
```

## 4) Colors

### Create Color

```http
POST /api/colors
```

```json
{
  "name": "Black"
}
```

### Get All Colors

```http
GET /api/colors
```

## 5) Sizes

### Create Size

```http
POST /api/sizes
```

```json
{
  "size_value": 38,
  "size_system": "EU",
  "description": "EU 38"
}
```

### Get All Sizes

```http
GET /api/sizes
```

## 6) SKUs

### Create SKU

```http
POST /api/skus
```

```json
{
  "code": "SKU-NIKE-001"
}
```

### Get All SKUs

```http
GET /api/skus
```

## 7) Products

### Get All Products

```http
GET /api/products
```

### Get Product By Id

```http
GET /api/products/:id
```

Example:

```http
GET /api/products/1
```

### Get Paginated Products

```http
GET /api/products/getPaginatedProducts?page=1&size=10
```

### Create Product

```http
POST /api/products
```

Requires admin auth cookie.

```json
{
  "name": "Nike Air Max",
  "brand_id": 1,
  "description": "Giay chay bo",
  "base_price": 2500000,
  "stock": 100
}
```

## 8) Product Variants

### Create Variant

```http
POST /api/product-variants
```

Use `form-data` in Postman.

| Key | Type | Value |
| --- | --- | --- |
| product_id | text | 1 |
| size_id | text | 1 |
| color_id | text | 1 |
| sku_id | text | 1 |
| price | text | 2550000 |
| stock_quantity | text | 20 |
| image | file | choose an image file |

### Get Variants By Product Id

```http
GET /api/product-variants/:productId
```

Example:

```http
GET /api/product-variants/1
```

## 9) Shopping Session

### Get Or Create Session

```http
GET /api/shopping-session
```

### Get Current Session

```http
GET /api/shopping-session/current
```

## 10) Cart Items

### Add To Cart

```http
POST /api/cart-items
```

This endpoint uses the `token` cookie to find the session.

```json
{
  "variant_id": 1,
  "quantity": 2
}
```

### Get Cart Items

```http
GET /api/cart-items
```

## 11) Orders

### Create Order

```http
POST /api/orders
```

```json
{
  "userId": 2,
  "address_id": 1,
  "cart_items": [
    {
      "productId": 1,
      "quantity": 2,
      "price": 2550000
    },
    {
      "productId": 2,
      "quantity": 1,
      "price": 2550000
    }
  ]
}
```

### Get Order By Id

```http
GET /api/orders/:id
```

Example:

```http
GET /api/orders/1
```

## 12) Order Items

### Create Order Item

```http
POST /api/order-items
```

```json
{
  "order_id": 1,
  "variant_id": 1,
  "quantity": 2,
  "price_at_purchase": 2550000
}
```

## 13) Payments

### Create VNPay Payment

```http
POST /api/payments/create-payment
```

Requires auth cookie.

```json
{
  "orderId": 1,
  "amount": 7650000,
  "orderInfo": "Thanh toan don hang 1"
}
```

### Payment Result

```http
GET /api/payments/payment-result?vnp_ResponseCode=00&vnp_TxnRef=1&vnp_SecureHash=YOUR_HASH
```

This endpoint is normally called by VNPay callback.

## 14) Inventory

Luu y: route nay dang bi comment trong `src/routes/index.ts`, nen hien tai chua duoc mount vao `/api`.

### Stock In

```http
POST /api/inventory/stockin
```

```json
{
  "product_id": 1,
  "quantity": 50,
  "supplier": "Supplier Nike VN"
}
```

### Stock Out

```http
POST /api/inventory/stockout
```

```json
{
  "product_id": 1,
  "quantity": 5,
  "reason": "Damaged box"
}
```

### Get Stock

```http
GET /api/inventory/inventory/:product_id
```

Example:

```http
GET /api/inventory/inventory/1
```

### Checkout

```http
POST /api/inventory/checkout
```

```json
{
  "product_id": 1,
  "quantity": 2
}
```

## 15) Quick Postman Flow

1. Register user.
2. Login to receive cookies.
3. Create brand, color, size, SKU.
4. Create product.
5. Create variant.
6. Create or read shopping session.
7. Add item to cart.
8. Create address.
9. Create order.
10. Create payment.

## Notes

- `POST /api/products` requires admin auth.
- `POST /api/cart-items` and session endpoints depend on the `token` cookie.
- `POST /api/brands` and `POST /api/product-variants` expect `multipart/form-data` because they use Multer.
- `src/routes/skuRoutes.ts` currently points to `colorController`, so `/api/skus` behaves like the color endpoints until that route is fixed.