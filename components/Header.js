import Nav from "./Nav"
import Link from "next/link"

const Header = ({projects}) => {
    return (
        <div className="relative flex justify-between m-10 z-10">
            <div className="font-decay text-xs"><span className="hover:underline">EN</span> / <span className="hover:underline">PT</span></div>
            <Link href='/'><a className="font font-grottaMedium text-lg">Catarina Osorio de Castro</a></Link>
            <Nav projects={projects} />
        </div>
    )
}

export default Header