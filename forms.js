let produtos = [];

function cadastrarProduto() {
  const nome = document.getElementById("nome").value;
  const descricao = document.getElementById("descricao").value;
  const valor = parseFloat(document.getElementById("valor").value);
  const disponivel = document.getElementById("disponivel").value === "sim";

  // Verifica se o nome do produto já existe na lista
  if (produtos.some((produto) => produto.nome === nome)) {
    alert("Este nome de produto já existe na lista. Por favor, escolha outro.");
    return;
  }

  // Verifica se o nome do produto não está vazio e o valor é um número válido
  if (nome.trim() !== "" && !isNaN(valor)) {
    produtos.push({ nome, descricao, valor, disponivel });
    listarProdutos();
  } else {
    alert("Por favor, preencha o nome do produto e um valor válido.");
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
            <td>R$ ${produto.valor.toFixed(
              2
            )}</td> <!-- Formata o valor com "R$" -->
            <td>${
              produto.disponivel ? "Sim" : "Não"
            }</td> <!-- Mostra "Sim" se disponível, "Não" caso contrário -->
        `;
    listaProdutos.appendChild(tr);
  });
}

listarProdutos();
