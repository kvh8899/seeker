from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User


class PageForm(FlaskForm):
    title = StringField('title',validators=[DataRequired()])
    category = StringField('category',validators=[DataRequired()])
    followers_type = StringField('followers_type',validators=[DataRequired()])