from flask import Blueprint, jsonify
from flask_login import login_required
from app.models import User, Page

user_routes = Blueprint('users', __name__)


@user_routes.route('/')
@login_required
def users():
    users = User.query.all()
    return {'users': [user.to_dict() for user in users]}


@user_routes.route('/<int:id>')
@login_required
def user(id):
    user = User.query.get(id)
    return user.to_dict()

# get all pages of a user
# /api/users/:userId/pages

@user_routes.route('/<int:id>/pages')
def user_pages(id):
    user = User.query.filter(id == User.id).first()
    userPages = []
    for i in user.followed_pages:
        userPages.append(i.to_dict())
    return {'userPages':userPages}

