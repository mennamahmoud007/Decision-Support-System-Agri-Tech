# SAND2SEED - Smart Crop Recommendation System 

**From Sand to Seed to Sustainability.**

**SAND2SEED** is a state-of-the-art decision support platform designed to help farmers make informed choices about their crops. By combining soil analysis, climate data, and water availability, the system delivers tailored recommendations for optimal agricultural productivity. It aims to bridge the gap between environmental data and practical farming decisions.

---

## 🎯 Features

*   **Crop Suitability Analysis:** Input your target crop along with environmental parameters to check if it's suitable for your land.
*   **Risk Alerts:** Receive alerts for heat stress, water shortages, and soil nutrient deficiencies.
*   **Fertilizer Recommendations:** Get specific recommendations for Nitrogen (N), Phosphorus (P), and Potassium (K) based on your soil's current levels.
*   **Alternative Crop Suggestions:** Discover other crops that thrive under your specific temperature and pH conditions.
*   **Sustainability Guidelines:** Access actionable tips on irrigation, soil care, climate management, and protecting the ecosystem.

---

## 🏗️ Architecture & Technology Stack

This project is built using a decoupled architecture, separating the client-side interface from the decision-making backend.

### **Frontend**
*   **HTML5 & CSS3:** For structuring and styling the responsive user interfaces (`index.html`, `form.html`).
*   **Vanilla JavaScript:** Handles dynamic DOM manipulation, form submissions, and asynchronous API communication using the Fetch API (`frontend/script.js`, `frontend/form.js`).

### **Backend**
*   **Python:** The core language for the decision engine.
*   **Flask:** A lightweight WSGI web application framework used to build the RESTful API (`backend/app.py`).
*   **Flask-CORS:** Ensures smooth Cross-Origin Resource Sharing between the frontend and backend.
*   **Rule-Based Engine:** A custom Python module (`backend/rules.py`) that evaluates user inputs against a comprehensive dataset of crop requirements (`backend/crops_reference.py`).

---

## 📂 Project Structure

```
Decision-Support-System-Agri-Tech/
│
├── backend/                    # Python Flask API & Logic
│   ├── app.py                  # Main Flask application entry point
│   ├── rules.py                # Core logic for analyzing crop suitability & risks
│   └── crops_reference.py      # Dictionary containing optimal ranges for 20+ crops
│
├── frontend/                   # Static assets (CSS, JS, Images)
│   ├── style.css               # Styles for the landing page
│   ├── form.css                # Styles for the recommendation form
│   ├── script.js               # Interactivity for the landing page
│   ├── form.js                 # API integration and UI updates for the form
│   └── imgs/                   # Image assets used across the platform
│
├── index.html                  # Landing page with About Us and Sustainability Tips
├── form.html                   # User input form for crop recommendations
└── README.md                   # Project documentation
```

## 🧪 How It Works (The Rules Engine)

The core intelligence of the system resides in `backend/rules.py`. When a user submits data:

1.  **Validation:** The system checks if the requested crop exists in the `crops_reference.py` database.
2.  **Heat Status:** Compares user temperature against the crop's `temp_min` and `temp_max`.
3.  **Water Status:** Evaluates rainfall against the crop's specific `water_need`.
4.  **Fertilizer Status:** Analyzes N, P, K inputs. E.g., if Nitrogen < 50, it recommends adding nitrogen fertilizer.
5.  **pH Status:** Checks if the soil pH requires lime (to increase pH) or sulfur (to decrease pH).
6.  **Alternatives:** Scans all crops in the database to find those whose temperature and pH requirements match the user's inputs perfectly.

---

## 🔮 Future Enhancements

*   Integration with live weather APIs for real-time climate data.
*   Replacing the rule-based engine with Machine Learning models (e.g., Random Forest) for more dynamic predictions.
*   Mobile application development for on-the-go access for farmers in the field.
*   Automated IoT integration for direct soil sensor data input.