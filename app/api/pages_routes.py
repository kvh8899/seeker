from flask import Blueprint
from app.models import Page
pages_routes = Blueprint('pages',__name__)

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
    for i in pages:
        page_t.append(i.to_dict())
    return page_t


    


