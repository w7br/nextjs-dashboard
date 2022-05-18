/** @type {import('next').NextConfig} */
// This file sets a custom webpack configuration to use your Next.js app
// with Sentry.
// https://nextjs.org/docs/api-reference/next.config.js/introduction
// https://docs.sentry.io/platforms/javascript/guides/nextjs/
// content security headers things
const securityHeaders = [
  {
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    key: "X-XSS-Protection",
    value: "1; mode=block",
  },
  {
    key: "X-Frame-Options",
    value: "SAMEORIGIN",
  },
  {
    key: "Referrer-Policy",
    value: "origin-when-cross-origin",
  },
  // {
  //   key: "Content-Security-Policy",
  //   value: `default-src * 'self' 'unsafe-eval' localhost:* thirdweb.com *.thirdweb.com *.vercel.app *.nftlabs.co *.ingest.sentry.io vitals.vercel-insights.com *.g.alchemy.com rpc.ftm.tools api.avax.network nftlabs.mypinata.cloud https:; style-src 'self' 'unsafe-eval' 'unsafe-inline' rsms.me fonts.googleapis.com; object-src 'none'; font-src rsms.me *.gstatic.com; base-uri 'none'; connect-src *; img-src * blob: data:;`,
  // },
];

const moduleExports = {
  reactStrictMode: true,
  async headers() {
    return [
      {
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
  async redirects() {
    return [
      {
        source: "/portal/:match*",
        destination: "https://portal.thirdweb.com/:match*",
        permanent: true,
      },
      {
        source: "/dashboard/publish/:path*",
        destination: "/contracts/publish/:path*",
        permanent: false,
      },
      {
        source: "/dashboard/mumbai/publish/:path*",
        destination: "/contracts/publish/:path*",
        permanent: false,
      },
      {
        source: "/privacy",
        destination: "/thirdweb_Privacy_Policy_May_2022.pdf",
        permanent: false,
      },
      {
        source: "/tos",
        destination: "/Thirdweb_Terms_of_Service.pdf",
        permanent: false,
      },
    ];
  },
  images: {
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
    domains: [
      "thirdweb.com",
      "ipfs.thirdweb.com",
      "portal.thirdweb.com",
      "blog.thirdweb.com",
    ],
  },
};

// eslint-disable-next-line @typescript-eslint/no-var-requires
const withBundleAnalyzer = require("@next/bundle-analyzer")({
  enabled: process.env.ANALYZE === "true",
});

module.exports = withBundleAnalyzer(moduleExports);
