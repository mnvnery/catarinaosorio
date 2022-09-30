import { request } from "../../lib/datocms"
import { PROJECTS_QUERY } from '../../lib/queries'
import Header from "../../components/Header"
import EmblaCarousel from '../../components/EmblaCarousel'
import Image from "next/image"

const FILTERED_QUERY = `query livroBySlug($slug: String) {
    livro(filter: {slug: {eq: $slug}}) {
        texto
        titulo
        imagens {
            imagem {
                url
                width
                height
            }
            tamanho
            alinhamento
        }
        slug
        ano
        editor
    }
}`
function size(size) {
    if (size === 'small') {
        return 'w-[20vw] h-fit'
    }
    if (size === 'medium') {
        return 'w-[42vw] h-fit'
    }
    if (size === 'large') {
        return 'w-[42vw] h-fit'
    }
}

function align(align) {
    if (align === 'top') {
        return 'self-start'
    }
    if (align === 'middle') {
        return 'self-center'
    }
    if (align === 'bottom') {
        return 'self-end'
    }
}

export default function Project({ data, projects, books }) {
    return (
        <>
        <Header projects={projects} books={books} />
        <div className="mt-[-1em]">
        <EmblaCarousel>
                {data.imagens.map((w, i) => (
                    <div className="embla__slide__books flex" key={i}>
                        
                        <div className={`relative ${size(w.tamanho)} ${align(w.alinhamento)}`}>
                            <Image src={w.imagem.url} width={w.imagem.width} height={w.imagem.height} objectFit='cover' />
                        </div>
                        
                    </div>
                ))}
        </EmblaCarousel>
        </div>
        <div className="grid grid-cols-3 mb-14">
            <div className="font-decay text-center text-sm">
                <div>{data.ano}</div>
                <div>{data.editor}</div>
            </div>
            <div className="text-center text-lg font-bold">{data.titulo}</div>
            <div dangerouslySetInnerHTML={{__html: data.texto}} className='paragraph mr-20'/>
        </div>
        </>
    )
}
export async function getStaticPaths() {
    const data = await request({
        query: PROJECTS_QUERY,
    })

    return {
        paths: data.allLivros.map((book) => {
        return {
            params: {
            slug: book.slug,
            },
        }
        }),
        fallback: false,
    }
    }

export async function getStaticProps({ params }) {
    const data = await request({
        query: FILTERED_QUERY,
        variables: { slug: params.slug },
    })
    const project = await request({
        query: PROJECTS_QUERY,
    })

    return {
        props: {
            data: data.livro,
            projects: project.allProjects,
            books: project.allLivros,
        },
    }
}