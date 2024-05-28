from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager


def create_app(database_uri="sqlite:///timewise.db"):
    app = Flask(__name__)
    CORS(app)

    jwt = JWTManager(app)

    app.config["SQLALCHEMY_DATABASE_URI"] =  database_uri
    app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
    app.config['JWT_SECRET_KEY'] = '162fb06b227640f398c1948cb3719789'

    # Dev
    app.config["SQLALCHEMY_ECHO"] = True
    # app.config["SQLALCHEMY_RECORD_QUERIES"] = True

    db = SQLAlchemy(app)
    return app, db

app, db = create_app()