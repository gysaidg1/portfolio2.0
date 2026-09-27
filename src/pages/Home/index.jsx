
import { useState } from 'react'
import './style.css'
import ftper from '../../assets/ftper.jpg'
import mcMotors from '../../assets/mc\'motors.JPG' 
import uvaflix from '../../assets/uvaflix.jpg'
import obralyx from '../../assets/obralyx.jpg'


const projetos = [
  {
    id: 1,
    nome: "MC' Motors",
    descricao: "Landing page automotiva.",
    tecnologias: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
    linguagem: "JavaScript",
    categoria: "Frontend",
    imagens: [mcMotors],
    demo: '#',
    github: '#'
  },
  {
    id: 2,
    nome: "UvaFlix",
    descricao: "Trabalho de faculdade em streaming e catálogo de filmes.",
    tecnologias: ["HTML", "CSS", "JavaScript", "API"],
    linguagem: "JavaScript",
    categoria: "UX/UI",
    imagens: [uvaflix],
    demo: '#',
    github: 'https://github.com/marquescmd/group-website'
  },
  {
    id: 3,
    nome: "Obralyx",
    descricao: "Landing page para empresa de serviços.",
    tecnologias: ["HTML", "CSS", "JavaScript", "Node.js", "MySQL"],
    linguagem: "JavaScript",
    categoria: "UX/UI",
    imagens: [obralyx],
    demo: '#',
    github: '#'
  }
]

const categorias = ["Frontend", "UX/UI"]

function Home() {
  const [pesquisa, setPesquisa] = useState('')
  const [indiceAtual, setIndiceAtual] = useState({})
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const [categoriasAtivas, setCategoriasAtivas] = useState({
    Frontend: true,
    'UX/UI': true
  })

  const trocarImagem = (projetoId, direcao) => {
    const projeto = projetos.find((item) => item.id === projetoId)

    if (!projeto || projeto.imagens.length <= 1) return

    setIndiceAtual((anterior) => {
      const indiceAtualDoProjeto = anterior[projetoId] ?? 0
      const totalImagens = projeto.imagens.length
      const proximoIndice = (indiceAtualDoProjeto + direcao + totalImagens) % totalImagens

      return {
        ...anterior,
        [projetoId]: proximoIndice
      }
    })
  }

  const alternarCategoria = (categoria) => {
    setCategoriasAtivas((anterior) => ({
      ...anterior,
      [categoria]: !anterior[categoria]
    }))
  }

  const resetarCategorias = () => {
    setCategoriasAtivas({
      Frontend: true,
      'UX/UI': true
    })
  }

  const mostrarTodos = categoriasAtivas.Frontend && categoriasAtivas['UX/UI']

  const projetosFiltrados = projetos.filter((projeto) => {
    const termo = pesquisa.trim().toLowerCase()
    const filtroValido = categoriasAtivas[projeto.categoria]

    if (!termo) return filtroValido

    const textoBusca = [
      projeto.nome,
      projeto.descricao,
      projeto.linguagem,
      projeto.categoria,
      ...projeto.tecnologias
    ]
      .join(' ')
      .toLowerCase()

    return filtroValido && textoBusca.includes(termo)
  })
  return (
    <>
      <header>
        <nav>
          <div className="logo-g"><a href="index.html">Said's</a></div>
          <ul>
            <li><a href="">INICIO</a></li>
            <li><a href="">PROJETOS</a></li>
            <li><a href="">CONTATO</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="inicio">
          <div className="topicos">

          <div className="topico">
            <h2>Quem sou eu?</h2>
            <div className="texto-hover">
              <p>Olá! Meu nome é Said e sou um desenvolvedor web.</p>
            </div>
          </div>

          <div className="perfil">
            <div className="foto">
              <img src={ftper} alt="Foto de Said" />
            </div>
            <h2>Gyovanna Said Giles</h2>
          </div>

          <div className="topico">
            <h2>Objetivos</h2>
            <div className="texto-hover">
              <p>Meu objetivo é criar websites e aplicações web funcionais e esteticamente agradáveis.</p>
            </div>
          </div>
        </div>

        <div className="topico historia">
          <h2>Minha História</h2>
          <div className="texto-hover">
            <p>Comecei minha jornada no desenvolvimento web há alguns anos e sempre me apaixonei por criar soluções inovadoras e impactantes.</p>
          </div>
        </div>
      </section>

      <section className="projetos">
        <div className="projetos-header">
          <h1>PROJETOS</h1>

          <div className="projetos-tools">
            <div className="projetos-filtros">
              <button
                type="button"
                className={`filtro-btn ${mostrarTodos ? 'ativo' : ''}`}
                onClick={resetarCategorias}
              >
                Todos
              </button>

              <div className="filtro-dropdown">
                <button
                  type="button"
                  className={`filtro-btn ${!mostrarTodos ? 'ativo' : ''}`}
                  onClick={() => setFiltrosAbertos((anterior) => !anterior)}
                >
                  Filtros
                </button>

                {filtrosAbertos && (
                  <div className="filtro-menu">
                    {categorias.map((categoria) => (
                      <label className="filtro-item" key={categoria}>
                        <input
                          type="checkbox"
                          checked={categoriasAtivas[categoria]}
                          onChange={() => alternarCategoria(categoria)}
                        />
                        <span>{categoria}</span>
                      </label>
                    ))}
                  </div>
                )}
              </div>
            </div>

            <div className="projetos-search">
              <input
                type="text"
                value={pesquisa}
                onChange={(event) => setPesquisa(event.target.value)}
                placeholder="Pesquisar por nome, tecnologia ou linguagem"
                aria-label="Pesquisar projetos"
              />
            </div>
          </div>
        </div>

        <div className="container-projetos">
          {projetosFiltrados.length > 0 ? (
            projetosFiltrados.map((projeto) => {
              const indiceImagemAtual = indiceAtual[projeto.id] ?? 0
              const temMaisDeUmaImagem = projeto.imagens.length > 1

              return (
                <article className="card" key={projeto.id}>
                  <div className="imagem-projeto">
                    <button
                      type="button"
                      className="seta seta-esquerda"
                      onClick={() => trocarImagem(projeto.id, -1)}
                      aria-label={`Anterior imagem de ${projeto.nome}`}
                      disabled={!temMaisDeUmaImagem}
                    >
                      ‹
                    </button>

                    <img
                      src={projeto.imagens[indiceImagemAtual]}
                      alt={projeto.nome}
                    />

                    <button
                      type="button"
                      className="seta seta-direita"
                      onClick={() => trocarImagem(projeto.id, 1)}
                      aria-label={`Próxima imagem de ${projeto.nome}`}
                      disabled={!temMaisDeUmaImagem}
                    >
                      ›
                    </button>
                  </div>

                  <div className="conteudo">
                    <h2>{projeto.nome}</h2>
                    <p>{projeto.descricao}</p>
                    <div className="tags">
                      {projeto.tecnologias.map((tecnologia) => (
                        <span key={`${projeto.id}-${tecnologia}`}>{tecnologia}</span>
                      ))}
                    </div>
                    <div className="btns">
                      <a href={projeto.demo} target="_blank">Demo</a>
                      <a href={projeto.github} target="_blank">Github</a>
                    </div>
                  </div>
                </article>
              )
            })
          ) : (
            <p className="sem-projetos">Nenhum projeto encontrado.</p>
          )}
        </div>
      </section>


      <section className="contato">

    <div className="contato-container">
        <form className="formulario">
            <h1>Vamos Conversar?</h1>
            <input
                type="text"
                placeholder="Seu nome"
            />
            <input
                type="email"
                placeholder="Email"
            />
            <textarea placeholder="Mande uma mensagem"></textarea>
            <button type="submit">
                Enviar
            </button>
        </form>


        
        <aside className="redes">

            <h1>Além do Código</h1>
            <div className="links">

                <a href="#" target="_blank">
                    LinkedIn
                </a>

                <a href="#" target="_blank">
                    WhatsApp
                </a>

                <a href="#" target="_blank">
                    Instagram
                </a>

                <a href="#" target="_blank">
                    Currículo
                </a>

                <a href="#" target="_blank">
                    GitHub
                </a>
            </div>
        </aside>
    </div>
</section>
      </main>

      <footer class="fbtm">
    <div class="paibck">
        <div class="d1">
            <p class="uva">GYOVANNA SAID GILES</p>
            <p>Portfólio</p>
        </div>        
        <div class="d2">
            <p>© 2026 - Desenvolvido por <span>Gyovanna Said Giles</span></p>
            <p class="tdw">Conecte-se linkedIN</p>
        </div>
    </div>
</footer>   
    </>
  )
}

// teste

export default Home
