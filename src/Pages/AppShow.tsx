import { useState } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function AppShow() {
  const [visible, setVisible] = useState(false);
  const [site, setSite] = useState("");
  const [text, setText] = useState("");

  // Hot Reload
  window.ipcRenderer.removeAllListeners("zadUpd")
  window.ipcRenderer.removeAllListeners("zadHide")

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
            <h1 className="text-4xl/12 font-semibold text-white text-shadow-lg">Ваше задание на сегодня</h1>
            <h2 className="text-3xl/14 text-cyan-400 text-shadow-lg prose prose-2xl prose-invert prose-a:text-cyan-400">
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{site}</ReactMarkdown>
            </h2>
            <article
              className="text-white text-shadow-lg prose prose-lg prose-invert
              prose-a:text-cyan-400
              prose-table:bg-neutral-900
              prose-th:border prose-th:border-gray-700 prose-th:py-3
              prose-td:border prose-td:border-gray-700
              prose-headings:my-0
              prose-p:my-0
              prose-table:my-0
              prose-ul:my-0
              prose-li:my-0
              prose-img:my-0"
            >
              <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
            </article>
          </div>
        </div>
      ) }
    </>
  );
}

export default AppShow;
