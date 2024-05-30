import pytest
from models.projectModel import Project
from services.tasksService import TaskService

@pytest.fixture
def task_service():
    return TaskService()

@pytest.fixture
def project_setup(db):
    project = Project(id=1, name="Project 1", description="Testing project")
    db.session.add(project)
    db.session.commit()
    yield project
    db.session.rollback()

def test_create_task(app, task_service):
    data = {
        'name': 'New Task',
        'description': 'This is a new task',
        'done': False,
        'projectId': 1
    }

    with app.app_context():
        response, status_code = task_service.create_task(data)
        
        assert status_code == 200
        assert 'task' in response
        assert response['task']['name'] == 'New Task'
        assert response['task']['description'] == 'This is a new task'
        assert response['task']['done'] == False
        assert response['task']['projectId'] == 1
        
def test_create_task_without_project_id(app, task_service):
    data = {
        'name': 'New Task',
        'description': 'This is a new task',
        'done': False,
    }

    with app.app_context():
        response, status_code = task_service.create_task(data)
        
        assert status_code == 400
        assert 'message' in response
        assert response['message'] == 'Bad request'
        
def test_create_task_without_name(app, task_service):
    data = {
        'description': 'This is a new task',
        'done': False,
        'projectId': 1
    }

    with app.app_context():
        response, status_code = task_service.create_task(data)
        
        assert status_code == 400
        assert 'message' in response
        assert response['message'] == 'Bad request'