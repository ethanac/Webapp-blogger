import orm
import asyncio, aiomysql
from models import User


def test():
    nloop = asyncio.get_event_loop()
    aiomysql.create_pool(
        host='localhost',
        port='3306',
        # unix_socket='/tmp/mysql.sock',
        user='www-data',
        password='www-data',
        db='awesome',
        charset='utf8',
        autocommit=True,
        maxsize=10,
        minsize=1,
        loop=nloop
    )

    # u = User(name='Test', email='test@example.com', passwd='123456', image='about:blank')
    # yield from u.save()

test()

# result of yield from must be saved and used in future.
