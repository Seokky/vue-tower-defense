declare module '*.vue' {
  import Vue from 'vue';

  export default Vue;
}

declare module '*.jpg' {
  const value: string;
  export default value;
}
