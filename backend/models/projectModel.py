from config import db

class Project(db.Model):
    __tablename__ = "projects"
    
    id = db.Column(db.Integer, primary_key=True)
    name = db.Column(db.String(80), unique=False, nullable=False)
    description = db.Column(db.String(120), unique=False, nullable=True)
    tasks = db.relationship("Task", back_populates='project', lazy='dynamic')
    
    def to_json(self):
        return {
            "id": self.id,
            "name": self.name,
            "description": self.description,
        }