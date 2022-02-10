from flask import Blueprint
from app.models import db,Page
search_routes = Blueprint('search',__name__)

@search_routes.route('/pages/<string:query>')
def searchCommunities(query):
    pages = Page.query.filter(Page.title.ilike(f'%{query}%')).all()
    
    return {'search':[i.to_dict() for i in pages]}