from flask import Blueprint, request, jsonify
from services.tasksService import TaskService
from flask_jwt_extended import jwt_required

tasks_blueprint = Blueprint('tasks', __name__)
tasks_service = TaskService()

# Buscar todas as tasks, independente de projeto
@tasks_blueprint.route('/all', methods=['GET'])
@jwt_required()
def get_all_tasks():
    tasks = tasks_service.get_all_tasks()
    return jsonify(tasks)


# buscar uma task especifica
@tasks_blueprint.route('/<int:task_id>', methods=['GET'])
@jwt_required()
def get_task(task_id):
    task = tasks_service.get_task(task_id)
    return jsonify(task)


# criar uma task. A task já é adicionada ao projeto especificado por projectId
@tasks_blueprint.route('', methods=['POST'])
@jwt_required()
def create_task():
    data = request.get_json()
    result, status_code = tasks_service.create_task(data)
    return jsonify(result), status_code

# Mudar o status de uma task para feita
@tasks_blueprint.route('/do/<int:task_id>', methods=['POST'])
@jwt_required()
def do_task(task_id):
    result = tasks_service.do_task(task_id)
    return jsonify(result)
    
# Atualizar os dados de uma task
@tasks_blueprint.route('/<int:task_id>', methods=['PUT'])
@jwt_required()
def update_task(task_id):
    data = request.get_json()
    result = tasks_service.edit_task(task_id, data)
    return jsonify(result)

# Deletar uma task
@tasks_blueprint.route('/<int:task_id>', methods=['DELETE'])
@jwt_required()
def delete_task(task_id):
    result = tasks_service.delete_task(task_id)
    return jsonify(result), 204  # 204 No Content