const botaoAdicionarTarefa = document.getElementById('botao-adicionar-tarefa')
const containerTarefasAfazer = document.querySelector('.container-tarefas-a-fazer')

function adicionaTarefaFazerLocalStorage(tarefa) {
  const json = JSON.stringify(tarefa)

  localStorage.setItem('tarefasFazer', json)
}

function criarTarefaAfazer(nomeTarefa) {
  const div = document.createElement('div')
  div.classList.add('tarefa-a-fazer')

  div.innerHTML = `
    <div class="task-nome">
      <img src="./imagens/a-fazer.svg" alt="Icone de um circulo com 3 pontos">
      <p>${nomeTarefa}</p>
    </div>

    <div class="task-acoes">
      <button>
        <img src="./imagens/relogio.svg" alt="Icone de um relogio com seta pra cima">
      </button>

      <button>
        <img src="./imagens/lixeira.svg" alt="Icone de uma lixeira">
      </button>
    </div>
  `

  containerTarefasAfazer.appendChild(div)

  const tarefa = {
    nome: nomeTarefa,
    coluna: 'fazer'
  }
  adicionaTarefaFazerLocalStorage(tarefa)
}

botaoAdicionarTarefa.addEventListener('click', function() {
  const nomeTarefa = document.getElementById('mensagem').value

  if (nomeTarefa == null || nomeTarefa == '') {
    alert('Adicione um nome a sua tarefa!')
    return
  }

  criarTarefaAfazer(nomeTarefa)

  document.getElementById('mensagem').value = ''
})

function buscarTarefasAfazer() {
  
}