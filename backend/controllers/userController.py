from flask import Blueprint, request, jsonify

from services.userService import UserService


user_blueprint = Blueprint('user', __name__)

@user_blueprint.route('/register', methods=['POST'])
def register_user():
    data = request.get_json()
    res, status = UserService.register_user(data)
    return jsonify(res), status

@user_blueprint.route('/login', methods=['POST'])
def login():
    data = request.get_json()
    
    res, status = UserService.login(data)
    return jsonify(res), status