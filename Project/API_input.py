# Bibliotecas necessárias para rodar os dados de entrada
import os
from pymongo import MongoClient
from flask import Flask, request, jsonify
from pymongo import MongoClient
from recommendation import data_API

app = Flask(__name__)

@app.route('/data_input', methods=['POST'])
def update_inventory():
    try:
        data = request.get_json()
        if 'menuList' in data and 'inventory' in data:
            menu_data = data['menuList']
            inventory_data = data['inventory']           
            data_API(menu_data, inventory_data)
            return jsonify({'message': 'Menu e inventário atualizados com sucesso!'})
        else:
            return jsonify({'error': 'Invalid data format'}), 400
    except Exception as e:
        return jsonify({'error': str(e)}), 500

app.run(debug=True)