from config import db
from models.projectModel import Project

class ProjectService:
    def get_all_projects(self):
        projects = Project.query.all()
        projects_json = [project.to_json() for project in projects]
        return projects_json
    
    def create_project(self, data):
        name = data.get['name']
        description = data.get['description']
        
        if not name or not description:
            return {'message': 'Bad request'}, 400
        
        new_project = Project(name = name, description = description)
        
        try:
            db.session.add(new_project)
            db.session.commit()
            return {'message': 'Project created'}, 200
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
        
        new_name = data.get['name']
        new_description = data.get['description']
        
        if not new_name or not new_description:
            return {'message': 'Bad request'}, 400
        
        project.name = new_name
        project.description = new_description
        
        db.session.commit()
        return {'message': 'Project editted'}, 200