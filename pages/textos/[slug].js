import { request } from "../../lib/datocms"
import { PROJECTS_QUERY } from '../../lib/queries'
import Header from "../../components/Header"
import EmblaCarousel from '../../components/EmblaCarousel'
import Image from "next/image"
import { useState } from "react"
import FsLightbox from 'fslightbox-react'; 
import { useRouter } from 'next/router';
import Link from "next/link"



export default function Project({ data, texts, projects, books }) {
    const { locale, locales, asPath } = useRouter().locale

    return (
        <>
        <Header projects={projects} books={books} />
        <div className="text-center mt-24 2xl:mt-36">
            <div className="font-decay mb-4 2xl:text-xl 3xl:text-2xl">{locale === 'pt' ? 'Textos' : 'Texts'}</div>
            {texts.map((t, i) => (
                <div key={i} className={`hover:underline leading-5 2xl:text-lg 3xl:text-xl`}>
                    <Link href={`/textos/${t.slug}`}><a className={`${data.titulo === t.titulo ? 'underline' : '' }`}>{t.titulo}</a></Link>
                </div>
            ))}
                <div>
                    <div className="mt-20 font-bold text-lg mb-12 2xl:text-xl 2xl:mt-28 3xl:text-2xl">{data.titulo}</div>
                    <div className="max-w-xs md:max-w-lg mx-auto text-left mb-14 3xl:max-w-xl">
                        <div dangerouslySetInnerHTML={{__html: data.texto}} className='paragraph text-sm 2xl:text-base 3xl:text-xl'/>
                    </div>
                </div>
        </div>
        </>
    )
}
export async function getStaticPaths({locales}) {
    const data = await request({ query: `{ allTexts { slug } }` });
    const pathsArray = [];
    data.allTexts.map((text) => {
        locales.map((language) => {
        pathsArray.push({ params: { slug: text.slug }, locale: language });
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
        query: `query textBySlug($slug: String) {
            text(filter: {slug: {eq: $slug}}, locale: ${formattedLocale}) {
                texto
                titulo
                slug
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
            allTexts(locale: ${formattedLocale}) {
                texto
                titulo
                slug
            }
        }`
    })

    return {
        props: {
            data: data.text,
            texts: project.allTexts,
            projects: project.allProjects,
            books: project.allLivros,
        },
    }
}