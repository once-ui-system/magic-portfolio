import { ImageResponse } from 'next/og'
import { baseURL } from '@/app/resources';

export const runtime = 'edge';

export async function GET(request: Request) {
    let url = new URL(request.url)
    let title = url.searchParams.get('title') || 'Portfolio'
    const font = fetch(
        new URL('../../../public/fonts/Inter.ttf', import.meta.url)
    ).then((res) => res.arrayBuffer());
    const fontData = await font;

    return new ImageResponse(
        (
            <div
                style={{
                    display: 'flex',
                    width: '100%',
                    height: '100%',
                    paddingTop: '12rem',
                    backgroundImage: `url(https://${baseURL}/og/template.jpg)`
                }}>
                <div
                    style={{
                        marginLeft: 190,
                        marginRight: 190,
                        display: 'flex',
                        fontSize: 130,
                        fontFamily: 'Inter',
                        letterSpacing: '-0.05em',
                        fontStyle: 'normal',
                        color: 'white',
                        lineHeight: '120px',
                        whiteSpace: 'pre-wrap',
                    }}>
                {title}
                </div>
            </div>
        ),
        {
            width: 1920,
            height: 1080,
            fonts: [
                {
                    name: 'Inter',
                    data: fontData,
                    style: 'normal',
                },
              ],
        }
    )
}