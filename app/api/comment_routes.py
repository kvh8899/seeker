from flask import Blueprint
from app.forms import Comment_Form
comment_routes = Blueprint('comments',__name__)

# reply to a comment
@comment_routes.route('/<int:commentId>/reply',methods=["POST"])
def reply(commentId):
    form = Comment_Form()
    form['csrf_token'].data = request.cookies['csrf_token']

    if(form.validate_on_submit()):
        comment = Comment(content=form.content.data,owner_id=current_user.id,post_id=postId,parent_id=commentId)
        db.session.add(comment)
        db.session.commit()
        res = comment.to_dict()
        res['owner'] = comment.owner.to_dict()
        return res
    return {'errors': validation_errors_to_error_messages(form.errors)}, 401