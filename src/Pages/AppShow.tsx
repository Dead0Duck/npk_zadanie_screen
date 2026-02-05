import { useState, useRef, useEffect } from "react";
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

function AppShow() {
  const [visible, setVisible] = useState(false);
  const [site, setSite] = useState("");
  const [text, setText] = useState("");
  const [siteFading, setSiteFading] = useState(false);
  const [textFading, setTextFading] = useState(false);
  const siteTimeoutRef = useRef<number | null>(null);
  const textTimeoutRef = useRef<number | null>(null);
  var siteChanged, textChanged;

  // Hot Reload
  window.ipcRenderer.removeAllListeners("zadUpd");
  window.ipcRenderer.removeAllListeners("zadHide");

  window.ipcRenderer.on("zadUpd", (_ev, ...args) => {
    const [newSite, newText] = args;


    siteChanged = newSite !== site;
    textChanged = newText !== text;

    if (!visible) {
      setSite(newSite);
      setText(newText);
      setVisible(true);
      return;
    }

    if (!siteChanged && !textChanged) return;

    if (siteChanged) {
      if (siteTimeoutRef.current) window.clearTimeout(siteTimeoutRef.current);
      setSiteFading(true);
      siteTimeoutRef.current = window.setTimeout(() => {
        setSite(newSite);
        setSiteFading(false);
        siteTimeoutRef.current = null;
      }, 300);
    }

    if (textChanged) {
      if (textTimeoutRef.current) window.clearTimeout(textTimeoutRef.current);
      setTextFading(true);
      textTimeoutRef.current = window.setTimeout(() => {
        setText(newText);
        setTextFading(false);
        textTimeoutRef.current = null;
      }, siteChanged ? 450 : 300);
    }
  });

  window.ipcRenderer.on("zadHide", (_ev) => {
    setVisible(false);
  });

  useEffect(() => {
    return () => {
      if (siteTimeoutRef.current) window.clearTimeout(siteTimeoutRef.current);
      if (textTimeoutRef.current) window.clearTimeout(textTimeoutRef.current);
    };
  }, []);

  return (
    <>
      <div className={`flex h-screen items-center justify-center m-0 overflow-hidden ${visible ? 'pointer-events-auto' : 'pointer-events-none'}`}>
        <div
          className={`rounded-xl bg-black/70 p-3 min-w-[320px] max-w-95/100 overflow-clip text-wrap text-clip break-all transform transition-all duration-300 ease-out
            ${visible ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95'}`}
        >
          <h1 className="text-6xl mb-4 font-semibold text-white text-shadow-lg">Ваше задание на сегодня</h1>
          <h2 className={`text-cyan-400 text-shadow-lg mb-4 prose prose-duckxl prose-invert prose-a:text-cyan-400 transition-all duration-300 ${visible ? (siteFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0') : 'opacity-0 translate-y-2'}`}>
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{site}</ReactMarkdown>
          </h2>
          <article
            className={`text-white text-shadow-lg prose prose-duckxl prose-invert max-w-full
              prose-a:text-cyan-400
              prose-table:bg-neutral-900
              prose-th:border prose-th:border-gray-700 prose-th:py-3
              prose-td:border prose-td:border-gray-700 transition-all duration-300 ${siteChanged && 'delay-150'} ${visible ? (textFading ? 'opacity-0 -translate-y-2' : 'opacity-100 translate-y-0') : 'opacity-0 translate-y-2'}`}
          >
            <ReactMarkdown remarkPlugins={[remarkGfm]}>{text}</ReactMarkdown>
          </article>
        </div>
      </div>
    </>
  );
}

export default AppShow;
