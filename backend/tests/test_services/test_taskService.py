import pytest
from models.taskModel import Task
from services.tasksService import TaskService

@pytest.fixture
def task_service():
    return TaskService()

def test_get_all_tasks(session, task_service):
    # Create some sample tasks
    task1 = Task(name='Task 1', description='Description 1')
    task2 = Task(name='Task 2', description='Description 2')
    
    # Add them to the session and commit
    session.add(task1)
    session.add(task2)
    session.commit()
    
    # Call the service method
    tasks_json = task_service.get_all_tasks()
    
    # Verify the results
    assert len(tasks_json) == 2
    assert tasks_json[0]['name'] == 'Task 1'
    assert tasks_json[0]['description'] == 'Description 1'
    assert tasks_json[1]['name'] == 'Task 2'
    assert tasks_json[1]['description'] == 'Description 2'
