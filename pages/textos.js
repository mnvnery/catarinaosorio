import { request } from "../lib/datocms"
import Image from "next/image"
import { PROJECTS_QUERY, TEXTOS_QUERY } from '../lib/queries'
import Header from "../components/Header"
import { useState, useEffect } from "react"


export async function getStaticProps() {
const textos = await request({
    query: TEXTOS_QUERY,
})

const project = await request({
    query: PROJECTS_QUERY,
})


return {
    props: {
        textos: textos.allTexts,
        projects: project.allProjects,
        books: project.allLivros,
    },
}
}

export default function Textos({textos, projects, books}) {
    function getTexts() {
        return textos
    }

    function filterTexts(textTitle) {
        let filteredText = getTexts().filter((text) => text.titulo === textTitle)
        return filteredText
    }

    const [filteredTexts, setFilteredTexts] = useState(null)
    const [selectedTitle, setSelectedTitle] = useState()

    useEffect(() => {
        setFilteredTexts(getTexts())
    }, [])

    function handleTag(e) {
        let textTitle = e.target.value
        if (textTitle !== '') {
            setFilteredTexts(filterTexts(textTitle))
            setSelectedTitle(textTitle)
        } else {
            setFilteredTexts(getTexts())
            setSelectedTitle('')
        }
    }
    
    return (
        <>
        <Header projects={projects} books={books}/>
        <div className="text-center mt-24 2xl:mt-36">
            <div className="font-decay mb-4 2xl:text-xl 3xl:text-2xl">Textos</div>
            {textos.map((t, i) => (
                <div key={i} className={`hover:underline leading-5 2xl:text-lg 3xl:text-xl`}>
                    <button value={t.titulo} onClick={handleTag} className={`${selectedTitle === t.titulo ? 'underline' : '' }`}>{t.titulo}</button>
                </div>
            ))}
            {filteredTexts &&
            filteredTexts
            .slice(0)
            .map((t, i) => (
                <div key={i}>
                    <div className="mt-20 font-bold text-lg mb-12 2xl:text-xl 2xl:mt-28 3xl:text-2xl">{t.titulo}</div>
                    <div className="max-w-xs md:max-w-lg mx-auto text-left mb-14 3xl:max-w-xl">
                        <div dangerouslySetInnerHTML={{__html: t.texto}} className='paragraph text-sm 2xl:text-base 3xl:text-xl'/>
                    </div>
                </div>
            ))}
        </div>
        </>
    )
}