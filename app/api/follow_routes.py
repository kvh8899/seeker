from flask import Blueprint
from app.models import db,Page_Follow
from flask_login import current_user, login_required

follow_routes = Blueprint("follows",__name__)

# check follower
@follow_routes.route("/<int:pageId>")
@login_required
def check_subscrib(pageId,userId):
    follow = Page_Follow.query.filter(pageId == Page_Follow.page_id and current_user.id == Page.user_id).first()
    if(follow):
        return {'follow':True}
    else:
        return {'follow':False}

# create follow
@follow_routes.route("/<int:pageId>",methods=["POST"])
@login_required
def create_follow(pageId):
    follow = Page(page_id=pageId,user_id=current_user.id)
    db.session.add(follow)
    db.session.commit()
    return {'add':'success'}

#delete follow
@follow_routes.route("/<int:pageId>/delete",methods=["DELETE"])
@login_required
def delete_follow(pageId):
    follow = Page_Follow.query.filter(pageId == Page_Follow.page_id and current_user.id == Page.user_id).first()
    db.session.delete(follow)
    db.session.commit()
    return {'delete':'success'}

