from .models import db
from datetime import datetime
import pytz
class Post(db.Model):
    __tablename__ = "posts"
    id = db.Column(db.Integer,primary_key=True)
    heading = db.Column(db.String(100),nullable=False)
    content = db.Column(db.Text)
    page_id = db.Column(db.Integer,db.ForeignKey("pages.id"),nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),default=lambda:datetime.now(pytz.timezone('US/Pacific')))
    owner_id = db.Column(db.Integer,db.ForeignKey("users.id"),nullable=False)
    contentImage = db.Column(db.String)

    owner = db.relationship("User",back_populates="posts")
    page = db.relationship("Page",back_populates="posts")
    comments = db.relationship("Comment",back_populates="post",cascade="all, delete")
    
    def to_dict(self):
        return{
            'id':self.id,
            'content':self.content,
            'page_id':self.page_id,
            'created_at':self.created_at,
            'owner_id':self.owner_id,
            'contentImage':self.contentImage,
            'heading':self.heading
        }
