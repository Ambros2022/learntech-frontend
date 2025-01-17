import { NextResponse } from 'next/server';

export async function middleware(req) {
  const url = req.nextUrl.clone();
  const currentPath = url.pathname;

  // Fetch redirection mappings from your API
  const response = await fetch(`${process.env.NEXT_PUBLIC_API_URI}redirecturls`);
  const redirections = await response.json();

  // Check if the current path matches an old URL
  const redirect = redirections.find((item) => item.oldUrl === currentPath);
console.log(redirect);
console.log("redirect");
  if (redirect) {
    // Redirect to the new URL
    url.pathname = redirect.newUrl;
    return NextResponse.redirect(url);
  }

  // Proceed with the original request if no redirection is needed
  return NextResponse.next();
}

// Specify which routes the middleware applies to
export const config = {
  matcher: '/:path*', // Apply to all paths
};
