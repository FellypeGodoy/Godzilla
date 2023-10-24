from flask import Flask, render_template, request, jsonify
import psycopg2


app = Flask(__name__)


def connect_db():
    conn = psycopg2.connect(
        host='localhost',
        database='aurelionsol',
        user='olkaida',
        password='estrelas123'
    )
    return conn


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
                'quantidade': row[2],
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

        cursor.execute("INSERT INTO produtos (nome, valor, quantidade) VALUES (%s, %s, %s)",
                       (data['nome'], data['valor'], data['quantidade']))

        conn.commit()
        conn.close()

        return jsonify({'message': 'Dados adicionados com sucesso!'})

    except Exception as e:
        return jsonify({'error': str(e)})


@app.route('/editar_valor', methods=['PUT'])
def editar_dados():
    try:
        data = request.get_json()
        nome = data.get('nome')
        novo_valor = data.get('novoValor')

        if not nome or novo_valor is None:
            return jsonify({"message": "Campos inválidos"}), 400

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("UPDATE produtos SET valor = %s WHERE nome = %s", (novo_valor, nome))
        conn.commit()
        conn.close()

        return jsonify({"message": "Dados editados com sucesso"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/editar_quantidade', methods=['PUT'])
def editar_quantidade():
    try:
        data = request.get_json()
        nome = data.get('nome')
        quantidade = data.get('quantidade')

        if not nome or quantidade is None:
            return jsonify({"message": "Campos inválidos"}), 400

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("UPDATE produtos SET quantidade = %s WHERE nome = %s", (quantidade, nome))
        conn.commit()
        conn.close()

        return jsonify({"message": "Dados editados com sucesso"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route('/remover_dados', methods=['DELETE'])
def remover_dados():
    try:
        data = request.get_json()
        nome_produto = data.get('nome_produto')

        if not nome_produto:
            return jsonify({"message": "Falta 'nome_produto' no JSON da solicitação"}), 400

        conn = connect_db()
        cursor = conn.cursor()

        cursor.execute("DELETE FROM produtos WHERE nome = %s", (nome_produto,))
        conn.commit()

        conn.close()

        return jsonify({"message": "Dados removidos com sucesso"})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)

