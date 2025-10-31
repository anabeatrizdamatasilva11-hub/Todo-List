// ------------- Buscar elementos
const botaoAdicionarTarefa = document.getElementById('botao-adicionar-tarefa') // -> Busca o botao de adicionar
const containerTarefasAfazer = document.querySelector('.container-tarefas-a-fazer') // -> Busca a div com todas as tarefas da coluna a fazer

// ------------- Funcao para adicionar a tarefa ao LocalStorage
function adicionaTarefaFazerLocalStorage(tarefa) { // -> Funcao para adicionar no localStorage
  const tarefasAdicionadas = localStorage.getItem('tarefasFazer') // -> Busca o conteudo ja adicionado no localStorage

  let tarefasAdicionadasArray = [] // -> Cria lista (array) vazio ]\
  if (tarefasAdicionadas != null || tarefasAdicionadas != undefined) { // -> Verifica se existe algo dentro do localStorage
    tarefasAdicionadasArray = JSON.parse(tarefasAdicionadas) // -> Existe algo dentro do localStoage? Sim? Entao transforma a string adicionado em array
  }

  tarefasAdicionadasArray.push(tarefa) // -> Adiciona tarefa passada pelo parametro na linha 4 a lista criada na linha 7

  const jsonLista = JSON.stringify(tarefasAdicionadasArray) // -> Transforma array em string para adicionar

  localStorage.setItem('tarefasFazer', jsonLista) // -> Adiciona todo conteudo no localStorage
}

// Funcao para adicionar a tarefa de a fazer na tela
function criarTarefaAfazer(nomeTarefa) { // -> Funcao para mostrar a tarefa na tela
  const div = document.createElement('div') // -> Cria uma div vazia
  div.classList.add('tarefa-a-fazer') // -> Adiciona a classe `tarefa-a-fazer`na div criada na linha de cima

  // -> Da linha 24 ate a 38 estamos adicionando todo conteudo da div vazia criada a cima
  div.innerHTML = `
    <div class="task-nome">
      <img src="./imagens/a-fazer.svg" alt="Icone de um circulo com 3 pontos">
      <p class="nome-tarefa">${nomeTarefa}</p>
    </div>

    <div class="task-acoes">
      <button>
        <img src="./imagens/relogio.svg" alt="Icone de um relogio com seta pra cima">
      </button>

      <button class="botao-excluir">
        <img src="./imagens/lixeira.svg" alt="Icone de uma lixeira">
      </button>
    </div>
  `

  containerTarefasAfazer.appendChild(div) // -> Adiciona div criada na linha 20 e com conteudo adicionado no container de tarefas (Linha 63 do index.html)
}

// ----------------- Escutador de eventos para o botao de adicionar tarefa
botaoAdicionarTarefa.addEventListener('click', function () { // -> Escuta o botao verde de adicionar
  const nomeTarefa = document.getElementById('mensagem').value // -> Pega o valor escrito no input

  if (nomeTarefa == null || nomeTarefa == '') { // -> Verifica se tem algo escrito no input
    alert('Adicione um nome a sua tarefa!') // -> Nao tem nada escrito? Coloca um alerta para o usuario
    return // -> Retorna a funcao para que ele nao adicione nada enquanto o input estiver vazio
  }

  criarTarefaAfazer(nomeTarefa) // -> Funcao para mostrar a tarefa na tela (Comeca na linha 19). O parametro nomeTarefa eh conteudo do input
  // LEIA A FUNCAO DA LINHA 19 ANTES DE CONTINUAR

  const tarefa = { // -> Cria o objeto da tarefa adicionada com nome e coluna
    nome: nomeTarefa,
    coluna: 'fazer'
  }

  adicionaTarefaFazerLocalStorage(tarefa) // -> Funcao para adicionar no localStorage (Comeca na linha 4)

  document.getElementById('mensagem').value = ''
})

// ----------------------- Busca as tarefas no LocalStorage para adicionar a tela
function buscarTarefasAfazer() { // -> Procura as tarefas da coluna `a fazer` dentro do localStorage para mostrar na tela
  const tarefas = localStorage.getItem('tarefasFazer') // -> Busca conteudo de dentro do localStorage

  if (tarefas != null || tarefas != undefined) {
    const lista = JSON.parse(tarefas)

    for (let index = 0; index < lista.length; index++) {
      criarTarefaAfazer(lista[index].nome) // -> Funcao para mostrar a tarefa na tela (Comeca na linha 19). O parametro nomeTarefa eh conteudo do input
    }
  }
}
buscarTarefasAfazer()

// --------------- Funcionalidade do botao excluir
function botaoExcluir() {
  const botaoLixeira = document.querySelectorAll(".botao-excluir") // -> Busca todos os botoes com a classe botao-excluir
  botaoLixeira.forEach((botao) => { // -> Percorre o array de botoes para adicionar um escutar de eventos de click
    botao.addEventListener('click', function (event) { // -> Adiciona o escutar de eventos ao botao da lista
      const elementoPai = event.target.parentNode.parentNode.parentNode // -> Busca o elemento do botao
      elementoPai.remove() // -> Remove o elemento da tela

      const nomeTarefa = elementoPai.querySelector('.nome-tarefa').textContent
      const tarefasLocalStorage = JSON.parse(localStorage.getItem('tarefasFazer'))

       const listaAtualizada = tarefasLocalStorage.filter((tarefa) => tarefa.nome != nomeTarefa)

      localStorage.setItem('tarefasFazer', JSON.stringify(listaAtualizada))
      
    })
  })
}
botaoExcluir() // Executa a funcao criada acima