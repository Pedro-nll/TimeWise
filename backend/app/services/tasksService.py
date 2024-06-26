from config import db
from models.taskModel import Task

class TaskService:
    def get_all_tasks(self):
        tasks = Task.query.all()
        tasks_json = [task.to_json() for task in tasks]
        return tasks_json, 200
    
    def create_task(self, data):
        name = data.get('name')
        description = data.get('description')
        done = data.get('done')
        project_id = data.get('projectId')
        
        if not name or not project_id:
            return {"message": "Bad request"}, 400
        
        if done is None:
            done = False
        
        new_task = Task(name=name, description=description, done=done, project_id=project_id)
        
        try:
            db.session.add(new_task)
            db.session.commit()
            return {'task': new_task.to_json()}, 200
        except Exception as e:
            db.session.rollback()
            return {"message": str(e)}, 500

    def do_task(self, id):
        task = db.session.get(Task, id)
        
        if not task:
            return {"message": "Task not found"}, 404
        
        task.done = True
        
        db.session.commit()
        return {"message": "Task done"}, 200
    
    def edit_task(self, id, data):
        task = db.session.get(Task, id)
        
        if not task:
            return {"message": "Task not found"}, 404
        
        new_name = data.get('name')
        new_description = data.get('description')
        new_done = data.get('done')
        
        if new_name:
            task.name = new_name
        
        task.description = new_description
        if new_done is not None:
            task.done = new_done
        
        db.session.commit()
        return {'message': 'Task editted'}, 200
            
    def delete_task(self, id):
        task = db.session.get(Task, id)
        
        if not task:
            return {"message": "Task not found"}, 404
        
        db.session.delete(task)
        db.session.commit()
        return {"message": "Task deleted"}, 200
    
    def get_task(self, id):
        task = db.session.get(Task, id)
        
        if not task:
            return {"message": "Task not found"}, 404
        
        return task.to_json(), 200