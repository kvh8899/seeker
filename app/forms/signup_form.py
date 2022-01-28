from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User
import re


def username_exists(form, field):
    # Checking if username is already in use
    username = field.data
    user = User.query.filter(User.username == username).first()
    if user:
        raise ValidationError('use')

def username_len(form,field):
    username = field.data
    if(len(username) < 3):
        raise ValidationError('u_len')
def p_length(form,field):
    password = field.data
    if(len(password) <= 5):
        raise ValidationError('p_len')

def p_special_char(form,field):
    password = field.data
    if(not re.search("[)(*&^%$#@!/<>{}+=]",password)):
        raise ValidationError('p_special')

def p_num(form,field):
    password = field.data
    if(not re.search("[\d]",password)):
        raise ValidationError('p_num')


class SignUpForm(FlaskForm):
    username = StringField(
        'username', validators=[DataRequired(), username_exists,username_len])
    password = StringField('password', validators=[DataRequired(),p_length,p_special_char,p_num])
