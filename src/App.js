import { Route, Routes } from "react-router-dom";

import { MenuMobile } from "./components/Menu/MenuMobile";
import { MenuSidebar } from "./components/Menu/MenuSidebar";
import SearchBar from "./components/SearchBar/SearchBar";
import AddNewOrder from "./Pages/AddNewOrder";
import Collecting from "./Pages/Collecting";
import CollectingDay from "./Pages/CollectingDay";
import DailyCollect from "./Pages/DailyCollect";
import Home from "./Pages/Home";
import Orders from "./Pages/Orders";
import SingleOrder from "./Pages/SingleOrder";
import SingleUser from "./Pages/SingleUser";

function App() {
  return (
    <div className="App">
      <MenuMobile />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/customers/:id" element={<SingleUser />} />
        <Route path="/orders" element={<Orders />} />
        <Route path="/orders/:id" element={<SingleOrder />} />
        <Route path="/add-order" element={<AddNewOrder />} />
        <Route path="/collecting" element={<Collecting />} />
        <Route path="/collecting/:id" element={<CollectingDay />} />
        <Route path="/daily-collect" element={<DailyCollect />} />
      </Routes>
    </div>
  );
}

export default App;
