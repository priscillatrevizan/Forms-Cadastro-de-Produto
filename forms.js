let produtos = [];

function cadastrarProduto() {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const disponivel = document.getElementById("disponivel").value === "sim";

  // Verifica se o nome do produto já existe na lista
  const produtoExistente = produtos.find((produto) => produto.nome === nome);
  if (produtoExistente) {
    // Se o produto já existe e a disponibilidade é diferente, exibe mensagem de confirmação
    if (produtoExistente.disponivel !== disponivel) {
      if (
        confirm(
          `O produto "${nome}" já está cadastrado.\nDeseja alterar a disponibilidade?`
        )
      ) {
        produtoExistente.disponivel = disponivel;
        listarProdutos();
      }
    } else {
      mostrarAlerta(
        "Este nome de produto já existe na lista. Por favor, escolha outro."
      );
    }
    return;
  }

  // Verifica se o nome do produto não está vazio e o valor é um número válido
  if (nome.trim() !== "" && !isNaN(valor)) {
    produtos.push({ nome, descricao, valor, disponivel });
    listarProdutos();
  } else {
    mostrarAlerta("Por favor, preencha o nome do produto e um valor válido.");
  }
}

function listarProdutos() {
  const listaProdutos = document.getElementById("produtos-lista");
  listaProdutos.innerHTML = "";

  produtos.sort((a, b) => a.valor - b.valor);

  produtos.forEach((produto) => {
    const tr = document.createElement("tr");
    tr.innerHTML = `
            <td>${produto.nome}</td>
            <td>R$ ${produto.valor.toFixed(2)}</td>
            <td>${produto.disponivel ? "Sim" : "Não"}</td>
        `;
    listaProdutos.appendChild(tr);
  });
}

function mostrarAlerta(mensagem) {
  const alerta = document.createElement("div");
  alerta.classList.add("error-alert");
  alerta.textContent = mensagem;

  const cadastroForm = document.getElementById("cadastro-form");
  cadastroForm.insertBefore(alerta, cadastroForm.firstChild);
  setTimeout(() => {
    alerta.remove();
  }, 3000);
}

listarProdutos();
