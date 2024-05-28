from config import db

class Task(db.Model):
    __tablename__ = "tasks"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=True)
    done = db.Column(db.Boolean, unique=False, nullable=False)
    
    project_id = db.Column(db.Integer, db.ForeignKey('projects.id'), nullable=False, unique=False)
    project = db.relationship('Project', back_populates="tasks")
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
            "done": self.done,
            "projectId": self.project_id,
        }
