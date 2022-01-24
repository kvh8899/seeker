from flask_wtf import FlaskForm
from wtforms import StringField,TextField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class Post_form(FlaskForm):
    heading = StringField('heading',validators=[DataRequired()])
    contentImage = StringField('contentImage')
    content = TextField('content')
