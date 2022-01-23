from flask_wtf import FlaskForm
from wtforms import StringField,TextField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

class Create_post(FlaskForm):
    heading = StringField('heading',validators=[DataRequired()])
    contentImage = StringField('contentImage')
    content = TextField('content')
