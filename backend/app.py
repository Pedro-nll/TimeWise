from flask import request, jsonify
from config import app, db # App é uma instancia do Flask e DB é o BD sqlite

# Garante que esse arquivo não vai ser rodado se algo for importado daqui
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)