import { ImageResponse } from 'next/og'

export const runtime = 'edge';

export function GET(request: Request) {
    let url = new URL(request.url)
    let title = url.searchParams.get('title') || 'Portfolio'

    return new ImageResponse(
        (
            <div style={{ display: 'flex', width: '100%', height: '100%', padding: '4rem' }}>
                <h1 style={{ fontSize: '3rem', fontWeight: '800' }}>
                    {title}
                </h1>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
        }
    )
}