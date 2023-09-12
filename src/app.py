from flask import Flask, render_template, request, jsonify
import sqlite3

app = Flask(__name__)


def connect_db():
    return sqlite3.connect('banco.db')


@app.route('/')
def index():
    return render_template('index.html')

@app.route('/buscar_dados', methods=['GET'])
def buscar_dados():
    try:
        conn = connect_db()
        cursor = conn.cursor()


        cursor.execute("SELECT * FROM produtos")
        rows = cursor.fetchall()


        conn.close()


        data = []
        for row in rows:
            data.append({
                'nome': row[0],
                'valor': row[1],
                # Adicionar mais campos 
            })

        return jsonify(data)

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/adicionar_dados', methods=['POST'])
def adicionar_dados():
    try:
        data = request.get_json()

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("INSERT INTO produtos (nome, valor) VALUES (?, ?)", (data['nome'], data['valor']))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Dados adicionados com sucesso!'})

    except Exception as e:
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
