import { request } from "../../lib/datocms"
import { PROJECTS_QUERY } from '../../lib/queries'
import Header from "../../components/Header"
import EmblaCarousel from '../../components/EmblaCarousel'
import Image from "next/image"
import Link from "next/link"
import dynamic from 'next/dynamic';
import { useState } from "react"
import FsLightbox from 'fslightbox-react'; 


const FILTERED_QUERY = `{
    allProjects {
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
        return 'w-[40vw] h-[40vw] md:w-[20vw] md:h-[20vw] md:m-20'
    }
    if (size === 'medium') {
        return 'w-[55vw] h-[55vw] md:w-[30vw] md:h-[30vw] md:m-10'
    }
    if (size === 'large') {
        return 'w-[103vw] h-[50vh] md:w-[42vw] md:h-[42vw]'
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


export default function Project({ data, projects, books, moreProjects }) {
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
        <div className="mt-[-1em] 2xl:mt-5">
        <EmblaCarousel>
                {data.imagens.map((w, i) => (
                    <div className="embla__slide" key={i}>
                        <div className={`relative ${size(w.tamanho)} ${align(w.alinhamento)}`} onClick={() => openLightboxOnSlide(i + 1)}>
                            <Image src={w.imagem.url} objectFit="cover" layout="fill" />
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
                        d: 'M71 3L29 52.5L71 96.5'
                    },
                }
            }}
        /> 
        <div className="mx-8 grid grid-cols-2 justify-center items-center md:justify-start md:items-start md:mx-0 md:grid-cols-3 3xl:mt-5">
            <div className="md:hidden text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div className="font-decay text-center text-sm 3xl:text-lg">
                <div>{data.ano}</div>
                <div>{data.local}</div>
            </div>
            <div className="hidden md:block text-center text-lg font-bold 2xl:text-xl 3xl:text-2xl">{data.titulo}</div>
            <div dangerouslySetInnerHTML={{__html: data.texto}} className='paragraph mt-10 col-span-2 md:mt-0 md:ml-0 md:col-span-1 md:mr-20 2xl:mr-36 3xl:text-xl 3xl:mr-56'/>
        </div>
        <div className="font-decay flex justify-between mx-8 md:mx-14 text-sm my-12 3xl:text-lg 3xl:my-16">
            <Link href={moreProjects[0].slug}><div className="hover:underline">projeto anterior</div></Link>
            <Link href={moreProjects[1].slug}><div className="hover:underline">projeto seguinte</div></Link>
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

    const projects = data.allProjects;

    const currentProject = projects.find((project) => project.slug === params.slug);
    const currentProjectIndex = projects.findIndex((project) => project.slug === params.slug);
    const prevProject = projects[currentProjectIndex - 1] || projects[projects.length - 1];
    const nextProject = projects[currentProjectIndex + 1] || projects[0];

    if (!currentProject) {
        return {
            project: false,
        };
    }

    const headerData = await request({
        query: PROJECTS_QUERY,
    })

    return {
        props: {
            data: currentProject,
            moreProjects: [prevProject, nextProject],
            projects: headerData.allProjects,
            books: headerData.allLivros,
        },
    }
}