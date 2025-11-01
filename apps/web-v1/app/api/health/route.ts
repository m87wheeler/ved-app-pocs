export const GET = async (): Promise<Response> => {
  try {
    // Perform any necessary health checks here (e.g., database connectivity)
    const isHealthy = true; // Replace with actual health check logic

    if (isHealthy) {
      return new Response("Service Healthy", { status: 200 });
    } else {
      return new Response("Service Unhealthy", { status: 500 });
    }
  } catch (error) {
    return new Response("Service Unhealthy", { status: 500 });
  }
};
