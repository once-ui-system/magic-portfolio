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
    images: string[];
    team: Team[];
};

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
    const { data, content } = matter(rawContent);

    const metadata: Metadata = {
        title: data.title || '',
        publishedAt: data.publishedAt,
        summary: data.summary || '',
        images: data.images || [],
        team: data.team || [],
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