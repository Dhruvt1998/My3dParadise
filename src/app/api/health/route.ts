export async function GET() {
    return Response.json({
        status: "ok",
        service: "my3dparadise",
        timestamp: new Date().toISOString()
    });
}