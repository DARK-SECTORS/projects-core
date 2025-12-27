import "./Showreels.css";
import { showreels } from "../data/showreels";

function Showreels() {
  return (
    <section className="showreels-section">
      
      <div className="showreels-labels">
        {showreels.map((showreel) => (
          <div key={showreel.id} className="label-item">
            {showreel.title}
          </div>
        ))}
      </div>

      <div className="showreels-bg">
        {showreels.map((showreel) => (
          <div key={showreel.id} className="showreel-card">
            <div className="card-video">
              <video src={showreel.video} controls preload="metadata" />
            </div>
          </div>
        ))}
      </div>

    </section>
  );
}

export default Showreels;