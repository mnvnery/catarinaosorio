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
        return 'w-[40vw] md:w-[20vw] h-fit'
    }
    if (size === 'medium') {
        return 'w-[104vw] md:w-[42vw] h-fit'
    }
    if (size === 'large') {
        return 'w-[103vw] h-[50vh] md:w-[42vw] md:h-fit'
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
    const [lightboxController, setLightboxController] = useState({ 
        toggler: false, 
        slide: 1 
        }); 
        
        function openLightboxOnSlide(number) { 
            setLightboxController({ 
                toggler: !lightboxController.toggler, 
                slide: number 
            }); 
        }         

    const allImages = data.imagens.map((img) => img.imagem.url)
    
    return (
        <>
        <Header projects={projects} books={books} />
        <div className="mt-[-1em] 2xl:mt-0">
        <EmblaCarousel>
                {data.imagens.map((w, i) => (
                    <div className="embla__slide__books flex" key={i}>
                        
                        <div className={`relative ${size(w.tamanho)} ${align(w.alinhamento)}`} onClick={() => openLightboxOnSlide(i + 1)}>
                            <Image src={w.imagem.url} width={w.imagem.width} height={w.imagem.height} objectFit='cover' />
                        </div>
                        
                    </div>
                ))}
        </EmblaCarousel>
        </div>
        <FsLightbox 
            toggler={lightboxController.toggler} 
            sources={allImages} 
            slide={lightboxController.slide} 
            svg={{
                slideButtons: {
                    previous: {
                        viewBox: '0 0 100 100',
                        d: 'M71 3L29 52.5L71 96.5'
                    },
                }
            }}
        /> 
        <div className="mx-8 grid grid-cols-2 justify-center items-center md:justify-start md:items-start md:grid-cols-3 md:mx-0 mb-14 3xl:mb-24 3xl:mt-5">
        <div className="md:hidden text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div className="font-decay text-center text-sm 3xl:text-lg">
                <div>{data.ano}</div>
                <div>{data.editor}</div>
            </div>
            <div className="hidden md:block text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div dangerouslySetInnerHTML={{__html: data.texto}} className='paragraph mt-10 col-span-2 md:mt-0 md:ml-0 md:col-span-1 md:mr-20 2xl:mr-36 3xl:text-xl 3xl:mr-56'/>
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