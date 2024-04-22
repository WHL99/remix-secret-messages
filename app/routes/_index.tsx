import type { MetaFunction } from "@remix-run/node";

export const meta: MetaFunction = () => {
  return [
    { title: "Remix Secret Messages" },
    { name: "description", content: "Welcome to Remix" },
  ];
};

export function links() {
  return [{ rel: "stylesheet", href: "/app/styles/home.css" }];
}

export default function Index() {

  return (
    <main id="content">
      <h1>--- Secret Messages ---</h1>
    
    </main>
  );
}
