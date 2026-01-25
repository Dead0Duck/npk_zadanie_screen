import { useState, FormEvent } from "react";

function App() {
  const [site, setSite] = useState("https://npkdo.ru");
  const [text, setText] = useState("");

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    window.ipcRenderer.send("zadUpd", site, text);
  };

  const handleHide = () => {
    window.ipcRenderer.send("zadHide");
  };

  return (
    <>
      <form className="flex h-screen items-center justify-center" onSubmit={handleSubmit}>
        <div className="mt-2 w-full mx-6 space-y-12">

          <h2 className="text-lg/1 font-semibold text-white">Показ задания</h2>

          <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div className="col-span-full">
              <label htmlFor="siteInput" className="block text-sm/6 font-medium text-white">Введите заголовок</label>
              <div className="mt-2">
                <div className="flex items-center rounded-md bg-white/5 pl-3 outline-1 -outline-offset-1 outline-white/10 focus-within:outline-2 focus-within:-outline-offset-2 focus-within:outline-cyan-600 transition">
                  <input
                    id="siteInput"
                    type="text"
                    value={site}
                    onChange={(e) => setSite(e.target.value)}
                    placeholder="https://npkdo.ru"
                    className="block min-w-0 grow bg-transparent py-1.5 pr-3 pl-1 text-base text-white placeholder:text-gray-500 focus:outline-none sm:text-sm/6"
                  />
                </div>
              </div>
            </div>

            <div className="col-span-full">
              <label htmlFor="textInput" className="block text-sm/6 font-medium text-white">Введите текст задания</label>
              <div className="mt-2">
                <textarea
                  id="textInput"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  rows={6}
                  className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-cyan-600 sm:text-sm/6 transition"
                ></textarea>
              </div>
            </div>
          </div>

          <div className="mt-6 flex items-center justify-end gap-x-6">
            <button type="button" className="rounded-md px-3 py-2 text-sm font-semibold text-white hover:bg-neutral-800 transition" onClick={handleHide}>Скрыть</button>
            <button type="submit" className="rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white outline-2 outline-offset-2 outline-transparent focus-visible:outline-cyan-600 hover:bg-cyan-700 transition">Показать</button>
          </div>

        </div>
      </form>
    </>
  );
}

export default App;
