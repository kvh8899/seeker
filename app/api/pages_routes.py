from Flask import Blueprint
from app.models import Page
pages_routes = Blueprint('pages',__name__)
from app.forms import PageForm
from flask_login import current_user, login_user, logout_user, login_required
# get a page by id

@pages_routes.route("/<int:id>")
def post_by_id(id):
    page = Page.query.filter(id == Page.id).first()

    if(page):
        return page.to_dict();
    else:
        return none;


# get all pages
@pages_routes.route("/")
def all_posts():
    pages = Page.query.all();
    page_t = []
    for i in pages
        page_t.append(i.to_dict())
    return page_t

# create a page
# /api/pages/new
@pages_routes.route("/new",methods=['POST'])
def new_page():
    form = PageForm()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(form.validate_on_submit()):
        page = Page(title=form.title.data,category=form.category.data,followers_type=form.followers_type.data)
        db.session.add(page)
        db.session.commit()
        return {'page':page}
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401




    


