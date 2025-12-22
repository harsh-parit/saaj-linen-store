# 🧥 SAAJ — Premium Linen Clothing E-Commerce Website

**SAAJ** is a production-ready **frontend e-commerce website** built for a premium linen clothing brand.  
The project focuses on **clean UI/UX, real user flows, and scalable frontend architecture**, closely simulating how modern e-commerce platforms work.

It is built using **vanilla HTML, CSS, and JavaScript** — no frameworks — to demonstrate strong core frontend fundamentals.

---

## 🚀 Live Demo

👉 **Live Website:**  
https://saaj-store.vercel.app/

*(Hosted on Vercel — fast, stable, and free)*

---

## ✨ Key Features

### 🏠 Home Page
- Premium linen-inspired design
- Featured products loaded dynamically
- Clean typography and spacing
- Fully responsive layout

### 🛍️ Products Page
- All products rendered dynamically
- Product image, name, and price
- Click to view detailed product page

### 📄 Product Detail Page (PDP)
- URL-based routing (`product.html?id=1`)
- Product image, description, and price
- Add-to-cart functionality

### 🛒 Cart System
- Add / remove products
- Increase / decrease quantity
- Real-time price calculation
- Persistent cart using `localStorage`
- Premium cart UI with order summary

### 🔐 Authentication (Frontend)
- Login & Signup pages
- Isolated CSS (no global conflicts)
- Prevent login/signup when already logged in
- Login required for cart & checkout
- Redirect back after login (real-world UX)

### 💳 Checkout Flow
- Login-protected checkout
- Mandatory delivery details validation
- Order summary breakdown
- Prevent checkout with empty cart

### ✅ Order Success
- Order confirmation page
- Cart cleared after successful order

---

## 🎨 UI / UX Highlights

- Linen-inspired neutral color palette
- Premium spacing & typography
- Sticky footer on all pages
- Fully responsive (desktop, tablet, mobile)
- Clean separation of concerns (layout, logic, state)

---

## 🛠️ Tech Stack

- **HTML5**
- **CSS3** (Custom design system, no frameworks)
- **JavaScript (ES6+)**
- **Browser LocalStorage** (Auth & cart state)
- **Vercel** (Deployment)
- **GitHub Releases** (Versioning)

---

## 🧱 Project Architecture

graph TD
    A[User] --> B[Browser / HTML]
    B --> C[JS Modules]
    C --> D{LocalStorage}
    D -->|Auth/Cart State| C
    C --> E[DOM Rendering]
    E --> Bsubgraph "Logic Layer" C1[login.js] --- C2[signup.js] C3[cart.js] --- C4[checkout.js] end

/css
  ├─ style.css        (Storefront styles)
  ├─ login.css        (Login page – isolated)
  └─ signup.css       (Signup page – isolated)

/js
  ├─ products.js
  ├─ product.js
  ├─ cart.js
  ├─ checkout.js
  ├─ navbar.js
  ├─ login.js
  └─ signup.js

/pages
  ├─ index.html
  ├─ products.html
  ├─ product.html
  ├─ cart.html
  ├─ checkout.html
  ├─ login.html
  ├─ signup.html
  └─ success.html

---

## 🖼️ Screenshots

Screenshots of the application are available in the `/screenshots` folder:

## 🖼️ Screenshots

### 🏠 Home Page
![Home Page](screenshots/home.jpeg)

### 🛍️ Products Page
![Products Page](screenshots/products.jpeg)

### 📄 Product Detail Page
![Product Detail Page](screenshots/PDP-Product-Detail-Page.jpeg)

### 🛒 Cart Page
![Cart Page](screenshots/Cart.jpeg)

### 💳 Checkout Page
![Checkout Page](screenshots/Checkout Page.jpeg)

### 🔐 Login Page
![Login Page](screenshots/login.jpeg)

### 📝 Signup Page
![Signup Page](screenshots/signup.jpeg)

---

## ⚙️ How to Run Locally

> ⚠️ Use a local server (not `file://`)

### Option 1: VS Code Live Server (Recommended)
1. Install **Live Server** extension
2. Right-click `index.html`
3. Click **Open with Live Server**

### Option 2: Using Python
```bash
cd project-folder
python -m http.server 5500
http://localhost:5500  

---

👤 Author
Harsh Parit
Frontend Developer | Full Stack Developer
📧 Email: harshparit@gmail.com
🔗 GitHub: https://github.com/harsh-parit
🔗 LinkedIn: https://www.linkedin.com/in/harsh-parit/