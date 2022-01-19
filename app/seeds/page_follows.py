from app.models import db,Page_Follow


def seed_follows():
    follow1 = Page_Follow(page_id=1,user_id=1)
    follow2 = Page_Follow(page_id=1,user_id=2)
    follow3 = Page_Follow(page_id=2,user_id=2)

    db.session.add(follow1)
    db.session.add(follow2)
    db.session.add(follow3)
    db.session.commit()


def undo_follows():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()