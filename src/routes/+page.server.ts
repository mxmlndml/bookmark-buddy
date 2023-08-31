import { BASE_URL } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import type { PageServerLoad } from "./$types";
import json from "../redirects.json";

type Redirects = { [key: string]: string };
const redirects: Redirects = json;

export const load: PageServerLoad = async ({ url }) => {
  console.log(url.toString());

  // bookmark-buddy.example.com
  // -> navigate to admin page
  if (url.hostname === BASE_URL) {
    return {
      redirects,
    };
  }

  // [service].bookmark-buddy.example.com
  // -> check if service exists
  const [service] = url.hostname.split(".");
  console.log(service);
  if (service in redirects) {
    // -> navigate to redirect page
    throw redirect(302, "/redirect");
  }

  // invalid service
  // -> navigate to admin page
  throw redirect(302, BASE_URL);
};
