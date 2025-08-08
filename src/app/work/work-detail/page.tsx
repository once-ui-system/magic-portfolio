"use client"
import React, { useState } from 'react';

const Work_detail_Component = () => {

    return (
        <>
            <div className="flex flex-col gap-8 mb-10 px-6 max-w-5xl mx-auto">

                <div className="text-white max-w-xl mx-auto">
                    {/* <!-- Breadcrumb with Avatar --> */}
                    {/* <div className="flex items-center gap-2 mb-4">
            <img src="/path/to/avatar.jpg" alt="Author" className="w-6 h-6 rounded-full" />
            <span className="text-sm text-gray-300">Projects</span>
          </div> */}

                    {/* <!-- Heading --> */}
                    <h1 className="text-3xl md:text-4xl font-semibold leading-tight">
                        Build Once UI, a <br className="hidden md:block" /> Customizable Design System
                    </h1>

                </div>

                <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory rounded-lg">
                    <div className="inline-flex space-x-4">
                        <img
                            src="/images/projects/project-01/cover-02.jpg"
                            alt="Project Cover"
                            className="w-full object-cover rounded-lg snap-start"
                        />
                    </div>
                </div>

                <div className="text-white px-3 py-10 space-y-10 font-sans">
                    <div className="space-y-2">
                        <h1 className="text-[2rem] md:text-[2.25rem] font-normal mb-24">
                            A learner-first audio editing tool designed for segment-based listening and repetition.
                        </h1>
                        <div className="flex md:flex-row! flex-column md:justify-between justufy-start md:items-center! items-start gap-3 border-b-[2px] border-[#232323] py-[1.5rem]">
                            <span className='shrink-0 text-[1.6125rem] font-normal text-white md:inline-flex flex md:mb-0 mb-16'>Expertise / Deliverables</span> 
                            <span className='grow-1 md:text-right text-left text-[1.6125rem] font-normal text-[#909192]'>Research, Strategy, Branding, Design, Dev Handoff, ASO</span>
                        </div>
                        <div className="flex md:flex-row! flex-column md:justify-between justufy-start md:items-center! items-start gap-3 border-b-[2px] border-[#232323] py-[1.5rem]">
                            <span className='shrink-0 text-[1.6125rem] font-normal text-white md:inline-flex flex md:mb-0 mb-16'>Team</span>
                            <span className='grow-1 md:text-right text-left text-[1.6125rem] font-normal text-[#909192]'>Design & Product, Engineering</span>
                        </div>
                        <div className="flex md:flex-row! flex-column md:justify-between justufy-start md:items-center! items-start gap-3 border-b-[2px] border-[#232323] py-[1.5rem]">
                            <span className='shrink-0 text-[1.6125rem] font-normal text-white md:inline-flex flex md:mb-0 mb-16'>Timeline</span>
                            <span className='grow-1 md:text-right text-left text-[1.6125rem] font-normal text-[#909192]'>4–5 Months</span>
                        </div>
                    </div>

                    <div className='flex justify-end g-16'>
                        <a href="javascript:void(0)" className='reset-button-styles focus-ring align-center display-inline-flex g-8 radius-s fit-width'>
                            <div className='display-flex px-12 py-4 brand-background-alpha-weak brand-border-alpha-medium border-solid border-1 radius-full align-center fit-width position-relative neutral-on-background-strong Badge_animation__e9OQ9 font-label font-default font-s'> Download from Playstore </div>
                        </a>
                        <a href="javascript:void(0)" className='reset-button-styles focus-ring align-center display-inline-flex g-8 radius-s fit-width'>
                            <div className='display-flex px-12 py-4 brand-background-alpha-weak brand-border-alpha-medium border-solid border-1 radius-full align-center fit-width position-relative neutral-on-background-strong Badge_animation__e9OQ9 font-label font-default font-s'> Visit Website </div>
                        </a>                        
                    </div>

                    <div className="my-48">
                        <h2 className="textlg font-normal text-[#727272] uppercase tracking-wide mb-16">INTRODUCTION</h2>
                        <h3 className="text-4xl font-normal text-white mb-24"            >
                            Discovery of in-efficiencies in learning from an audio</h3>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px]">
                            As a musician and music learner myself, we typically rely heavily on audio recordings to master techniques,
                            phrases, or compositions. But conventional audio players don’t support focused, segment-based learning.
                            It makes us actively involve with the tool every time we open the same recording.
                        </p>
                    </div>

                    <div className="py-48">
                        <h2 className="textlg font-normal text-[#727272] uppercase tracking-wide mb-16">PROBLEM BREAKDOWN</h2>
                        <h3 className="text-4xl font-normal text-white mb-24">Why were users struggling?</h3>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            Whether it’s a classNameroom lecture, a music lesson, or a podcast episode, learners often need to revisit
                            specific moments within an audio file looping key phrases, skipping irrelevant parts, or isolating complex sections for practice.
                        </p>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            While some apps offer basic tools like bookmarks or A–B looping, these features often fall short in real-world usage.
                            Bookmarks lack precision and organisation. A–B loops require repeated manual input. And downloading clipped sections
                            not only breaks continuity, but also eats into device storage.
                        </p>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px]">
                            The overall experience is repetitive, inefficient, and not built for true segment-based learning.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory rounded-lg">
                    <div className="inline-flex space-x-4">
                        <img
                            src="/images/projects/project-01/cover-02.jpg"
                            alt="Project Cover"
                            className="w-full object-cover rounded-lg snap-start"
                        />
                    </div>
                </div>

                <div className="text-white font-sans mt-48">
                    <div className="text-white mb-48">
                        <h2 className="text-4xl font-normal text-white mb-48">Top 3 Challenges</h2>

                        {/* <!-- Challenge 1 --> */}
                        <div className="bg-[#2B2B2B] rounded-xl px-[43px] py-[39px] mb-24 relative">
                            <h3 className="text-white text-[26px] font-semibold mb-8">Redundant Interactions</h3>
                            <p className="text-[#909192] text-[1.5125rem] leading-[36px] pr-[5rem]">
                                Users had to manually reselect loops or bookmarks every time they returned to practice.
                                The tools weren’t persistent or smart enough to remember their learning flow.
                            </p>
                            <span className="absolute bottom-0 right-16 "> <img src="/images/01.svg" /> </span>
                        </div>

                        {/* <!-- Challenge 2 --> */}
                        <div className="bg-[#2B2B2B] rounded-xl px-[43px] py-[39px] mb-24 relative">
                            <h3 className="text-white text-[26px] font-semibold mb-8">Constant Active Participation</h3>
                            <p className="text-[#909192] text-[1.5125rem] leading-[36px] pr-[6rem]">
                                Features like A-B looping required real-time setup and adjustments forcing users to stop learning and start managing the tool instead.
                            </p>
                            <span className="absolute bottom-0 right-16 "> <img src="/images/02.svg" /> </span>
                        </div>

                        {/* <!-- Challenge 3 --> */}
                        <div className="bg-[#2B2B2B] rounded-xl px-[43px] py-[39px] mb-24 relative">
                            <h3 className="text-white text-[26px] font-semibold mb-8">Storage-Heavy Workarounds</h3>
                            <p className="text-[#909192] text-[1.5125rem] leading-[36px] pr-[6rem]">
                                To isolate useful sections, many users resorted to exporting multiple audio files leading to unnecessary file duplication and significant storage usage, especially on mobile.
                            </p>
                            <span className="absolute bottom-0 right-16 "> <img src="/images/03.svg" /> </span>
                        </div>
                    </div>

                    <div className="space-y-6 mt-48 pt-24">
                        <h4 className="textlg font-normal text-[#727272] uppercase tracking-wide mb-16">Research</h4>
                        <h2 className="text-4xl font-normal text-white mb-24">Understanding Our Learners</h2>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            Through user interviews with vocalists, instrumentalists, and educators, we uncovered key behavioral patterns around how learners engage with recorded audio.
                        </p>

                        <ul className="list-disc space-y-2 text-[#909192] text-[1.5125rem] mb-24  marker:text-red-500">
                            <li className='text-[#909192] text-[1.5125rem] leading-[26px]'>82% of learners said that large portions of an audio file feel irrelevant after the first listen yet they still had to manually scrub through them.</li>
                            <li className='text-[#909192] text-[1.5125rem] leading-[26px]'>56% didn’t want to permanently remove or edit these parts, fearing they might be useful later.</li>
                            <li className='text-[#909192] text-[1.5125rem] leading-[26px]'>46% admitted they lacked the motivation to reset loops or segments each time, describing it as repetitive and mentally fatiguing.</li>
                        </ul>

                        <p className="text-[#909192] text-[1.5125rem] leading-[36px]">
                            These insights pointed to a clear need: a system that could intelligently remember how learners use audio, reduce friction, and support non-destructive, segment-based learning.
                        </p>
                    </div>
                </div>

                <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory rounded-lg mt-48">
                    <div className="inline-flex space-x-4">
                        <img
                            src="/images/projects/project-01/cover-02.jpg"
                            alt="Project Cover"
                            className="w-full object-cover rounded-lg snap-start"
                        />
                    </div>
                </div>


                <div className="space-y-20 font-sans mt-48">


                    {/* <!-- Section: Brainstorming --> */}
                    <div className="space-y-4">
                        <p className="textlg font-normal text-[#727272] uppercase tracking-wide mb-16">Brainstorming</p>
                        <h2 className="text-4xl font-normal text-white mb-24">Rethinking the Experience</h2>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            My vision was to solve and build a seamless learning experience where users could engage deeply with audio content without the friction of traditional tools.
                            I wanted to empower learners to focus on what truly matters: practicing, repeating, and mastering specific segments of audio with ease.
                            By making segment-based interaction intuitive and memory-efficient, we aimed to support continuous, distraction-free learning
                            that adapts to each user’s pace and pattern.
                        </p>

                        <h3 className="text-4xl font-normal text-white mb-24 mt-48 pt-24">How might we?</h3>
                        <ul className="list-disc space-y-2 text-[#909192] text-[1.5125rem] mb-24  marker:text-red-500">
                            <li className='text-[#909192] text-[1.5125rem] leading-[26px]'>How might we reduce repetitive setup so learners can instantly resume where they left off?</li>
                            <li className='text-[#909192] text-[1.5125rem] leading-[26px]'>How might we minimise the need for constant input so learners can stay focused on the content, not the controls?</li>
                        </ul>
                    </div>
                    <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory rounded-lg">
                        <div className="inline-flex space-x-4">
                            <img
                                src="/images/projects/project-01/cover-02.jpg"
                                alt="Project Cover"
                                className="w-full object-cover rounded-lg snap-start"
                            />
                        </div>
                    </div>

                    {/* <!-- Section: Ideation --> */}
                    <div className="space-y-4" >
                        <p className="textlg font-normal text-[#727272] uppercase tracking-wide mb-16">Ideation</p>
                        <h2 className="text-4xl font-normal text-white mb-24">Crafting with Users, Not Just for Them</h2>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            I embraced a rapid, iterative design approach—constantly ideating, prototyping, and testing with real users across learner profiles.
                            Each round of feedback uncovered new friction points and nuances in behavior.
                            I refined the flows continuously until I observed users navigating the experience with clarity and confidence, without pauses or uncertainty.
                            It was energizing to witness how differently people interacted with the same solution, and how those insights shaped a more inclusive and intuitive design.
                        </p>
                    </div>


                    <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory rounded-lg">
                        <div className="inline-flex space-x-4">
                            <img
                                src="/images/projects/project-01/cover-02.jpg"
                                alt="Project Cover"
                                className="w-full object-cover rounded-lg snap-start"
                            />
                        </div>
                    </div>


                    {/* <!-- Section: Smarter Learning --> */}
                    <div className="space-y-4" >
                        <p className="textlg font-normal text-[#727272] uppercase tracking-wide mb-16">PROPOSED SOLUTION</p>
                        <h2 className="text-4xl font-normal text-white mb-24">Designing a Smarter Way to Learn Through Audio</h2>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            The core solution centred around one powerful idea: non-destructive audio segmentation.
                            Instead of forcing users to export clips or constantly reset loops, I designed a system where learners could mark, label, and revisit specific segments
                            all as lightweight references within the original file.
                        </p>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            This approach preserved memory, respected the user's workflow, and eliminated redundancy.
                            Segments acted as smart bookmarks with playback control, making repetition effortless.
                            The interface was built around a waveform UI, enabling intuitive visual selection and seamless loop playback.
                            The goal was simple: help learners focus more on the learning and less on managing the tool.
                        </p>
                    </div>

                    <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory rounded-lg">
                        <div className="inline-flex space-x-4">
                            <img
                                src="/images/projects/project-01/cover-02.jpg"
                                alt="Project Cover"
                                className="w-full object-cover rounded-lg snap-start"
                            />
                        </div>
                    </div>

                    {/* <!-- Section: Storage --> */}
                    <div className="space-y-4">
                        <h2 className="text-4xl font-normal text-white mb-16">Reimagining Storage with Work Files</h2>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            To address the challenge of storage-heavy workflows, we collaborated closely with developers to rethink how edited audio could be accessed
                            without bloating device memory.
                            The result was the concept of Work Files, a lightweight, reference-based system that stores edits and segment data separately from the original audio.
                        </p>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            Instead of duplicating files, users could revisit their segmented work anytime, with all markers, loops, and labels intact without taking up additional space.
                            This innovation preserved both performance and user flexibility, especially for learners working on mobile devices with limited capacity.
                        </p>
                    </div>

                    <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory rounded-lg">
                        <div className="inline-flex space-x-4">
                            <img
                                src="/images/projects/project-01/cover-02.jpg"
                                alt="Project Cover"
                                className="w-full object-cover rounded-lg snap-start"
                            />
                        </div>
                    </div>


                    {/* <!-- Section: Did it work? --> */}
                    <div className="space-y-4">
                        <p className="textlg font-normal text-[#727272] uppercase tracking-wide mb-16">Did it work?</p>
                        <h2 className="text-4xl font-normal text-white mb-24">Designing a Smarter Way to Learn Through Audio</h2>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            Since launch, AudioCraft has organically grown to 3,000+ downloads with over 100 five-star reviews, powered entirely by organic downloads.
                            The simplicity and clarity of the experience resonated deeply with musicians, language learners, and educators alike.
                        </p>
                    </div>

                    {/* <!-- Section: Future Roadmap --> */}
                    <div className="space-y-4">
                        <p className="textlg font-normal text-[#727272] uppercase tracking-wide mb-16">Future Roadmap</p>
                        <h2 className="text-4xl font-normal text-white mb-24">So, What's next?</h2>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            AudioCraft began as a passion project—something I built to solve a personal learning challenge without a commercial agenda.
                            But as the product matured and organic user love grew, so did the possibilities.
                        </p>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            Looking ahead, I see potential to evolve AudioCraft into a smarter assistant for learners.
                            Future directions include AI-powered segment suggestions, progress-aware playback, and integrations with learning platforms.
                            There’s also opportunity to explore strategic partnerships and monetisation models through licensing or embedding in educational ecosystems.
                        </p>
                        <p className="text-[#909192] text-[1.5125rem] leading-[36px] mb-24">
                            While my current focus has shifted to other product ventures, AudioCraft remains close to heart, a reminder that even side projects,
                            when crafted with care, can spark real value and impact.
                        </p>
                    </div>

                    <div className="overflow-x-auto whitespace-nowrap scroll-smooth snap-x snap-mandatory rounded-lg">
                        <div className="inline-flex space-x-4">
                            <img
                                src="/images/projects/project-01/cover-02.jpg"
                                alt="Project Cover"
                                className="w-full object-cover rounded-lg snap-start"
                            />
                        </div>
                    </div>

                </div>
            </div>

        </>
    );
};

export default Work_detail_Component;
