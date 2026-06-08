from crops_reference import CROPS
 
def check_crop_exists(crop_name):
    return crop_name.lower() in CROPS
 
def get_crop_reference(crop_name):
    return CROPS[crop_name.lower()]
 
def heat_status(temp, crop_ref):
    if temp < crop_ref["temp_min"]:
        return "Low (Cold Stress)"
    elif temp > crop_ref["temp_max"]:
        return "High (Heat Stress)"
    else:
        return "Optimal"
 
def water_status(rainfall, crop_ref):
    need = crop_ref["water_need"].lower()
    if need == "high" and rainfall < 50:
        return "Moderate (Increase irrigation)"
    elif need == "medium" and rainfall < 30:
        return "Moderate (Increase irrigation)"
    else:
        return "Low (No extra irrigation needed)"
 
def fertilizer_status(N, P, K):
    recommendations = {}
    if N < 50:
        recommendations["N"] = "Add nitrogen fertilizer"
    if P < 30:
        recommendations["P"] = "Add phosphorus fertilizer"
    if K < 20:
        recommendations["K"] = "Add potassium fertilizer"
    return recommendations
 
def ph_status(ph, crop_ref):
    if ph < crop_ref["ph_min"]:
        return "Low (Increase pH: add lime)"
    elif ph > crop_ref["ph_max"]:
        return "High (Decrease pH: add sulfur)"
    else:
        return "Optimal"
 
def recommend_alternatives(user_input):
    entered_crop = user_input["crop"].lower()
    alternatives = []
    for crop, ref in CROPS.items():
        if crop == entered_crop:          # skip the crop the user already entered
            continue
        if (ref["temp_min"] <= user_input["temp"] <= ref["temp_max"] and
                ref["ph_min"] <= user_input["ph"] <= ref["ph_max"]):
            alternatives.append(crop)
    return alternatives
 
def generate_recommendation(user_input):
    crop_name = user_input.get("crop", "").strip()
 
    if not crop_name:
        return {"error": "No crop name provided"}
 
    if not check_crop_exists(crop_name):
        return {"error": f"Crop '{crop_name}' not found. Available crops: " + ", ".join(CROPS.keys())}
 
    crop_ref = get_crop_reference(crop_name)
 
    temp_risk  = heat_status(user_input["temp"],     crop_ref)
    water_risk = water_status(user_input["rainfall"], crop_ref)
    fert_recs  = fertilizer_status(user_input["N"], user_input["P"], user_input["K"])
    ph_rec     = ph_status(user_input["ph"],          crop_ref)
    alternatives = recommend_alternatives(user_input)
 
    alerts = []
    if "High" in temp_risk or "Low" in temp_risk:
        alerts.append("Temperature stress expected")
    if "Moderate" in water_risk:
        alerts.append("Water shortage risk")
    if fert_recs:
        alerts.append("Fertilizer required: " + ", ".join(fert_recs.keys()))
 
    recommendation = {
        "temperature_risk": temp_risk,
        "water_stress": water_risk,
        "fertilizer_recommendations": fert_recs,
        "soil_ph_status": ph_rec,
        "recommended_alternative_crops": alternatives,
    }
 
    if alerts:
        recommendation["risk_alert"] = ", ".join(alerts)
 
    return recommendation
 
 
# Quick local test — run: python rules.py
if __name__ == "__main__":
    import json
    test_input = {
        "crop": "maize",
        "temp": 40,
        "humidity": 20,
        "rainfall": 10,
        "N": 15,
        "P": 10,
        "K": 5,
        "ph": 6.5
    }
    print(json.dumps(generate_recommendation(test_input), indent=4))