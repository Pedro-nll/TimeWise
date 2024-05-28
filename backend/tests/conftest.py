import pytest
from config import create_app, db as _db
from config import TestingConfig

import controllers.projectController
import controllers.taskController
import controllers.userController

# Essas fixtures e os yields tem funções parecidas, fazem um monte de coisa e depois tentam derrubar tudo tp
# Eh o setup e depois limpeza
# O yield aqui sobe o app para os testes e no fim da seção (escopo) dá drop all
# Mesma coisa com o db mais pra baixo
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

@pytest.fixture(scope='session')
def db(app):
    _db.app = app
    yield _db

@pytest.fixture(scope='function')
def session(db):
    """Creates a new database session for a test."""
    connection = db.engine.connect()
    transaction = connection.begin()
    options = dict(bind=connection, binds={})
    session = db.create_scoped_session(options=options)

    db.session = session

    yield session

    transaction.rollback()
    connection.close()
    session.remove()

@pytest.fixture()
def client(app):
    return app.test_client()
