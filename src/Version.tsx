declare const __BUILD_TIME__: string;
declare const __GIT_HASH__: string;

export default function Version() {
  return (
    <small>
      {__GIT_HASH__} • {__BUILD_TIME__}
    </small>
  )
}