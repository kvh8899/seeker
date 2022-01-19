from app.models import db,Comment


def seed_comments():
    comment1 = Comment(content="This is really helpful! thanks",owner_id=1,post_id=2)
    comment2 = Comment(content="story 2-10 was hard lol",owner_id=1,post_id=2)
    db.session.add(comment1)
    db.session.add(comment2)

    db.session.commit()


def undo_comments():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
