from crops_reference import CROPS 
def check_crop_exists(crop_name):
    return crop_name.lower() in CROPS

def get_crop_reference(crop_name):
    return CROPS[crop_name.lower()]

def heat_status(temp, crop_ref):
    if temp < crop_ref["temp_min"]:
        return "Cold Stress"
    elif temp > crop_ref["temp_max"]:
        return "Heat Stress"
    else:
        return "Optimal"

def water_status(rainfall, crop_ref):
    need = crop_ref["water_need"].lower()
    if need == "high" and rainfall < 50:
        return "Increase irrigation"
    elif need == "medium" and rainfall < 30:
        return "Moderate irrigation"
    else:
        return "No extra irrigation needed"

def fertilizer_status(N, P, K, crop_ref):
    needed = []
    recommendations = {}
    if N < 50:
        needed.append("N")
        recommendations["N"] = "Add nitrogen fertilizer"
    if P < 30:
        needed.append("P")
        recommendations["P"] = "Add phosphorus fertilizer"
    if K < 20:
        needed.append("K")
        recommendations["K"] = "Add potassium fertilizer"
    return recommendations

def ph_status(ph, crop_ref):
    if ph < crop_ref["ph_min"]:
        return "Increase pH: add lime to soil"
    elif ph > crop_ref["ph_max"]:
        return "Decrease pH: add sulfur to soil"
    else:
        return "Optimal"

def recommend_alternatives(user_input):
    alternatives = []
    for crop, ref in CROPS.items():
        if (ref["temp_min"] <= user_input["temp"] <= ref["temp_max"] and
            ref["ph_min"] <= user_input["ph"] <= ref["ph_max"]):
            alternatives.append(crop)
    return alternatives

def generate_recommendation(user_input):
    if not check_crop_exists(user_input["crop"]):
        return {"error": "Crop not found in reference"}

    crop_ref = get_crop_reference(user_input["crop"])

    recommendation = {
        "heat_status": heat_status(user_input["temp"], crop_ref),
        "water_status": water_status(user_input["rainfall"], crop_ref),
        "fertilizer_needed": fertilizer_status(user_input["N"], user_input["P"], user_input["K"], crop_ref),
        "ph_status": ph_status(user_input["ph"], crop_ref),
        "alternative_crops": recommend_alternatives(user_input)
    }
    
    alternatives = recommend_alternatives(user_input)
    if alternatives:  
        recommendation["alternative_crops"] = alternatives

    return recommendation

"""
# test
if __name__ == "__main__":
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
    import json
    print(json.dumps(generate_recommendation(test_input), indent=4))
"""