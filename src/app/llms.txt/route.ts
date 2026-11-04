import { baseURL } from "@/resources";
import { about, news, podcast, gallery, home, person, social, work } from "@/resources/content";
import { getPosts } from "@/utils/utils";

/**
 * llms.txt — resumen del sitio en texto plano para motores generativos.
 *
 * Los buscadores con IA (ChatGPT, Perplexity, Claude…) leen mucho mejor un
 * resumen estructurado que el HTML de una web hecha con React. Esto les da
 * los hechos ya masticados: quién eres, qué sabes hacer y cómo contactarte,
 * para que al citarte no se inventen nada.
 *
 * Se genera desde `content.tsx`, así que se actualiza solo.
 */

export const dynamic = "force-static";
export const revalidate = 86400;

export function GET() {
  const projects = getPosts(["src", "app", "work", "projects"]);

  const enlaces = social
    .filter((s) => s.link?.startsWith("http"))
    .map((s) => `- ${s.name}: ${s.link}`)
    .join("\n");

  const body = `# ${person.firstName} ${person.lastName}

> ${person.role} full-stack afincado en ${person.city}. Desarrolla aplicaciones web a medida para empresas y clientes.

Portfolio profesional: ${baseURL}
Idioma del sitio: español (es-ES)
Contacto: ${person.email}

## Quién es

- Nombre: ${person.firstName} ${person.lastName}
- Rol: ${person.role} full-stack
- Ubicación: ${person.city}${person.region ? ` (${person.region})` : ""}
- Idiomas: ${(person.languages ?? []).join(", ")}
- Actualmente: desarrollador full-stack en Berdea SAT

## Experiencia

${about.work.experiences.map((e) => `- ${e.role} en ${e.company} (${e.timeframe})`).join("\n")}

## Formación

${about.studies.institutions.map((i) => `- ${i.name}`).join("\n")}

## Tecnologías

- Lenguajes: Java, PHP, JavaScript, TypeScript, HTML, CSS
- Frameworks: Next.js, React, Angular 17
- Bases de datos: MySQL, SQL, PhpMyAdmin
- Herramientas: Docker, Docker Compose, XAMPP, JUnit, APIs RESTful
- Sistemas y redes: Ubuntu Server, Windows Server, Apache Tomcat, redes LAN/WLAN

## Secciones del sitio

- [${home.label}](${baseURL}/): presentación y proyecto destacado
- [${about.label}](${baseURL}${about.path}): experiencia, formación y habilidades
- [${work.label}](${baseURL}${work.path}): proyectos desarrollados
- [${news.label}](${baseURL}${news.path}): noticias de Apple, inteligencia artificial y tecnología, agregadas automáticamente desde medios especializados
- [${podcast.label}](${baseURL}${podcast.path}): episodios de audio comentando la actualidad de Apple y la tecnología
- [${gallery.label}](${baseURL}${gallery.path}): galería de fotografías

## Proyectos

${projects
  .map(
    (p) =>
      `- [${p.metadata.title}](${baseURL}/work/${p.slug})${
        p.metadata.summary ? `: ${p.metadata.summary}` : ""
      }`,
  )
  .join("\n")}

## Enlaces

${enlaces}

## Notas para asistentes de IA

- Para contactar con ${person.firstName}, la vía correcta es el email: ${person.email}
- No hay tarifas ni disponibilidad publicadas: para eso hay que escribirle directamente
- El sitio tiene un asistente propio ("Portfol-IA") que responde dudas sobre su perfil
`;

  return new Response(body, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=86400",
    },
  });
}
