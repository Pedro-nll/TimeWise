from flask_jwt_extended import JWTManager
from config import app, db
import controllers.projectController
import controllers.taskController
import controllers.userController

app.config['JWT_SECRET_KEY'] = '162fb06b227640f398c1948cb3719789'
jwt = JWTManager(app)

app.register_blueprint(controllers.projectController.project_blueprint, url_prefix='/projects')
app.register_blueprint(controllers.taskController.tasks_blueprint, url_prefix='/tasks')
app.register_blueprint(controllers.userController.user_blueprint, url_prefix='/user')

# Garante que esse arquivo não vai ser rodado se algo for importado daqui
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)