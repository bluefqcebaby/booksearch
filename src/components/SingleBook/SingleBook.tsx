import s from "./SingleBook.module.scss"
import { IoArrowBackSharp } from "react-icons/io5"

export const SingleBook = () => {
  return (
    <article className={s.singleBook}>
      <div className='container'>
        <div className={s.singleBook__wrapper}>
          <figure className={s.singleBook__img__block}>
            <img
              src='data:image/jpeg;base64,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'
              alt='book'
            />
          </figure>
          <div className={s.singleBook__info}>
            <p className={s.singleBook__categories}>Computers / General</p>
            <h2 className={s.singleBook__title}>
              Daredevil. Drama. Comedy. A play for 6-12 people
            </h2>
            <p className={s.singleBook__author}>Федор Достоевский</p>
            <p className={s.singleBook__description}>
              Книга посвящена разработке веб-приложений в Node.js – платформе, которая
              выводит язык JavaScript за пределы браузера и позволяет использовать его в
              серверных приложениях. В основе платформы лежит исключительно быстрый движок
              JavaScript, заимствованный из браузера Chrome, к которому добавлена быстрая
              и надежная библиотека асинхронного сетевого ввода/вывода. Основной упор в
              Node.js делается на создании высокопроизводительных, хорошо масштабируемых
              клиентских и серверных приложений.На практических примерах вы научитесь
              пользоваться серверным и клиентским объектами HTTP, каркасами Connect и
              Express, освоите алгоритмы асинхронного выполнения и узнаете, как работать с
              базами данных на основе SQL и с MongoDB.Начав с практических рекомендаций по
              установке и настройке Node.js в режиме разработки и эксплуатации, вы
              научитесь разрабатывать клиентские и серверные HTTP-приложения;
              познакомитесь с применяемой в Node.js системой организации модулей на основе
              спецификации CommonJS, позволяющей реализовать подмножество технологии
              объектно-ориентированного проектирования.Издание предназначено для
              программистов, знакомых с основами JavaScript и веб-разработки.
            </p>
          </div>
      <button className={s.singleBook__back}>
        <IoArrowBackSharp /> Back to the list
      </button>
        </div>
      </div>
    </article>
  )
}
