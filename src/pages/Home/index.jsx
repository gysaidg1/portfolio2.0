
import { useState } from 'react'
import './style.css'
import ftper from '../../assets/ftper.jpg'
import mcMotors from '../../assets/mc\'motors.JPG'
import sbrMc from '../../assets/sbr-mc.png'
import vendasMc from '../../assets/vendas-mc.png'
import uvaflix from '../../assets/uvaflix.jpg'
import obralyx from '../../assets/obralyx.jpg'
import sbrObralyx from '../../assets/sbr-obralyx.png'
import projObralyx from '../../assets/proj-obralyx.png'
import cttObralyx from '../../assets/ctt-obralyx.png'
import { supabase } from '../../Lib/supabaseClient'

const projetos = [
  {
    id: 1,
    nome: "MC' Motors",
    descricao: "Landing page automotiva.",
    tecnologias: ["HTML", "CSS"],
    categoria: "Frontend",
    imagens: [mcMotors, sbrMc, vendasMc],
    demo: '#',
    github: 'https://github.com/gysaidg1/mcmotors'
  },
  {
    id: 2,
    nome: "UvaFlix",
    descricao: "Trabalho de faculdade: Streaming e catálogo de filmes.",
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
    imagens: [obralyx, sbrObralyx, projObralyx, cttObralyx],
    demo: '#',
    github: 'https://github.com/gysaidg1/obralyx'
  }
]

const categorias = ["Frontend", "Backend", "Fullstack", "UX/UI"]

function Home() {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    mensagem: ''
  })

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    const { error } = await supabase
      .from('contatos')
      .insert([form])

    if (error) {
      console.error(error)
      alert('Erro ao enviar mensagem.')
      return
    }

    alert('Mensagem enviada!')

    setForm({
      nome: '',
      email: '',
      mensagem: ''
    })
  }

  const [pesquisa, setPesquisa] = useState('')
  const [indiceAtual, setIndiceAtual] = useState({})
  const [filtrosAbertos, setFiltrosAbertos] = useState(false)
  const [categoriasAtivas, setCategoriasAtivas] = useState({
    Frontend: true,
    Backend: true,
    Fullstack: true,
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
      Backend: true,
      Fullstack: true,
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
            <li><a href="#inicio">INICIO</a></li>
            <li><a href="#projetos">PROJETOS</a></li>
            <li><a href="#contato">CONTATO</a></li>
          </ul>
        </nav>
      </header>

      <main>
        <section className="inicio" id="inicio">
          <div className="topicos">

          <div className="topico">
            <h2>Quem sou eu?</h2>
            <div className="texto-hover">
              <p>Olá! Meu nome é Gyovanna, sou estudante de Ciência da Computação e desenvolvedora full-stack. Tenho conhecimentos em HTML, CSS, JavaScript, React, Node.js, MySQL e Supabase, além de experiência com APIs, integração de serviços e criação de interfaces no Figma.</p>
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
              <p>Meu objetivo é me aprofundar no desenvolvimento full-stack, ganhar experiência profissional e aprimorar minhas habilidades continuamente. Quero usar meus conhecimentos para desenvolver soluções úteis, enfrentar novos desafios e contribuir positivamente para a sociedade por meio da tecnologia.</p>
            </div>
          </div>
        </div>

        <div className="topico historia">
          <h2>Minha História</h2>
          <div className="texto-hover">
            <p>Meu interesse por tecnologia começou aos 13 anos em 2020, quando comecei a explorar como a internet funciona. Desde então, estudo programação e desenvolvo projetos acadêmicos e pessoais para aprimorar minhas habilidades.</p>
          </div>
        </div>
      </section>

      <section className="projetos" id="projetos">
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
                      {/* <a href={projeto.demo} target="_blank" rel="noopener noreferrer">Demo</a> */}
                      <a href={projeto.github} target="_blank" rel="noopener noreferrer">Github</a>
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
      <section className="contato" id="contato">
        <div className="contato-container">
          <form className="formulario" onSubmit={handleSubmit}>
            <h1>Vamos Conversar?</h1>

            <input
              type="text"
              name="nome"
              placeholder="Seu nome"
              value={form.nome}
              onChange={handleChange}
            />

            <input
              type="email"
              name="email"
              placeholder="Email"
              value={form.email}
              onChange={handleChange}
            />

            <textarea
              name="mensagem"
              placeholder="Mande uma mensagem"
              value={form.mensagem}
              onChange={handleChange}
            />

            <button type="submit">Enviar</button>
          </form>

          <aside className="redes">
            <h1>Além do Código</h1>
            <div className="links">
              <a href="https://www.linkedin.com/in/gyovanna-said-6725203b8/" target="_blank" rel="noopener noreferrer">
                LinkedIn
              </a>
              <a
                href="https://wa.me/5521989299201?text=Olá%2C%20vi%20seu%20portfólio%20e%20gostaria%20de%20conversar!"
                target="_blank"
                rel="noopener noreferrer"
              >
                WhatsApp
              </a>
              <a href="https://www.instagram.com/gy.saidg/" target="_blank" rel="noopener noreferrer">
                Instagram
              </a>
              <a href="../public/Curriculo_Gyovanna_Said_Giles.pdf" target="_blank" rel="noopener noreferrer">
                Currículo
              </a>
              <a href="https://github.com/gysaidg1" target="_blank" rel="noopener noreferrer">
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
            <div className="tdw footer-connect">
              <span>Conecte-se</span>
              <div className="footer-socials">
                <a href="https://www.linkedin.com/in/gyovanna-said-6725203b8/" target="_blank" rel="noopener noreferrer" aria-label="LinkedIn" title="LinkedIn">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.45 20.45h-3.56v-5.57c0-1.33-.02-3.04-1.85-3.04-1.85 0-2.13 1.45-2.13 2.94v5.67H9.35V9h3.42v1.56h.05c.48-.9 1.64-1.85 3.37-1.85 3.6 0 4.26 2.37 4.26 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45ZM22.22 0H1.77C.79 0 0 .77 0 1.72v20.56C0 23.23.79 24 1.77 24h20.45c.98 0 1.78-.77 1.78-1.72V1.72C24 .77 23.2 0 22.22 0Z"/></svg>
                </a>
                <a href="https://www.instagram.com/gy.saidg/" target="_blank" rel="noopener noreferrer" aria-label="Instagram" title="Instagram">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 2h10a5 5 0 0 1 5 5v10a5 5 0 0 1-5 5H7a5 5 0 0 1-5-5V7a5 5 0 0 1 5-5Zm0 2.2A2.8 2.8 0 0 0 4.2 7v10A2.8 2.8 0 0 0 7 19.8h10a2.8 2.8 0 0 0 2.8-2.8V7A2.8 2.8 0 0 0 17 4.2H7Zm5 2.3a5.5 5.5 0 1 1 0 11 5.5 5.5 0 0 1 0-11Zm0 2.2a3.3 3.3 0 1 0 0 6.6 3.3 3.3 0 0 0 0-6.6Zm5.7-3.2a1.3 1.3 0 1 1 0 2.6 1.3 1.3 0 0 1 0-2.6Z"/></svg>
                </a>
                <a href="https://wa.me/5521989299201?text=Ol%C3%A1%2C%20vi%20seu%20portf%C3%B3lio%20e%20gostaria%20de%20conversar!" target="_blank" rel="noopener noreferrer" aria-label="WhatsApp" title="WhatsApp">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.52 3.48A11.8 11.8 0 0 0 12.1 0C5.55 0 .22 5.33.22 11.9c0 2.1.55 4.15 1.6 5.96L.12 24l6.3-1.65a11.9 11.9 0 0 0 5.68 1.45h.01c6.56 0 11.9-5.34 11.9-11.9 0-3.18-1.24-6.17-3.49-8.42ZM12.1 21.8h-.01a9.9 9.9 0 0 1-5.04-1.38l-.36-.21-3.74.98 1-3.65-.24-.38a9.87 9.87 0 0 1-1.52-5.26c0-5.47 4.45-9.92 9.92-9.92 2.65 0 5.14 1.03 7.01 2.91a9.86 9.86 0 0 1 2.9 7.01c0 5.47-4.45 9.9-9.92 9.9Zm5.44-7.42c-.3-.15-1.76-.87-2.04-.97-.27-.1-.47-.15-.67.15-.2.3-.77.97-.95 1.17-.17.2-.35.22-.65.07-.3-.15-1.26-.46-2.4-1.47-.9-.8-1.5-1.78-1.68-2.08-.17-.3-.02-.46.13-.61.14-.13.3-.35.45-.52.15-.18.2-.3.3-.5.1-.2.05-.37-.02-.52-.07-.15-.67-1.62-.92-2.22-.24-.58-.49-.5-.67-.5l-.57-.01c-.2 0-.52.07-.8.37-.27.3-1.04 1.02-1.04 2.49 0 1.47 1.07 2.89 1.22 3.09.15.2 2.1 3.2 5.08 4.49.71.3 1.27.49 1.7.63.71.23 1.36.2 1.87.12.57-.08 1.76-.72 2.01-1.42.25-.7.25-1.3.17-1.42-.07-.12-.27-.2-.57-.35Z"/></svg>
                </a>
                <a href="https://github.com/gysaidg1" target="_blank" rel="noopener noreferrer" aria-label="GitHub" title="GitHub">
                  <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .8a11.2 11.2 0 0 0-3.54 21.83c.56.1.77-.24.77-.54v-2.1c-3.13.68-3.79-1.33-3.79-1.33-.51-1.3-1.25-1.65-1.25-1.65-1.02-.7.08-.69.08-.69 1.13.08 1.73 1.16 1.73 1.16 1 .1.78 2.2 3.58 1.57.1-.73.4-1.23.72-1.51-2.5-.28-5.13-1.25-5.13-5.56 0-1.23.44-2.24 1.16-3.03-.12-.28-.5-1.43.11-2.98 0 0 .95-.3 3.08 1.16a10.7 10.7 0 0 1 5.6 0c2.13-1.45 3.07-1.16 3.07-1.16.61 1.55.23 2.7.12 2.98.72.79 1.15 1.8 1.15 3.03 0 4.32-2.63 5.27-5.14 5.55.41.36.77 1.04.77 2.1v3.11c0 .3.2.65.78.54A11.2 11.2 0 0 0 12 .8Z"/></svg>
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>

    </>
  )
}

export default Home
