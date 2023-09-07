from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)

# Função para conectar ao banco de dados SQLite
def connect_db():
    return sqlite3.connect('exemplo.db')

# Rota para a página HTML
@app.route('/')
def index():
    return render_template('index.html')

# Rota para buscar dados da tabela SQL
@app.route('/buscar_dados', methods=['GET'])
def buscar_dados():
    try:
        # Conectar ao banco de dados
        conn = connect_db()
        cursor = conn.cursor()

        # Executar consulta SQL
        cursor.execute("SELECT * FROM sua_tabela")
        rows = cursor.fetchall()

        # Fechar conexão com o banco de dados
        conn.close()

        # Converter os resultados em um formato JSON
        data = []
        for row in rows:
            data.append({
                'campo1': row[0],
                'campo2': row[1],
                # Adicione mais campos conforme necessário
            })

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/adicionar_dados', methods=['POST'])
def adicionar_dados():
    try:
        # Obter dados JSON da solicitação POST
        data = request.get_json()

        # Conectar ao banco de dados
        conn = connect_db()
        cursor = conn.cursor()

        # Inserir dados na tabela
        cursor.execute("INSERT INTO sua_tabela (campo1, campo2) VALUES (?, ?)", (data['campo1'], data['campo2']))

        # Salvar as alterações e fechar a conexão com o banco de dados
        conn.commit()
        conn.close()

        return jsonify({'message': 'Dados adicionados com sucesso!'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
