import bwipjs from '@bwip-js/browser';  // Platform-specific package import
import { fingerprint } from './Fingerprinting';
import { useContext } from 'react';
import { AuthContext } from './AuthWrapper';
import CryptoJS from "crypto-js";
import AESPassword from './aesPassword';

export default function DeviceQR() {
  const authContext = useContext(AuthContext);
  if (!authContext.user) return <></>;
  return (
    <>
      <p className='text-black pb-2'>{AESPassword.slice(-6, -3) + " " + AESPassword.slice(-3)}</p>
      <canvas
        ref={(canvas) => {
          if (!canvas) {
            return;
          }

          bwipjs.toCanvas(canvas, {
            bcid:        'pdf417',
            text:        CryptoJS.AES.encrypt(`${authContext.user?.uid}&&${fingerprint}&&${authContext.user?.displayName}`, AESPassword).toString(),
            scale:       3,
            height:      20,
            includetext: true,
            textxalign:  'center',
          });
        }}
      />
    </>
  );
}