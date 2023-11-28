from flask import Flask
from flask_cors import CORS, cross_origin

def create_app():
    app = Flask(__name__, template_folder='template', static_url_path='/static', static_folder='static')

    cors = CORS(app)
    app.config['CORS_HEADERS'] = 'Content-Type'

    from routes import bp_method
    app.register_blueprint(bp_method)

    return app

app = create_app()
app.run(host='0.0.0.0', port=8080)
