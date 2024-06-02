import pytest
from models.projectModel import Project
from services.projectService import ProjectService

@pytest.fixture
def project_service():
    return ProjectService()

@pytest.fixture
def project_setup(db, app):
    with app.app_context():
        project = Project(id=1, name="Project 1", description="Testing project")
        db.session.add(project)
        db.session.commit()
        return project

def test_get_all_projects(project_service, app, project_setup):
    with app.app_context():
        projects = project_service.get_all_projects()
        assert len(projects) > 0
        assert 'name' in projects[0]
        assert 'description' in projects[0]
        assert 'tasks' in projects[0]

def test_create_project(project_service, app):
    data = {
        "name": "Project 2",
        "description": "Testing"
    }
    with app.app_context():
        res, status = project_service.create_project(data)
        assert status == 200
        assert res['project']['name'] == "Project 2"
        assert res['project']['description'] == "Testing"


def test_create_project_bad_request(project_service, app):
    data = {
        "description": "Testing"
    }
    with app.app_context():
        res, status = project_service.create_project(data)
        assert status == 400
        assert res['message'] == "Bad request"
        

def test_delete_project_not_found(app, project_service):
    with app.app_context():
        res, status = project_service.delete_project(9999)
        assert status == 404
        assert res['message'] == 'Project not found'
        
def test_edit_project_not_found(app, project_service):
    data = {
        "name": "Project 2",
        "description": "Testing"
    }
    with app.app_context():
        res, status = project_service.edit_project(9999, data)
        assert status == 404
        assert res['message'] == 'Project not found'
        

def test_edit_project(app, db, project_service):
    with app.app_context():
        p = db.session.get(Project, 1)
        
        old_name = p.name
        new_name = "NEW NAME"
        p.name = new_name
        
        old_desc = p.description
        new_desc = "NEW DESC"
        p.description = new_desc
        
        res, status = project_service.edit_project(p.id, p.to_json())
        assert status == 200
        
        
def test_delete_project(app, db, project_service):
    with app.app_context():
        p = db.session.get(Project, 1)
        
        assert p is not None
        
        res, status = project_service.delete_project(1)
        assert res['message'] == "Project deleted"
        assert status == 200
        
        p = db.session.get(Project, 1)
        assert p is None