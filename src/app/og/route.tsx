import { ImageResponse } from 'next/og'

export const runtime = 'edge';

export function GET(request: Request) {
    let url = new URL(request.url)
    let title = url.searchParams.get('title') || 'Portfolio'

    return new ImageResponse(
        (
            <div>
                <div>
                    <h2>
                        {title}
                    </h2>
                </div>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
        }
    )
}