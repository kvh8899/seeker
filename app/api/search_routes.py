from flask import Blueprint
from app.models import db,Page, Page_Follow
search_routes = Blueprint('search',__name__)

@search_routes.route('/pages/<string:query>')
def searchCommunities(query):
    pages = Page.query.filter(Page.title.ilike(f'%{query}%')).join(Page_Follow).all()
    result = []
    for i in pages:
        num_follow = Page_Follow.query.filter(i.id == Page_Follow.page_id).all()
        page = i.to_dict()
        page['follows'] = len(num_follow)
        result.append(page)
    return {'search':result}