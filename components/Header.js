import Nav from "./Nav"
import Link from "next/link"

const Header = ({projects, books}) => {
    return (
        <>
        <div className="h-28"></div>
        <div className="fixed top-0 w-[96%] flex justify-between m-10 z-10">
            <div className="font-decay text-xs"><span className="hover:underline">EN</span> / <span className="hover:underline">PT</span></div>
            <Link href='/'><a className="font font-grottaMedium text-lg">Catarina Osorio de Castro</a></Link>
            <Nav projects={projects} books={books} />
        </div>
        </>
    )
}

export default Header