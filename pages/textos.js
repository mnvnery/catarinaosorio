import { request } from "../lib/datocms"
import Image from "next/image"
import { PROJECTS_QUERY, TEXTOS_QUERY } from '../lib/queries'
import Header from "../components/Header"


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
    },
}
}

export default function Textos({textos, projects}) {

    return (
        <>
        <Header projects={projects}/>
        <div className="text-center mt-24">
            <div className="font-decay mb-4">Textos</div>
            {textos.map((t, i) => (
                <div key={i} className='hover:underline leading-5'>
                    {t.titulo}
                </div>
            ))}
            <div className="mt-20 font-bold text-lg mb-12">{textos[0].titulo}</div>
            <div className="max-w-lg mx-auto text-left mb-14">
            <div dangerouslySetInnerHTML={{__html: textos[0].texto}} className='paragraph text-sm'/>
            </div>
        </div>
        </>
    )
}