import type { PageServerLoad } from "./$types";
import { redirect } from "@sveltejs/kit";

export const load = (async ({ params, parent }) => {
	throw redirect(301, "/admin/index.html");
}) satisfies PageServerLoad;