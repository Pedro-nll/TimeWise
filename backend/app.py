from flask import request, jsonify
from config import app, db # App é uma instancia do Flask e DB é o BD sqlite
import controllers.projectController
import controllers.taskController

app.register_blueprint(controllers.projectController.project_blueprint, url_prefix='/projects')
app.register_blueprint(controllers.taskController.tasks_blueprint, url_prefix='/tasks')

# Garante que esse arquivo não vai ser rodado se algo for importado daqui
if __name__ == "__main__":
    with app.app_context():
        db.create_all()
    app.run(debug=True)