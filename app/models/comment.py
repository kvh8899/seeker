from .models import db
from datetime import datetime

def insert_into_tree(insert_item,items):
            queue = [items]
            while(len(queue) > 0):
                curr = queue.pop(0)
                if(insert_item.parent_id == curr['id']):
                    curr['replies'].append(insert_item.to_dict())
                    break;
                for i in curr['replies']:
                    queue.append(i)
            return items

class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer,primary_key=True)
    content = db.Column(db.Text,nullable=False)
    owner_id = db.Column(db.Integer,db.ForeignKey("users.id"),nullable=False)
    post_id = db.Column(db.Integer,db.ForeignKey("posts.id"),nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),default=datetime.now())
    parent_id = db.Column(db.Integer,db.ForeignKey("comments.id"))

    post = db.relationship("Post",back_populates="comments")
    owner = db.relationship("User",back_populates="comments")
    replies = db.relationship("Comment")

    def to_dict(self):
        return{
            'id': self.id,
            'content':self.content,
            'owner_id':self.owner_id,
            'post_id':self.post_id,
            'parent_id':self.parent_id,
            'created_at':self.created_at,
            'replies':[]
        }

    def handle_replies(self):
        items = self.to_dict()
        queue = [self]
        while(len(queue) > 0):
            curr = queue.pop(0)
            ## insert into tree
            if(curr.parent_id):
                items = insert_into_tree(curr,items)
            for i in curr.replies:
                queue.append(i)
        
        return items

