from flask import Blueprint, jsonify, request
from services.projectService import ProjectService

project_blueprint = Blueprint('project', __name__)
project_service = ProjectService()

#get all
class ProjectController:
    @project_blueprint.route('/all', methods=["GET"])
    def get_all():
        projects = project_service.get_all_projects()
        return jsonify(projects)

    #create
    @project_blueprint.route("", methods=["POST"])
    def create_project():
        data = request.get_data()
        res = project_service.create_project(data)
        return jsonify(res)

    #delete
    @project_blueprint.route("/<int:project_id>", methods=["DELETE"])
    def delete_project(project_id):
        res = project_service.delete_project(project_id)
        return jsonify(res)
        
    #edit
    @project_blueprint.route("/<int:project_id>", methods=["PUT"])
    def edit_project(project_id):
        data = request.get_data()
        res = project_service.edit_project(project_id, data)
        return jsonify(res)