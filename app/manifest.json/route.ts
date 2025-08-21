import { NextResponse } from 'next/server';

/**
 * Serve the Crowdin **App Descriptor (manifest)** as a JSON response.
 *
 * The manifest tells Crowdin how to install and integrate the app:
 *   – identifier, name, logo
 *   – OAuth details (client id)
 *   – event web-hooks (installed / uninstall)
 *   – requested scopes
 *   – app modules (project-reports, etc.)
 *
 * The route is automatically picked up by Next.js because it lives inside the
 * `app/manifest.json` folder and returns a `NextResponse` with `.json()`.
 */
export async function GET() {
  const manifestData = {
    identifier: 'workflow-changes',
    name: 'Workflow Changes',
    baseUrl: process.env.NEXT_PUBLIC_BASE_URL,
    logo: '/logo.svg',
    authentication: {
      type: 'crowdin_app',
      clientId: process.env.CROWDIN_CLIENT_ID,
    },
    events: {
      installed: '/events/installed',
      uninstall: '/events/uninstall',
    },
    scopes: ['project'],
    modules: {
      'project-reports': [
        {
          key: 'workflow-changes-project-reports',
          name: 'Workflow Changes',
          url: '/project-reports',
        },
      ],
    },
  };

  return NextResponse.json(manifestData);
}
