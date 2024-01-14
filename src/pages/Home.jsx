import '../styles/Home.css'

export default function Home() {
  return (
    <>
    <div id="banner">
      <div id="slider1"></div>
      <div id="slider2"></div>
    </div>
    <div id="contents">
      <div id="content1">
      <div id="feed">
      <h1>FEED</h1>
      <div id="feed-items">
      <div className="feed1">feed1</div>
      <div className="feed2">feed2</div>
      <div className="feed3">feed3</div>
      <div className="feed4">feed4</div>
      </div>
      </div>
      <div id="event">
      <h1>EVENT</h1>
      <div id="event-items">
      <div className="event1">event1</div>
      <div className="event2">event2</div>
      <div className="event3">event3</div>
      <div className="event4">event4</div>
      </div>
      </div>
      </div>

    <div id="news">
    <h1>NEWS</h1>
    </div>
    
    </div>

    </>
  );
}
