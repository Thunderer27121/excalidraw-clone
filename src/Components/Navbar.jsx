import  pencil from "./icons/pencil-fill.png";
import  eraser from "./icons/eraser-line.png";
import  menu from "./icons/menu-line.png";
import square from "./icons/square-line.png";
import line from "./icons/line.png";
import circle from "./icons/circle-line.png";
const Navbar = ({setTool}) => {
  return (
    <div className="flex items-center justify-between p-4">
      <div><img src={menu} alt="" /></div>
      <div className="flex items-center justify-evenly gap-5 p-1 bg-gray-200 rounded shadow-xl w-2xl ml-38">
        <button onClick={() => setTool("pencil")}><img src={pencil} alt="pencil"/></button>
        <button onClick={() => setTool("eraser")}><img src={eraser} alt="eraser" /></button>
        <button onClick={() => setTool("rectangle")}><img src={square} alt="eraser" /></button>
        <button onClick={() => setTool("line")}><img src={line} alt="eraser" className="h-7 w-7"/></button>
        <button onClick={() => setTool("ellipse")}><img src={circle} alt="eraser" /></button>
        </div>
      <div className="flex items-center justify-between gap-3.5">
        <button className="outline-0 border-0 bg-blue-400 rounded-2xl w-18">Share</button>
        <button className="outline-0 border-0 bg-red-400 rounded-2xl w-18">Library</button>
      </div>
    </div>
  )
}

export default Navbar