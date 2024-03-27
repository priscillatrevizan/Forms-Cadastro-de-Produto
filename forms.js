let produtos = [];
function mostrarConfirmacao(mensagem, callback) {
  const confirmacao = document.createElement("div");
  confirmacao.classList.add("confirmacao");
  confirmacao.textContent = mensagem;

  const btnSim = document.createElement("button");
  btnSim.textContent = "Sim";
  btnSim.onclick = () => {
    callback(true);
    confirmacao.remove();
  };
  confirmacao.appendChild(btnSim);

  const btnNao = document.createElement("button");
  btnNao.textContent = "Não";
  btnNao.onclick = () => {
    callback(false);
    confirmacao.remove();
  };
  confirmacao.appendChild(btnNao);

  const cadastroForm = document.getElementById("cadastro-form");
  cadastroForm.insertBefore(confirmacao, cadastroForm.firstChild);
}

function cadastrarProduto() {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const disponivel = document.getElementById("disponivel").value === "sim";

  const produtoExistente = produtos.find((produto) => produto.nome === nome);
  if (produtoExistente) {
    if (produtoExistente.disponivel !== disponivel) {
      mostrarConfirmacao(
        `O produto "${nome}" já está cadastrado.\nDeseja alterar a disponibilidade?`,
        (resposta) => {
          if (resposta) {
            produtoExistente.disponivel = disponivel;
            listarProdutos();
          }
        }
      );
    } else {
      mostrarAlerta(
        "Este nome de produto já existe na lista. Por favor, escolha outro."
      );
    }
    return;
  }

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
