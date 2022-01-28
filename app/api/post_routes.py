from flask import Blueprint, request
from app.models import db,Post,Page,Page_Follow,Like,Comment
from flask_login import current_user, login_required
from app.forms import Post_form, Comment_Form
from sqlalchemy import desc, asc
post_routes = Blueprint('posts',__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}')
    return errorMessages

#get trending posts /api/posts/
@post_routes.route("/")
def trending():
    posts = Post.query.order_by(desc(Post.id)).limit(10).all()
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
    posts = Post.query.join(Page).join(Page_Follow).filter(Page_Follow.user_id == current_user.id).order_by(desc(Post.id)).all()
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

# update a specific post
# /api/posts/:postId/edit

@post_routes.route("/<int:postId>/edit",methods=['PATCH'])
def edit_post(postId):
    form = Post_form()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(form.validate_on_submit()):
        post = Post.query.filter(postId == Post.id).first()
        post.heading = form.heading.data
        post.contentImage = form.contentImage.data
        post.content = form.content.data
        db.session.commit()
        t_post = post.to_dict()
        t_post['page'] = post.page.to_dict()
        t_post['owner'] = post.owner.to_dict()
        t_post['likers'] = len(post.likers)
        t_post['comments'] = len(post.comments)
        return {'post':t_post}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete a post
# /api/posts/:postId/delete

@post_routes.route("/<int:postId>/delete",methods=["DELETE"])
def delete_post(postId):
        post = Post.query.filter(postId == Post.id).first();
        db.session.delete(post)
        db.session.commit()
        return {'delete':'success'}

# get likes of a post that a user likes
@post_routes.route("/<int:postId>/likes")
@login_required
def post_user_likes(postId):
    like = Like.query.filter((postId == Like.post_id),(current_user.id == Like.user_id)).first()

    if(like):
        return {'like':like.post_id}
    else:
        return {'like': 0}


# get comments for a post
# /api/posts/:postId/comments

@post_routes.route('/<int:postId>/comments')
def post_comments(postId):
    comments = Comment.query.filter((postId == Comment.post_id),(Comment.parent_id == None)).all()
    arr = []
    for i in comments:
        comment = i.handle_replies()
        comment['owner'] = i.owner.to_dict()
        arr.append(comment)
    return {'comments':arr}

@post_routes.route('/<int:postId>/comments',methods=["POST"])
@login_required
def create_comment(postId):
    form = Comment_Form()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(form.validate_on_submit()):
        comment = Comment(content=form.content.data,owner_id=current_user.id,post_id=postId)
        db.session.add(comment)
        db.session.commit()
        res = comment.to_dict()
        res['owner'] = comment.owner.to_dict()
        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401