import pytest
from models.projectModel import Project
from models.taskModel import Task
from services.tasksService import TaskService

@pytest.fixture
def task_service():
    return TaskService()

@pytest.fixture
def project_setup(db):
    project = Project(id=1, name="Project 1", description="Testing project")
    db.session.add(project)
    db.session.commit()
    return project
    
@pytest.fixture
def tasks_setup(db):
    task1 = Task(id=1, name="Task 1", description="Testing task 1", project_id=1)
    db.session.add(task1)
    db.session.commit()
    return task1

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
        
def test_get_all_tasks(app, task_service):
    with app.app_context():
        response, status_code = task_service.get_all_tasks()
        assert status_code == 200
        assert len(response) > 0
        assert 'name' in response[0]
        assert 'description' in response[0]
        assert 'done' in response[0]
        assert 'projectId' in response[0]
        
def test_do_task(app, task_service):
    with app.app_context():
        response = task_service.do_task(1)
        assert response[1] == 200
        assert response[0]['message'] == 'Task done'
        
def test_do_task_not_found(app, task_service):
    with app.app_context():
        response = task_service.do_task(9999)
        assert response[1] == 404
        assert response[0]['message'] == 'Task not found'


def test_get_task(app, task_service):
     with app.app_context():
        response, status_code = task_service.get_task(1)
        assert status_code == 200
        assert 'name' in response
        assert 'description' in response
        assert 'done' in response
        assert 'projectId' in response
        
def test_get_task_404(app, task_service):
    with app.app_context():
        response, status_code = task_service.get_task(9999)
        assert status_code == 404
        assert response['message'] == 'Task not found'
        
def test_edit_task(app, task_service, db):
    with app.app_context():
        task = db.session.get(Task, 1)
        desc = task.description
        task.description = "NEW DESCRIPTION"
        response, status_code = task_service.edit_task(task.id, task.to_json())
        
        assert status_code == 200
        assert response['message'] == 'Task editted'
        
        new_task = db.session.get(Task, 1)
        assert new_task.description != desc
        assert new_task.description == "NEW DESCRIPTION"
        
def test_edit_task_not_found(app, task_service):
    data = {
        'name': 'New Task',
        'description': 'This is a new task',
        'done': False,
        'projectId': 1
    }
    with app.app_context():
        response, status_code = task_service.edit_task(9999, data)
        assert status_code == 404
        assert response['message'] == 'Task not found'
        

def test_delete_task_not_found(app, task_service):
    with app.app_context():
        response, status_code = task_service.delete_task(9999)
        assert status_code == 404
        assert response['message'] == 'Task not found'


def test_delete_task(app, task_service):
    with app.app_context():
        task = task_service.get_task(1)
        assert task is not None
        
        response, status_code = task_service.delete_task(1)
        assert status_code == 200
        assert response['message'] == "Task deleted"
        
        task, status_code = task_service.get_task(1)
        assert status_code == 404