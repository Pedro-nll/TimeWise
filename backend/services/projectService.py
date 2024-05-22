from config import db
from models.projectModel import Project
from models.taskModel import Task

class ProjectService:
    def get_all_projects(self):
        projects = Project.query.all()
        projects_json = [project.to_json() for project in projects]
        return projects_json
    
    def create_project(self, data):
        name = data.get('name')
        description = data.get('description')
        
        if not name:
            return {'message': 'Bad request'}, 400
        
        new_project = Project(name = name, description = description)
        
        try:
            db.session.add(new_project)
            db.session.commit()
            return {'project': new_project.to_json()}, 200
        except Exception as e:
            db.session.rollback()
            return {'message': str(e)}, 400
        
    def delete_project(self, id):
        project = Project.query.get(id)
        
        if not project:
            return {'message': 'Project not found'}, 404
        
        db.session.delete(project)
        db.session.commit()
        return {'message': 'Project deleted'}, 200
    
    def edit_project(self, id, data):
        project = Project.query.get(id)
        
        if not project:
            return {'message': 'Project not found'}, 404
        
        new_name = data.get('name')
        new_description = data.get('description')
        
        if not new_name:
            return {'message': 'Bad request'}, 400
        
        project.name = new_name
        project.description = new_description
        
        project_json = {}
        project_json['tasks'] = [task.to_json() for task in project.tasks]
        project_json['id'] = project.id
        project_json['name'] = project.name
        project_json['description'] = project.description
        
        db.session.commit()
        return {'project': project_json}, 200