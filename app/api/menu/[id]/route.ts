export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id
  return new Response(id, {
    status: 200,
  })
}