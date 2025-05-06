import { request } from "../../lib/datocms"
import { PROJECTS_QUERY } from '../../lib/queries'
import Header from "../../components/Header"
import EmblaCarousel from '../../components/EmblaCarousel'
import Image from "next/image"
import { useState } from "react"
import FsLightbox from 'fslightbox-react'; 
import { useRouter } from 'next/router';


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
    const { locale, locales, asPath } = useRouter().locale
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

    const allImages = data.imagens?.map((img) => img.imagem.url) || []
    
    return (
        <>
        <Header projects={projects} books={books} />
        <div className="mt-[-1em] 2xl:mt-0">
        {data.imagens && data.imagens.length > 0 && (
            <EmblaCarousel>
                {data.imagens.map((w, i) => (
                    <div className="embla__slide__books flex" key={i}>
                        
                        <div className={`relative ${size(w.tamanho)} ${align(w.alinhamento)}`} onClick={() => openLightboxOnSlide(i + 1)}>
                            <Image src={w.imagem.url} width={w.imagem.width} height={w.imagem.height} objectFit='cover' />
                        </div>
                        
                    </div>
                ))}
            </EmblaCarousel>
        )}
        </div>
        {allImages.length > 0 && (
            <FsLightbox 
                toggler={lightboxController.toggler} 
                sources={allImages} 
                slide={lightboxController.slide} 
                svg={{
                    slideButtons: {
                        previous: {
                            width: '30px', 
                            height: '30px',
                            viewBox: '0 0 14.91 27.74',
                            d: 'M13.33,27.74L.2,14.61c-.26-.26-.26-.68,0-.94L13.86,0c.91,.92,1,.82,.84,.98L1.56,14.18l12.74,12.64'
                        },
                        next: {
                            width: '30px', 
                            height: '30px',
                            viewBox: '0 0 14.91 27.74',
                            d: 'M1.44,0L14.57,13.13c.26,.26,.26,.68,0,.94L.9,27.74c-.91-.92-1-.82-.84-.98L13.21,13.56,.47,.93'
                        }
                    } 
                }}
            /> 
        )}
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
export async function getStaticPaths({locales}) {
    const data = await request({ query: `{ allLivros { slug } }` });
    const pathsArray = [];
    data.allLivros.map((livro) => {
        locales.map((language) => {
        pathsArray.push({ params: { slug: livro.slug }, locale: language });
        });
    });

    return {
        paths: pathsArray,
        fallback: false,
    };
}

export async function getStaticProps({ params, locale }) {
    const formattedLocale = locale;
    const data = await request({
        query: `query livroBySlug($slug: String) {
            livro(filter: {slug: {eq: $slug}}, locale: ${formattedLocale}) {
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
        }`,
        variables: { slug: params.slug },
    })
    const project = await request({
        query: `{
            allProjects(locale: ${formattedLocale}) {
                slug
                titulo
                lista
            }
            allLivros(locale: ${formattedLocale}) {
                slug
                titulo
            }
        }`
    })

    return {
        props: {
            data: data.livro,
            projects: project.allProjects,
            books: project.allLivros,
        },
    }
}