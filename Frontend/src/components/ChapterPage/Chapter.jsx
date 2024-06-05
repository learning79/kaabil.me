import Navbar from "../Dashboard/Navbar";

const Chapter = ({user})=>{
    return (
        <div className="flex flex-col min-h-screen bg-slate-100 font-Space Grotesk">
        <Navbar user={user}/> 
        </div>  
        
    )
}
export default Chapter;