# 🧥 SAAJ — Linen Clothing E-Commerce Website

SAAJ is a fully functional **frontend e-commerce website** focused on premium linen clothing.  
The project is built using **vanilla HTML, CSS, and JavaScript**, with a strong emphasis on **clean UI, real user flows, and scalable architecture**.

This project demonstrates how a real-world shopping experience works — from browsing products to placing an order — without relying on heavy frameworks.

---

## ✨ Features

- 🏠 **Home Page**
  - Featured linen products
  - Dynamic product rendering
  - Clean, minimal, premium design

- 🛍️ **Products Page**
  - All products loaded dynamically from a single data source
  - Product images, names, and prices

- 📄 **Product Detail Page (PDP)**
  - URL-based routing (`product.html?id=1`)
  - Individual product view
  - Add to Cart functionality

- 🛒 **Cart System**
  - Add / remove products
  - Increase / decrease quantity
  - Persistent cart using `localStorage`
  - Cart remains after page refresh

- 🔐 **Login (Mock Authentication)**
  - Frontend-only login flow
  - Login state stored in `localStorage`
  - Navbar updates based on login state

- 📦 **Checkout Flow**
  - Mandatory delivery details (Name, Address, Pincode)
  - Cart validation before order placement
  - Redirects to order success page

- ✅ **Order Success Page**
  - Order confirmation
  - Cart cleared after successful order

---

## 🖼️ Screenshots

Screenshots of the application can be found in the `/screenshots` folder:

- Home Page
- Products Page
- Product Detail Page
- Cart Page
- Checkout Page
- Order Success Page

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Custom design system, no frameworks)
- **JavaScript (ES6+)**
- **Browser LocalStorage** (for cart & auth state)

No external libraries or frameworks were used.

---

## 🚀 How to Run the Project

> ⚠️ This project must be run on a local server (not via `file://`).

### Option 1: VS Code Live Server (Recommended)

1. Install **Live Server** extension in VS Code
2. Right-click on `index.html`
3. Click **“Open with Live Server”**

### Option 2: Using Python

```bash
cd your-project-folder
python -m http.server 5500