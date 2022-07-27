/** @type {import('next').NextConfig} */
const { PHASE_DEVELOPMENT_SERVER } = require("next/constants");

const nextConfig = (phase) => {
  if (phase === PHASE_DEVELOPMENT_SERVER) {
    return {
      reactStrictMode: true,
      swcMinify: true,
      env: {
        MONGOOSE_URI:
          "mongodb+srv://xinyue:Vw8Jil6UpQMspZjc@project1.c54ho.mongodb.net/nextjsdb?retryWrites=true&w=majority",
      },
    };
  }

  return {
    reactStrictMode: true,
    swcMinify: true,
    env: {
      MONGOOSE_URI:
        "mongodb+srv://xinyue:Vw8Jil6UpQMspZjc@project1.c54ho.mongodb.net/nextjsdb?retryWrites=true&w=majority",
    },
  };
};

module.exports = nextConfig;
