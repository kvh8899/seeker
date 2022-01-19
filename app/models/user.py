from .models import db
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import UserMixin
from datetime import datetime


class User(db.Model, UserMixin):
    __tablename__ = 'users'

    id = db.Column(db.Integer, primary_key=True)
    username = db.Column(db.String(40), nullable=False, unique=True)
    profile_image = db.Column(db.String)
    hashed_password = db.Column(db.String(255), nullable=False)
    created_at = db.Column(db.DateTime(timezone=True),default=datetime.now())

    page = db.relationship("Page", back_populates="owner",cascade="all, delete")
    posts = db.relationship("Post", back_populates="owner",cascade="all, delete")
    comments = db.relationship("Comment",back_populates="owner",cascade="all, delete")
    liked_posts = db.relationship("Post",backref="likers",secondary="likes",cascade='all, delete')
    followed_pages = db.relationship("Page",backref="subscribers",secondary="page_follows",cascade="all, delete")

    @property
    def password(self):
        return self.hashed_password

    @password.setter
    def password(self, password):
        self.hashed_password = generate_password_hash(password)

    def check_password(self, password):
        return check_password_hash(self.password, password)

    def to_dict(self):
        return {
            'id': self.id,
            'username': self.username,
            'email': self.email
        }
