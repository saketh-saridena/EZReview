import React from 'react'
import './AboutUs.css'
const AboutUs = () => {
  return (
    <>
    <div className="container">
                <div className="about-us">
                    <h2>About Us</h2>
                    <p>Welcome to EZ Review, your go-to destination for simplified product reviews powered by AI. At EZ Review, we understand the overwhelming amount of information available online when it comes to purchasing decisions. That's why we've leveraged the latest advancements in artificial intelligence to provide you with concise summaries of product reviews.</p>
                    <p>Our AI algorithms analyze thousands of reviews, extracting key insights to offer you a comprehensive overview of each product. We not only highlight the positive aspects but also identify any potential drawbacks, helping you make informed choices.</p>
                    <p>Whether you're researching the latest gadgets, exploring new fashion trends, or considering home appliances, EZ Review is here to streamline your decision-making process. Experience the convenience of intelligent product analysis with EZ Review!</p>
                </div>
                <div className="image">
                    <img width={600} 
                    height={400} 
                    src="https://cdni.iconscout.com/illustration/premium/thumb/businessman-working-using-vr-tech-3840669-3202986.png?f=webp" 
                    alt=""/>
                </div>
    </div>
    </>
  )
}

export default AboutUs