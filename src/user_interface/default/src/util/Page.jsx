import { useEffect, useState } from "react";
import PageRendering from "./PageRendering";
import ServerURL from "./ServerURL";

const Page = (props) => {
  const [url, setUrl] = useState("");

  useEffect(() => {
    PageRendering.shouldRenderDefault(props.subject, props.content).then(
      (res) => {
        console.log(res);
        console.log(ServerURL.getURL());
        setUrl(res.route);
      }
    );
  });

  if (url.length == 0) {
    return <div>Loading</div>;
  }

  if (url != "DEFAULT" && url != "ERROR_MULTIPLE_RULES_APPLY") {
    return (
      <iframe
        id="body-iframe"
        className="w-full"
        height={window.outerHeight - 200}
        src={ServerURL.getURL() + url}
      ></iframe>
    );
  }

  return <div>{props.children}</div>;
};

export default Page;
