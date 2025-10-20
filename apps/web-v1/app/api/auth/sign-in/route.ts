export const POST = async (_: Request): Promise<Response> => {
  try {
    return new Response("Signed in successfully", { status: 200 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
}
