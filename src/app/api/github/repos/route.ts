import { NextResponse } from 'next/server';
import axios from 'axios';
import { slugify } from '@/lib/utils';
import { GitHubRepo } from '@/types/github';
import { githubApiClient } from '@/lib/apiUtils';

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const username = searchParams.get('username');

  if (!username) {
    return NextResponse.json({ error: 'Username required' }, { status: 400 });
  }

  try {
    const reposData = await githubApiClient<GitHubRepo[]>(
      `/users/${username}/repos`,
      {
        params: {
          sort: 'updated',
          per_page: 100,
        },
      },
    );

    // Add slugs to repositories
    const reposWithSlugs = reposData.map((repo: GitHubRepo) => ({
      ...repo,
      slug: slugify(repo.name),
    }));

    return NextResponse.json(reposWithSlugs);
  } catch (error) {
    if (axios.isAxiosError(error) && error.response) {
      return NextResponse.json(
        { error: 'Repositories not found' },
        { status: error.response.status },
      );
    }

    console.error('Error fetching repositories:', error);
    return NextResponse.json(
      { error: 'Failed to fetch repositories' },
      { status: 500 },
    );
  }
}
