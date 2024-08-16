import { ImageResponse } from 'next/og'

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
            width: 1200,
            height: 630,
        }
    )
}