const form = document.getElementById('crop-form');
const resultContainer = document.getElementById('result');

resultContainer.style.display = "grid";
resultContainer.innerHTML = "";

if(form){
    form.addEventListener('submit', async (e) => {
        e.preventDefault();

        const data = {
            crop: document.getElementById('crop').value,
            temp: parseFloat(document.getElementById('temp').value),
            humidity: parseFloat(document.getElementById('humidity').value),
            rainfall: parseFloat(document.getElementById('rainfall').value),
            N: parseFloat(document.getElementById('N').value),
            P: parseFloat(document.getElementById('P').value),
            K: parseFloat(document.getElementById('K').value),
            ph: parseFloat(document.getElementById('ph').value)
        };
        try{
            const res = await fetch('http://127.0.0.1:5000/recommend', {
                method: 'POST',
                headers: {'Content-Type' : 'application/json'},
                body: JSON.stringify(data)
            });

            if (!res.ok) {
                throw new Error("Server error");
            }

            const result = await res.json();
            addCard("🌡 Temperature Status", result.temperature_risk);
            addCard("💧 Water Stress", result.water_stress);
            addCard("🧪 Soil pH Status", result.soil_ph_status);

            if (
                result.fertilizer_recommendations &&
                Object.keys(result.fertilizer_recommendations).length > 0
            ) {
                addCard(
                "🌱 Fertilizer Advice",
                Object.values(result.fertilizer_recommendations).join("<br>")
                );
            } else {
                addCard(
                "🌱 Fertilizer Advice",
                "No additional fertilizer required",
                "warning"
                );
            }

            if (result.recommended_alternative_crops?.length > 0) {
                addCard(
                "🌾 Recommended Alternative Crops",
                result.recommended_alternative_crops.join(", ")
                );
            }

            resultContainer.innerHTML += `
                <div class="result-card">
                    <h4>Soil Status</h4>
                    <p>pH: ${result.soil_ph_status}</p>
                    <p>Temperature: ${result.temperature_risk}</p>
                    <p>Water: ${result.water_stress}</p>
                </div>
            `;        
            
            result.recommended_alternative_crops.forEach(crop => {
                resultContainer.innerHTML += `
                    <div class="result-card">
                        <h4>${crop}</h4>
                        <p>Suitable alternative crop</p>
                    </div>
                `;
            });


        }   catch (err) {
            resultContainer.style.display = "block";
            resultContainer.innerHTML = "";
            addCard("Recommendation Will Appear Here, Stay Tuned");
            console.error(err);
        }

        function addCard(title, content, type = "normal") {
            const resultContainer = document.getElementById("result");
            resultContainer.innerHTML += createCard(title, content, type);
        }

        function createCard(title, content, type) {
        let borderColor = "#5e8c4a";
        if (type === "warning") borderColor = "#e09f3e";
        if (type === "error") borderColor = "#d62828";

        return `
            <div class="result-card" style="border-left-color:${borderColor}">
            <h3>${title}</h3>
            <p>${content}</p>
            </div>
        `;
        }
    });
};