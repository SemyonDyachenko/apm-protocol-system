import React from "react"
import { Link } from "react-router-dom"
import EntrySection from "./entrySection"
import GallerySection from "./gallerySection"
import InformationSection from "./informationSection"
import PartnersSection from "./partnersSection"
import ContactSection from "./contactSection"

type Props = {}

const StartPage = (props: Props) => {
  return (
    <div>
      <EntrySection />
      <GallerySection />
      <InformationSection
        label="ОРАНИЗАТОРАМ"
        img="assets/landing/image20.png"
        text="   Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries for previewing
                    layouts and visual mockups. Lorem ipsum is placeholder text
                    commonly used in the graphic, print, and publishing.
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing.Lorem ipsum is placeholder text commonly
                  used in the graphic, print, and publishing"
      />
      <InformationSection
        label="СПОРТСМЕНАМ"
        img="assets/landing/image20.png"
        text="   Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing industries for previewing layouts and
                  visual mockups.
                    Lorem ipsum is placeholder text commonly used in the
                    graphic, print, and publishing industries for previewing
                    layouts and visual mockups. Lorem ipsum is placeholder text
                    commonly used in the graphic, print, and publishing.
                  Lorem ipsum is placeholder text commonly used in the graphic,
                  print, and publishing.Lorem ipsum is placeholder text commonly
                  used in the graphic, print, and publishing"
      />
      <PartnersSection />
      <ContactSection />
    </div>
  )
}

export default StartPage
