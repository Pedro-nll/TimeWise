from config import create_app, db
import controllers.projectController
import controllers.taskController
import controllers.userController

def create_my_app():
    app = create_app()
    app.register_blueprint(controllers.projectController.project_blueprint, url_prefix='/projects')
    app.register_blueprint(controllers.taskController.tasks_blueprint, url_prefix='/tasks')
    app.register_blueprint(controllers.userController.user_blueprint, url_prefix='/user')

    return app

if __name__ == "__main__":
    app = create_my_app()
    with app.app_context():
        db.create_all()
    app.run(debug=True)
