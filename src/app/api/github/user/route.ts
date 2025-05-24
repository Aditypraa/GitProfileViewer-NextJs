import { NextResponse } from 'next/server';
import axios from 'axios';
import { githubApiClient } from '@/lib/apiUtils';
import { GitHubUser } from '@/types/github';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  try {
    const userData = await githubApiClient<GitHubUser>(`/users/${username}`);
    return NextResponse.json(userData);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: 'User not found' },
        { status: error.response.status },
      );
    }

    console.error('Error fetching GitHub user:', error);
    return NextResponse.json(
      { error: 'Failed to fetch GitHub user' },
      { status: 500 },
    );
  }
}
