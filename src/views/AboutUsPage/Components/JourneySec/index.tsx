import styles from "src/views/AboutUsPage/aboutUsPage.module.css";

const JourneySec = () => {
  return (
    <section className="bg-white pt-0 pt-md-0">
      <div className="container">
        <h2 className="fw-bold text-blue text-center mb-5">
          The Journey of Learntech Edu Solutions
        </h2>
        <div className={styles.journeyVideo + ' bg-blue rounded p-2 mx-auto'}>
          <iframe
            src="https://www.youtube.com/embed/ubcwVybnL4Q?si=osGRhTdono9EcJxK"
            title="The Journey of Learntech Edu Solutions"
            frameBorder="0"
            loading="lazy"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            referrerPolicy="strict-origin-when-cross-origin"
            allowFullScreen
            className="h-100 rounded w-100"
          />
        </div>
      </div>
    </section>
  )
}

export default JourneySec
