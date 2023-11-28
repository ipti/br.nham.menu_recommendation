
"""--------------------------------------------------------------------------------------------
Construção das rotas que podem ser utilizadas para consumir dados do banco de dados local
--------------------------------------------------------------------------------------------"""

from flask import Blueprint, current_app, request, jsonify, render_template, send_from_directory
from recommendation_system import runRecommendationSystem, getResult
import os

bp_method = Blueprint('metodo', __name__)

# Rota para executar o Sistema de Recomendação
@bp_method.route('/recommendationSystem/', methods = ['POST'])
def recommendationSystem():
    try:
        # Utiliza db.json como arquivo de entrada
        runRecommendationSystem()

        return {'message': 'Success'}, 200
    except Exception as e:
        return {'error': str(e)}, 400

@bp_method.route('/recommendationSystem', methods = ['GET'])
def getResultaaa():
    return {'error': str(e)}, 400

# Rota para obter os resultados
@bp_method.route('/recommendationSystem/getResult', methods = ['POST'])
def getResult():
    try:
        params = request.json

        from recommendation_system import getResult
        result = getResult(params)

        return result, 200
    except Exception as e:
        return {'error': str(e)}, 400

# Rota para obter os resultados
@bp_method.route('/', methods = ['GET'])
def root():
#    app_root = os.path.dirname(os.path.abspath(__file__))
#    target = os.path.join(app_root, 'frontend/index.html')
    return render_template('index.html') # Return index.html 

@bp_method.route('/<path:path>', methods = ['GET'])
def static_file(path):
    return send_from_directory('/static', path)
