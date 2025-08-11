import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Image from "next/image";

export default function WallOfLoveSection() {
  return (
    <section className="py-16 md:py-32">
      <div className="mx-auto max-w-6xl space-y-8 px-6 md:space-y-16">
        <div className="relative mx-auto max-w-xl space-y-6 text-center md:space-y-12">
          <h2 className="text-4xl font-medium lg:text-5xl">
            Client Testimonials
          </h2>
        </div>
        <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-4 lg:grid-rows-2">
          <Card className="grid grid-rows-[auto_1fr] bg-transparent gap-8 sm:col-span-2 sm:p-6 lg:row-span-2">
            <CardHeader>
              <Image
                className=" dark:block hidden"
                src="https://get-optimise.com/images/logos/logo-dark.svg"
                alt="Nike Logo"
                height={100}
                width={100}
              />

              <Image
                className=" dark:hidden block"
                src="https://get-optimise.com/images/logos/logo-light.svg"
                alt="Nike Logo"
                height={100}
                width={100}
              />
            </CardHeader>
            <CardContent>
              <div className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  I had the pleasure of working with Awais as the main developer
                  for get-optimise.com, and the collaboration was excellent from
                  start to finish. He quickly understood the vision and
                  requirements, brought valuable ideas to the table, and
                  implemented them with precision and creativity. Communication
                  was always clear and proactive, making it easy to align on
                  priorities and solve challenges along the way. Awais
                  consistently delivered high-quality work on time, showing both
                  technical expertise and a strong sense of ownership. I would
                  be happy to work with him again and can fully recommend him to
                  anyone looking for a skilled and reliable developer.
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://media.licdn.com/dms/image/v2/D4E03AQGnEjtm9RLjqg/profile-displayphoto-shrink_800_800/profile-displayphoto-shrink_800_800/0/1682287472574?e=1757548800&v=beta&t=aPzWLEdy_wLc8XN2EZYdRVvBAjQBMCN9EZmEw6i4S7M"
                      alt="Harro M. Wiersma"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>ST</AvatarFallback>
                  </Avatar>

                  <div>
                    <cite className="text-sm font-medium">
                      Harro M. Wiersma
                    </cite>
                    <span className="text-muted-foreground block text-sm">
                      XAPPO Enterprises Ltd, Naxxar, Malta
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="md:col-span-2 bg-transparent">
            <CardContent className="h-full">
              <div className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p className="text-xl font-medium">
                  Absolutely thrilled with Awais's work on my web app
                  development project! This project included front end and back
                  end work using the Laravel framework. His professionalism
                  shone through in the quality of delivery, and his politeness,
                  fluency in communication, and willingness to go above and
                  beyond made the entire process
                </p>

                <div className="grid grid-cols-[auto_1fr] items-center gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/jonathan.webp"
                      alt="Jonathan Yombo"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>NL</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Nick Lockard</cite>
                    <span className="text-muted-foreground block text-sm">
                      Rate My Cheer Gym
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="bg-transparent">
            <CardContent className="h-full pt-6">
              <div className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>One of the best freelancers I have worked with!</p>

                <div className="grid items-center gap-3 [grid-template-columns:auto_1fr]">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/yucel.webp"
                      alt="Israel Serbesa"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>IS</AvatarFallback>
                  </Avatar>
                  <div>
                    <cite className="text-sm font-medium">Israel Serbesa</cite>
                    <span className="text-muted-foreground block text-sm">
                      Cruisly
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
          <Card className="card variant-mixed bg-transparent">
            <CardContent className="h-full pt-6">
              <div className="grid h-full grid-rows-[1fr_auto] gap-6">
                <p>
                  Working with him was a breeze thanks to his quick
                  responsiveness and excellent cooperation.
                </p>

                <div className="grid grid-cols-[auto_1fr] gap-3">
                  <Avatar className="size-12">
                    <AvatarImage
                      src="https://tailus.io/images/reviews/rodrigo.webp"
                      alt="Rodrigo Aguilar"
                      height="400"
                      width="400"
                      loading="lazy"
                    />
                    <AvatarFallback>HK</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="text-sm font-medium">Haris Khan</p>
                    <span className="text-muted-foreground block text-sm">
                      USA Business Owner
                    </span>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
    
  );
}
