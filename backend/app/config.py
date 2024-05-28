from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_jwt_extended import JWTManager

db = SQLAlchemy()

class Config:
    SECRET_KEY = '162fb06b227640f398c1948cb3719789'
    SQLALCHEMY_TRACK_MODIFICATIONS = False
    JWT_SECRET_KEY = '162fb06b227640f398c1948cb3719789'
    CORS_HEADERS = 'Content-Type'

class DevelopmentConfig(Config):
    SQLALCHEMY_DATABASE_URI = "sqlite:///timewise.db"
    SQLALCHEMY_ECHO = True

class TestingConfig(Config):
    TESTING = True
    SQLALCHEMY_DATABASE_URI = "sqlite:///:memory:"
    SQLALCHEMY_ECHO = False

def create_app(config_class=DevelopmentConfig):
    app = Flask(__name__)
    app.config.from_object(config_class)

    CORS(app)
    JWTManager(app)
    db.init_app(app)

    return app