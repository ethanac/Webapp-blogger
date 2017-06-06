import orm
import asyncio
from models import User, Blog, Comment


def test():
    loop = asyncio.get_event_loop()
    yield from orm.create_pool(loop, user='www-data', password='www-data', database='awesome')

    u = User(name='Test', email='test@example.com', passwd='123456', image='about:blank')
    yield from u.save()

for x in test():
    pass