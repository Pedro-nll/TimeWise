from flask import Blueprint, jsonify, request
from services.projectService import ProjectService
from flask_jwt_extended import jwt_required

project_blueprint = Blueprint('project', __name__)
project_service = ProjectService()

#get all
class ProjectController:
    @project_blueprint.route('/all', methods=["GET"])
    @jwt_required()
    def get_all_with_tasks():
        projects = project_service.get_all_projects()
        return jsonify(projects)

    #create
    @project_blueprint.route('', methods=["POST"])
    @jwt_required()
    def create_project():
        data = request.get_json()
        res, status = project_service.create_project(data)
        return jsonify(res), status

    #delete
    @project_blueprint.route("/<int:project_id>", methods=["DELETE"])
    @jwt_required()
    def delete_project(project_id):
        res = project_service.delete_project(project_id)
        return jsonify(res)
        
    #edit
    @project_blueprint.route("/<int:project_id>", methods=["PUT"])
    @jwt_required()
    def edit_project(project_id):
        data = request.get_json()
        res, status = project_service.edit_project(project_id, data)
        return jsonify(res), status