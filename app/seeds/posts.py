
from app.models import db,Page

def seed_posts():
    post1 = Post(content="""Hi guy. 
    I'm making Arknights guide of hard stage for beginner.
    I'm beginner for this game myself so I try to explain thing step by step and make it easiest to understand. 
    Here is my guide so far. 
    Story 2-10 : https://youtu.be/bRkEXepNWCw 
    Gold Farming 4 (CE-4) : https://youtu.be/NZTI4dOtOh0 
    EXP Farming 4 (LS-4) : https://youtu.be/xTxhIYflX_0 
    Story 2-5 : https://youtu.be/1ZVGscwAEG4 
    Would be great to hear some feedback to improve these guide :)""",page_id=2,owner_id=1)
    post2 = Post(content="""Iron Banner, and Crucible, Vanguard, and Gambit Clan bounties are not in a rotation, so grab them and complete them ASAP.Assuming that another Iron Banner comes around before February 22nd, and that it has all three bounties that haven’t been available since December, there are 26 weekly bounties. If those bounties don’t come around, grab three daily ones on each character instead.
Daily Bounties
Assuming you have 26 weekly bounties, there are 37 available bounty spots for daily bounties. Repeatable bounties grant 4,000 XP, while daily ones grant 6,000 XP.
Some users have noted that hoarding bounties that lead to a powerful engram can mess up the power level of said engram. To be safe, hoard Nessus, EDZ, Moon, and Cosmodrome bounties, and any other bounties that do not lead to powerful rewards.
Leave one to three slots open for the seasonal/DLC quest too to avoid possible bugs that have happened previously.
XP totals
Blinding Light is going away at the end of season 15, so assume that the Ghost perk will grant a max of 10% bonus XP.
Season Pass will probably grant 20% bonus XP, so at level 1, players will get a 32% XP boost.
Well Rested buff grants double progress for the first five levels, essentially adding 250,000 XP to your total XP pool for free.
XP total = (26 weeklies * 12000 + 37 dailies * 6000) * 3 + 250000 = 1,602,000
If leveling solo, you’ll be able to reach level 26. If you’re leveling in a fireteam, all at 1 season pass level at the start, you’ll reach level 26. If you’re are somehow turning in bounties with two players at level 86+, you’ll reach level 30.
If you’d like to visualize how your level gains will look like, make a copy of this spreadsheet and input your total weekly and daily bounties per character.""",page_id=1,owner_id=1)
    db.session.add(post1)
    db.session.add(post2)
    
    db.session.commit()

def undo_posts():
    db.session.execute('TRUNCATE users RESTART IDENTITY CASCADE;')
    db.session.commit()
