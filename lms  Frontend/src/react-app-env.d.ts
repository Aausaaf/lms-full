/// <reference types="react-scripts" />

interface NodeModule {
  hot: {
    accept(path?: string, callback?: () => void): void;
  };
}

declare global {
  namespace NodeJS {
    interface Process {
      browser: boolean;
    }
  }
}

declare module 'stream' {
  const stream: any;
  export = stream;
}
