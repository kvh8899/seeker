from flask import Blueprint, request
from app.models import Post,Page,Page_Follow,Like
from flask_login import current_user
post_routes = Blueprint('posts',__name__)

#get trending posts /api/posts/
@post_routes.route("/")
def trending():
    posts = Post.query.join(Like).limit(10).all()
    
    posts_t = []
    for i in posts:
        post = i.to_dict()
        likers = []
        for x in i.likers:
            likers.append(x.to_dict())
        post['likers'] = likers
        posts_t.append(post)
    return {'posts_t':posts_t}

# get posts that the user follows /api/posts/following
@post_routes.route("/following")
def following():
    posts = Post.query.join(Page,Like).join(Page_Follow).filter(Page_Follow.user_id == current_user.id)
    posts_t = []
    for i in posts:
        post = i.to_dict()
        likers = []
        for x in i.likers:
            likers.append(x.to_dict())
        post['likers'] = likers
        posts_t.append(post)
    return {'posts_t':posts_t}



#get posts of a page /api/posts/:pageId

@post_routes.route("/<int>:pageId")
def page_posts(pageId):
    posts = Post.query.filter(pageId == Post.page_id).all()

    posts_t = []
    for i in posts:
        posts_t.append(i.to_dict())
    return {'posts_t':posts_t}


