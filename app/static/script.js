document.getElementById('buscar_dados').addEventListener('click', function() {
    fetch('/buscar_dados')
        .then(response => response.json())
        .then(data => {
            let html = '<ul>';
            data.forEach(item => {
                html += `<li style='margin-left:40%;'>PRODUTO:${item.nome}<br>VALOR:${item.valor}</li>`;
            });
            html += '</ul>';
            document.getElementById('dados').innerHTML = html;
        });
});

document.getElementById('formulario').addEventListener('submit', function(event) {
    event.preventDefault();

    const nome = document.getElementById('nome').value;
    const valor = document.getElementById('valor').value;

    fetch('/adicionar_dados', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ nome, valor })
    })
    .then(response => response.json())
    .then(data => {
        alert(data.message);
    });

    document.getElementById('nome').value = '';
    document.getElementById('valor').value = '';
});

document.getElementById('remover-button').addEventListener('click', function() {
    const nomeProduto = document.getElementById('produto-nome').value;

    if (!nomeProduto) {
        alert('Por favor, insira o nome do produto.');
        return;
    }

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

    fetch('/editar_dados', {
        method: 'PATCH',
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
