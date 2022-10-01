import { request } from "../../lib/datocms"
import { PROJECTS_QUERY } from '../../lib/queries'
import Header from "../../components/Header"
import EmblaCarousel from '../../components/EmblaCarousel'
import Image from "next/image"

const FILTERED_QUERY = `query projectBySlug($slug: String) {
    project(filter: {slug: {eq: $slug}}) {
        titulo
        slug
        imagens {
            imagem {
            url
            }
            tamanho
            alinhamento
        }
        ano
        local
        texto
    }
}`
function size(size) {
    if (size === 'small') {
        return 'w-[20vw] h-[20vw] m-20'
    }
    if (size === 'medium') {
        return 'w-[30vw] h-[30vw] m-10'
    }
    if (size === 'large') {
        return 'w-[42vw] h-[42vw]'
    }
}

function align(align) {
    if (align === 'top') {
        return 'self-start mt-[16vh]'
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
        <div className="mt-[-1em] 2xl:mt-5">
        <EmblaCarousel>
                {data.imagens.map((w, i) => (
                    <div className="embla__slide" key={i}>
                        
                        <div className={`relative ${size(w.tamanho)} ${align(w.alinhamento)}`}>
                            <Image src={w.imagem.url} objectFit="cover" layout="fill" />
                        </div>
                        
                    </div>
                ))}
        </EmblaCarousel>
        </div>
        <div className="grid grid-cols-2 md:grid-cols-3 3xl:mt-5">
            <div className="md:hidden text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div className="font-decay text-center text-sm 3xl:text-lg">
                <div>{data.ano}</div>
                <div>{data.local}</div>
            </div>
            <div className="hidden md:block text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div dangerouslySetInnerHTML={{__html: data.texto}} className='paragraph mx-8 mt-10 col-span-2 md:mt-0 md:ml-0 md:col-span-1 md:mr-20 2xl:mr-36 3xl:text-xl 3xl:mr-56'/>
        </div>
        <div className="font-decay flex justify-between mx-14 text-sm my-12 3xl:text-lg 3xl:my-16">
            <div className="hover:underline">projeto anterior</div>
            <div className="hover:underline">projeto seguinte</div>
        </div>
        </>
    )
}
export async function getStaticPaths() {
    const projects = await request({
        query: PROJECTS_QUERY,
    })

    return {
        paths: projects.allProjects.map((project) => {
        return {
            params: {
            slug: project.slug,
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
            data: data.project,
            projects: project.allProjects,
            books: project.allLivros,
        },
    }
}