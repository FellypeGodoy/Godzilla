document.getElementById("addProd").addEventListener("click", function() {

    var campo1 = document.createElement("input");
    campo1.setAttribute("type", "text");
    campo1.setAttribute("placeholder", "Nome do Produto");
    campo1.className="camp1"
    campo1.id="nome"

    var campo2 = document.createElement("input");
    campo2.setAttribute("type", "text");
    campo2.setAttribute("placeholder", "Valor");
    campo2.className="camp2"
    campo2.id="valor"

    var campo3 = document.createElement("input");
    campo3.setAttribute("type", "text");
    campo3.setAttribute("placeholder", "Quantidade");
    campo3.className="camp3"
    campo3.id="quantidade"
    
    var botaoEnviar = document.createElement("button");
    botaoEnviar.textContent = "Enviar";
    botaoEnviar.id="addProd1"

    
    var quadrado = document.getElementById("quadrado");
    
    quadrado.innerHTML = "";

    
    quadrado.appendChild(campo1);
    quadrado.appendChild(campo2);
    quadrado.appendChild(campo3);
    quadrado.appendChild(botaoEnviar);
});

document.getElementById("rmvProd").addEventListener("click", function() {

    var campo1 = document.createElement("input");
    campo1.setAttribute("type", "text");
    campo1.setAttribute("placeholder", "Nome do Produto");
    campo1.className="camp1"
    campo1.id="produto-nome"

    var botaoEnviar = document.createElement("button");
    botaoEnviar.textContent = "Enviar";
    botaoEnviar.id="rmvProd1"


    var quadrado = document.getElementById("quadrado");


    quadrado.innerHTML = "";


    quadrado.appendChild(campo1);
    quadrado.appendChild(botaoEnviar);

});

document.getElementById("editVal").addEventListener("click", function() {

    var campo1 = document.createElement("input");
    campo1.setAttribute("type", "text");
    campo1.setAttribute("placeholder", "Nome do Produto");
    campo1.className="camp1"
    campo1.id="editar-nome"

    var campo2 = document.createElement("input");
    campo2.setAttribute("type", "text");
    campo2.setAttribute("placeholder", "Valor");
    campo2.className="camp2"
    campo2.id="editar-valor"

    var botaoEnviar = document.createElement("button");
    botaoEnviar.textContent = "Enviar";
    botaoEnviar.id="editVal1"


    var quadrado = document.getElementById("quadrado");


    quadrado.innerHTML = "";


    quadrado.appendChild(campo1);
    quadrado.appendChild(campo2);
    quadrado.appendChild(botaoEnviar);
});

document.getElementById("editQtd").addEventListener("click", function() {

    var campo1 = document.createElement("input");
    campo1.setAttribute("type", "text");
    campo1.setAttribute("placeholder", "Nome do Produto");
    campo1.className="camp1"
    campo1.id="adicionar-nome"

    var campo2 = document.createElement("input");
    campo2.setAttribute("type", "text");
    campo2.setAttribute("placeholder", "Quantidade");
    campo2.className="camp2"
    campo2.id="adicionar-quantidade"

    var botaoEnviar = document.createElement("button");
    botaoEnviar.textContent = "Enviar";
    botaoEnviar.id="editQtd1"
    


    var quadrado = document.getElementById("quadrado");

    quadrado.innerHTML = "";

    
    quadrado.appendChild(campo1);
    quadrado.appendChild(campo2);
    quadrado.appendChild(botaoEnviar);
    
});

// Script Banco

document.getElementById('busProd').addEventListener('click', function() {
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


document.getElementById('addProd1').addEventListener('submit', function(event) {
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

document.getElementById('rmvProd1').addEventListener('click', function() {
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

document.getElementById('editVal1').addEventListener('click', function(event) {
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


document.getElementById('editQtd1').addEventListener('click', function(event) {
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