import { useState } from "react";

function AppShow() {
  const [visible, setVisible] = useState(false);
  const [site, setSite] = useState("");
  const [text, setText] = useState("");

  window.ipcRenderer.on("zadUpd", (_ev, ...args) => {
    const [newSite, newText] = args;

    setSite(newSite);
    setText(newText);
    setVisible(true);
  });

  window.ipcRenderer.on("zadHide", (_ev) => {
    setVisible(false);
  });

  return (
    <>
      {visible && (
        <div className="flex h-screen items-center justify-center m-0">
          <div className="rounded-xl bg-black/70  p-3 min-w-[320px] max-w-95/100 overflow-clip text-wrap text-clip break-all whitespace-pre-line">
            <h1 className="text-4xl/12 font-semibold text-white text-shadow-lg">Ваше задание на сегодня:</h1>
            <h2 className="text-3xl/14 font-semibold text-cyan-400 text-shadow-lg">{site}</h2>
            <p className="text-lg text-white text-shadow-lg">{text}</p>
          </div>
        </div>
      ) }
    </>
  );
}

export default AppShow;
