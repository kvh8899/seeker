from app.models import db,Like


def seed_likes():
    like1 = Like(user_id=1,post_id=2)
    like2 = Like(user_id=2,post_id=2)
    like3 = Like(user_id=2,post_id=1)

    db.session.add(like1)
    db.session.add(like2)
    db.session.add(like3)

    db.session.commit()

def undo_likes():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
