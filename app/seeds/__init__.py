from flask.cli import AppGroup
from .users import seed_users, undo_users
from .pages import seed_pages, undo_pages
from .posts import seed_posts,undo_posts
from .page_follows import seed_follows,undo_follows
from .comments import seed_comments,undo_comments
from .likes import seed_likes,undo_likes
# Creates a seed group to hold our commands
# So we can type `flask seed --help`
seed_commands = AppGroup('seed')


# Creates the `flask seed all` command
@seed_commands.command('all')
def seed():
    seed_users()
    seed_pages()
    seed_posts()
    seed_follows()
    seed_comments()
    seed_likes()
    # Add other seed functions here


# Creates the `flask seed undo` command
@seed_commands.command('undo')
def undo():
    undo_users()
    undo_pages()
    undo_posts()
    undo_follows()
    undo_comments()
    undo_likes()
    # Add other undo functions here
