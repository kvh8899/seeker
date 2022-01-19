from db import db


class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer,primary_key=True)
    content = db.Column(db.Text)
    page_id = db.Column(db.Integer,db.ForeignKey("pages.id"),nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),default=func.now())
    owner_id = db.Column(db.Integer,db.ForeignKey("users.id"),nullable=False)

    owner = db.relationship("User",back_populates="posts",cascade="all, delete")
    page = db.relationship("Page",back_populates="posts",cascade="all, delete")
    comments = db.relationship("Comment",back_populates="post",cascade="all, delete")
    def to_dict(self):
        return{
            'id':self.id,
            'content':self.content,
            'page_id':self.page_id,
            'created_at':self.created_at,
            'owner_id':self.owner_id
        }
