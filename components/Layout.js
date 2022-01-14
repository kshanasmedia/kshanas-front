import Footer from "./Footer";
import Header from "./Header";
import Sidebar from "./Sidebar";

export default function Layout({children}){
    return(
        <>
        <Header/>
        <div className="body--container">
            <Sidebar/>
            <div className="body--core">
                {children}
            </div>
        </div>
        <Footer/>
        </>
    )
}