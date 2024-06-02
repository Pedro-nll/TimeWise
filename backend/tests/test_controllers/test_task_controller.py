import pytest
from models.taskModel import Task
from services.tasksService import TaskService

@pytest.fixture
def task_service():
    return TaskService()

def test_get_all_tasks(client, auth_headers, app, task_service):
    with app.app_context():
        data = {
            'name': 'New Task',
            'description': 'This is a new task',
            'done': False,
            'projectId': 1
        }
        task_service.create_task(data)
        response = client.get("/tasks/all", headers=auth_headers)
        assert response.status_code == 200
        assert response.json
        assert len(response.json) > 0
        assert response.json[0][0]['name'] == 'New Task'
        assert response.json[0][0]['description'] == 'This is a new task'
        assert response.json[0][0]['done'] == False
        assert response.json[0][0]['projectId'] == 1

def test_get_task(client, auth_headers, app, task_service):
    with app.app_context():
        data = {
            'name': 'Task',
            'description': 'task',
            'done': False,
            'projectId': 1
        }
        task = task_service.create_task(data)[0]['task']
        response = client.get(f"/tasks/{task['id']}", headers=auth_headers)
        assert response.status_code == 200
        assert response.json[0]['name'] == 'Task'
        assert response.json[0]['description'] == 'task'
        assert response.json[0]['done'] == False
        assert response.json[0]['projectId'] == 1

def test_create_task(client, auth_headers):
    data = {
        'name': 'Created Task',
        'description': 'This is a created task',
        'done': False,
        'projectId': 1
    }
    response = client.post("/tasks", json=data, headers=auth_headers)
    assert response.status_code == 200
    assert response.json['task']['name'] == 'Created Task'
    assert response.json['task']['description'] == 'This is a created task'
    assert response.json['task']['done'] == False
    assert response.json['task']['projectId'] == 1