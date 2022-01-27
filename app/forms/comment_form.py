from flask_wtf import FlaskForm
from wtforms import StringField, IntegerField
from wtforms.validators import DataRequired


class Comment_Form(FlaskForm):
    content = StringField("content",validators=[DataRequired()])

class Reply_Form(FlaskForm):
    content = StringField("content",validators=[DataRequired()])
    post_id = IntegerField("post_id",validators=[DataRequired()])