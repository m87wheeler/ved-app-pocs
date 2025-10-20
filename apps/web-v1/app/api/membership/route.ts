export const GET = async (_: Request): Promise<Response> => {
  try {
    return new Response("Membership info retrieved", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}