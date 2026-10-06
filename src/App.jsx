import { useState, useEffect } from 'react'

// useEffect -> Serve para executar um efeito colateral no componente.

// Importando o CSS
import './App.css'

function App() {
  // Estado que irá armazenar os usuários.
  const [usuarios, setUsuarios] = useState([])
  const [carregando, setCarregando] = useState(true)
  const [erro, setErro] = useState(null)

  // Métodos HTTP
  // GET -> Busca informações
  // POST -> Cria uma nova informação
  // UPDATE -> Atualiza uma informação
  // DELETE -> Deleta uma informação

  // GET com useEffect -> Busca as informações ao carregar a página
  useEffect(() => {
    // Async -> Garante que a minha função funcione de forma
    // assíncrona.

    // Await -> Faz meu código esperar até que a operação naquela linha
    // seja concluída.
    async function buscaUsuarios() {
      // try -> Tenta executar uma operação que pode causar um erro
      try {
        // Busca as informações na API
        const resposta = await fetch('https://jsonplaceholder.typicode.com/users')

        // Lança um erro caso ocorra algum problema nos dados.
        if (!resposta.ok) {
          throw new Error('Falha ao buscar os dados')
        }

        // Extrai os dados da resposta
        const dados = await resposta.json()

        setUsuarios(dados)

        // catch -> Captura o erro caso ocorra.
      } catch (err) {
        setErro(err.message)
        // finally -> Executa tanto se houver erro ou não ( após tudo ter sido executado )
      } finally {
        setCarregando(false)
      }
    }

    buscaUsuarios()
  }, [])

  // Exibe a mensagem de carregamento ou de erro caso algum dos dois exista
  if (carregando) return <div className='status'>Carregando usuários...</div>
  if (erro) return <div className='status erro'>Erro: {erro}</div>

  return (
    <div className='container'>

      {/* Renderizando os usuários */}
      <h2>Lista de Usuários ({usuarios.length})</h2>
      <ul className='user-list'>
        {/* Mapeando cada usuário dentro da lista */}
        {usuarios.map(usuario => (
          <li key={usuario.id} className='user-card'>
            <h3>{usuario.name}</h3>

            <p><strong>E-mail:</strong> {usuario.email}</p>
            <p><strong>Empresa:</strong> {usuario.company?.name || 'Não informado'}</p>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default App
