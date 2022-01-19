from flask_wtf import FlaskForm
from wtforms import StringField
from wtforms.validators import DataRequired, Email, ValidationError
from app.models import User

def password_matches(form, field):
    # Checking if password matches
    username = form.username.data
    password = field.data
    user = User.query.filter(User.username == username).first()
    if not user:
        raise ValidationError('No such user exists.')
    if not user.check_password(password):
        raise ValidationError('No such user exists.')


class LoginForm(FlaskForm):
    username = StringField('username', validators=[DataRequired()])
    password = StringField('password', validators=[
                           DataRequired(), password_matches])
