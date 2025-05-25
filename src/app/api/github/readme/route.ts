import { NextResponse } from 'next/server';
import axios from 'axios';
import { githubApiClient } from '@/lib/githubApi';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const owner = searchParams.get('owner');
  const repo = searchParams.get('repo');

  if (!owner || !repo) {
    return NextResponse.json(
      { error: 'Owner and repo required' },
      { status: 400 },
    );
  }

  try {
    // Using githubApiClient instead of direct axios call
    const readmeData = (await githubApiClient(
      `/repos/${owner}/${repo}/readme`,
    )) as { content: string };

    // GitHub API returns README content as base64 encoded
    const content = Buffer.from(readmeData.content, 'base64').toString();

    return NextResponse.json({ content });
  } catch (error) {
    if (axios.isAxiosError(error) && error.response?.status === 404) {
      return NextResponse.json({
        content: 'No README found for this repository.',
      });
    }

    console.error('Error fetching README:', error);
    return NextResponse.json({
      content: 'Failed to load README content.',
    });
  }
}
