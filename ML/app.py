from flask import Flask, request, jsonify, send_file
from flask_cors import CORS, cross_origin
import pickle
import pandas as pd
import shap
import matplotlib
matplotlib.use('Agg')  # Use a non-interactive backend
import matplotlib.pyplot as plt

import os

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "http://localhost:5173"}})

# Load the trained model and polynomial features
with open('trained_model.pkl', 'rb') as model_file:
    model = pickle.load(model_file)

with open('poly_features.pkl', 'rb') as poly_file:
    poly = pickle.load(poly_file)

# Endpoint to generate prediction
@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get JSON data from the POST request
        data = request.get_json()

        # Convert the input data into a DataFrame (adjust columns according to your data format)
        seller_input = pd.DataFrame([[
            data['Cost Price'], 
            data['MRP'], 
            data['Seller Rating'], 
            data['Total Customers'], 
            data['Avg Competitor Price'], 
            data['Min Competitor Price'], 
            data['Max Competitor Rating'], 
            data['Competitor Price-Rating Ratio']
        ]], columns=['Cost Price', 'MRP', 'Seller Rating', 'Total Customers', 
                     'Avg Competitor Price', 'Min Competitor Price', 
                     'Max Competitor Rating', 'Competitor Price-Rating Ratio'])

        # Transform the input using polynomial features
        seller_input_poly = poly.transform(seller_input)

        # Predict the best price
        predicted_price = model.predict(seller_input_poly)

        # Return the predicted price as JSON
        return jsonify({'predicted_price': predicted_price[0]})

    except Exception as e:
        return jsonify({'error': str(e)}), 400

# Endpoint to generate and serve SHAP graph
@app.route('/shap_graph', methods=['GET'])
def shap_graph():
    try:
        # response = flask.jsonify({'data': 'hello'})
        # return response
        # Load your dataset
        df = pd.read_csv('synthetic_ecommerce_dataset.csv')

        # Ensure the competitor-related features are created properly
        df['Avg Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('mean')
        df['Min Competitor Price'] = df.groupby('Product Name')['Sale Price'].transform('min')
        df['Max Competitor Rating'] = df.groupby('Product Name')['Seller Rating'].transform('max')
        df['Competitor Price-Rating Ratio'] = df['Min Competitor Price'] / df['Max Competitor Rating']

        # Select the required features
        X_train = df[['Cost Price', 'MRP', 'Seller Rating', 'Total Customers', 
                      'Avg Competitor Price', 'Min Competitor Price', 
                      'Max Competitor Rating', 'Competitor Price-Rating Ratio']]

        # Transform the features using polynomial features
        X_train_poly = poly.transform(X_train)

        # Get the feature names after polynomial transformation
        poly_feature_names = poly.get_feature_names_out(input_features=X_train.columns)

        # Create a DataFrame with the transformed polynomial features and correct names
        X_train_poly_df = pd.DataFrame(X_train_poly, columns=poly_feature_names)

        # Generate SHAP values
        explainer = shap.Explainer(model, X_train_poly_df)
        shap_values = explainer(X_train_poly_df)

        # Generate SHAP summary plot with feature names
        plt.figure()
        shap.summary_plot(shap_values, X_train_poly_df, show=False)

        # Save SHAP plot as an image
        shap_image_path = 'shap_summary_plot.png'
        plt.savefig(shap_image_path)  # Save the plot using the Agg backend
        plt.close()  # Close the figure to free resources

        # Serve the image to the client
        return send_file(shap_image_path, mimetype='image/png')

    except Exception as e:
        return jsonify({'error': str(e)}), 400

@app.route('/', methods=['GET'])
def index():
    return jsonify('Hello')


if __name__ == '__main__':
    app.run(port=8000,debug=True)
