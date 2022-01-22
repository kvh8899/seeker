from flask import Blueprint, jsonify, session, request
from app.models import db, Page, Post
from app.forms.page_form import PageForm
from flask_login import current_user, login_user, logout_user, login_required

pages_routes = Blueprint('pages',__name__)

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

#get posts of a page /api/posts/:pageId

@pages_routes.route('/<int:pageId>/posts')
def page_posts(pageId):
    posts = Post.query.filter(pageId == Post.page_id).all()
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
        return {'page':page.to_dict()}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




    


