import { MdFileUpload, MdOutlineRefresh } from "react-icons/md";
import * as ed from '@noble/ed25519';
import { sha512 } from '@noble/hashes/sha2.js';
import { PUBLIC_KEY } from "./PUBLIC_KEY";
import { hexToBytes } from "@noble/hashes/utils.js";
import { useState } from "react";
import { validateUSDJSON } from "./admin/USD_Creator";
import { cnw } from "./lib/tailwindUtil";
ed.hashes.sha512 = sha512;

declare const __BUILD_TIME__: string;

export default function UnifiedStaticDataUpdater() {
  const [valid, setValid] = useState<boolean | null>();
  const [set, setSet] = useState<boolean | null>();

  return (
    <div className="p-5">
      <h1 className="text-3xl font-bold">USD Patcher</h1>
      <p className="text-gray-500 mb-2">Upload a USD.CFG file to replace current USD until the next update</p>
      <div>
        <div className="flex gap-3">
          <label htmlFor="upload" className="bg-gray-800 border border-gray-500 rounded p-2 px-4 flex gap-2 items-center cursor-pointer w-fit">
            <MdFileUpload size="24" />
            Upload USD.CFG
            <input type="file" id="upload" className="hidden" onChange={async (e) => {
              const file = e.target.files?.item(0);
              if (!file) return;
              setValid(null);
              setSet(null);

              const content = await file.text();
              const json = JSON.parse(atob(content));
              
              const { signature, ...USD_JSON } = json;
              const valid = ed.verify(
                Uint8Array.from(atob(signature as string), c => c.charCodeAt(0)),
                new TextEncoder().encode(btoa(JSON.stringify(USD_JSON))),
                hexToBytes(PUBLIC_KEY)
              )
              if (!valid) {
                setValid(false);
                setSet(false);
                return;
              }
              if (validateUSDJSON(JSON.stringify(USD_JSON))) {
                setValid(true);
                setSet(false);
                return;
              }
              localStorage.setItem("USDConfig", JSON.stringify(USD_JSON));
              localStorage.setItem("USDConfigVersion", __BUILD_TIME__);
              setValid(true);
              setSet(true);

              await new Promise((r) => setTimeout(r, 5000));
              location.reload();
            }}/>
          </label>
          <button 
            className="bg-gray-800 border border-gray-500 rounded p-2 px-4 flex gap-2 items-center cursor-pointer disabled:opacity-40 disabled:cursor-auto" 
            onClick={() => {
              localStorage.removeItem("USDConfig");
              localStorage.removeItem("USDConfigVersion");
              location.reload();
            }}
            disabled={!localStorage.getItem("USDConfig")}
          >
            <MdOutlineRefresh size="24" /> Undo Patch
          </button>
        </div>
        {valid != null && (
          <p className={cnw(
            "font-bold p-1 pt-3 leading-4",
            "text-green-500", valid,
            "text-red-500", !valid
          )}>
            {valid ? "USD.CFG signature is valid" : "USD.CFG signature is invalid, thus the content is inauthentic and has been tampered with"}
          </p>
        )}
        {set != null && (
          <p className={cnw(
            "font-bold p-1 leading-4",
            "text-green-500", set,
            "text-red-500", !set
          )}>
            {set ? "USD has been updated successfully, page will reload in 5 seconds to apply configuration" : "USD was not updated and may contain an invalid config"}
          </p>
        )}
      </div>
    </div>
  )
}