from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
import joblib
import numpy as np
import pandas as pd

app = FastAPI()


logistic_model = joblib.load("logistic_model.pkl")
scaler = joblib.load("scaler.pkl")


class ModelInput(BaseModel):
    features: list  

def predict_labels(input_data):
   
    if len(input_data) != 15:
        raise ValueError("Input data must contain exactly 15 features.")
    
    
    feature_columns = [
        'Work-life Balance', 'Physical Activity', 'Stress Management', 'Lifestyle Satisfaction',
        'Personal Goals', 'Social Life', 'Hobbies', 'Positivity', 'Time Management',
        'Organization', 'Self-improvement', 'Diet', 'Helping Others', 'Confidence', 'Life Control'
    ]
    input_data_df = pd.DataFrame([input_data], columns=feature_columns)

   
    input_data_scaled = scaler.transform(input_data_df)
    
    
    logistic_predicted_labels = logistic_model.predict(input_data_scaled)

   
    return logistic_predicted_labels[0].tolist()

@app.post("/predict")
async def predict(input_data: ModelInput):
    try:
        labels = predict_labels(input_data.features)
        print("received data",input_data)
        print(labels)
        return {"predicted_labels": labels}
    except ValueError as e:
        raise HTTPException(status_code=400, detail=str(e))
