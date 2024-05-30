import pytest
from config import create_app, db as _db
from config import TestingConfig

import controllers.projectController
import controllers.taskController
import controllers.userController

@pytest.fixture(scope='session')
def app():
    app = create_app(config_class=TestingConfig)
    
    app.register_blueprint(controllers.projectController.project_blueprint, url_prefix='/projects')
    app.register_blueprint(controllers.taskController.tasks_blueprint, url_prefix='/tasks')
    app.register_blueprint(controllers.userController.user_blueprint, url_prefix='/user')
    
    with app.app_context():
        _db.create_all()
    
    yield app

@pytest.fixture
def db(app):
    _db.app = app
    yield _db

@pytest.fixture
def client(app):
    return app.test_client()
