const form = document.getElementById('crop-form');
const resultContainer = document.getElementById('result');
 
if (form) {
    form.addEventListener('submit', async (e) => {
        e.preventDefault();
 
        resultContainer.style.display = "grid";
        resultContainer.innerHTML = `<div class="result-card" style="grid-column:1/-1;text-align:center;color:#6B7F6C;padding:30px;">⏳ Analysing your data…</div>`;
 
        const data = {
            crop:     document.getElementById('crop').value.trim().toLowerCase(),
            temp:     parseFloat(document.getElementById('temp').value),
            humidity: parseFloat(document.getElementById('humidity').value),
            rainfall: parseFloat(document.getElementById('rainfall').value),
            N:        parseFloat(document.getElementById('N').value),
            P:        parseFloat(document.getElementById('P').value),
            K:        parseFloat(document.getElementById('K').value),
            ph:       parseFloat(document.getElementById('ph').value)
        };
 
        try {
            const res = await fetch('http://127.0.0.1:5000/recommend', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data)
            });
 
            if (!res.ok) throw new Error(`Server error: ${res.status}`);
 
            const result = await res.json();
            resultContainer.innerHTML = "";   // clear loading state
 
            if (result.error) {
                addCard("❌ Error", result.error, "error");
                return;
            }
 
            // ── Header card showing the crop name ──
            resultContainer.innerHTML += `
                <div class="result-header-card">
                    <span style="font-size:2rem;">🌾</span>
                    <div>
                        <div class="crop-name">${data.crop}</div>
                        <div class="crop-sub">Recommendation Report</div>
                    </div>
                </div>
            `;
 
            // ── Risk alert banner (if any) ──
            if (result.risk_alert) {
                resultContainer.innerHTML += `
                    <div class="result-alert-card">
                        <span>⚠️</span>
                        <span><strong>Risk Alert:</strong> ${result.risk_alert}</span>
                    </div>
                `;
            }
 
            // ── Core status cards ──
            addCard("🌡️ Temperature Status", result.temperature_risk,
                result.temperature_risk === "Optimal" ? "normal" : "warning");
 
            addCard("💧 Water Stress", result.water_stress,
                result.water_stress.includes("Moderate") ? "warning" : "normal");
 
            addCard("🧪 Soil pH Status", result.soil_ph_status,
                result.soil_ph_status === "Optimal" ? "normal" : "warning");
 
            // ── Fertilizer card ──
            if (result.fertilizer_recommendations &&
                Object.keys(result.fertilizer_recommendations).length > 0) {
                addCard("🌱 Fertilizer Advice",
                    Object.values(result.fertilizer_recommendations).join("<br>"), "warning");
            } else {
                addCard("🌱 Fertilizer Advice", "✅ No additional fertilizer required", "normal");
            }
 
            // ── Alternative crops card ──
            if (result.recommended_alternative_crops &&
                result.recommended_alternative_crops.length > 0) {
                addCard("🌾 Alternative Crops",
                    result.recommended_alternative_crops
                        .map(c => `<span style="display:inline-block;background:#E8F0E0;color:#12372A;padding:2px 10px;border-radius:50px;margin:2px;font-size:13px;">${c}</span>`)
                        .join(" "),
                    "normal"
                );
            }
 
        } catch (err) {
            console.error(err);
            resultContainer.innerHTML = "";
            addCard("❌ Connection Error",
                "Could not reach the backend. Make sure Flask is running on <code>http://127.0.0.1:5000</code>",
                "error");
        }
    });
}
 
// ── Helpers ──────────────────────────────────────────
 
function addCard(title, content, type = "normal") {
    resultContainer.innerHTML += createCard(title, content, type);
}
 
function createCard(title, content, type) {
    const colors = {
        normal:  "#5F8D4E",
        warning: "#D68910",
        error:   "#C0392B"
    };
    const border = colors[type] || colors.normal;
 
    return `
        <div class="result-card" style="border-left-color:${border}">
            <h3>${title}</h3>
            <p>${content ?? ""}</p>
        </div>
    `;
}