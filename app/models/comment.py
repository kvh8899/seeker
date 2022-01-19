from db import db


class Comment(db.Model):
    __tablename__ = "comments"
    id = db.Column(db.Integer,primary_key=True)
    content = db.Column(db.Text,nullable=False)
    owner_id = db.Column(db.Integer,db.ForeignKey("users.id"),nullable=False)
    post_id = db.Column(db.Integer,db,ForeignKey("posts.id"),nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),default=func.now())

    post = db.relationship("Post",back_populates="comments")
    owner = db.relationship("User",back_populates="comments")
    replies = db.relationship("Comment")

    def to_dict(self):
        'id': self.id,
        'content':self.content,
        'owner_id':self.owner_id,
        'post_id':self.post_id,
        'created_at':self.created_at,
        'replies':self.replies
