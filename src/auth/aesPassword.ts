declare const __BUILD_TIME__: string;

const AESPassword: string = "SALT!" + __BUILD_TIME__;

export default AESPassword;