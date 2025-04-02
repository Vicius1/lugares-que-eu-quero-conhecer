const config = {
    preset: "ts-jest",
    testEnvironment: "jsdom",
    transform: {
        "^.+\\.tsx?$": "ts-jest",
        "^.+\\.(ts|tsx|js|jsx)$": "babel-jest",
    },
    moduleNameMapper: {
        "^axios$": "axios/dist/node/axios.cjs",
        "\\.(css|scss|sass)$": "identity-obj-proxy",
    },
    setupFilesAfterEnv: ["<rootDir>/src/setupTests.ts"],
  };
  
  export default config;
  