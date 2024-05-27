from models.User import User
from config import db
from werkzeug.security import check_password_hash, generate_password_hash
from flask_jwt_extended import create_access_token

class UserService:
    @staticmethod
    def register_user(data):
        username = data.get('username')
        password = data.get('password')

        if not username or not password:
            return {"message": "Both username and password are required"}, 400

        existing_user = User.query.filter_by(username=username).first()
        if existing_user:
            return {"message": "Username already exists"}, 400

        new_user = User(username=username, password=password)
        db.session.add(new_user)
        db.session.commit()

        return {"message": "User registered successfully"}, 200

    

    @staticmethod
    def login(data):
        username = data.get('username')
        password = data.get('password')

        user = User.query.filter_by(username=username).first()
        if not user:
            return {"message": "Invalid credentials"}, 401

        password_flag = user.check_password(password)
        if not password_flag:
            return {"message": "Invalid credentials"}, 401

        # Create JWT token
        access_token = create_access_token(identity=user.id)

        return {"accessToken": access_token}, 200
