import { Column, Flex, Heading } from "@/once-ui/components";
import { Resources } from "@/components/agileResources/Resources";
import { baseURL } from "@/app/resources";
import { agileResources, person} from "@/app/resources/content";

export async function generateMetadata() {
  const title = agileResources.title;
  const description = agileResources.description;
  const ogImage = `https://${baseURL}/og?title=${encodeURIComponent(title)}`;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "website",
      url: `https://${baseURL}/agile`,
      images: [
        {
          url: ogImage,
          alt: title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [ogImage],
    },
  };
}

export default function Agile() {
  return (
    <Column maxWidth="s">
      <script
        type="application/ld+json"
        suppressHydrationWarning
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline: agileResources.title,
            description: agileResources.description,
            url: `https://${baseURL}/agile`,
            image: `${baseURL}/og?title=${encodeURIComponent(agileResources.title)}`,
            author: {
              "@type": "Person",
              name: person.name,
              image: {
                "@type": "ImageObject",
                url: `${baseURL}${person.avatar}`,
              },
            },
          }),
        }}
      />
      <Heading marginBottom="l" variant="display-strong-s">
        {agileResources.title}
      </Heading>
      <Column fillWidth flex={1}>
        <Resources range={[1, 3]} thumbnail />
        <Resources range={[4]} columns="2" />
      </Column>
    </Column>
  );
}

// copied from AboutPage - in case code for agile images can be used
// {about.technical.display && (
//   <>
//   <Heading
//     as="h2"
//     id={about.technical.title}
//     variant="display-strong-s"
//     marginBottom="m"
//   >
//     {about.technical.title}
//   </Heading>
//     <Column fillWidth gap="m">
//       <Text 
//         wrap="balance" 
//         onBackground="neutral-weak" 
//         variant="body-default-m"
//         marginBottom="m"
//       >
//       {about.technical.description}
//       </Text>
//     </Column>
//   <Column fillWidth gap="l">
//     {about.technical.skills.map((skill, index) => (
//       <Column key={`${skill}-${index}`} fillWidth gap="4"
//       className={skill.title === "Agile Practices" ? "agile-skills" : "other-skills"}
//       >
//         <Text variant="heading-strong-l">{skill.title}</Text>
//         <Text variant="body-default-m" onBackground="neutral-weak">
//           {skill.description}
//         </Text>
//         {skill.images && skill.images.length > 0 && (
//           <Flex fillWidth paddingTop="m" gap="12" wrap>
//             {skill.images.map((image, index) => (
//               <Flex
//                 key={index}
//                 className={skill.title === "Agile Practices" ? "agile-skills" : "other-skills"}
//                 border="neutral-medium"
//                 radius="m"
//                 minWidth={skill.title === "Agile Practices" ? image.width / 50 : 16} // Default for others
//                 height={skill.title === "Agile Practices" ? image.height / 50 : 9} // Default for others
//               >
//                 <SmartImage
//                   enlarge
//                   radius="m"
//                   sizes={`${image.width}x${image.height}`}
//                   alt={image.alt}
//                   src={image.src}
//                 />
//               </Flex>
//             ))}
//           </Flex>
//         )}
//       </Column>
//     ))}
//   </Column>
// </>
// )}