from Flask import Blueprint
from app.models import Post
post_routes = Blueprint('posts',__name__)

#get trending posts
@post_routes.route("/")
def trending():
    posts = Post.query.limit(10).all()

    posts_t = []
    for i in posts:
        posts_t.append(i.to_dict())
    return posts_t




#get posts of a page

@post_routes.route("/<int>:pageId")
def page_posts(pageId):
    posts = Post.query.filter(pageId == Post.page_id).all()

     posts_t = []
    for i in posts:
        posts_t.append(i.to_dict())
    return posts_t


