import sqlite3

conn = sqlite3.connect('banco.db')
cursor = conn.cursor()
cursor.execute('''
    CREATE TABLE produtos (
        nome TEXT,
        valor INTEGER,
        quantidade INTEGER
    )
''')

conn.commit()
conn.close()
