import React from "react";

const Mode = (props) => {
  const { setMode } = props;
  return (
    <div className="modeCnt">
      <div className="vsDesc">VS</div>
      <div className="modeCol">
        <div className="modeChoice" onClick={() => setMode("H")}>
          HUMAN
          <br />
          <div className="modeTag hu">Intelligence</div>
        </div>
        <div className="modeChoice" onClick={() => setMode("A")}>
          ARTIFICIAL <br />
          <div className="modeTag ai">Intelligence</div>
        </div>
      </div>
    </div>
  );
};
export default Mode;
