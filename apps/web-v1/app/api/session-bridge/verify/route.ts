export const POST = async (_: Request): Promise<Response> => {
  try {
    return new Response("Session bridge created", { status: 201 });
  } catch (error) {
    return new Response("Internal Server Error", { status: 500 });
  }
};
