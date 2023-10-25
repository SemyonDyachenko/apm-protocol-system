import React from "react"
import { Link } from "react-router-dom"
import EntrySection from "./entrySection"
import GallerySection from "./gallerySection"
import InformationSection from "./informationSection"
import PartnersSection from "./partnersSection"

type Props = {}

const StartPage = (props: Props) => {
  return (
    <div>
      <EntrySection />
      <GallerySection />
      <InformationSection
        bg="bg-gradient-to-b from-secondary-500 to-gray-700"
        label="ОРАНИЗАТОРАМ"
        img="assets/landing/image20.png"
        text="С нашей платформой, вы сможете создать свою собственную спортивную лигу, организовать увлекательные турниры, пригласить спортсменов для участия в ваших событиях, использовать инновационную программу протоколов, добавить ваш турнир в мировой рейтинг и создать свою собственную спортивную команду  "
      />
      <InformationSection
        bg="bg-gradient-to-r from-secondary-500 to-gray-700"
        label="СПОРТСМЕНАМ"
        inverse={true}
        img="assets/landing/image20.png"
        text=" Создать свой профиль спортсмена и выделиться.
        Присоединиться к абсолютному мировому рейтингу и достичь мирового признания.
        Зарегистрироваться на турниры и проявить свое мастерство.
        Вступить в спортивные команды и разделить успехи.
        Стать частью спортивных лиг и взаимодействовать с сообществом"
      />
      <PartnersSection />
    </div>
  )
}

export default StartPage
