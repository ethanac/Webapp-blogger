import pymysql, orm, asyncio


def test():
    print('OK. Step 2 ... ')
    loop = asyncio.get_event_loop()
    yield from orm.create_pool(loop, user='www-data', password='www-data', database='awesome')
    print("OK. finished.")


conn = pymysql.connect(user='root', password='', database='TEST')
cursor = conn.cursor()
cursor.execute('drop table if exists user2')
cursor.execute('create table user2 (id varchar(20) PRIMARY KEY, name VARCHAR(20))')
cursor.execute('insert into user2 (id, name) values (%s, %s)', ['1', 'Michael'])
cursor.rowcount
conn.commit()
cursor.close()
cursor = conn.cursor()
cursor.execute('select * from user2 where id = %s', ('1',))
values = cursor.fetchall()
print(values)
print(cursor.close())
conn.close()

for x in test():
    pass
