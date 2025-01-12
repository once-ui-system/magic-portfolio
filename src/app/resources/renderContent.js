import { person, newsletter, social, home, about, blog, work, gallery } from './content';

const renderContent = (t) => {
        return {
            person,
            social,
            newsletter,
            home,
            about,
            blog,
            work,
            gallery
        }
};

export { renderContent };