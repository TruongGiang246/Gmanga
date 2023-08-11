import HisAndFol from "../../component/function/History&Follow";
import HistoryCss from './History.module.css'
function History() {
    const getData = JSON.parse(localStorage.getItem('history')).historyList


    return ( 
      <div className={HistoryCss.back_ground}>
        <HisAndFol getData = {getData} name={"lịch sử"} deleteOk={false}/>
      </div>
     );
}

export default History;