import React from "react";
import 'stylesheets/thankyou';
import mike from "../../assets/images/mike.png"


const Thankyou = () => {
    return (
        <div className="thankyou">
            
            <h2>Thank you to our Sponsors</h2>
            <p>We are immensely grateful to our sponsor for his generous support and commitment. His invaluable contribution has been instrumental in helping us achieve our goals and make a meaningful impact. Together, we are creating opportunities and driving change, and we couldn’t have done it without his partnership.</p>
        

            <div className="sponsor">
                <div>
                    <img src={mike} alt='mike dalessio-image' className="sponsor-image" />
                    <h1 className="font-bold font-besley text-2xl text-wnbrb-blue-navy">Mike Dalessio</h1>
                    
                        <a href="https://mike.daless.io/" className="link"><i>website</i></a>
                
                </div>
                

            </div>
        </div>
    );
}
export default Thankyou;