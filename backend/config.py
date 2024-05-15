from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

# Instancia o flask e habilita o CORS
app = Flask(__name__)
CORS(app)

app.config["SQLALCHEMY_DATABASE_URI"] = "sqlite:///timewise.db" 
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False

# Dev
app.config["SQLALCHEMY_ECHO"] = True  # Ativar o modo de depuração
# app.config["SQLALCHEMY_RECORD_QUERIES"] = True  # Ativar o registro de consultas SQL


# Cria uma instância do SQLAlchemy para interagir com o banco de dados através da aplicação
db = SQLAlchemy(app)