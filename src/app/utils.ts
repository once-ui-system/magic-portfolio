import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

type Team = {
    name: string;
    role: string;
    avatar: string;
    linkedIn: string;
};

type Metadata = {
    title: string;
    publishedAt: string;
    summary: string;
    image?: string;
    images?: string[];
    team?: Team[];
};

function parseFrontmatter(fileContent: string) {
    const frontmatterRegex = /---\s*([\s\S]*?)\s*---/;
    const match = frontmatterRegex.exec(fileContent);

    if (!match) {
        throw new Error('Frontmatter not found');
    }

    const frontMatterBlock = match[1];
    const content = fileContent.replace(frontmatterRegex, '').trim();
    const frontMatterLines = frontMatterBlock.trim().split('\n');
    const metadata: Partial<Metadata> = {};

    frontMatterLines.forEach((line) => {
        const [key, ...valueArr] = line.split(': ');
        let value = valueArr.join(': ').trim();
        value = value.replace(/^['"](.*)['"]$/, '$1');

        if (key.trim() === 'team') {
            try {
                metadata[key.trim() as keyof Metadata] = JSON.parse(value) as any;
            } catch (error: any) {
                throw new Error(`Error parsing team metadata: ${error.message}`);
            }
        } else if (key.trim() === 'images') {
            try {
                metadata[key.trim() as keyof Metadata] = JSON.parse(value) as any;
            } catch (error: any) {
                throw new Error(`Error parsing images metadata: ${error.message}`);
            }
        } else {
            metadata[key.trim() as keyof Metadata] = value as any;
        }
    });

    return { metadata: metadata as Metadata, content };
}

function getMDXFiles(dir: string) {
    if (!fs.existsSync(dir)) {
        throw new Error(`Directory not found: ${dir}`);
    }

    return fs.readdirSync(dir).filter((file) => path.extname(file) === '.mdx');
}

function readMDXFile(filePath: string) {
    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${filePath}`);
    }

    const rawContent = fs.readFileSync(filePath, 'utf-8');
    const { data, content } = matter(rawContent); // Automatically handles frontmatter parsing

    const metadata: Metadata = {
        title: data.title,
        publishedAt: data.publishedAt,
        summary: data.summary,
        images: data.images || [], // Safeguard against undefined images
        team: data.team || [], // Ensure the team is an array (not a JSON string)
    };

    return { metadata, content };
}

function getMDXData(dir: string) {
    const mdxFiles = getMDXFiles(dir);
    return mdxFiles.map((file) => {
        const { metadata, content } = readMDXFile(path.join(dir, file));
        const slug = path.basename(file, path.extname(file));

        return {
            metadata,
            slug,
            content,
        };
    });
}

export function getPosts(customPath = ['', '', '', '']) {
    const postsDir = path.join(process.cwd(), ...customPath);
    return getMDXData(postsDir);
}

export function formatDate(date: string, includeRelative = false) {
    const currentDate = new Date();

    if (!date.includes('T')) {
        date = `${date}T00:00:00`;
    }

    const targetDate = new Date(date);
    const yearsAgo = currentDate.getFullYear() - targetDate.getFullYear();
    const monthsAgo = currentDate.getMonth() - targetDate.getMonth();
    const daysAgo = currentDate.getDate() - targetDate.getDate();

    let formattedDate = '';

    if (yearsAgo > 0) {
        formattedDate = `${yearsAgo}y ago`;
    } else if (monthsAgo > 0) {
        formattedDate = `${monthsAgo}mo ago`;
    } else if (daysAgo > 0) {
        formattedDate = `${daysAgo}d ago`;
    } else {
        formattedDate = 'Today';
    }

    const fullDate = targetDate.toLocaleString('en-us', {
        month: 'long',
        day: 'numeric',
        year: 'numeric',
    });

    if (!includeRelative) {
        return fullDate;
    }

    return `${fullDate} (${formattedDate})`;
}