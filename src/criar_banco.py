import sqlite3

# Passo 1: Conectar ao banco de dados
conn = sqlite3.connect('banco.db')

# Passo 2: Criar um cursor
cursor = conn.cursor()

# Passo 3: Criar a tabela
cursor.execute('''
    CREATE TABLE produtos (
        nome TEXT,
        valor INTEGER
    )
''')

# Passo 4: Salvar as alterações e fechar a conexão
conn.commit()
conn.close()
