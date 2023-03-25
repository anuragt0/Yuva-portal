import React from "react";
import "../../css/user/about.css";


function About() {
  return (
    <>
      <div className="upper-card">
        <div className="card-overlay">
          <div className="left-part">
            <div className="title-section">
              <h1 className="title">About us</h1>
              <h3 className="sub-title">
                Your signature is all it takes to save a life.
              </h3>
            </div>
            <div className="slogan">
              <div className="upper">
                <h2 className="slogan-text">"We Can,</h2>
              </div>
              <div className="lower">
                <h2 className="slogan-text">We Will".</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="heading">
        <h1>The 3 Pillars of Yi</h1>
      </div>
      <div className="para">
        <p>
          Yi’s mission to strengthen the future of India gives a stage and voice
          to the country’s next generation of changemakers. It aims to instill
          in young minds the power of leadership, enhance the youth
          entrepreneurial ecosystem and create youth-led changes to build the
          nation.
        </p>

        <p>
          The robust framework of Yi and its vision is built on three
          significant pillars:
        </p>
      </div>
      
        <div className="card-row">
            <div className="card-column">
                <div className="imgTop">
                    <img src="https://youngindians.net/wp-content/uploads/2023/03/Youth-Leadership.jpg" alt="" />
                </div>
                <div className="imgOverlay">
                    <h3>Youth Leadership
                    <br />
                    <span>The first pillar of Yi believes that leaders aren’t born; they are made. It calls upon the students of India to recognize the leader in them through various leadership skill development programs, personal development programs and nation-building activities.</span>
                    </h3>
                </div>
            </div>
            <div className="card-column">
            <div className="imgTop">
                    <img src="https://youngindians.net/wp-content/uploads/2023/03/Nation-Building-1024x1024.jpg" alt="" />
                </div>
                <div className="imgOverlay">
                    <h3>Nation Building
                    <br />
                    <span>The youth carry the baton of building an India that is self-sufficient, informed and on the path to development. The second pillar of Yi aims to give wings to the transformative power of India’s youth through various verticals that delve into present-day issues.</span>
                    </h3>
                </div>
            </div>
            <div className="card-column">
            <div className="imgTop">
                    <img src="https://youngindians.net/wp-content/uploads/2023/03/Thought-Leadership-1024x1024.jpg" alt="" />
                </div>
                <div className="imgOverlay">
                    <h3>Thought Leadership
                    <br />
                    <span>The third pillar of Yi aims to nudge the innate leader in today’s youth to give rise to a better India of tomorrow. It informs, engages and empowers the youth of India through a contributive movement of constructive action, collaborative reasoning.</span>
                    </h3>
                </div>
            </div>
        </div>
       
    </>
  );
}

export default About;
