document.getElementById('buscar_dados').addEventListener('click', function() {
    fetch('/buscar_dados')
        .then(response => response.json())
        .then(data => {
            let html = '<table border="1"><tr><th>PRODUTO</th><th>VALOR</th><th>QUANTIDADE</th></tr>';
            data.forEach(item => {
                html += `
                    <tr>
                        <td>${item.nome}</td>
                        <td>${item.valor}</td>
                        <td>${item.quantidade}</td>
                    </tr>
                `;
            });
            html += '</table>';
            document.getElementById('dados').innerHTML = html;
        });
});


document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;
    const quantidade = document.getElementById('quantidade').value

    fetch('/adicionar_dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, valor, quantidade })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });

    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
    document.getElementById('quantidade').value = '';
});

document.getElementById('remover-button').addEventListener('click', function() {
    const nomeProduto = document.getElementById('produto-nome').value;

    if (!nomeProduto) {
        alert('Por favor, insira o nome do produto.');
        return;
    }

    // Realiza uma solicitação DELETE quando o botão é clicado
    fetch('/remover_dados', {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome_produto: nomeProduto })
    })
    .then(response => {
        if (response.ok) {
            alert('Dados removidos com sucesso!');
        } else {
            alert('Erro ao remover dados!');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
        
    });
});

document.getElementById('editar-button').addEventListener('click', function(event) {
event.preventDefault();

const nome = document.getElementById('editar-nome').value;
const novoValor = document.getElementById('editar-valor').value;

if (!nome || !novoValor) {
    alert('Por favor, preencha ambos os campos.');
    return;
}

fetch('/editar_valor', {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json'
    },
    body: JSON.stringify({ nome, novoValor })
})
.then(response => {
    if (response.ok) {
        alert('Dados editados com sucesso!');
        document.getElementById('editar-nome').value = '';
        document.getElementById('editar-valor').value = '';
    } else {
        alert('Erro ao editar dados!');
    }
})
.catch(error => {
    console.error('Erro:', error);
});
});


document.getElementById('adicionar-button').addEventListener('click', function(event) {
    event.preventDefault();

    const nome = document.getElementById('adicionar-nome').value;
    const quantidade = document.getElementById('adicionar-quantidade').value;

    if (!nome || !quantidade) {
        alert('Por favor, preencha ambos os campos.');
        return;
    }

    fetch('/editar_quantidade', {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, quantidade })
    })
    .then(response => {
        if (response.ok) {
            alert('Dados editados com sucesso!');
            document.getElementById('adicionar-nome').value = '';
            document.getElementById('adicionar-quantidade').value = '';
        } else {
            alert('Erro ao editar dados!');
        }
    })
    .catch(error => {
        console.error('Erro:', error);
    });
});