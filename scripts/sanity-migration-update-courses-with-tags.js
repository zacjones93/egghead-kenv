// Author: Zac Jones
// Name: Sanity Migration - all course tags

import "@johnlindquist/kit"
let groq = await npm("groq")
let { nanoid } = await npm("nanoid");
let { GraphQLClient, gql } = await npm("graphql-request");

/*

! Set up clients

*/

const sanityClient = await npm("@sanity/client");

let eggheadUserToken = await env("EGGHEAD_AUTH_TOKEN");
let key = await env("SANITY_READ_WRITE_KEY");

export const eggheadAuthHeaders = {
  Authorization: `Bearer ${eggheadUserToken}`,
};

const eggheadSanityClient = sanityClient({
  projectId: "sb1i5dlc",
  dataset: "production",
  token: key,
  useCdn: false, // `false` if you want to ensure fresh data
});



let railsCourses = [
  {
    "title": "Create A Bar Chart with React and D3",
    "slug": "create-a-bar-chart-with-react-and-d3-0c18265f",
    "externalId": 569317,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "d3",
        "slug": "d3"
      }
    ]
  },
  {
    "title": "Complex State Management in React with Jotai and XState",
    "slug": "complex-state-management-in-react-with-jotai-and-xstate-3be0a740",
    "externalId": 559208,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "git",
        "slug": "xstate"
      }
    ]
  },
  {
    "title": "Fundamental Next.js API and Patterns",
    "slug": "fundamental-next-js-api-and-patterns-a6a7509f",
    "externalId": 582847,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "next",
        "slug": "next"
      }
    ]
  },
  {
    "title": "Use Playwright to Test and Automate Web Applications",
    "slug": "use-playwright-to-test-and-automate-web-applications-74b97e59",
    "externalId": 564894,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Effectively Build RESTful APIs using Next.js API Routes",
    "slug": "effectively-build-restful-apis-using-next-js-api-routes-41c2b1ea",
    "externalId": 568024,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "next",
        "slug": "next"
      }
    ]
  },
  {
    "title": "Test Network Edge Cases with cy.intercept() Command in Cypress",
    "slug": "test-network-edge-cases-with-cy-intercept-command-in-cypress-0fd94c68",
    "externalId": 529470,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cypress",
        "slug": "cypress"
      },
      {
        "name": "cypress",
        "slug": "cypress"
      }
    ]
  },
  {
    "title": "Ecommerce Product Management & Storefront with GraphCMS, Snipcart, & Next.js",
    "slug": "ecommerce-product-management-storefront-with-graphcms-snipcart-next-js-13cc0534",
    "externalId": 565756,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Use GraphQL Data Loaders to Prevent Scaling Issues by Batching & Caching Database Requests",
    "slug": "use-graphql-data-loaders-to-prevent-scaling-issues-by-batching-caching-database-requests-3b5d4442",
    "externalId": 535891,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "apollo",
        "slug": "apollo"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Integrate Storybook in a Next.js Application",
    "slug": "integrate-storybook-in-a-next-js-application-b6dd4df3",
    "externalId": 523338,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "next",
        "slug": "next"
      }
    ]
  },
  {
    "title": "GitHub Tips & Tricks",
    "slug": "github-tips-tricks-6fc4",
    "externalId": 350734,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "github",
        "slug": "github"
      }
    ]
  },
  {
    "title": "Creating Accessible Skeleton Loader Animation from Scratch with HTML and CSS",
    "slug": "creating-accessible-skeleton-loader-animation-from-scratch-with-html-and-css-4b3d6427",
    "externalId": 431670,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "solidity",
        "slug": "aria"
      },
      {
        "name": "html",
        "slug": "html"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Up and Running with TypeScript",
    "slug": "up-and-running-with-typescript",
    "externalId": 432661,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Develop Custom Twitch Scenes and Setup in OBS",
    "slug": "develop-custom-twitch-scenes-and-setup-in-obs-2d5d489d",
    "externalId": 458336,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "11ty"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Styling React Applications with Styled Components",
    "slug": "styling-react-applications-with-styled-components-8834",
    "externalId": 348204,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Deploy a Serverless API React Application with TypeScript",
    "slug": "deploy-a-serverless-api-react-application-with-typescript-cf0acfbf",
    "externalId": 521151,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "netlify",
        "slug": "netlify"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      },
      {
        "name": "serverless",
        "slug": "serverless"
      }
    ]
  },
  {
    "title": "Build an NFT Based Ticketing System",
    "slug": "build-an-nft-based-ticketing-system-1a2f387c",
    "externalId": 546610,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "solidity",
        "slug": "solidity"
      },
      {
        "name": "ethereum",
        "slug": "ethereum"
      }
    ]
  },
  {
    "title": "Docker Fundamentals",
    "slug": "docker-fundamentals-0cb53b55",
    "externalId": 183802,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "docker",
        "slug": "docker"
      }
    ]
  },
  {
    "title": "Animate React Apps with Framer Motion",
    "slug": "animate-react-apps-with-framer-motion-aa83f52c",
    "externalId": 531698,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Build a SaaS product with Next.js, Supabase and Stripe",
    "slug": "build-a-saas-product-with-next-js-supabase-and-stripe-61f2bc20",
    "externalId": 521026,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "supabase",
        "slug": "supabase"
      },
      {
        "name": "next",
        "slug": "next"
      },
      {
        "name": "stripe",
        "slug": "stripe"
      }
    ]
  },
  {
    "title": "Confidently Testing Redux Applications with Jest & TypeScript",
    "slug": "confidently-testing-redux-applications-with-jest-typescript-16e17d9b",
    "externalId": 482799,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "jest",
        "slug": "jest"
      },
      {
        "name": "solidity",
        "slug": "redux"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Build a News App with React Native, GraphQL and TypeScript",
    "slug": "build-a-news-app-with-react-native-graphql-and-typescript-08814691",
    "externalId": 527737,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react-native",
        "slug": "react-native"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Transform Local Functions Into Endpoints With Serverless",
    "slug": "transform-local-functions-into-endpoints-with-serverless-f985572d",
    "externalId": 534060,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Build a React App with Authorization and Authentication using AWS Amplify",
    "slug": "build-a-react-app-with-authorization-and-authentication-using-aws-amplify-8bbacfe9",
    "externalId": 524764,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Refactor a React Application to TypeScript",
    "slug": "refactor-a-react-application-to-typescript-c70bffa0",
    "externalId": 536185,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Auditing React Apps for Accessibility ",
    "slug": "auditing-react-apps-for-accessibility-08733265",
    "externalId": 511873,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cypress",
        "slug": "cypress"
      },
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "a11y",
        "slug": "a11y"
      },
      {
        "name": "github",
        "slug": "github"
      }
    ]
  },
  {
    "title": "Migrate a Client-Side Application to React 18 Beta",
    "slug": "migrate-a-client-side-application-to-react-18-beta-9379f0d1",
    "externalId": 525083,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Create a GraphQL Powered Vue 3 Application",
    "slug": "create-a-graphql-powered-vue-3-application-8152749d",
    "externalId": 526728,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      },
      {
        "name": "apollo",
        "slug": "apollo"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Build a GraphQL API with AWS CDK and AppSync",
    "slug": "build-a-graphql-api-with-aws-cdk-and-appsync-7d2a5fbc",
    "externalId": 531020,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Craft Scalable, Custom-Made Interfaces with Tailwind CSS",
    "slug": "craft-scalable-custom-made-interfaces-with-tailwind-css-8dfee898",
    "externalId": 495466,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      }
    ]
  },
  {
    "title": "React Optimization Cookbook",
    "slug": "react-optimization-cookbook-d67d54ba",
    "externalId": 518114,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Local App Development with the Firebase Emulator Suite",
    "slug": "local-app-development-with-the-firebase-emulator-suite-ebd4a2a8",
    "externalId": 521164,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "firebase",
        "slug": "firebase"
      }
    ]
  },
  {
    "title": "Build a Digital Garden with Nuxt and Nuxt Content Module",
    "slug": "build-a-digital-garden-with-nuxt-and-nuxt-content-module-9b67f0de",
    "externalId": 526324,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      },
      {
        "name": "nuxt",
        "slug": "nuxt"
      }
    ]
  },
  {
    "title": "Cloud Infrastructure Fundamentals with AWS",
    "slug": "cloud-infrastructure-fundamentals-with-aws-ee4bb845",
    "externalId": 522882,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Manage State in React Apps with Apollo Client and GraphQL",
    "slug": "manage-state-in-react-apps-with-apollo-client-and-graphql-a45b3b89",
    "externalId": 506267,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "apollo",
        "slug": "apollo"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Create a Zustand-like Module State Library",
    "slug": "create-a-zustand-like-module-state-library-bf55241e",
    "externalId": 506999,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Script Kit Showcase for Optimizing Your Everyday Workflows",
    "slug": "script-kit-showcase-for-optimizing-your-everyday-workflows-e20ceab4",
    "externalId": 533034,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "script-kit",
        "slug": "script-kit"
      }
    ]
  },
  {
    "title": "Introduction to Reactive Programming Using RxJS 5",
    "slug": "introduction-to-reactive-programming-using-rxjs-5",
    "externalId": 432558,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Build Data-Driven Applications on the Edge with Workers and Workers KV",
    "slug": "build-data-driven-applications-on-the-edge-with-workers-and-workers-kv-4932f3ea",
    "externalId": 521186,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cloudflare",
        "slug": "cloudflare"
      }
    ]
  },
  {
    "title": "Architect an Extensible Digital Garden with Next.js, Tailwind, and Nx",
    "slug": "architect-an-extensible-digital-garden-with-next-js-tailwind-and-nx-53f7628f",
    "externalId": 514815,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      },
      {
        "name": "next",
        "slug": "next"
      },
      {
        "name": "nx",
        "slug": "nx"
      }
    ]
  },
  {
    "title": "Introduction to GROQ Query Language",
    "slug": "introduction-to-groq-query-language-6e9c6fc0",
    "externalId": 530989,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Building a Customizable Animated Skeleton Loader in React Native",
    "slug": "building-a-customizable-animated-skeleton-loader-in-react-native-51f6231d",
    "externalId": 504652,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react-native",
        "slug": "react-native"
      }
    ]
  },
  {
    "title": "Scale React Development with Nx",
    "slug": "scale-react-development-with-nx-4038",
    "externalId": 405344,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "nx",
        "slug": "nx"
      }
    ]
  },
  {
    "title": "Create a Landing Page with CSS Grid and Flexbox",
    "slug": "create-a-landing-page-with-css-grid-and-flexbox-6048",
    "externalId": 371940,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "flexbox",
        "slug": "flexbox"
      },
      {
        "name": "scss",
        "slug": "scss"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Build a Real-Time Data Syncing Chat Application with Supabase and Next.js",
    "slug": "build-a-real-time-data-syncing-chat-application-with-supabase-and-next-js-84e58958",
    "externalId": 476205,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "supabase",
        "slug": "supabase"
      },
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "next",
        "slug": "next"
      },
      {
        "name": "postgres",
        "slug": "postgres"
      }
    ]
  },
  {
    "title": "Learn the Fundamentals of CSS and Sass to Create Modern and Responsive Layouts ",
    "slug": "learn-the-fundamentals-of-css-and-sass-to-create-modern-and-responsive-layouts-f341",
    "externalId": 402703,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "scss",
        "slug": "scss"
      },
      {
        "name": "css",
        "slug": "css"
      },
      {
        "name": "html",
        "slug": "html"
      }
    ]
  },
  {
    "title": "Build Static Pages Dynamically using Next.js and the Notion API",
    "slug": "build-static-pages-dynamically-using-next-js-and-the-notion-api-34849fc4",
    "externalId": 508448,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "next",
        "slug": "next"
      }
    ]
  },
  {
    "title": "Merge Objects in JavaScript",
    "slug": "merge-objects-in-javascript-34b172d4",
    "externalId": 292129,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Build a Modern User Interface with Chakra UI",
    "slug": "build-a-modern-user-interface-with-chakra-ui-fac68106",
    "externalId": 505265,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "next",
        "slug": "next"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Manage Application State with Jotai Atoms",
    "slug": "manage-application-state-with-jotai-atoms-2c3a29f0",
    "externalId": 459856,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Nuevas Características de ES2020 en JavaScript",
    "slug": "nuevas-caracteristicas-de-es2020-en-javascript-dd47b252",
    "externalId": 372461,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Manipulación Eficiente de Arreglos con JavaScript",
    "slug": "manipulacion-eficiente-de-arreglos-con-javascript-1e17fc6f",
    "externalId": 383584,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Build a Backend with Prisma in a TypeScript Node Project",
    "slug": "build-a-backend-with-prisma-in-a-typescript-node-project-ca6628d3",
    "externalId": 487059,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "prisma",
        "slug": "prisma"
      }
    ]
  },
  {
    "title": "Thinking Reactively with RxJS-resource",
    "slug": "thinking-reactively-with-rxjs-resource",
    "externalId": 347441,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Modernizing a Legacy Redux Application with React Hooks",
    "slug": "modernizing-a-legacy-redux-application-with-react-hooks-c528",
    "externalId": 430191,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "redux",
        "slug": "redux"
      }
    ]
  },
  {
    "title": "Modern Redux with Redux Toolkit (RTK) and TypeScript",
    "slug": "modern-redux-with-redux-toolkit-rtk-and-typescript-64f243c8",
    "externalId": 478578,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "redux",
        "slug": "redux"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Build Advanced Components with React Hooks",
    "slug": "build-advanced-components-with-react-hooks-810906cc",
    "externalId": 404918,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Manage Complex Tic Tac Toe Game State in React",
    "slug": "manage-complex-tic-tac-toe-game-state-in-react-dddda3f8",
    "externalId": 384937,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "CSS Fundamentals ",
    "slug": "css-fundamentals-238ce697",
    "externalId": 284646,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "React Hooks: Revisited",
    "slug": "react-hooks-revisited-abce",
    "externalId": 389643,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Manage React State with Recoil",
    "slug": "manage-react-state-with-recoil-fe987643",
    "externalId": 387936,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "recoil",
        "slug": "recoil"
      }
    ]
  },
  {
    "title": "Getting Started with Recoil in React",
    "slug": "getting-started-with-recoil-in-react-1fca",
    "externalId": 368383,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "recoil",
        "slug": "recoil"
      }
    ]
  },
  {
    "title": "Sync State Across Components with Recoil in React",
    "slug": "sync-state-across-components-with-recoil-in-react-3145",
    "externalId": 368392,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "recoil",
        "slug": "recoil"
      }
    ]
  },
  {
    "title": "React Crash Course with Hooks",
    "slug": "react-crash-course-with-hooks-ca06",
    "externalId": 365616,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Your Ultimate Guide to Understanding DOM Events",
    "slug": "your-ultimate-guide-to-understanding-dom-events-6c0c0d23",
    "externalId": 437603,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "How to Write an Open Source JavaScript Library",
    "slug": "how-to-write-an-open-source-javascript-library",
    "externalId": 432524,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "github",
        "slug": "github"
      }
    ]
  },
  {
    "title": "Apply Redux to a Modern React Hooks Application",
    "slug": "apply-redux-to-a-modern-react-hooks-application-8a37",
    "externalId": 423944,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "redux",
        "slug": "redux"
      }
    ]
  },
  {
    "title": "Add Github Login to Your Web App with OAuth 2.0",
    "slug": "add-github-login-to-your-web-app-with-oauth-2-0-74a92b57",
    "externalId": 451045,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Build a Serverless API with Cloudflare Workers",
    "slug": "build-a-serverless-api-with-cloudflare-workers-d67ca551",
    "externalId": 441045,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cloudflare",
        "slug": "cloudflare"
      }
    ]
  },
  {
    "title": "The Beginner's Guide to Vue 3",
    "slug": "the-beginner-s-guide-to-vue-3-1c46da8b",
    "externalId": 447579,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      }
    ]
  },
  {
    "title": "Up and running with Svelte 3",
    "slug": "getting-started-with-svelte-3-05a8541a",
    "externalId": 306412,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "svelte",
        "slug": "svelte"
      }
    ]
  },
  {
    "title": "TypeScript: Tips and Tricks",
    "slug": "typescript-tips-and-tricks-20c4",
    "externalId": 352310,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Get Started with the AWS Amplify Admin UI",
    "slug": "get-started-with-the-amplify-admin-ui-9e79",
    "externalId": 419933,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Advanced TypeScript Fundamentals",
    "slug": "advanced-typescript-fundamentals-579c174f",
    "externalId": 433579,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Deploy Ghost to AWS using RDS and EC2",
    "slug": "deploy-ghost-to-aws-using-rds-and-ec2-a3487caa",
    "externalId": 437276,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Pure React Pro",
    "slug": "pure-react-pro-07813b66",
    "externalId": 336867,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Sell Products Using Stripe Checkout and Netlify Functions",
    "slug": "sell-products-using-stripe-checkout-and-netlify-functions-25f6",
    "externalId": 357851,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "netlify",
        "slug": "netlify"
      },
      {
        "name": "html",
        "slug": "html"
      },
      {
        "name": "stripe",
        "slug": "stripe"
      }
    ]
  },
  {
    "title": "Creating a Digital Garden CLI with Rust",
    "slug": "creating-a-digital-garden-cli-with-rust-34b8",
    "externalId": 429801,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rust",
        "slug": "rust"
      }
    ]
  },
  {
    "title": "Build Modern Layouts with CSS Grid",
    "slug": "build-modern-layouts-with-css-grid-d3f5",
    "externalId": 418653,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Declarative UIs without CSS with elm-ui",
    "slug": "declarative-uis-without-css-with-elm-ui-93bd",
    "externalId": 425791,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "elm",
        "slug": "elm"
      }
    ]
  },
  {
    "title": "Live Workshop Recording",
    "slug": "web-security-essentials-paid-workshop-2019-12-03-2ce74617",
    "externalId": 342946,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Accessible Cross-Browser CSS Form Styling",
    "slug": "accessible-cross-browser-css-form-styling-7297",
    "externalId": 425628,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Building an OpenGraph image generation API with Cloudinary, Netlify Functions, and React",
    "slug": "building-an-opengraph-image-generation-api-with-cloudinary-netlify-functions-and-react-914e",
    "externalId": 354624,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "puppeteer",
        "slug": "puppeteer"
      },
      {
        "name": "react",
        "slug": "netlify"
      },
      {
        "name": "figma",
        "slug": "figma"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Fundamentals of Redux Course from Dan Abramov",
    "slug": "fundamentals-of-redux-course-from-dan-abramov-bd5cc867",
    "externalId": 432494,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "redux",
        "slug": "redux"
      }
    ]
  },
  {
    "title": "Learn the Fundamentals of Node.js for Beginners",
    "slug": "learn-the-fundamentals-of-node-js-for-beginners-7b6f4282",
    "externalId": 432654,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Create an eCommerce Store with Next.js and Stripe Checkout",
    "slug": "create-an-ecommerce-store-with-next-js-and-stripe-checkout-562c",
    "externalId": 412781,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "next",
        "slug": "next"
      },
      {
        "name": "stripe",
        "slug": "stripe"
      }
    ]
  },
  {
    "title": "Create Graphics with HTML Canvas",
    "slug": "create-graphics-with-html-canvas",
    "externalId": 432740,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "html",
        "slug": "html"
      }
    ]
  },
  {
    "title": "State Monad in JavaScript",
    "slug": "state-monad-in-javascript",
    "externalId": 432733,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Maintainable CSS using TypeStyle",
    "slug": "maintainable-css-using-typestyle",
    "externalId": 432731,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "webpack",
        "slug": "css"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Create your own twitter bots",
    "slug": "create-your-own-twitter-bots",
    "externalId": 432739,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "twit",
        "slug": "twit"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Get Started with Elasticsearch",
    "slug": "get-started-with-elasticsearch",
    "externalId": 432728,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "elasticsearch",
        "slug": "elasticsearch"
      }
    ]
  },
  {
    "title": "Develop Basic Web Apps with Vue.js",
    "slug": "develop-basic-web-apps-with-vue-js",
    "externalId": 432736,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      }
    ]
  },
  {
    "title": "Learn the Basics of Angular Forms",
    "slug": "learn-the-basics-of-angular-forms",
    "externalId": 432735,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Higher Order Components with Functional Patterns Using Recompose",
    "slug": "higher-order-components-with-functional-patterns-using-recompose",
    "externalId": 432693,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "recompose",
        "slug": "recompose"
      }
    ]
  },
  {
    "title": "How to Use npm Scripts as Your Build Tool",
    "slug": "how-to-use-npm-scripts-as-your-build-tool",
    "externalId": 432732,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "npm",
        "slug": "npm"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Real World React Native Animations",
    "slug": "real-world-react-native-animations",
    "externalId": 432734,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react-native",
        "slug": "react-native"
      }
    ]
  },
  {
    "title": "Up and running with Preact",
    "slug": "up-and-running-with-preact",
    "externalId": 432718,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Build Interactive JavaScript Charts with D3 v4",
    "slug": "build-interactive-javascript-charts-with-d3-v4",
    "externalId": 432727,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "d3",
        "slug": "d3"
      }
    ]
  },
  {
    "title": "Learn the Best and Most Useful SCSS",
    "slug": "learn-the-best-and-most-useful-scss",
    "externalId": 432730,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "scss"
      }
    ]
  },
  {
    "title": "Understand Angular Directives in Depth",
    "slug": "understand-angular-directives-in-depth",
    "externalId": 432729,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Convert SCSS (Sass) to CSS-in-JS",
    "slug": "convert-scss-sass-to-css-in-js",
    "externalId": 432712,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "scss",
        "slug": "scss"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Style an Application from Start to Finish",
    "slug": "style-an-application-from-start-to-finish",
    "externalId": 432726,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Use TypeScript to Develop Vue.js Web Applications",
    "slug": "use-typescript-to-develop-vue-js-web-applications",
    "externalId": 432710,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Create Dynamic Forms in Angular",
    "slug": "create-dynamic-forms-in-angular",
    "externalId": 432709,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Build Angular 1.x Apps with Redux",
    "slug": "build-angular-1-x-apps-with-redux",
    "externalId": 432713,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angularjs",
        "slug": "angularjs"
      },
      {
        "name": "redux",
        "slug": "redux"
      }
    ]
  },
  {
    "title": "Step-by-Step Async JavaScript with RxJS",
    "slug": "step-by-step-async-javascript-with-rxjs",
    "externalId": 432711,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Building apps with Ionic 2",
    "slug": "building-apps-with-ionic-2",
    "externalId": 432724,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      },
      {
        "name": "ionic",
        "slug": "ionic"
      }
    ]
  },
  {
    "title": "Create Native Mobile Apps with NativeScript for Angular",
    "slug": "create-native-mobile-apps-with-nativescript-for-angular",
    "externalId": 432705,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      },
      {
        "name": "nativescript",
        "slug": "nativescript"
      }
    ]
  },
  {
    "title": "Debug HTTP with Chrome DevTools Network Panel",
    "slug": "debug-http-with-chrome-devtools-network-panel",
    "externalId": 432707,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "chrome-devtools",
        "slug": "chrome-devtools"
      },
      {
        "name": "chrome",
        "slug": "chrome"
      }
    ]
  },
  {
    "title": "SEO Friendly Progressive Web Applications with Angular Universal",
    "slug": "seo-friendly-progressive-web-applications-with-angular-universal",
    "externalId": 432708,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Build Node.js APIs with OpenAPI Spec (Swagger)",
    "slug": "build-node-js-apis-with-openapi-spec-swagger",
    "externalId": 432694,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "openapi",
        "slug": "openapi"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Understand JavaScript Arrays",
    "slug": "understand-javascript-arrays",
    "externalId": 432714,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Build Complex Layouts with CSS Grid Layout",
    "slug": "build-complex-layouts-with-css-grid-layout",
    "externalId": 432715,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Flexbox Fundamentals",
    "slug": "flexbox-fundamentals",
    "externalId": 432690,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "flexbox",
        "slug": "flexbox"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Manage UI State with the Angular Router",
    "slug": "manage-ui-state-with-the-angular-router",
    "externalId": 432692,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Create an SVG Icon System",
    "slug": "create-an-svg-icon-system",
    "externalId": 432684,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "svgo",
        "slug": "svgo"
      },
      {
        "name": "html",
        "slug": "html"
      }
    ]
  },
  {
    "title": "Introduction to AngularJS Material",
    "slug": "introduction-to-angular-material",
    "externalId": 432716,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angularjs",
        "slug": "angularjs"
      },
      {
        "name": "angular-material",
        "slug": "angular-material"
      }
    ]
  },
  {
    "title": "Build a Node.js REST API with LoopBack",
    "slug": "build-a-node-js-rest-api-with-loopback",
    "externalId": 432673,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "loopback",
        "slug": "loopback"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Build a desktop application with Electron",
    "slug": "build-a-desktop-application-with-electron",
    "externalId": 432706,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "electron",
        "slug": "electron"
      }
    ]
  },
  {
    "title": "Vue.js State Management with Vuex and TypeScript",
    "slug": "vue-js-state-management-with-vuex-and-typescript",
    "externalId": 432677,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Build a Twelve-Factor Node.js App with Docker",
    "slug": "build-a-twelve-factor-node-js-app-with-docker",
    "externalId": 432681,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "docker"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Cycle.js Fundamentals",
    "slug": "cycle-js-fundamentals",
    "externalId": 432701,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cycle",
        "slug": "cycle"
      }
    ]
  },
  {
    "title": "Building Angular Components",
    "slug": "building-angular-components",
    "externalId": 432688,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Manage Complex State in React Apps with MobX",
    "slug": "manage-complex-state-in-react-apps-with-mobx",
    "externalId": 432686,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "mobx",
        "slug": "mobx"
      }
    ]
  },
  {
    "title": "Build a Server Rendered Vue.js App with Nuxt and Vuex",
    "slug": "build-a-server-rendered-vue-js-app-with-nuxt-and-vuex",
    "externalId": 432700,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      },
      {
        "name": "vuex",
        "slug": "vuex"
      }
    ]
  },
  {
    "title": "Test React Components with Enzyme and Jest",
    "slug": "test-react-components-with-enzyme-and-jest",
    "externalId": 432672,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "jest",
        "slug": "jest"
      }
    ]
  },
  {
    "title": "Wrangle your terminal with tmux",
    "slug": "wrangle-your-terminal-with-tmux",
    "externalId": 432675,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tmux",
        "slug": "tmux"
      }
    ]
  },
  {
    "title": "A Journey with Vue-Router",
    "slug": "a-journey-with-vue-router",
    "externalId": 432652,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      }
    ]
  },
  {
    "title": "Write simple asynchronous code with JavaScript generators",
    "slug": "write-simple-asynchronous-code-with-javascript-generators",
    "externalId": 432698,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "github",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Practical Git for Everyday Professional Use",
    "slug": "practical-git-for-everyday-professional-use",
    "externalId": 432674,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "git",
        "slug": "git"
      }
    ]
  },
  {
    "title": "Using WebAssembly with Rust",
    "slug": "using-webassembly-with-rust",
    "externalId": 432664,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rust",
        "slug": "rust"
      }
    ]
  },
  {
    "title": "Learn HTTP in Angular",
    "slug": "learn-http-in-angular",
    "externalId": 432671,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Fundamentals of React Native Video",
    "slug": "fundamentals-of-react-native-video",
    "externalId": 432678,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react-native",
        "slug": "react-native"
      }
    ]
  },
  {
    "title": "Offline-First Progressive Web Apps (PWA) in Vue.js",
    "slug": "offline-first-progressive-web-apps-pwa-in-vue-js",
    "externalId": 432670,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      }
    ]
  },
  {
    "title": "Introduction to the Python 3 Programming Language",
    "slug": "introduction-to-the-python-3-programming-language",
    "externalId": 432676,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "python",
        "slug": "python"
      }
    ]
  },
  {
    "title": "Use Grep for Fast Search from the Command Line",
    "slug": "use-grep-for-fast-search-from-the-command-line",
    "externalId": 432687,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "grep",
        "slug": "grep"
      }
    ]
  },
  {
    "title": "Asynchronous State Management with redux-observable v1",
    "slug": "asynchronous-state-management-with-redux-observable-v1",
    "externalId": 432663,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "redux-observable",
        "slug": "redux-observable"
      }
    ]
  },
  {
    "title": "Debug the DOM in Chrome with the Devtools Elements Panel",
    "slug": "using-chrome-developer-tools-elements",
    "externalId": 432699,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "chrome-devtools",
        "slug": "chrome-devtools"
      },
      {
        "name": "html",
        "slug": "html"
      },
      {
        "name": "chrome",
        "slug": "chrome"
      }
    ]
  },
  {
    "title": "RxJS Beyond the Basics: Operators in Depth",
    "slug": "rxjs-beyond-the-basics-operators-in-depth",
    "externalId": 432691,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Execute npm Package Binaries with the npx Package Runner",
    "slug": "execute-npm-package-binaries-with-the-npx-package-runner",
    "externalId": 432657,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "npm",
        "slug": "npm"
      }
    ]
  },
  {
    "title": "Building React Applications with Idiomatic Redux",
    "slug": "building-react-applications-with-idiomatic-redux",
    "externalId": 432666,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "redux",
        "slug": "redux"
      }
    ]
  },
  {
    "title": "Natural Language Processing in JavaScript with Natural",
    "slug": "natural-language-processing-in-javascript-with-natural",
    "externalId": 432669,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "natural",
        "slug": "natural"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Use D3 (v3) to Build Interactive Charts with JavaScript",
    "slug": "use-d3-v3-to-build-interactive-charts-with-javascript",
    "externalId": 432667,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "d3",
        "slug": "d3"
      }
    ]
  },
  {
    "title": "Debug JavaScript in Chrome with DevTool Sources",
    "slug": "chrome-devtools-sources-panel",
    "externalId": 432689,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "chrome-devtools",
        "slug": "chrome-devtools"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "chrome",
        "slug": "chrome"
      }
    ]
  },
  {
    "title": "Vue and Socket.io for Real-Time Communication",
    "slug": "vue-and-socket-io-for-real-time-communication",
    "externalId": 432622,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      },
      {
        "name": "express",
        "slug": "express"
      }
    ]
  },
  {
    "title": "Build a React Native Todo Application",
    "slug": "build-a-react-native-todo-application",
    "externalId": 432679,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "next",
        "slug": "react"
      },
      {
        "name": "react-native",
        "slug": "react-native"
      }
    ]
  },
  {
    "title": "Professor Frisby Introduces Composable Functional JavaScript",
    "slug": "professor-frisby-introduces-composable-functional-javascript",
    "externalId": 432655,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Quickly Transform Data with Transducers",
    "slug": "quickly-transform-data-with-transducers",
    "externalId": 432650,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Publish JavaScript packages on npm",
    "slug": "publish-javascript-packages-on-npm",
    "externalId": 432658,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "npm",
        "slug": "npm"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Understand Joins and Unions in Postgres",
    "slug": "understand-joins-and-unions-in-postgres",
    "externalId": 432668,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "postgres",
        "slug": "postgres"
      }
    ]
  },
  {
    "title": "Productive Git for Developers",
    "slug": "productive-git-for-developers",
    "externalId": 432644,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "git",
        "slug": "git"
      }
    ]
  },
  {
    "title": "Animate Angular Web Applications",
    "slug": "animate-angular-web-applications",
    "externalId": 432682,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Build A React App With Redux",
    "slug": "build-a-react-app-with-redux",
    "externalId": 432587,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "redux",
        "slug": "redux"
      }
    ]
  },
  {
    "title": "Learn ES6 (ECMAScript 2015)",
    "slug": "learn-es6-ecmascript-2015",
    "externalId": 432653,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Advanced Logging with the JavaScript Console",
    "slug": "js-console-for-power-users",
    "externalId": 432608,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "chrome-devtools",
        "slug": "chrome-devtools"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Reactive State Management in Angular with ngrx",
    "slug": "reactive-state-management-in-angular-with-ngrx",
    "externalId": 432627,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      },
      {
        "name": "ngrx-store",
        "slug": "ngrx-store"
      }
    ]
  },
  {
    "title": "Get Started with Reason",
    "slug": "get-started-with-reason",
    "externalId": 432665,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "reason",
        "slug": "reason"
      }
    ]
  },
  {
    "title": "CSS Fundamentals",
    "slug": "css-fundamentals",
    "externalId": 432619,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "End to End testing with Cypress",
    "slug": "end-to-end-testing-with-cypress",
    "externalId": 432660,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cypress",
        "slug": "cypress"
      }
    ]
  },
  {
    "title": "Make Webpack Easy with Poi",
    "slug": "make-webpack-easy-with-poi",
    "externalId": 432651,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "webpack",
        "slug": "webpack"
      }
    ]
  },
  {
    "title": "Use Types Effectively in TypeScript",
    "slug": "use-types-effectively-in-typescript",
    "externalId": 432602,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Learn Angular Router for Real-World Applications",
    "slug": "learn-angular-router-for-real-world-applications",
    "externalId": 432581,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "GIF Loop Coder for Creating Animation",
    "slug": "gif-loop-coder-for-creating-animation",
    "externalId": 432634,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Using Postgres Window Functions",
    "slug": "using-postgres-window-functions",
    "externalId": 432659,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "nuxt",
        "slug": "postgres"
      }
    ]
  },
  {
    "title": "Learn HTML5 Graphics and Animation",
    "slug": "learn-html5-graphics-and-animation",
    "externalId": 432648,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "html",
        "slug": "html"
      }
    ]
  },
  {
    "title": "Build an App with React Suspense",
    "slug": "build-an-app-with-react-suspense",
    "externalId": 432617,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Create a News App with Vue.js and Nuxt",
    "slug": "create-a-news-app-with-vue-js-and-nuxt",
    "externalId": 432636,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      },
      {
        "name": "nuxt",
        "slug": "nuxt"
      }
    ]
  },
  {
    "title": "RxJS Subjects and Multicasting Operators",
    "slug": "rxjs-subjects-and-multicasting-operators",
    "externalId": 432645,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "JavaScript ES2019 in Practice",
    "slug": "javascript-es2019-in-practice",
    "externalId": 432647,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Using Angular 2 Patterns in Angular 1.x Apps",
    "slug": "using-angular-2-patterns-in-angular-1-x-apps",
    "externalId": 432646,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angularjs",
        "slug": "angularjs"
      }
    ]
  },
  {
    "title": "Create Amazing Animations with GreenSock",
    "slug": "create-amazing-animations-with-greensock",
    "externalId": 432618,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "greensock",
        "slug": "greensock"
      }
    ]
  },
  {
    "title": "How to Contribute to an Open Source Project on GitHub",
    "slug": "how-to-contribute-to-an-open-source-project-on-github",
    "externalId": 432579,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "git",
        "slug": "git"
      },
      {
        "name": "github",
        "slug": "github"
      }
    ]
  },
  {
    "title": "CSS Selectors in Depth",
    "slug": "css-selectors-in-depth",
    "externalId": 432614,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Immutable JavaScript Data Structures with Immer",
    "slug": "immutable-javascript-data-structures-with-immer",
    "externalId": 432616,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "VR Applications using React 360",
    "slug": "vr-applications-using-react-360",
    "externalId": 432575,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Use Suspense to Simplify Your Async UI",
    "slug": "use-suspense-to-simplify-your-async-ui",
    "externalId": 432509,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Animate React Native UI Elements",
    "slug": "animate-react-native-ui-elements",
    "externalId": 432606,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "react-native",
        "slug": "react-native"
      }
    ]
  },
  {
    "title": "Optimistic UI Updates in React",
    "slug": "optimistic-ui-updates-in-react",
    "externalId": 432590,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Integrate IBM Domino with Node.js",
    "slug": "integrate-ibm-domino-with-node-js",
    "externalId": 432594,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "express",
        "slug": "express"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Understand JavaScript's this Keyword in Depth",
    "slug": "understand-javascript-s-this-keyword-in-depth",
    "externalId": 432560,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Automate Daily Development Tasks with Bash",
    "slug": "automate-daily-development-tasks-with-bash",
    "externalId": 432552,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "bash",
        "slug": "bash"
      }
    ]
  },
  {
    "title": "Develop a Serverless Backend using Node.js on AWS Lambda",
    "slug": "develop-a-serverless-backend-using-node-js-on-aws-lambda",
    "externalId": 432498,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Safer JavaScript with the Maybe Type",
    "slug": "safer-javascript-with-the-maybe-type",
    "externalId": 432531,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Build Content Rich Progressive Web Apps with Gatsby and Contentful",
    "slug": "build-content-rich-progressive-web-apps-with-gatsby-and-contentful",
    "externalId": 432527,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "Reduce Redux Boilerplate with Redux-Actions",
    "slug": "reduce-redux-boilerplate-with-redux-actions",
    "externalId": 432555,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "redux",
        "slug": "redux"
      }
    ]
  },
  {
    "title": "Manage React Form State with redux-form",
    "slug": "manage-react-form-state-with-redux-form",
    "externalId": 432550,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "redux",
        "slug": "redux"
      }
    ]
  },
  {
    "title": "Develop React Applications with Mobx and TypeScript",
    "slug": "develop-react-applications-with-mobx-and-typescript",
    "externalId": 432520,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "mobx",
        "slug": "mobx"
      },
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Regex in Javascript",
    "slug": "regex-in-javascript",
    "externalId": 432559,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Build Async Vue.js Apps with RxJS",
    "slug": "build-async-vue-js-apps-with-rxjs",
    "externalId": 432512,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      },
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Getting Started with Express.js",
    "slug": "getting-started-with-express-js",
    "externalId": 432563,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "express",
        "slug": "express"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Building Serverless Web Applications with React & AWS Amplify",
    "slug": "building-serverless-web-applications-with-react-aws-amplify",
    "externalId": 432515,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react-native",
        "slug": "react-native"
      },
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Reusable State and Effects with React Hooks",
    "slug": "reusable-state-and-effects-with-react-hooks",
    "externalId": 432528,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Advanced Angular Component Patterns",
    "slug": "advanced-angular-component-patterns",
    "externalId": 432514,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Simplify React Apps with React Hooks",
    "slug": "simplify-react-apps-with-react-hooks",
    "externalId": 432510,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Progressive Web Apps in React with create-react-app",
    "slug": "progressive-web-apps-in-react-with-create-react-app",
    "externalId": 432497,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Save time avoiding common mistakes using RxJS",
    "slug": "save-time-avoiding-common-mistakes-using-rxjs",
    "externalId": 432518,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Advanced Static Types in TypeScript",
    "slug": "advanced-static-types-in-typescript",
    "externalId": 432499,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Build Redux Style Applications with Angular, RxJS, and ngrx/store",
    "slug": "build-redux-style-applications-with-angular-rxjs-and-ngrx-store",
    "externalId": 432525,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      },
      {
        "name": "ngrx-store",
        "slug": "ngrx-store"
      },
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Designing GraphQL Schemas",
    "slug": "designing-graphql-schemas-99db",
    "externalId": 432506,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Learn to Use VIM",
    "slug": "learn-to-use-vim",
    "externalId": 432556,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vim",
        "slug": "vim"
      }
    ]
  },
  {
    "title": "Build React Components from Streams with RxJS and Recompose",
    "slug": "build-react-components-from-streams-with-rxjs-and-recompose",
    "externalId": 432501,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "rxjs",
        "slug": "rxjs"
      },
      {
        "name": "recompose",
        "slug": "recompose"
      }
    ]
  },
  {
    "title": "SQL Fundamentals",
    "slug": "sql-fundamentals",
    "externalId": 432504,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "postgres",
        "slug": "postgres"
      }
    ]
  },
  {
    "title": "Build a Video Chat App with Twilio and Gatsby",
    "slug": "build-a-video-chat-app-with-twilio-and-gatsby",
    "externalId": 432507,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "GraphQL Query Language",
    "slug": "graphql-query-language",
    "externalId": 432503,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Structure Angular Apps with Angular Material Components",
    "slug": "structure-angular-apps-with-angular-material-components",
    "externalId": 432566,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Build an App with the AWS Cloud Development Kit",
    "slug": "build-an-app-with-the-aws-cloud-development-kit",
    "externalId": 432500,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Use Objective C, Swift and Java api’s in NativeScript for Angular iOS and Android apps ",
    "slug": "use-objective-c-swift-and-java-api-s-in-nativescript-for-angular-ios-and-android-apps",
    "externalId": 432496,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "jwt",
        "slug": "nativescript"
      },
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Build Custom Command Line Interface (CLI) Tooling with oclif and TypeScript",
    "slug": "build-custom-command-line-interface-cli-tooling-with-oclif-and-typescript",
    "externalId": 432487,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Practical Advanced TypeScript",
    "slug": "practical-advanced-typescript",
    "externalId": 432493,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "Build an Angular Instant Search Component",
    "slug": "build-an-angular-instant-search-component",
    "externalId": 432495,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      },
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Manage Application State with Mobx-state-tree",
    "slug": "manage-application-state-with-mobx-state-tree",
    "externalId": 432564,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "mobx",
        "slug": "mobx"
      }
    ]
  },
  {
    "title": "Asynchronous Programming: The End of The Loop",
    "slug": "asynchronous-programming-the-end-of-the-loop",
    "externalId": 432562,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Reduce Data with Javascript Array#reduce",
    "slug": "reduce-data-with-javascript-array-reduce",
    "externalId": 432557,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Build Your First Production Quality React App",
    "slug": "build-your-first-production-quality-react-app",
    "externalId": 432492,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Get Started with Dart",
    "slug": "get-started-with-dart",
    "externalId": 432553,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "dart",
        "slug": "dart"
      }
    ]
  },
  {
    "title": "Beautiful and Accessible Drag and Drop with react-beautiful-dnd",
    "slug": "beautiful-and-accessible-drag-and-drop-with-react-beautiful-dnd",
    "externalId": 432519,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Create Smooth, Performant Transitions with React Transition Group v2",
    "slug": "create-smooth-performant-transitions-with-react-transition-group-v2",
    "externalId": 432516,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Leverage New Features of React 16",
    "slug": "leverage-new-features-of-react-16",
    "externalId": 432532,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Understanding JavaScript's Prototypal Inheritance",
    "slug": "understanding-javascript-s-prototypal-inheritance",
    "externalId": 432535,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Build Algorithms using Typescript",
    "slug": "build-algorithms-using-typescript",
    "externalId": 432489,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "JSON Web Token (JWT) Authentication with Node.js and Auth0",
    "slug": "json-web-token-jwt-authentication-with-node-js-and-auth0",
    "externalId": 432537,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "express",
        "slug": "express"
      },
      {
        "name": "jwt",
        "slug": "jwt"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Start Building Accessible Web Applications Today",
    "slug": "start-building-accessible-web-applications-today",
    "externalId": 432561,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aria",
        "slug": "aria"
      },
      {
        "name": "html",
        "slug": "html"
      }
    ]
  },
  {
    "title": "Gatsby Theme Authoring",
    "slug": "gatsby-theme-authoring",
    "externalId": 432482,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "Build Your Own RxJS Pipeable Operators",
    "slug": "build-your-own-rxjs-pipeable-operators",
    "externalId": 432539,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Modern JavaScript Tooling with React",
    "slug": "modern-javascript-tooling-with-react",
    "externalId": 432513,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "webpack",
        "slug": "webpack"
      }
    ]
  },
  {
    "title": "Get Started Using WebAssembly (wasm)",
    "slug": "get-started-using-webassembly-wasm",
    "externalId": 432540,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "React Context for State Management",
    "slug": "react-context-for-state-management",
    "externalId": 432508,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Angular Service Injection with the Dependency Injector (DI)",
    "slug": "angular-service-injection-with-the-dependency-injector-di",
    "externalId": 432529,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Angular Dependency Injection (DI) Explained",
    "slug": "angular-dependency-injection-di-explained",
    "externalId": 432541,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Create 3D Graphics in JavaScript Using WebGL",
    "slug": "create-3d-graphics-in-javascript-using-webgl",
    "externalId": 432546,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "webgl",
        "slug": "webgl"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Thinking Reactively with RxJS",
    "slug": "thinking-reactively-with-rxjs",
    "externalId": 432547,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Redux and the State ADT",
    "slug": "redux-and-the-state-adt",
    "externalId": 432536,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "redux",
        "slug": "redux"
      },
      {
        "name": "tailwind",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Learn Advanced CSS Layout Techniques",
    "slug": "learn-advanced-css-layout-techniques",
    "externalId": 432538,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Build Complex 3D models with WebGL",
    "slug": "build-complex-3d-models-with-webgl",
    "externalId": 432549,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "webgl",
        "slug": "webgl"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Get Started With PostgreSQL",
    "slug": "get-started-with-postgresql",
    "externalId": 432543,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "postgres",
        "slug": "postgres"
      }
    ]
  },
  {
    "title": "RxJS Beyond the Basics: Creating Observables from scratch",
    "slug": "rxjs-beyond-the-basics-creating-observables-from-scratch",
    "externalId": 432522,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Record Badass Screencasts for egghead.io",
    "slug": "record-badass-screencasts-for-egghead-io",
    "externalId": 432517,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "egghead",
        "slug": "egghead"
      }
    ]
  },
  {
    "title": "The Beginner's Guide to React",
    "slug": "the-beginner-s-guide-to-react",
    "externalId": 432490,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Shareable Custom Hooks in React",
    "slug": "shareable-custom-hooks-in-react",
    "externalId": 432486,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Use Higher Order Observables in RxJS Effectively",
    "slug": "use-higher-order-observables-in-rxjs-effectively",
    "externalId": 432533,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Web Security Essentials: MITM, CSRF, and XSS",
    "slug": "web-security-essentials-mitm-csrf-and-xss",
    "externalId": 432485,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "express",
        "slug": "express"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Add Internationalization (i18n) to a React app using React Intl",
    "slug": "add-internationalization-i18n-to-a-react-app-using-react-intl",
    "externalId": 432488,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "SSH for Remote Server Authentication",
    "slug": "ssh-for-remote-server-authentication",
    "externalId": 432481,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "bash",
        "slug": "bash"
      }
    ]
  },
  {
    "title": "Build Virtual Reality Experiences Using React VR",
    "slug": "build-virtual-reality-experiences-using-react-vr",
    "externalId": 432480,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Asynchronous JavaScript with async/await",
    "slug": "asynchronous-javascript-with-async-await",
    "externalId": 432478,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Understand How to Style Angular Components",
    "slug": "understand-how-to-style-angular-components",
    "externalId": 432479,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "GraphQL Data in React with Apollo Client",
    "slug": "graphql-data-in-react-with-apollo-client",
    "externalId": 432477,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "apollo",
        "slug": "apollo"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Up and Running with redux-observable",
    "slug": "up-and-running-with-redux-observable",
    "externalId": 432475,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "redux-observable",
        "slug": "redux-observable"
      },
      {
        "name": "redux",
        "slug": "redux"
      },
      {
        "name": "rxjs",
        "slug": "rxjs"
      }
    ]
  },
  {
    "title": "Getting Started with Algolia InstantSearch.js",
    "slug": "getting-started-with-algolia-instantsearch-js",
    "externalId": 432476,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "algolia",
        "slug": "algolia"
      }
    ]
  },
  {
    "title": "Just Enough Functional Programming in JavaScript",
    "slug": "just-enough-functional-programming-in-javascript",
    "externalId": 432473,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Create Dynamic Components in Angular",
    "slug": "create-dynamic-components-in-angular",
    "externalId": 432474,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Build a Server Rendered + Code Split App in React with React Universal Component",
    "slug": "build-a-server-rendered-code-split-app-in-react-with-react-universal-component",
    "externalId": 432471,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Introduction to State Machines Using XState",
    "slug": "introduction-to-state-machines-using-xstate",
    "externalId": 432472,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "xstate",
        "slug": "xstate"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Advanced JavaScript Foundations",
    "slug": "advanced-javascript-foundations",
    "externalId": 432469,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Test Production Ready Apps with Cypress",
    "slug": "test-production-ready-apps-with-cypress",
    "externalId": 432470,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cypress",
        "slug": "cypress"
      }
    ]
  },
  {
    "title": "Fix Common Git Mistakes",
    "slug": "fix-common-git-mistakes",
    "externalId": 432468,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "git",
        "slug": "git"
      }
    ]
  },
  {
    "title": "React Class Component Patterns",
    "slug": "react-class-component-patterns",
    "externalId": 432466,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Scalable Offline-Ready GraphQL Applications with AWS AppSync & React",
    "slug": "scalable-offline-ready-graphql-applications-with-aws-appsync-react",
    "externalId": 432465,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "graphql",
        "slug": "graphql"
      },
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Fully Connected Neural Networks with Keras",
    "slug": "fully-connected-neural-networks-with-keras",
    "externalId": 432462,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "python",
        "slug": "python"
      }
    ]
  },
  {
    "title": "Develop Accessible Web Apps with React",
    "slug": "develop-accessible-web-apps-with-react",
    "externalId": 432444,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "aria",
        "slug": "aria"
      },
      {
        "name": "screen-reader",
        "slug": "screen-reader"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Advanced Bash Automation for Web Developers",
    "slug": "advanced-bash-automation-for-web-developers",
    "externalId": 432463,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "bash",
        "slug": "bash"
      },
      {
        "name": "mac",
        "slug": "mac"
      }
    ]
  },
  {
    "title": "Write Your First Program with the Rust Language",
    "slug": "write-your-first-program-with-the-rust-language",
    "externalId": 432461,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rust",
        "slug": "rust"
      }
    ]
  },
  {
    "title": "Build Maps with React Leaflet",
    "slug": "build-maps-with-react-leaflet",
    "externalId": 432449,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "leaflet",
        "slug": "leaflet"
      }
    ]
  },
  {
    "title": "Construct Sturdy UIs with XState",
    "slug": "construct-sturdy-uis-with-xstate",
    "externalId": 432450,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "xstate",
        "slug": "xstate"
      }
    ]
  },
  {
    "title": "Build a React Native Application for iOS and Android from Start to Finish",
    "slug": "build-a-react-native-application-for-ios-and-android-from-start-to-finish",
    "externalId": 432464,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react-native",
        "slug": "react-native"
      }
    ]
  },
  {
    "title": "Algorithms in JavaScript",
    "slug": "algorithms-in-javascript",
    "externalId": 432447,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "JavaScript Promises in Depth",
    "slug": "javascript-promises-in-depth",
    "externalId": 432453,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Advanced SQL for Professional Developers",
    "slug": "advanced-sql-for-professional-developers",
    "externalId": 432452,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "postgres",
        "slug": "postgres"
      }
    ]
  },
  {
    "title": "React Navigation for Native Mobile Applications",
    "slug": "react-navigation-for-native-mobile-applications",
    "externalId": 432459,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react-native",
        "slug": "react-native"
      }
    ]
  },
  {
    "title": "Advanced Fine-Grained Control of Vue.js Components",
    "slug": "advanced-fine-grained-control-of-vue-js-components",
    "externalId": 432458,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vue",
        "slug": "vue"
      }
    ]
  },
  {
    "title": "Build User Interfaces by Composing CSS Utility Classes with Tailwind",
    "slug": "build-user-interfaces-by-composing-css-utility-classes-with-tailwind",
    "externalId": 432457,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "The Beginner's Guide to Figma",
    "slug": "the-beginner-s-guide-to-figma",
    "externalId": 432454,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "figma",
        "slug": "figma"
      }
    ]
  },
  {
    "title": "Data Structures and Algorithms in JavaScript",
    "slug": "data-structures-and-algorithms-in-javascript",
    "externalId": 432446,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Getting Started with Angular Elements",
    "slug": "getting-started-with-angular-elements",
    "externalId": 432456,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "AngularJS and Webpack for Modular Applications",
    "slug": "angularjs-and-webpack-for-modular-applications",
    "externalId": 432717,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angularjs",
        "slug": "angularjs"
      },
      {
        "name": "webpack",
        "slug": "webpack"
      }
    ]
  },
  {
    "title": "Functional Programming in JavaScript with Ramda.js",
    "slug": "functional-programming-in-javascript-with-ramda-js",
    "externalId": 432621,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "ramda",
        "slug": "ramda"
      }
    ]
  },
  {
    "title": "Introduction to Node Servers with Hapi.js",
    "slug": "introduction-to-node-servers-with-hapi-js",
    "externalId": 432554,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "hapi",
        "slug": "hapi"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Create Contextual Video Analysis App with NextJS and Symbl.ai",
    "slug": "create-contextual-video-analysis-app-with-nextjs-and-symbl-ai-4efb",
    "externalId": 422773,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "next",
        "slug": "next"
      }
    ]
  },
  {
    "title": "Welcome to Epic React",
    "slug": "welcome-to-epic-react-1044",
    "externalId": 378811,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "CSS Tips and Tricks",
    "slug": "css-tips-and-tricks-930b",
    "externalId": 393131,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Design with Tailwind CSS Masterclass",
    "slug": "design-with-tailwind-css-masterclass-f0db",
    "externalId": 348912,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      }
    ]
  },
  {
    "title": "Design and Implement Common Tailwind Components",
    "slug": "design-and-implement-common-tailwind-components-8fbb9b19",
    "externalId": 340482,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      }
    ]
  },
  {
    "title": "Introduction to Tailwind and the Utility First Workflow",
    "slug": "introduction-to-tailwind-and-the-utility-first-workflow-ac67",
    "externalId": 340481,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      }
    ]
  },
  {
    "title": "Build and Style a Dropdown in Tailwind",
    "slug": "build-and-style-a-dropdown-in-tailwind-7f34fead",
    "externalId": 340484,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      }
    ]
  },
  {
    "title": "Build a Responsive Navbar with Tailwind",
    "slug": "build-a-responsive-navbar-with-tailwind-4d328a35",
    "externalId": 340483,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      }
    ]
  },
  {
    "title": "Introduction to Cloudflare Workers",
    "slug": "introduction-to-cloudflare-workers-5aa3",
    "externalId": 418892,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cloudflare",
        "slug": "cloudflare"
      }
    ]
  },
  {
    "title": "Tic Tac Toe with CSS and SVG",
    "slug": "tic-tac-toe-with-css-and-svg-be02",
    "externalId": 430437,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      },
      {
        "name": "html",
        "slug": "html"
      }
    ]
  },
  {
    "title": "Testing JavaScript Workshop Overview",
    "slug": "testing-javascript-workshop-overview-fd24",
    "externalId": 340862,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "jest",
        "slug": "jest"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "ES6 and Beyond",
    "slug": "es6-and-beyond-9922",
    "externalId": 429689,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Building Forms with React and Formik",
    "slug": "building-forms-with-react-and-formik-152933f6",
    "externalId": 301918,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Containerize Full-Stack JavaScript Applications with Docker",
    "slug": "containerize-full-stack-javascript-applications-with-docker-30a8",
    "externalId": 410102,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "docker",
        "slug": "docker"
      }
    ]
  },
  {
    "title": "Composing Closures and Callbacks in JavaScript",
    "slug": "composing-closures-and-callbacks-in-javascript-1223",
    "externalId": 402036,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Build a Corgi Up-boop Web App with Netlify Serverless Functions and Hasura",
    "slug": "build-a-corgi-up-boop-web-app-with-netlify-serverless-functions-and-hasura-553c",
    "externalId": 414202,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "netlify",
        "slug": "netlify"
      },
      {
        "name": "serverless",
        "slug": "serverless"
      }
    ]
  },
  {
    "title": "Creating Buttons in React Native with Three Levels of Customization",
    "slug": "creating-buttons-in-react-native-with-three-levels-of-customization-d657",
    "externalId": 413036,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react-native",
        "slug": "react-native"
      }
    ]
  },
  {
    "title": "Getting Started with Gatsbyjs recipes",
    "slug": "getting-started-with-gatsbyjs-recipes-c79a",
    "externalId": 359376,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "WordPress as a Headless Content Management System (CMS) and GraphQL API",
    "slug": "headless-wordpress-4a14",
    "externalId": 410100,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "wordpress",
        "slug": "wordpress"
      }
    ]
  },
  {
    "title": "Using DynamoDB with Next.js",
    "slug": "using-dynamodb-with-next-js-b40c",
    "externalId": 411838,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "next",
        "slug": "next"
      },
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Optional Chaining",
    "slug": "optional-chaining-f563",
    "externalId": 392454,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "chrome",
        "slug": "chrome"
      }
    ]
  },
  {
    "title": "How to Livestream Code and Design on Twitch",
    "slug": "how-to-livestream-code-and-design-on-twitch-6646",
    "externalId": 355867,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "parti-corgi",
        "slug": "parti-corgi"
      }
    ]
  },
  {
    "title": "Spring Animation in React with React Spring",
    "slug": "spring-animation-in-react-with-react-spring-7bb9",
    "externalId": 354833,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Up and Running with Gatsby",
    "slug": "up-and-running-with-gatsby-4c82cf0c",
    "externalId": 342472,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      },
      {
        "name": "netlify",
        "slug": "netlify"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "MDX Conf 2020",
    "slug": "mdx-conf-3fc2",
    "externalId": 389431,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "mdx"
      }
    ]
  },
  {
    "title": "Build Performant and Progressive Angular Applications",
    "slug": "build-performant-and-progressive-angular-applications-78032ff5",
    "externalId": 331031,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Mapping with React Leaflet",
    "slug": "mapping-with-react-leaflet-e0e0",
    "externalId": 357381,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "leaflet",
        "slug": "leaflet"
      }
    ]
  },
  {
    "title": "Image Loading and Optimization in Gatsby with gatsby-image",
    "slug": "using-gatsby-image-with-gatsby-ea85129e",
    "externalId": 331600,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Build a full-stack app with Prisma",
    "slug": "build-a-full-stack-app-with-prisma-2-7c81",
    "externalId": 369129,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "prisma",
        "slug": "prisma"
      },
      {
        "name": "next",
        "slug": "next"
      }
    ]
  },
  {
    "title": "Introduction to Next.js 9",
    "slug": "introduction-to-next-js-9-9c01",
    "externalId": 355775,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "next",
        "slug": "next"
      }
    ]
  },
  {
    "title": "Angular Basics",
    "slug": "angular-basics-888f",
    "externalId": 355707,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "angular",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "Chrome DevTools tips & tricks",
    "slug": "4-things-you-might-not-know-about-chrome-devtools-98f99710",
    "externalId": 299663,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "chrome-devtools",
        "slug": "chrome-devtools"
      },
      {
        "name": "chrome",
        "slug": "chrome"
      }
    ]
  },
  {
    "title": "Building Live Search Box",
    "slug": "building-light-search-box-bb64",
    "externalId": 401814,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Implementing a Word Game with Patterns and React",
    "slug": "implementing-a-word-game-with-patterns-and-react-dcb0",
    "externalId": 401818,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Bringing the Pattern into React",
    "slug": "bringing-the-pattern-into-react-decf",
    "externalId": 401813,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Use a Completion Pattern to enable Repetition and Sequencing",
    "slug": "use-a-completion-pattern-to-enable-repetition-and-sequencing-f0ba",
    "externalId": 401812,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Implement the Pattern in Common Async Scenarios",
    "slug": "implement-the-pattern-in-common-async-scenarios-c059",
    "externalId": 401809,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Use the Callback and Closure Pattern to Build Advanced Async Behaviors",
    "slug": "use-the-callback-and-closure-pattern-to-build-advanced-async-behaviors-db15",
    "externalId": 401811,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Establish Callback and Closure patterns Around Async Browser Behaviors",
    "slug": "establish-callback-and-closure-patterns-around-async-browser-behaviors-c813",
    "externalId": 401810,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Introduction to Callbacks, Broadcasters, and Listeners",
    "slug": "introduction-to-callbacks-broadcasters-and-listeners-5bd7",
    "externalId": 401802,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Kent's Blog Posts as Screencasts",
    "slug": "kent-s-blog-posts-as-screencasts-eefa540c",
    "externalId": 342304,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Up and Running with Amplify Static Site Hosting",
    "slug": "up-and-running-with-amplify-console-hosting-ci-cd-c680",
    "externalId": 354280,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "The Ins and Outs of Python Tuples",
    "slug": "the-ins-and-outs-of-python-tuples-39ea",
    "externalId": 402379,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "python",
        "slug": "python"
      }
    ]
  },
  {
    "title": "Construye Componentes Avanzados con React Hooks y Patrones de Diseño",
    "slug": "hooks-3d62",
    "externalId": 388003,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Web Components",
    "slug": "web-components-f902",
    "externalId": 353203,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Add e2e tests with cypress to a React application",
    "slug": "add-e2e-tests-with-cypress-to-a-react-application-7691",
    "externalId": 354425,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "cypress",
        "slug": "cypress"
      }
    ]
  },
  {
    "title": "Use AWS Billing & Cost Management Dashboard to keep your AWS bill to minimum",
    "slug": "use-aws-billing-cost-management-dashboard-to-keep-your-aws-bill-to-minimum-ff0f",
    "externalId": 352273,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Learn React lazy, memo, useState and useEffect in 7 minutes",
    "slug": "learn-react-lazy-memo-usestate-and-useeffect-in-10-minutes-3bd981f6",
    "externalId": 283292,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Use CSS to Create Art and Illustrations",
    "slug": "create-css-illustrations-b24c",
    "externalId": 386067,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Up and Running with AWS Amplify Functions",
    "slug": "up-and-running-with-amplify-functions-f523",
    "externalId": 381413,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "node",
        "slug": "node"
      },
      {
        "name": "aws",
        "slug": "aws"
      },
      {
        "name": "python",
        "slug": "python"
      }
    ]
  },
  {
    "title": "Learning Rust by Working Through the Rustlings Exercises",
    "slug": "learning-rust-by-solving-the-rustlings-exercises-a722",
    "externalId": 383300,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rust",
        "slug": "rust"
      }
    ]
  },
  {
    "title": "Creación de un plugin de Gatsby desde cero",
    "slug": "creacion-de-un-plugin-de-gatsby-desde-cero-5c8b",
    "externalId": 382489,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Creating a Gatsby Source Plugin",
    "slug": "creating-a-gatsby-source-plugin-3f01",
    "externalId": 382488,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "gatsby",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "Building an API with Express",
    "slug": "building-an-api-with-express-f1ea",
    "externalId": 381894,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "express",
        "slug": "express"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Blog Theme 2.0",
    "slug": "blog-theme-2-0-9469",
    "externalId": 381074,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "Source and Create Nodes with Data from an API in Gatsby to Create a Pokemon Pokedex",
    "slug": "source-and-create-nodes-with-data-from-an-api-in-gatsby-to-create-a-pokemon-pokedex-5e28",
    "externalId": 380559,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "Upgrade Your Terminal and Make It a Joy to Work with",
    "slug": "upgrade-your-terminal-and-make-it-a-joy-to-work-with-13f1",
    "externalId": 377056,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "bash",
        "slug": "bash"
      }
    ]
  },
  {
    "title": "From Mockup to Webpage",
    "slug": "from-mockup-to-webpage-457c",
    "externalId": 379295,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Manipulating strings in bash",
    "slug": "manipulating-strings-in-bash-db13",
    "externalId": 355727,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "bash",
        "slug": "bash"
      }
    ]
  },
  {
    "title": "Build a Terminal Dashboard with React",
    "slug": "build-a-terminal-dashboard-with-react-3f4d",
    "externalId": 378411,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Secure GitHub connections with SSH",
    "slug": "secure-github-connections-with-ssh-325c",
    "externalId": 372393,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "bash",
        "slug": "bash"
      },
      {
        "name": "github",
        "slug": "github"
      }
    ]
  },
  {
    "title": "Create a New Github Action to Automate Code Tasks with Javascript",
    "slug": "create-a-new-github-action-to-automate-code-tasks-with-javascript-f1e9",
    "externalId": 374827,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "github",
        "slug": "github"
      }
    ]
  },
  {
    "title": "Learn AWS DynamoDB from scratch",
    "slug": "learn-aws-dynamodb-from-scratch-21c3",
    "externalId": 352282,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Intro to DynamoDB",
    "slug": "intro-to-dynamodb-f35a",
    "externalId": 352509,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Build serverless applications with AWS Serverless Application Model (AWS SAM)",
    "slug": "learn-aws-serverless-application-model-aws-sam-framework-from-scratch-baf9",
    "externalId": 347750,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Exploring Common Algebraic Data Types Used in Functional Programming",
    "slug": "a-to-z-in-fp-beyond-the-basics-of-functional-programming-f7ff",
    "externalId": 367421,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Recreating Popular JavaScript Utility Methods from Lodash",
    "slug": "recreating-popular-javascript-utility-methods-from-lodash-5653",
    "externalId": 371174,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "lodash",
        "slug": "lodash"
      }
    ]
  },
  {
    "title": "Sprinkle declarative, reactive behaviour on your HTML with Alpine JS",
    "slug": "sprinkle-declarative-reactive-behaviour-on-your-html-with-alpine-js-5f8b",
    "externalId": 367442,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "alpine",
        "slug": "alpine"
      }
    ]
  },
  {
    "title": "Quickly Create a New Company Website Managed by a CMS with TakeShape and Gatsby",
    "slug": "quickly-create-a-new-company-website-managed-by-a-cms-with-takeshape-and-gatsby-4e4d",
    "externalId": 367673,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "Build a REST API with Express 5 and node 14",
    "slug": "building-an-express-api-with-express-5-and-node-14-7b96",
    "externalId": 367363,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "express",
        "slug": "express"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "Learn CSS Animations for a Better User Experience ",
    "slug": "learn-css-animations-for-a-better-user-experience-fbef",
    "externalId": 368171,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "HTML Templates With Twig",
    "slug": "html-templates-with-twig-d092e925",
    "externalId": 190379,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "html",
        "slug": "html"
      }
    ]
  },
  {
    "title": "Auth0 Tips and Tricks ",
    "slug": "auth0-tips-and-tricks-2401",
    "externalId": 364609,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "gatsby",
        "slug": "gatsby"
      },
      {
        "name": "node",
        "slug": "node"
      },
      {
        "name": "jwt",
        "slug": "jwt"
      }
    ]
  },
  {
    "title": "Filter a Collection Using Stimulus",
    "slug": "filter-a-collection-using-stimulus-a7d1",
    "externalId": 362117,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Create an Optimistic UI in React with SWR",
    "slug": "create-an-optimistic-ui-in-react-with-swr-1024",
    "externalId": 361533,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Building a Serverless JAMStack Todo app with Netlify, Gatsby, GraphQL, and FaunaDB",
    "slug": "building-a-serverless-jamstack-todo-app-with-netlify-gatsby-graphql-and-faunadb-53bb",
    "externalId": 349783,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      },
      {
        "name": "faunadb",
        "slug": "faunadb"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      },
      {
        "name": "vue",
        "slug": "netlify"
      }
    ]
  },
  {
    "title": "Build a \"Name Picker\" app -  Intro to React, Hooks & Context API",
    "slug": "build-a-name-picker-app-intro-to-react-hooks-context-api-1ded",
    "externalId": 358119,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Converting a Serverless App to run on AWS Lambda and DynamoDB with Serverless Framework",
    "slug": "converting-a-serverless-app-to-run-on-aws-lambda-and-dynamodb-with-serverless-framework-223a",
    "externalId": 350751,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "faunadb",
        "slug": "faunadb"
      },
      {
        "name": "netlify",
        "slug": "netlify"
      },
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "DynamoDB: The Node.js DocumentClient",
    "slug": "dynamodb-the-node-js-documentclient-1396",
    "externalId": 352782,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "node",
        "slug": "node"
      },
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Getting Started with Elixir",
    "slug": "getting-started-with-elixir-60d1",
    "externalId": 355566,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "elixir",
        "slug": "elixir"
      }
    ]
  },
  {
    "title": "Automate Everything: An egghead Guide to Productivity",
    "slug": "john-lindquist-s-ultra-advanced-yak-shaved-lesson-creation-process-dd3b",
    "externalId": 356542,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Tips and Tricks",
    "slug": "tips-and-tricks-3c4c",
    "externalId": 356233,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "chrome-devtools",
        "slug": "chrome-devtools"
      },
      {
        "name": "egghead",
        "slug": "egghead"
      }
    ]
  },
  {
    "title": "MongoDB Aggregation Framework",
    "slug": "mongodb-aggregation-framework-3e5d",
    "externalId": 356186,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "mongodb",
        "slug": "mongodb"
      }
    ]
  },
  {
    "title": "Vim Videos for Beginners",
    "slug": "vim-bb86",
    "externalId": 354957,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vim",
        "slug": "vim"
      }
    ]
  },
  {
    "title": "Learn React hooks, lazy, and memo API",
    "slug": "learn-react-lazy-memo-usestate-and-useeffect-in-7-minutes-fc805899",
    "externalId": 283294,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "JavaScript interview: Learn functional programming with solving coding challenges",
    "slug": "javascript-interview-learn-functional-programming-with-solving-coding-challenges-8c0c",
    "externalId": 356095,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Nodejs",
    "slug": "nodejs-48d4",
    "externalId": 354304,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "express",
        "slug": "express"
      },
      {
        "name": "node",
        "slug": "node"
      }
    ]
  },
  {
    "title": "The Beginner's Guide to React V1 (2017)",
    "slug": "the-beginner-s-guide-to-react-2017-99bf",
    "externalId": 355047,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Way Smaller Cross-Browser Images and Video with Webp and React",
    "slug": "way-smaller-cross-browser-images-and-video-with-webp-and-react-6a67",
    "externalId": 355027,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "next",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Basic Types in Rust",
    "slug": "data-types-in-rust-ab72",
    "externalId": 353694,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "rust",
        "slug": "rust"
      }
    ]
  },
  {
    "title": "Configuration based reactive Angular Forms with ngx-formly",
    "slug": "configuration-based-reactive-angular-forms-with-ngx-formly-465f",
    "externalId": 345650,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "angular"
      }
    ]
  },
  {
    "title": "WebAssembly with the Go Language",
    "slug": "webassembly-with-the-go-language-3552",
    "externalId": 354542,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "go",
        "slug": "go"
      }
    ]
  },
  {
    "title": "Styling",
    "slug": "styling-44c6",
    "externalId": 354198,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Migrate a WordPress Site to the Jamstack Using Gatsby",
    "slug": "migrate-a-wordpress-site-to-the-jamstack-using-gatsby-6d7f",
    "externalId": 354081,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "Critical Rendering Path",
    "slug": "critical-rendering-path-c2ec",
    "externalId": 352641,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      },
      {
        "name": "chrome-devtools",
        "slug": "chrome-devtools"
      }
    ]
  },
  {
    "title": "Introduction to Client Side Web APIs",
    "slug": "introduction-to-client-side-web-apis-72d0",
    "externalId": 350830,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Create forms in React applications with React Final Form",
    "slug": "create-forms-in-react-applications-with-react-final-form-2bcd34cb",
    "externalId": 281686,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Yarn 2 AKA Berry",
    "slug": "yarn-2-4526",
    "externalId": 347756,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "yarn",
        "slug": "yarn"
      }
    ]
  },
  {
    "title": "Build a React App with the Hooks API",
    "slug": "build-a-react-app-with-the-hooks-api-3010",
    "externalId": 344035,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "jest",
        "slug": "jest"
      },
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Building Websites with MDX and Gatsby",
    "slug": "building-websites-with-mdx-and-gatsby-161e9529",
    "externalId": 303500,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "gatsby",
        "slug": "gatsby"
      }
    ]
  },
  {
    "title": "Using  `@reach/router` for navigation in React Apps",
    "slug": "using-reach-router-for-navigation-in-react-apps-16fa",
    "externalId": 349502,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Learn AWS Lambda from scratch",
    "slug": "learn-aws-lambda-from-scratch-d29d",
    "externalId": 346642,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "aws",
        "slug": "aws"
      }
    ]
  },
  {
    "title": "Joe's Blog Posts as Screencasts",
    "slug": "joe-s-blog-posts-as-screencasts-3f93",
    "externalId": 346171,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "mac",
        "slug": "mac"
      }
    ]
  },
  {
    "title": "Generators in JavaScript",
    "slug": "generators-in-javascript-4b5f",
    "externalId": 345053,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Migrate from Create-React-App to Gatsby - Start Project",
    "slug": "migrate-from-create-react-app-to-gatsby-prerequisite-a766",
    "externalId": 344068,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "tailwind",
        "slug": "tailwind"
      },
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Kyle Shevlin's Blog Lessons",
    "slug": "kyle-shevlin-s-blog-lessons-33db",
    "externalId": 344026,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Making an HTTP server in ReasonML on top of Node.js",
    "slug": "making-an-http-server-in-reasonml-on-top-of-node-js-dab086a2",
    "externalId": 343951,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "node",
        "slug": "node"
      },
      {
        "name": "reason",
        "slug": "reason"
      }
    ]
  },
  {
    "title": "Full Testing",
    "slug": "full-testing",
    "externalId": 276360,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Kyle's VSCode Tips and Tricks",
    "slug": "kyle-s-vscode-tips-and-tricks-49f4b271",
    "externalId": 340067,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vscode",
        "slug": "vscode"
      }
    ]
  },
  {
    "title": "Animating React Components with Framer Motion",
    "slug": "animating-react-components-with-framer-motion-acecb152",
    "externalId": 339950,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Learn about slices and arrays in Go",
    "slug": "learn-about-slices-and-arrays-in-go-5bfc5b44",
    "externalId": 339152,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "go",
        "slug": "go"
      }
    ]
  },
  {
    "title": "An Introduction to React Hooks",
    "slug": "an-introduction-to-react-hooks-78da2b22",
    "externalId": 307365,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "ES6 and Beyond - JavaScript Tips and Tricks from ES2015 to ES2020",
    "slug": "es6-and-beyond-javascript-tips-and-tricks-from-es2015-to-es2020-46108d07",
    "externalId": 336767,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "TypeScript 3.7 Videos",
    "slug": "using-the-null-coalescing-operator-with-typescript-3-7-c9920010",
    "externalId": 336026,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "typescript",
        "slug": "typescript"
      }
    ]
  },
  {
    "title": "The Complete Guide to FaunaDB",
    "slug": "the-complete-guide-to-faunadb-74bef44b",
    "externalId": 334558,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "faunadb",
        "slug": "faunadb"
      }
    ]
  },
  {
    "title": "Theme UI",
    "slug": "theme-ui-37644190",
    "externalId": 335196,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "VS Code Extensions",
    "slug": "vs-code-extensions-d9ad0a6e",
    "externalId": 334884,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vscode",
        "slug": "vscode"
      }
    ]
  },
  {
    "title": "ES2019 Additions to JavaScript",
    "slug": "es2019-additions-to-javascript-63429006",
    "externalId": 334443,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "unified - the compiler for your content",
    "slug": "unified-the-compiler-for-your-content-5b8ff958",
    "externalId": 334367,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Practical Python Pieces",
    "slug": "practical-python-pieces-09a6cb4e",
    "externalId": 334300,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Get Started with Flexbox CSS Layouts",
    "slug": "get-started-with-flexbox-css-layouts-f982344a",
    "externalId": 333885,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "flexbox",
        "slug": "flexbox"
      },
      {
        "name": "css",
        "slug": "css"
      }
    ]
  },
  {
    "title": "Text Manipulation in VSCode",
    "slug": "text-manipulation-in-vscode",
    "externalId": 333026,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "vscode",
        "slug": "vscode"
      }
    ]
  },
  {
    "title": "React Hooks in Function Components",
    "slug": "using-react-hooks-in-functional-components-be394e6c",
    "externalId": 331138,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Learn Apollo Client Hooks",
    "slug": "learn-apollo-client-hooks-9226f672",
    "externalId": 330437,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      },
      {
        "name": "graphql",
        "slug": "graphql"
      }
    ]
  },
  {
    "title": "React Hooks and Suspense",
    "slug": "react-hooks-and-suspense-650307f2",
    "externalId": 278384,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "react",
        "slug": "react"
      }
    ]
  },
  {
    "title": "Abstract Syntax Trees",
    "slug": "abstract-syntax-trees-3582efe5",
    "externalId": 172270,
    "visibility_state": "indexed",
    "state": "published",
    "tags": [
      {
        "name": "javascript",
        "slug": "javascript"
      }
    ]
  },
  {
    "title": "Create New Tools with Mac Automation",
    "slug": "create-new-tools-with-mac-automation-44157e3d",
    "externalId": 311733,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Accessibility Tips & Tricks",
    "slug": "accessibility-tips-tricks-49286904",
    "externalId": 311068,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Why Gatsby Uses GraphQL",
    "slug": "why-gatsby-uses-graphql-1c319a1c",
    "externalId": 297526,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Create Fullstack Applications with GraphQL and Apollo",
    "slug": "create-fullstack-applications-with-graphql-and-apollo-794dc9c7",
    "externalId": 296161,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Use Gatsby’s Link Component to Improve Site Performance and Simplify Site Development",
    "slug": "use-gatsby-s-link-component-to-improve-site-performance-and-simplify-site-development-7ed3ddfe",
    "externalId": 294639,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "TypeScript for React Developers",
    "slug": "typescript-for-react-developers-4d00125d",
    "externalId": 293293,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  },
  {
    "title": "Salvaging Recordings with Screenflow",
    "slug": "salvaging-recordings-with-screenflow-1402a37c",
    "externalId": 281138,
    "visibility_state": "indexed",
    "state": "published",
    "tags": []
  }
]

let filterCourses = railsCourses.filter((course) => course.tags.length > 0 )


let createSanityTags = (course) => {
  return course.tags.map((tag) => {
    return {
        "_key": nanoid(),
        "_type": "versioned-software-library",
        "library": {
          "_ref": `software-library-${tag.name.toLowerCase()}`,
          "_type": "reference"
        }
    }
  })
}


let updateCourses = (courses) => {
  courses.map( async (course) => {
    let courseQuery = groq`*[_type == 'resource' && externalId == ${course.externalId}][0]{
      title,
      'id': _id,
      'dependencies': softwareLibraries[]{
        version,
        ...library->{
          description,
          'slug': slug.current,
          path,
          name,
          'label': name,
          'image_url': image.url
        }
      }
    }`;

    let sanityCourse = await eggheadSanityClient.fetch(courseQuery);
    let sanityTags = createSanityTags(course)

    try {
      setTimeout(async () => {  
        let response = await eggheadSanityClient
            .patch(sanityCourse.id) // Document ID to patch
            .setIfMissing({softwareLibraries: sanityTags}) // Shallow merge
            .commit() // Perform the patch and return a promise
       }, 5000);
      

    } catch (err){
      if(err.statusCode === 409) {
        console.log(err.response.body.error.items[0].error.referenceID)
        widget("Tag " + err.response.body.error.items[0].error.referenceID + " does not exist.")
        
          // let tagFromRails = await queryEggheadTag(tagSlug)
          // let sanityTag = convertTagToSanity(tagFromRails)

          // await eggheadSanityClient.create(sanityTag)

      } else {
        console.log(err);
      }
    }
  })
}

updateCourses(filterCourses)
