import HisAndFol from "../../component/function/History&Follow";
import FollowCss from './Follow.module.css'
function Follow() {
    const getData = JSON.parse(localStorage.getItem('follow')).list
    return ( 
        <div className={FollowCss.back_ground}>
            <HisAndFol getData = {getData} name={"Theo Dõi"} deleteOk={true}/>
        </div>
     );
}

export default Follow;