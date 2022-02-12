import React, {useState} from "react";
import Menu from "./Menu";
import UserPagesMap from "./pagesMaps/UserPagesMap";
import AdminPagesMap from "./pagesMaps/AdminPagesMap";
import BackgroundAPIMap from "./pagesMaps/BackgroundAPIMap";

function Debug() {
  const [page, setPage] = useState();
  const pagesMaps = {...UserPagesMap, ...AdminPagesMap, ...BackgroundAPIMap};
  let content = page ? React.createElement(pagesMaps[page]) : null;
  return (
    <div className="debugModule">
      <h1>Narwhal Notes</h1>
      <Menu
        page={page}
        setPage={setPage}
        pageNames={Object.keys(UserPagesMap)}
      />
      <Menu
        page={page}
        setPage={setPage}
        pageNames={Object.keys(AdminPagesMap)}
      />
      <Menu
        page={page}
        setPage={setPage}
        pageNames={Object.keys(BackgroundAPIMap)}
      />
      <hr />
      {content}
    </div>
  );
}

export default Debug;
