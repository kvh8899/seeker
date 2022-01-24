from flask import Blueprint
from app.models import db, Like
from flask_login import current_user, login_required

like_routes = Blueprint("likes",__name__)

@like_routes.route("/<int:postId>",methods=["POST"])
@login_required
def create_like(postId):
    like = Like(user_id=current_user.id,post_id=postId)
    db.session.add(like)
    db.session.commit()
    return {'add':'success'}

@like_routes.route("/<int:postId>/delete",methods=["DELETE"])
@login_required
def delete_like(postId):
    like = Like.query.filter(postId == Like.post_id and Like.user_id == current_user.id).first()
    db.session.delete(like)
    db.session.commit()
    return {'delete':'success'}
    
