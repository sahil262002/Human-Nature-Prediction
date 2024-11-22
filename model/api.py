from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

app = FastAPI()

# Load the trained logistic model and scaler
logistic_model = joblib.load("logistic_model.pkl")
scaler = joblib.load("scaler.pkl")

# Define the input data structure
class ModelInput(BaseModel):
    features: list  # List of 15 feature values for prediction

# Function to handle predictions
# Function to handle predictions
def predict_labels(input_data):
    # Validate the input data length
    if len(input_data) != 15:
        raise ValueError("Input data must contain exactly 15 features.")
    
    # Convert input to a DataFrame with the same column names as used during training
    feature_columns = [
        'Work-life Balance', 'Physical Activity', 'Stress Management', 'Lifestyle Satisfaction',
        'Personal Goals', 'Social Life', 'Hobbies', 'Positivity', 'Time Management',
        'Organization', 'Self-improvement', 'Diet', 'Helping Others', 'Confidence', 'Life Control'
    ]
    input_data_df = pd.DataFrame([input_data], columns=feature_columns)

    # Scale the input data
    input_data_scaled = scaler.transform(input_data_df)
    
    # Make predictions with the logistic model
    logistic_predicted_labels = logistic_model.predict(input_data_scaled)

    # Return the final result as a list of unique predicted labels
    return logistic_predicted_labels[0].tolist()
# API endpoint to receive data and respond with predictions
@app.post("/predict")
async def predict(input_data: ModelInput):
    try:
        labels = predict_labels(input_data.features)
        print("received data",input_data)
        print(labels)
        return {"predicted_labels": labels}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
