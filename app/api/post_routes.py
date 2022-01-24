from flask import Blueprint, request
from app.models import Post,Page,Page_Follow,Like,Comment
from flask_login import current_user, login_required
post_routes = Blueprint('posts',__name__)

#get trending posts /api/posts/
@post_routes.route("/")
def trending():
    posts = Post.query.limit(10).all()
    posts_t = []
    for i in posts:
        post = i.to_dict()
        likers = []
        for x in i.likers:
            likers.append(x.to_dict())
        post['likers'] = likers
        post['page'] = i.page.to_dict()
        post['owner'] = i.owner.to_dict()
        post['comments'] = len(i.comments)
        posts_t.append(post)
    return {'posts_t':posts_t}

# get posts that the user follows /api/posts/following
@post_routes.route("/following")
@login_required
def following():
    posts = Post.query.join(Page).join(Page_Follow).filter(Page_Follow.user_id == current_user.id)
    posts_t = []
    for i in posts:
        post = i.to_dict()
        likers = []
        for x in i.likers:
            likers.append(x.to_dict())
        post['likers'] = likers
        post['page'] = i.page.to_dict()
        post['owner'] = i.owner.to_dict()
        post['comments'] = len(i.comments)
        posts_t.append(post)
    return {'posts_t':posts_t}

# get a specific post
# /api/posts/:postId
@post_routes.route("/<int:postId>")
def get_post(postId):
    post = Post.query.filter(postId == Post.id).first()
    t_post = post.to_dict()
    t_post['page'] = post.page.to_dict()
    t_post['owner'] = post.owner.to_dict()
    t_post['likers'] = len(post.likers)
    t_post['comments'] = len(post.comments)
    return t_post



