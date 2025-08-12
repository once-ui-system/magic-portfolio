import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";

type Testimonial = {
  name: string;
  role: string;
  image: string;
  quote: string;
};

const testimonials: Testimonial[] = [
  {
    name: "Nick Lockard",
    role: "Rate My Cheer Gym",
    image: "/images/placeholder.jpg",
    quote:
      "I have worked with Awais on several projects, and he consistently demonstrates exceptional dedication and expertise in ensuring project success. His technical proficiency and work ethic are commendable.",
  },

  {
    name: "shaneisaac",
    role: "",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/91676a41a5783ec10b83a75021b6f1e2-1360940871665962083084/JPEG_20221016_191438_4850977579985655690.jpg",
    quote:
      "Perfect. He knows exactly what he is doing. Will use in the future. This guy's a genius.",
  },
  {
    name: "alika",
    role: "",
    image: "/images/placeholder.jpg",
    quote:
      "Great job done with great expertise, patience and professionalism Thanks a lot",
  },

  {
    name: "Ronald Kok",
    role: "Researcher Analist.nl | Finance university Kazakhstan",
    image:
      " https://media.licdn.com/dms/image/v2/C4E03AQGU5VzJ7gm3vw/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1538067330231?e=1757548800&v=beta&t=0LjxBwTI1lzCYR-wtMBA21ALET8AJPWR0WUdRx4-EdY",

    quote:
      "very quick, responsive and professional. He fixed our pc issue very quickly, we strongly recommend to cooperate with him, we will cooperate as well more in the future for many different IT issues.",
  },
  {
    name: "marwane_ghost",
    role: "Student",
    image: "/images/placeholder.jpg",
    quote: "All good, nice work, professional, I will work with him again",
  },
  {
    name: "sukhdosanjh",
    role: "",
    image: "/images/placeholder.jpg",
    quote: "Was my second job always very professional definitely recommend!!",
  },
  {
    name: "gferrar",
    role: "",
    image:
      "https://fiverr-res.cloudinary.com/image/upload/f_auto,q_auto,t_profile_small/v1/attachments/profile/photo/d50560ef65b9a6427835f4eec7dfe2f9-1717976746252/d43b7c6c-0b4a-4736-ac3f-0bc44ede6f50.jpg",
    quote:
      "Awais was very attentive to details and all the requirements of a job that I had difficulty with for several days until I got help from him. He found many good options for the different aspect of this job and I am very happy with it.",
  },
  {
    name: "Nick Lockard",
    role: "Rate My Cheer Gym",
    image: "/images/placeholder.jpg",
    quote:
      "Absolutely thrilled with Awais's work on my web app development project! This project included front end and backend work using the Next.js framework. His professionalism shone through in the quality of delivery, and his politeness, fluency in communication, and willingness to go above and beyond made the entire process",
  },
];

const chunkArray = (
  array: Testimonial[],
  chunkSize: number,
): Testimonial[][] => {
  const result: Testimonial[][] = [];
  for (let i = 0; i < array.length; i += chunkSize) {
    result.push(array.slice(i, i + chunkSize));
  }
  return result;
};

const testimonialChunks = chunkArray(
  testimonials,
  Math.ceil(testimonials.length / 3),
);

export default function WallOfLoveSection() {
  return (
    <section>
      <div className="py-16 md:py-32">
        <div className="mx-auto max-w-6xl px-6">
          {/* <div className="text-center mb-12">
            <h2 className=" text-3xl font-semibold">Client Testimonials</h2>
            <p className=" mt-6">Harum quae dolore orrupti aut temporibus ariatur.</p>
          </div> */}
          <div className="mt-8 grid gap-3 sm:grid-cols-2 md:mt-12 lg:grid-cols-3">
            {testimonialChunks.map((chunk, chunkIndex) => (
              <div key={chunkIndex} className="space-y-3">
                {chunk.map(({ name, role, quote, image }, index) => (
                  <Card key={index} className="bg-transparent">
                    <CardContent className="grid grid-cols-[auto_1fr] gap-3 pt-6">
                      <Avatar className="size-9">
                        <AvatarImage
                          alt={name}
                          src={image}
                          loading="lazy"
                          width="120"
                          height="120"
                        />
                        <AvatarFallback>{name.charAt(0)}</AvatarFallback>
                      </Avatar>

                      <div>
                        <h3 className="font-medium">{name}</h3>

                        <span className="text-muted-foreground block text-sm tracking-wide">
                          {role}
                        </span>

                        <div className="mt-3">
                          <p className="text-gray-700 dark:text-gray-300">
                            {quote}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
