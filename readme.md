<div align="center">
  <h1>🌍 Cultural Heritage Website</h1>
  <p>An interactive platform designed to document, preserve, and present cultural heritage, historical timelines, traditions, and untold stories.</p>

  <!-- Badges -->
  <p>
    <img src="https://img.shields.io/badge/React-19.0.0-blue?style=for-the-badge&logo=react" alt="React" />
    <img src="https://img.shields.io/badge/Node.js-Backend-green?style=for-the-badge&logo=node.js" alt="Node.js" />
    <img src="https://img.shields.io/badge/MongoDB-Database-47A248?style=for-the-badge&logo=mongodb" alt="MongoDB" />
    <img src="https://img.shields.io/badge/Express.js-Framework-white?style=for-the-badge&logo=express" alt="Express.js" />
    <img src="https://img.shields.io/badge/TailwindCSS-Styling-38B2AC?style=for-the-badge&logo=tailwind-css" alt="Tailwind CSS" />
  </p>
</div>

<hr />

## 📖 Overview

The **Cultural Heritage Website** is a full-stack web application designed to promote awareness and appreciation of cultural diversity. It provides users with an engaging, interactive digital experience to explore historical artifacts, cultural sites, timelines, and community-submitted stories. The system also includes an administration portal for managing content, approving public submissions, and maintaining heritage records.

---

## ✨ Key Features

- 🗺️ **Interactive Cultural Map**: Explore heritage sites geographically using `react-leaflet`.
- ⏳ **Historical Timeline**: Navigate through historical eras and events seamlessly.
- 📖 **User Stories & Community Contributions**: Users can submit their own cultural stories and experiences for administrative review.
- 🔐 **Secure Authentication**: Robust user registration and login system protected by JWT and bcrypt.
- 🖼️ **Media Management**: Effortless image uploads with automatic Cloudinary integration.
- 📱 **Fully Responsive UI**: Modern, sleek interface built with Tailwind CSS and enhanced with Framer Motion animations.
- 🛡️ **Admin Dashboard**: Comprehensive CMS capabilities for admins to manage heritage sites, timelines, and pending user stories.
- 🔲 **QR Code Integration**: Generates QR codes for quick mobile access to heritage site details.

---

## 🛠️ Technology Stack

### **Frontend (cultural-frontend)**
- **Framework**: React 19 (via Vite)
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Maps**: Leaflet & React-Leaflet
- **HTTP Client**: Axios
- **Icons**: Lucide React
- **Routing**: React Router DOM

### **Backend (cultural-backend)**
- **Runtime Environment**: Node.js
- **Web Framework**: Express.js
- **Database**: MongoDB (Mongoose ORM)
- **Authentication**: JSON Web Tokens (JWT) & Bcrypt.js
- **File Uploads**: Multer & Cloudinary
- **Utilities**: QRCode generator, CORS, Cookie-Parser

---

## 📂 Project Structure

```text
Cultural_Website/
├── cultural-frontend/       # Client-side React application
│   ├── src/
│   │   ├── api/             # Axios API utility functions
│   │   ├── components/      # Reusable UI components
│   │   ├── pages/           # Main application views (Home, MapPage, Admin Dashboard)
│   │   ├── context/         # React Context API for global state
│   │   ├── hooks/           # Custom React hooks
│   │   ├── assets/          # Static images and icons
│   │   └── data/            # Local data resources
│   └── vite.config.js       # Vite configuration
│
├── cultural-backend/        # Server-side Node/Express application
│   ├── src/
│   │   ├── config/          # Database and external service configurations
│   │   ├── controllers/     # Route logic and request handlers
│   │   ├── middleware/      # Protected routes, error handling, file parsing
│   │   ├── models/          # Mongoose database schemas
│   │   ├── routes/          # Express route definitions (API endpoints)
│   │   └── server.js        # Main application entry point
│   └── package.json         # Backend dependencies
│
└── README.md                # Project documentation
```

---

## 🚀 Getting Started

Follow these instructions to set up the project locally for development and testing.

### Prerequisites
- **Node.js** (v18.0.0 or higher recommended)
- **npm** or **yarn**
- **MongoDB** (Local instance or MongoDB Atlas cluster)
- **Cloudinary Account** (For image uploads)

### Installation

1. **Clone the repository:**
   ```bash
   git clone https://github.com/GaneshRagolu001/Cultural_Website.git
   cd Cultural_Website
   ```

2. **Setup the Backend:**
   ```bash
   cd cultural-backend
   npm install
   ```

   Create a `.env` file in the `cultural-backend` root directory and add the following essential variables:
   ```env
   PORT=5000
   MONGO_URI=your_mongodb_connection_string
   JWT_SECRET=your_super_secret_jwt_key
   CLOUDINARY_CLOUD_NAME=your_cloudinary_name
   CLOUDINARY_API_KEY=your_cloudinary_api_key
   CLOUDINARY_API_SECRET=your_cloudinary_api_secret
   ```

3. **Setup the Frontend:**
   ```bash
   cd ../cultural-frontend
   npm install
   ```

   Create a `.env` file in the `cultural-frontend` root directory and add:
   ```env
   VITE_API_BASE_URL=http://localhost:5000/api
   ```

---

## 🏃‍♂️ Running the Application locally

To start the application, you'll need to spin up both the backend server and the frontend client.

**1. Start the Backend server (Development Mode)**
```bash
cd cultural-backend
npm run dev
```
*The backend should now be listening on `http://localhost:5000`.*

**2. Start the Frontend client**
Open a new terminal window / tab:
```bash
cd cultural-frontend
npm run dev
```
*The React app should now be running at `http://localhost:5173`.*

---

## 🛡️ Tech Stack

| Layer    | Technology                              |
| -------- | --------------------------------------- |
| Frontend | React / JavaScript                      |
| Backend  | Node.js / Express (or your chosen tech) |
| Database | (your database here)                    |
| Styling  | CSS / Tailwind / Bootstrap              |

> Update this section to match your actual stack.

---

## 🤝 Contributing

Contributions are always welcome! Whether you are fixing a bug, adding a new feature, or improving documentation, feel free to dive in.

1. **Fork** the repository
2. **Create a branch**: `git checkout -b feature/AmazingFeature`
3. **Commit your changes**: `git commit -m 'Add some AmazingFeature'`
4. **Push to the branch**: `git push origin feature/AmazingFeature`
5. **Open a Pull Request** describing the changes made.

---

## 📄 License

This project is open source and available under the **MIT License**.
(Replace with your chosen license if different.)

---

## 📬 Contact

If you have questions, you can reach out:

**GitHub:** [https://github.com/GaneshRagolu001/Cultural_Website](https://github.com/GaneshRagolu001/Cultural_Website)

---

```

::contentReference[oaicite:2]{index=2}
```

[1]: https://github.com/GaneshRagolu001/Cultural_Website/tree/main "GitHub - GaneshRagolu001/Cultural_Website: An interactive cultural website designed to document and present heritage, traditions, festivals, and historical narratives, promoting awareness and appreciation of cultural diversity."
