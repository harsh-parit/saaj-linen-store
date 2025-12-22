# 🧥 SAAJ — Premium Linen Clothing E-Commerce Website

**SAAJ** is a fully functional **frontend e-commerce website** built for a premium linen clothing brand.  
The project focuses on **clean UI, real shopping workflows, and scalable structure**, using only **vanilla HTML, CSS, and JavaScript** — no frameworks.

This project simulates a **real-world online shopping experience**, from browsing products to placing an order, while maintaining a minimal and elegant design inspired by modern DTC fashion brands.

---

## ✨ Key Features

### 🏠 Home Page
- Premium hero section with brand messaging  
- Featured linen products rendered dynamically  
- Minimal, clean, and modern layout  

### 🛍️ Products Page
- All products loaded dynamically from a single data source  
- Consistent product cards with images, names, and prices  

### 📄 Product Detail Page (PDP)
- URL-based routing (`product.html?id=1`)  
- Individual product view with image, price, and details  
- Size selection dropdown  
- Add to Cart functionality  

### 🛒 Cart System
- Add and remove products  
- Increase or decrease product quantity  
- Cart data persists using **LocalStorage**  
- Cart remains intact even after page refresh  

### 🔐 Login (Mock Authentication)
- Frontend-only login simulation  
- Login state stored in LocalStorage  
- Navbar updates automatically based on login status  

### 📦 Checkout Flow
- Mandatory delivery details (Name, Address, Pincode)  
- Form validation before order placement  
- Clean checkout layout with order summary  

### ✅ Order Success Page
- Order confirmation message  
- Cart automatically cleared after successful order  

---

## 🖼️ Screenshots

Screenshots of the project are available in the `/screenshots` folder:

- Home Page  
- Products Page  
- Product Detail Page  
- Cart Page  
- Checkout Page  
- Order Success Page  

---

## 🛠️ Tech Stack

- **HTML5** — Semantic markup  
- **CSS3** — Custom design system, responsive layout  
- **JavaScript (ES6+)** — DOM manipulation, routing logic  
- **Browser LocalStorage** — Cart and login state persistence  

> 🚫 No frameworks or external UI libraries were used.

---

## 🚀 How to Run the Project Locally

> ⚠️ This project must be run on a local server (not via `file://`).

### Option 1: VS Code Live Server (Recommended)

1. Install the **Live Server** extension in VS Code  
2. Right-click on `index.html`  
3. Select **“Open with Live Server”**

### Option 2: Using Python

```bash
cd your-project-folder
python -m http.server 5500
