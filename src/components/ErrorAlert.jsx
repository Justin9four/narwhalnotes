import {useEffect, useState} from "react";

const ErrorAlert = ({error}) => {
  const [fadeClass, setFadeClass] = useState("fadeIn");
  useEffect(() => {
    if (!error) return;
    console.error(error);
    setFadeClass("fadeIn");
    let timeout = setTimeout(() => {
      setFadeClass("fadeOut");
    }, 30000);
    return () => {
      clearTimeout(timeout);
    };
  }, [error]);
  if (!error) return null;
  return <div className={"errorAlert " + fadeClass}>{error.message}</div>;
};

export default ErrorAlert;
