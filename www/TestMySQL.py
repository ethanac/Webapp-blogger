import pymysql

conn = pymysql.connect(user='root', password='', database='TEST')
cursor = conn.cursor()
cursor.execute('create table user (id varchar(20) PRIMARY KEY, name VARCHAR(20))')
cursor.execute('insert into user (id, name) values (%s, %s)', ['1', 'Michael'])
cursor.rowcount
conn.commit()
cursor.close()
cursor = conn.cursor()
cursor.execute('select * from user where id = %s', ('1',))
values = cursor.fetchall()
print(values)
print(cursor.close())
conn.close()