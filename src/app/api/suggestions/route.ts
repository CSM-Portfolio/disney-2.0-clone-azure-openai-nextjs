export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const term = searchParams.get('term');

  const res = await fetch(
    `https://csm-disney-v2-clone-azure-openai-nextjs.azurewebsites.net/api/getAISuggestionsForDisneyV2?term=${term}`,
    {
      method: 'GET',
      next: {
        revalidate: 60 * 60 * 24,
      },
    }
  );

  const message = await res.text();

  return Response.json({ message });
}
