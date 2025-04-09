import "bootstrap/dist/css/bootstrap.min.css";
import RequestResource from "./components/request"
import InventoryManagement from "./components/inventory";
import LabManagement from "./components/lab";
import LibraryManagement from "./components/library";
import Storekeeper from "./components/store";


function App() {


  return (
    <>
      <RequestResource />
     
      <InventoryManagement />
      
      <LabManagement />

      <LibraryManagement />

      <Storekeeper />
    
    </>
  )
}

export default App
