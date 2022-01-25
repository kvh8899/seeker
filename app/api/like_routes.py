from flask import Blueprint
from app.models import db, Like,Post
from flask_login import current_user, login_required

like_routes = Blueprint("likes",__name__)

@like_routes.route("/<int:postId>",methods=["POST"])
@login_required
def create_like(postId):
    like = Like(user_id=current_user.id,post_id=postId)
    db.session.add(like)
    db.session.commit()
    return {'like':postId}

@like_routes.route("/<int:postId>/delete",methods=["DELETE"])
@login_required
def delete_like(postId):
    like = Like.query.filter((postId == Like.post_id),(Like.user_id == current_user.id)).first()
    db.session.delete(like)
    db.session.commit()
    return {'delete':'success'}

@like_routes.route("/<int:postId>")
def get_likes(postId):
    likes = Like.query.filter(postId == Like.post_id).all()
    return {'likes':len(likes),'post_id':postId}
    
