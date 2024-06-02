import pytest
from flask import json
from config import create_app, db as _db
from config import TestingConfig
import controllers.projectController
import controllers.taskController
import controllers.userController
import uuid

@pytest.fixture(scope='session')
def app():
    app = create_app(config_class=TestingConfig)
    
    app.register_blueprint(controllers.projectController.project_blueprint, url_prefix='/projects')
    app.register_blueprint(controllers.taskController.tasks_blueprint, url_prefix='/tasks')
    app.register_blueprint(controllers.userController.user_blueprint, url_prefix='/user')
    
    with app.app_context():
        _db.create_all()
    
    yield app

    with app.app_context():
        _db.drop_all()

@pytest.fixture
def db(app):
    _db.app = app
    yield _db
    with app.app_context():
        _db.session.remove()
        _db.drop_all()
        _db.create_all()

@pytest.fixture
def client(app):
    return app.test_client()

@pytest.fixture
def auth_headers(client):
    unique_username = f"testuser_{uuid.uuid4()}"
    user_data = {
        "username": unique_username,
        "password": "123"
    }

    register_response = client.post('/user/register', data=json.dumps(user_data), content_type='application/json')

    if register_response.status_code not in [200, 201]:
        raise Exception(f"User registration failed: {register_response.data.decode()}")

    register_data = json.loads(register_response.data.decode())
    if 'accessToken' not in register_data:
        raise KeyError(f"Registration response does not contain accessToken: {register_data}")

    token = register_data['accessToken']
    return {
        'Authorization': f'Bearer {token}'
    }
