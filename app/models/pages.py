from db import db




class Pages(db.Model):
    __tablename__ = "pages"
    id = db.Column(db.Integer,primary_key=True)
    title = db.Column(db.String(150),nullable=False)
    profile_image = db.Column(db.String)
    category = db.Column(db.String(50),nullable=False)
    owner_id = db.Column(db.Integer,db.ForeignKey('users.id'),nullable=False)
    followers_type = db.Column(db.String,nullable=False)
    theme = db.Column(db.String)
    created_at = db.Column(db.DateTime)

    owner = db.relationship("User",back_populates="page",cascade="all, delete")

    def to_dict(self):
        return{
            'id':self.id,
            'title':self.title,
            'profile_image':self.profile_image,
            'category':self.category,
            'owner_id':self.owner_id,
            'followers_type':self.followers_type,
            'theme':self.theme,
            'created_at':self.created_at
        }
