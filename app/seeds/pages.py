from app.models import db,Page

def seed_pages():
    destiny = Page(
        title="Destiny",profile_image="https://store-images.s-microsoft.com/image/apps.56448.13765275941272403.d300dc8f-cd03-4732-9f04-83b45076c1c6.3d42d75b-9f32-43e7-aa63-08974f6f7b96?q=90&w=480&h=270",category="shooter",description="This is the Official Destiny Page",owner_id=1,followers_type="guardians",theme="dark")
    arknights = Page(
        title="Arknights",profile_image="https://yt3.ggpht.com/ytc/AKedOLQ_8V1EeAuhfxS_hY0Mxphm7gDpz-W0tq1qRJ0U=s900-c-k-c0x00ffffff-no-rj",category="towerdefense",description="Welcome to the offical page for Arknights! You can find all kinds of guides on stages and operators here",owner_id=2,followers_type="Dokutahs",theme="dark")

    db.session.add(destiny)
    db.session.add(arknights)
    db.session.commit()

def undo_pages():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()