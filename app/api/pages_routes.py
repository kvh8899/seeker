from flask import Blueprint, jsonify, session, request
from app.models import db, Page, Post,Page_Follow
from app.forms import PageForm,EditPageForm,Post_form
from flask_login import current_user, login_user, logout_user, login_required
from sqlalchemy import desc, func
pages_routes = Blueprint('pages',__name__)

def validation_errors_to_error_messages(validation_errors):
    """
    Simple function that turns the WTForms validation errors into a simple list
    """
    errorMessages = []
    for field in validation_errors:
        for error in validation_errors[field]:
            errorMessages.append(f'{field}')
    return errorMessages

# get a page by id

@pages_routes.route("/<int:id>")
def post_by_id(id):
    page = Page.query.filter(id == Page.id).first()
    currPage = page.to_dict()
    currPage['subscribers'] = len(page.subscribers)
    if(page):
        return currPage
    else:
        return none;


# get all pages
@pages_routes.route("")
def all_posts():
    pages = Page.query.all();
    page_t = []
    for i in pages:
        page_t.append(i.to_dict())
    return page_t

# get trending pages by follows
@pages_routes.route("/trending")
def tre_posts():
    pages = db.session.query(Page,func.count(Page_Follow.user_id).label('total')).join(Page_Follow,isouter=True).group_by(Page).order_by(desc('total')).all();
    arr = [ i[0].to_dict() for i in pages ]
    return {'pages':arr}
#get posts of a page /api/posts/:pageId

@pages_routes.route('/<int:pageId>/posts')
def page_posts(pageId):
    posts = Post.query.filter(pageId == Post.page_id).order_by(desc(Post.id)).all()
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

# create a page
# /api/pages/new
@pages_routes.route("/new",methods=['POST'])
def new_page():
    form = PageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(form.validate_on_submit()):
        page = Page(title=form.title.data,category=form.category.data,followers_type=form.followers_type.data,owner_id=current_user.id)
        db.session.add(page)
        db.session.commit()
        follow = Page_Follow(page_id=page.id,user_id=current_user.id)
        db.session.add(follow)
        db.session.commit()
        return {'page':page.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# edit a page
#/api/pages/:id/edit

@pages_routes.route("/<int:id>/edit",methods=["PATCH"])
def edit_page(id):
    form = EditPageForm();
    form['csrf_token'].data = request.cookies['csrf_token']

    if(form.validate_on_submit()):
        page = Page.query.filter(id == Page.id).first()

        page.profile_image = form.profile_image.data
        page.theme = form.theme.data
        page.description = form.description.data
        db.session.commit()
        return page.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401

# delete a page
# /api/pages/:id/delete

@pages_routes.route("/<int:id>/delete",methods=["DELETE"])
def delete_page(id):
    page =  Page.query.filter(id == Page.id).first()
    db.session.delete(page)
    db.session.commit()
    return {'delete':'success'}
    
# add a post to a page
# /api/pages/:id/posts

@pages_routes.route("/<int:pageId>/posts",methods=["POST"])
def create_post(pageId):
    form = Post_form()
    form['csrf_token'].data = request.cookies['csrf_token']
    if(form.validate_on_submit()):
        post = Post(heading=form.heading.data,content=form.content.data,
        page_id=pageId,owner_id=current_user.id)
        db.session.add(post)
        db.session.commit()
        return post.to_dict()
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401
    




