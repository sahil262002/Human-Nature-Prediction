from fastapi import FastAPI
from pydantic import BaseModel
import joblib
import numpy as np

app = FastAPI()

@app.get("/")
def read_root():
    return {"message": "Hello World"}


# Load your trained model and scaler
rf_model = joblib.load("rf_model.pkl")
logistic_model = joblib.load("logistic_model.pkl")
scaler = joblib.load("scaler.pkl")

# Define the input data structure
class ModelInput(BaseModel):
    features: list  # List of feature values for prediction

# Function to handle predictions
def predict_labels(input_data):
    # Convert input to the expected format, scale, and predict
    input_data = np.array(input_data).reshape(1, -1)
    input_data_scaled = scaler.transform(input_data)
    
    # Make predictions with both models
    rf_predicted_labels = rf_model.predict(input_data_scaled)
    logistic_predicted_labels = logistic_model.predict(input_data_scaled)

    # Helper function to remove duplicates and preserve order
    def get_unique_labels(labels):
        seen = set()
        unique_labels = [int(label) for label in labels if not (label in seen or seen.add(label))]
        return unique_labels

    # Convert predictions to unique labels for both models
    rf_unique_labels = get_unique_labels(rf_predicted_labels[0])
    logistic_unique_labels = get_unique_labels(logistic_predicted_labels[0])

    # Combine unique predictions from both models
    combined_labels = rf_unique_labels + logistic_unique_labels
    final_unique_labels = get_unique_labels(combined_labels)

    # Return the final result
    return final_unique_labels

# API endpoint to receive data and respond with predictions
@app.post("/predict")
async def predict(input_data: ModelInput):
    labels = predict_labels(input_data.features)
    return {"predicted_labels": labels}
