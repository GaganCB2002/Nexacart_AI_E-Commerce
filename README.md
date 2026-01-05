# NexaCart - Premium E-Commerce Platform

NexaCart is a state-of-the-art e-commerce application designed with a "Wow" factor. It combines a stunning, glassmorphism-inspired UI with a robust Java Spring Boot backend and MySQL persistence.

## 🚀 Key Features

*   **Premium UI/UX**: Dynamic hero section with parallax effects and smooth Framer Motion animations.
*   **Intelligent Navigation**: Transparent-to-frosted glass navbar and a responsive, slide-in sidebar.
*   **Global Dark Mode**: Fully adaptive theme switching with persistent user preference.
*   **Advanced Filtering**: Unified sidebar for filtering by category, price, and sorting.
*   **Interactive Data Visualization**: Real-time product price history lines, rating distribution bars, and sentiment analysis pie charts.
*   **Secure User Management**: MySQL-backed user authentication and profile management.

  🧠 AI-Powered “Identify Product” Feature ⭐ (NEW CORE FUNCTION)

Add this as a new section after “🔄 Project Workflow & Architecture”

Feature Overview

NexaCart introduces an AI-driven “Identify Product” feature that transforms user intent into instant, actionable product recommendations.

Instead of manually browsing categories and filters, users can simply describe what they want and how much they want to spend. The AI handles the rest.

🧑‍💻 User Interaction Flow

User clicks the “Identify Product” button on the UI

The system prompts the user with two simple questions:

What type of product are you looking for?

What is your preferred price range?

The user responds in natural language, for example:

“I need a washing machine between ₹30,000 and ₹40,000.”

The AI processes the request and returns 20–30 well-matched product suggestions.

Results are displayed in a structured, easy-to-compare format in the UI.

🎯 Recommendation Logic & Criteria

The AI strictly follows these rules while generating results:

All products must fall within the user-defined price range

Recommendations include 20–30 products only

Ensure brand and model diversity

Prefer value-for-money products

Avoid duplicate or irrelevant items

Focus on commonly available products in the target market

Keep suggestions realistic, balanced, and user-centric

📦 Example Output (User View)
Recommended Washing Machines (₹30,000–₹40,000)

1. LG 8kg Front Load Washing Machine – ₹38,999
   - Inverter Direct Drive
   - 5-Star Energy Rating
   - Ideal for medium-sized families

2. Samsung 7.5kg EcoBubble Front Load – ₹36,490
   - EcoBubble Technology
   - Smart Control Support
   - Low water consumption

... (continues up to 20–30 products)

🤖 AI Prompt Used (For Implementation & Documentation)

Add this exact prompt to your README to highlight AI integration maturity.

You are an intelligent shopping assistant integrated into an e-commerce platform.

When the user clicks the “Identify Product” button, ask the following:
1. What type of product are you looking for?
2. What is your preferred price range?

The user may respond in natural language (example: 
“I need a washing machine between ₹30,000 and ₹40,000”).

Your task:
- Generate a list of 20 to 30 product recommendations.
- All products must strictly fall within the user’s given price range.
- Ensure diversity in brands and models.
- Avoid duplicate products.
- Prioritize value for money, popularity, and practical features.
- Assume products are commonly available in the local market.

For each product, provide:
- Product Name
- Brand
- Approximate Price
- 2–3 key highlights
- Short “Ideal For” description

Return results in a clean, structured format suitable for frontend display.

🌟 Why This Feature Matters

🚀 Reduces product discovery time

🎯 Converts vague intent into precise results

💬 Uses natural language instead of complex filters

🧠 Demonstrates real-world AI integration

🛍️ Enhances conversion and user satisfaction

## 🏗 Detailed Tech Stack

### Frontend (Client-Side)
*   **Core Framework**: React 18 with Vite for lightning-fast build and HMR.
*   **Styling**: Tailwind CSS for a utility-first, responsive design system.
*   **Animations**: Framer Motion for complex clean transitions (Hero, Page load).
*   **Navigation**: React Router DOM v6 for client-side routing.
*   **Visualization**: Recharts for responsive, composable charts.
*   **HTTP Client**: Axios for communicating with the Spring Boot backend.
*   **Icons**: Lucide React for consistent SVG iconography.

### Backend (Server-Side)
*   **Framework**: Spring Boot 3 with Spring Web.
*   **ORM**: Spring Data JPA (Hibernate) for object-relational mapping.
*   **Database**: MySQL 8.0 for robust, persistent relational data storage.
*   **Security**: Spring Security for authentication flow foundations.
*   **Utilities**: Lombok to reduce boilerplate code.

### Tools & DevOps
*   **Build Tool**: Maven
*   **Version Control**: Git

## 📂 Project Structure

```
nexa-cart/
├── frontend/                  # React + Vite Frontend
│   ├── public/                # Static assets
│   ├── src/
│   │   ├── components/        # Reusable UI Components
│   │   │   ├── ModernHero.jsx
│   │   │   ├── Navbar.jsx
│   │   │   ├── FilterSidebar.jsx
│   │   │   └── ...
│   │   ├── pages/             # Page Views
│   │   │   ├── Home.jsx
│   │   │   ├── ProductDetails.jsx
│   │   │   └── Profile.jsx
│   │   ├── hooks/             # Custom React Hooks
│   │   ├── context/           # Global State (Theme, Cart)
│   │   ├── App.jsx            # Main App Component
│   │   └── main.jsx           # Entry Point
│   ├── index.html
│   └── package.json
│
├── src/                       # Spring Boot Backend
│   ├── main/
│   │   ├── java/com/ecommerce/
│   │   │   ├── config/        # Security & CORS Config
│   │   │   ├── controller/    # REST API Controllers
│   │   │   ├── model/         # JPA Entities (User, Product)
│   │   │   ├── repository/    # Database Repositories
│   │   │   └── Application.java
│   │   └── resources/
│   │       └── application.properties # Database Config
│   └── test/
│
├── pom.xml                    # Maven Dependencies
└── README.md                  # Project Documentation
```

## 🔄 Project Workflow & Architecture

### System Architecture
The application follows a standard n-tier architecture:
**Frontend (React/Vite) ↔ REST API (JSON) ↔ Spring Boot Controller ↔ Service Layer ↔ JPA Repository ↔ MySQL Database**

### User Journey Flows

1.  **User Authentication**
    *   **Registration**: User enters details on the Registration page. Frontend sends POST request to `/api/register`.
    *   **Processing**: Backend validates input, checks for existing users, creates a User entity, and saves it to the `users` table in MySQL.
    *   **Login**: User logs in with credentials. Backend verifies against the database and establishes a session/state.

2.  **Product Discovery**
    *   **Landing**: Users arrive at a visually rich Home page featuring "New Arrivals" and "Trending" sections.
    *   **Search & Filter**: Users navigate to "All Products". The `FilterSidebar` component captures Category, Price Range, and Sort criteria.
    *   **Client-Side Logic**: The `useProductFiltering` custom hook processes the raw product list and updates the UI instantly without unnecessary re-fetches.

3.  **Product Engagement**
    *   **Details View**: Clicking a product opens the Details page.
    *   **Visualization**:
        *   **Price History**: A Line Chart renders price trends over time.
        *   **Sentiment**: A Pie Chart visualizes customer review sentiment.
    *   **Interaction**: Users can add items to their Cart or Wishlist.

4.  **Checkout & Order Fulfillment**
    *   **Cart Review**: Users review items in the slide-over Cart drawer.
    *   **Checkout**: Users submit shipping and payment information (simulated).
    *   **Confirmation**: On success, an Order ID is generated, and the interaction is logged in the user's history (Profile -> My Orders).

## 📸 Visual Tour

### 1. Modern Hero Section
Dynamic entrance with floating 3D elements and glass cards.


![image alt](https://github.com/GaganCB2002/Nexacart_AI_E-Commerce/blob/main/images/Screenshot%202026-01-04%20195851.png?raw=true)

### 2. Responsive Sidebar Navigation
Clean access to Shop and Service links.
![Sidebar Screenshot](./frontend/public/assets/sidebar_nav_1767590566035.webp)

### 3. Global Filtering System
Powerful filtering on all product pages.
![Global Filters Screenshot](./frontend/public/images/neon_kicks.png)

### 4. Interactive Product Charts
Real-time visualization of price trends and customer sentiment.
![Charts Light Mode](./frontend/public/assets/charts_capture_1767590602268.webp)

### 5. Full Application Walkthrough
Watch the complete user journey from Home to Checkout.
![Full Application Walkthrough](./frontend/public/assets/launch_verification_1767590143175.webp)

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18+)
*   Java JDK 17+
*   MySQL Server

### Installation
1.  **Clone & Setup Database**
    *   Create MySQL database `ecommerce_users_db`.
    *   Update `src/main/resources/application.properties` with your credentials.

2.  **Run Backend**
    ```bash
    ./mvnw spring-boot:run
    ```

3.  **Run Frontend**
    ```bash
    cd frontend
    npm install
    npm run dev
    ```

    ### Installation & Running (Step-by-Step)

#### 1. Database Setup
*   Ensure MySQL is running.
*   Create a database named **`ecommerce_users_db`**.
*   (Optional) Update `src/main/resources/application.properties` if your MySQL password is not `root`.

#### 2. Backend Setup (Spring Boot)
The backend runs on **Port 8080** by default (or 5000 if configured for Wattal).

**Option A: Using Maven (Recommended)**
```bash
cd test
mvn clean install
mvn spring-boot:run
```

**Option B: Using Pre-built JAR**
```bash
cd test
java -jar target/test-ecommerce-0.0.1-SNAPSHOT.jar
```
*   **Verify**: Open [http://localhost:8080/api/products](http://localhost:8080/api/products) to see if it responds.

#### 3. Frontend Setup (React + Vite)
The frontend runs on **Port 5173**.

```bash
cd frontend
npm install
npm run dev
```
*   **Access the App**: Open **[http://localhost:5173](http://localhost:5173)** in your browser.

#### Summary of Ports
*   **Frontend**: `http://localhost:5173`
*   **Backend API**: `http://localhost:8080`
*   **Database**: Port `3306` (MySQL)


