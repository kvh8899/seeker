from flask_wtf import FlaskForm
from wtforms import StringField,TextField
from wtforms.validators import DataRequired

class Post_form(FlaskForm):
    heading = StringField('heading',validators=[DataRequired()])
    content = TextField('content',validators=[DataRequired()])
