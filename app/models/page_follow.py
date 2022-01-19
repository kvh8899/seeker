from .models import db

class Page_Follow(db.Model):
    __tablename__ = "page_follows"
    id = db.Column(db.Integer,primary_key=True)
    page_id = db.Column(db.Integer,db.ForeignKey("pages.id"),nullable=False)
    user_id = db.Column(db.Integer,db.ForeignKey("users.id"),nullable=False)