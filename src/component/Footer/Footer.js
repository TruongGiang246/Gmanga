import FooterCss from './Footer.module.css'
function Footer() {

    function redirect (type){
        switch(type){
            case "facebook": 
                window.location.href = "https://www.facebook.com/truonggiang.tran.583671"
                break;
            case "github":
                window.location.href = "https://github.com/TruongGiang246"
                break;
        }
    }

    return ( 
        <div className={FooterCss.footer}>
            <div className={FooterCss.footer_icon}>
                <i onClick={() => redirect("github")} class='bx bxl-github'></i>
                <i onClick={() => redirect("facebook")} class='bx bxl-facebook-circle' ></i>
            </div>
            <p>FE source:TGiang</p>
        </div>
     );
}

export default Footer;